# EduStack Backend

EduStack Backend is a scalable REST API built with Node.js and Express that powers the EduStack education platform.  
It handles authentication, role-based authorization, subscriptions, payments, and academic content management.

---

## About the Project

EduStack Backend is responsible for:
- Secure user authentication
- Role-based access control (Student, Teacher, Admin)
- Subscription & payment handling
- Structured academic content APIs
- Admin moderation & system control

It is designed to support a **large number of students and teachers** across multiple universities.

---

## Core Responsibilities

- User authentication using JWT
- Role & permission management
- Subscription lifecycle management
- Razorpay payment integration
- University → Course → Branch → Semester → Subject APIs
- Premium content access control
- Admin operations (users, content, payments)

---

## High-Level Architecture (HLD)

```text
Client (Frontend)
   ↓
REST API (Express.js)
   ↓
Auth Middleware (JWT)
   ↓
Role & Subscription Middleware
   ↓
Controllers (Business Logic)
   ↓
MongoDB (Database)

===========================================================

EduStack/
│
│
├── backend/                  # Node + Express API
│   ├── src/
│   │   ├── config/           # DB, env, Razorpay
│   │   ├── models/           # MongoDB schemas
│   │   │   ├── User.js
│   │   │   ├── University.js
│   │   │   ├── Course.js
│   │   │   ├── Subject.js
│   │   │   ├── Content.js
│   │   │   ├── Subscription.js
│   │   │   └── Payment.js
│   │   │
│   │   ├── controllers/      # Business logic
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth, role, subscription
│   │   ├── services/         # Payment, email
│   │   ├── utils/
│   │   └── app.js
│   │
│   └── server.js
│

===========================================================
