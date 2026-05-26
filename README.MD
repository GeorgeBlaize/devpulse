# DevPulse 🚀
### Internal Tech Issue & Feature Tracker

DevPulse is a collaborative issue-tracking platform designed for software teams to efficiently report bugs, request features, and manage issue resolution workflows.

---

## 🌐 Live Demo

🔗 **Live URL:**  
https://devpulse-b7a2-two.vercel.app/

---

# ✨ Features

- ✅ User Authentication with JWT
- ✅ Secure password hashing using bcrypt
- ✅ Role-based authorization system
- ✅ Create, update, delete, and manage issues
- ✅ Filter and sort issues dynamically
- ✅ PostgreSQL integration using raw SQL queries
- ✅ RESTful API architecture
- ✅ TypeScript-powered backend for scalability

---

# 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| TypeScript | Type Safety |
| PostgreSQL (Neon) | Database |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Vercel | Deployment |

---

# 📂 Project Structure

```bash
devpulse/
│
├── src/
│   ├── app.ts
│   ├── server.ts
│   │
│   ├── config/
│   │   └── env.ts
│   │
│   ├── db/
│   │   └── index.ts
│   │
│   ├── interfaces/
│   │   └── index.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── role.middleware.ts
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.service.ts
│   │   │
│   │   └── issues/
│   │       ├── issue.controller.ts
│   │       ├── issue.routes.ts
│   │       └── issue.service.ts
│   │
│   ├── types/
│   │   └── express.d.ts
│   │
│   └── utils/
│       ├── jwt.ts
│       └── response.ts
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── vercel.json
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret_key
```

---

# 🛠️ Local Setup & Installation

## 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd devpulse
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file and add your credentials.

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

---

## 4️⃣ Run the Development Server

```bash
npm run dev
```

---

# 📡 API Endpoints

## 🔐 Authentication Routes

### Register User

```http
POST /api/auth/signup
```

### Login User

```http
POST /api/auth/login
```

---

# 🐞 Issue Routes

| Method | Endpoint | Access |
|--------|-----------|---------|
| POST | `/api/issues` | Protected |
| GET | `/api/issues` | Public |
| GET | `/api/issues/:id` | Public |
| PATCH | `/api/issues/:id` | Protected |
| DELETE | `/api/issues/:id` | Maintainer Only |

---

# 🔎 Query Parameters

You can filter and sort issues using query parameters:

```http
GET /api/issues?sort=created_at&type=bug&status=open
```

| Parameter | Description |
|-----------|-------------|
| `sort` | Sort issues |
| `type` | Filter by issue type |
| `status` | Filter by status |

---

# 👥 User Roles

## Contributor
- Create issues
- Update own issues

## Maintainer
- Full access to all issues
- Delete any issue
- Update any issue

---

# 🗄️ Database Schema

The application uses two main tables:

- **Users**
- **Issues**

Includes:
- Proper relational structure
- Constraints
- Role management
- Timestamps

---

# 🔒 Authentication & Authorization

- JWT-based authentication
- Protected routes using middleware
- Role verification middleware for maintainers

---

# 🚀 Deployment

The project is deployed on **Vercel**.

To deploy manually:

```bash
vercel
```

---

# 📌 Example Request

## Create Issue

```http
POST /api/issues
Authorization: Bearer <token>
```

### Request Body

```json
{
  "title": "Login page crash",
  "description": "App crashes after clicking login",
  "type": "bug",
  "status": "open"
}
```
---

# 👨‍💻 Author

### Jonathan George Blaize Purification