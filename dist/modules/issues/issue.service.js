"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIssueService = exports.updateIssueService = exports.getSingleIssueService = exports.getAllIssuesService = exports.createIssueService = void 0;
const db_1 = require("../../config/db");
const createIssueService = async (title, description, type, reporter_id) => {
    const query = `
    INSERT INTO issues (title, description, type, reporter_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
    const { rows } = await db_1.pool.query(query, [title, description, type, reporter_id]);
    return rows[0];
};
exports.createIssueService = createIssueService;
const getAllIssuesService = async (sort = "newest", type, status) => {
    let query = `
    SELECT i.*, 
           u.id as reporter_id, 
           u.name as reporter_name, 
           u.role as reporter_role
    FROM issues i
    LEFT JOIN users u ON i.reporter_id = u.id
    WHERE 1=1
  `;
    const params = [];
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
    const { rows } = await db_1.pool.query(query, params);
    return rows;
};
exports.getAllIssuesService = getAllIssuesService;
const getSingleIssueService = async (id) => {
    const query = `
    SELECT i.*, 
           u.id as reporter_id, 
           u.name as reporter_name, 
           u.role as reporter_role
    FROM issues i
    LEFT JOIN users u ON i.reporter_id = u.id
    WHERE i.id = $1
  `;
    const { rows } = await db_1.pool.query(query, [id]);
    return rows[0];
};
exports.getSingleIssueService = getSingleIssueService;
const updateIssueService = async (id, title, description, type) => {
    const query = `
    UPDATE issues
    SET title = $1, description = $2, type = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
  `;
    const { rows } = await db_1.pool.query(query, [title, description, type, id]);
    return rows[0];
};
exports.updateIssueService = updateIssueService;
const deleteIssueService = async (id) => {
    await db_1.pool.query("DELETE FROM issues WHERE id = $1", [id]);
};
exports.deleteIssueService = deleteIssueService;
//# sourceMappingURL=issue.service.js.map