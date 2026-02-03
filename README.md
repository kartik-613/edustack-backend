# EduStack Backend

EduStack Backend is a scalable REST API built with **Node.js**, **Express**, and **MongoDB**. It serves as the backbone for the EduStack platform, handling authentication, complex relationship mapping, and role-based access control.

---

## 🛠️ Core Responsibilities

- **Authentication & Authorization**: Secure JWT-based auth and granular role permissions (Student, Teacher, Admin).
- **Academic Hierarchy**: Managing deep relationships between `Universities`, `Courses`, `Branches`, and `Subjects`.
- **Content Management**: Secure handling of Syllabus, PYQs, Notes, and Answers with status approval workflows.
- **Subscription Engine**: Integration with **Razorpay** for handling premium unlocks and user billing.
- **Admin API**: Specialized endpoints for platform analytics, user moderation, and data management.

---

## 🏗️ High-Level Architecture (HLD)

```text
Client (React App)
   │
   ▼
REST API (Express / Node.js)
   │
   ├── Auth Middleware (JWT Validation)
   ├── Role Middleware (Access Control)
   └── Storage (MongoDB Cluster)
```

---

## 📂 Project Structure

```text
server/
├── src/
│   ├── models/           # Mongoose schemas (User, Content, Subject, etc.)
│   ├── controllers/      # Request handlers & Business logic
│   ├── routes/           # API Endpoint definitions
│   ├── middleware/       # Auth & Role verification
│   ├── config/           # DB connection & External services (Razorpay)
│   └── app.js            # Express application setup
└── server.js             # Server entry point & DB connection
```

---

## 🚀 Getting Started

1. Create a `.env` file based on the template.
2. `npm install`
3. `npm run dev` (requires nodemon) or `npm start`

