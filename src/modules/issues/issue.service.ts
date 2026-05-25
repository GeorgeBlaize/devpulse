import { pool } from "../../config/db";

export const createIssueService = async (title: string, description: string, type: string, reporter_id: number) => {
  const query = `
    INSERT INTO issues (title, description, type, reporter_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [title, description, type, reporter_id]);
  return rows[0];
};

export const getAllIssuesService = async (sort: string = "newest", type?: string, status?: string) => {
  let query = `
    SELECT i.*, 
           u.id as reporter_id, 
           u.name as reporter_name, 
           u.role as reporter_role
    FROM issues i
    LEFT JOIN users u ON i.reporter_id = u.id
    WHERE 1=1
  `;

  const params: any[] = [];
  let paramCount = 1;

  if (type) {
    query += ` AND i.type = $${paramCount++}`;
    params.push(type);
  }
  if (status) {
    query += ` AND i.status = $${paramCount++}`;
    params.push(status);
  }

  query += sort === "oldest" ? " ORDER BY i.created_at ASC" : " ORDER BY i.created_at DESC";

  const { rows } = await pool.query(query, params);
  return rows;
};

export const getSingleIssueService = async (id: string) => {
  const query = `
    SELECT i.*, 
           u.id as reporter_id, 
           u.name as reporter_name, 
           u.role as reporter_role
    FROM issues i
    LEFT JOIN users u ON i.reporter_id = u.id
    WHERE i.id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const updateIssueService = async (id: string, title: string, description: string, type: string) => {
  const query = `
    UPDATE issues
    SET title = $1, description = $2, type = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
  `;
  const { rows } = await pool.query(query, [title, description, type, id]);
  return rows[0];
};

export const deleteIssueService = async (id: string) => {
  await pool.query("DELETE FROM issues WHERE id = $1", [id]);
};