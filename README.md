# 🍽️ Restaurant Reservation Management System

<p align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black)
![Render](https://img.shields.io/badge/Backend-Render-blue)

</p>

A full-stack Restaurant Reservation Management System built using **React**, **Node.js**, **Express.js**, **MongoDB Atlas**, and **JWT Authentication**.

The application enables customers to reserve restaurant tables online while allowing administrators to monitor and manage reservations through a dedicated dashboard.

---

# 🌐 Live Demo

## Frontend

https://restaurant-reservation-system-nine-amber.vercel.app/
## Backend

https://restaurant-reservation-system-jlza.onrender.com/
---

# 💻 GitHub Repository

https://github.com/mohammedabdullah51607-eng/restaurant-reservation-system
---

# 📖 Project Overview

The Restaurant Reservation Management System simplifies restaurant table booking by providing a secure online reservation platform.

Customers can:

- Register
- Login
- Reserve tables
- View reservations
- Cancel reservations

Administrators can:

- Monitor reservations
- View customer bookings
- Cancel reservations
- View dashboard statistics

The system follows a RESTful architecture using Express APIs with MongoDB Atlas for data persistence and JWT-based authentication for secure access.

---

# ✨ Features

## Customer

- User Registration
- User Login
- JWT Authentication
- Reserve Restaurant Tables
- View Personal Reservations
- Cancel Reservations
- Logout

---

## Administrator

- Admin Login
- Dashboard
- View All Reservations
- Cancel Reservations
- Reservation Statistics

---

## Security

- Password Hashing (Bcrypt)
- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Environment Variables

---

# 🛠 Technology Stack

## Frontend

- React
- React Router DOM
- Axios
- React Icons
- CSS3

## Backend

- Node.js
- Express.js
- JWT
- Bcrypt

## Database

- MongoDB Atlas
- Mongoose

## Deployment

- Frontend → Vercel
- Backend → Render

---

# 📂 Project Structure

```
Restaurant-Reservation-System

│

├── frontend

│ ├── src

│ ├── public

│ ├── services

│ ├── pages

│ └── components

│

├── backend

│ ├── config

│ ├── controllers

│ ├── middleware

│ ├── models

│ ├── routes

│ ├── server.js

│ └── seedTables.js

│

└── README.md
```

---

# 🚀 Installation

Clone Repository

```bash
git clone https://github.com/mohammedabdullah51607-eng/restaurant-reservation-system.git
```

Install Backend

```bash
cd backend
npm install
```

Install Frontend

```bash
cd frontend
npm install
```

Start Backend

```bash
npm run dev
```

Start Frontend

```bash
npm run dev
```

Backend

```
http://localhost:5000
```

Frontend

```
http://localhost:5173
```

---

# 🔑 Environment Variables

Backend (.env)

```env
PORT=5000

MONGO_URI=Your MongoDB Connection String

JWT_SECRET=Your Secret Key
```

Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

---

# 👤 User Roles

## Customer

- Register
- Login
- Book Table
- View Reservations
- Cancel Reservation

## Administrator

- Login
- Dashboard
- View All Reservations
- Cancel Reservations

---

# 🗄 Database Design

## User

- Name
- Email
- Password
- Role

---

## Table

- Table Number
- Capacity

---

## Reservation

- User
- Table
- Reservation Date
- Time Slot
- Number of Guests
- Status

---

# 📸 Screenshots

Add screenshots here after deployment.

Example:

- Home Page
- Login
- Register
- Book Table
- My Reservations
- Admin Dashboard

---

# 📜 License

This project was developed for an internship assignment and educational purposes.
# 🔄 Reservation & Availability Logic

The reservation system follows a structured validation process to ensure reliable and conflict-free bookings.

### Reservation Workflow

1. The user logs into the application.
2. The customer selects:
   - Table
   - Reservation Date
   - Time Slot
   - Number of Guests
3. The backend validates the request.
4. The reservation is stored in MongoDB if all validation checks pass.
5. A success message is returned to the customer.

---

## Availability Validation

Before creating a reservation, the backend performs the following validations:

- The selected table must exist.
- The table must not already be booked for the selected date and time slot.
- The number of guests must not exceed the seating capacity of the selected table.
- Only authenticated users can create reservations.

If any validation fails, an appropriate error message is returned to the user.

---

# 🔐 Authentication & Authorization

JWT (JSON Web Token) authentication is used to secure the application.

### Authentication Flow

1. User registers with name, email, and password.
2. Password is encrypted using Bcrypt.
3. User logs in successfully.
4. Server generates a JWT token.
5. Token is stored on the client.
6. Every protected request includes:

```
Authorization: Bearer <token>
```

7. Backend verifies the token before allowing access.

---

# 👥 Role-Based Access Control

The application supports two user roles.

## Customer

Customers can:

- Register
- Login
- View available tables
- Book reservations
- View their own reservations
- Cancel their reservations

Customers cannot:

- Access admin APIs
- View other users' reservations
- Access the admin dashboard

---

## Administrator

Administrators can:

- Login
- Access the Admin Dashboard
- View all reservations
- Cancel any reservation
- Monitor booking activity

Administrators have elevated privileges and can manage reservations across all users.

---

# 📌 Assumptions

The following assumptions were made during development:

- The system manages a single restaurant.
- Tables are predefined and seeded into the database.
- Each table has a fixed seating capacity.
- One reservation is allowed per table for a given date and time slot.
- Users must be authenticated before making reservations.
- JWT tokens remain valid until they expire or the user logs out.

---

# ⚠️ Known Limitations

Current limitations of the application include:

- Supports only one restaurant.
- No payment gateway integration.
- No email or SMS notifications.
- No real-time availability updates.
- No online table selection using a visual floor plan.
- Reservation editing is limited.
- Password reset functionality is not implemented.

---

# 🚀 Future Improvements

With additional development time, the following features can be added:

- Online payment integration.
- Email confirmation for reservations.
- SMS notifications.
- Google Calendar integration.
- QR Code-based reservation verification.
- Multi-restaurant support.
- Real-time seat availability using WebSockets.
- Customer reviews and ratings.
- Search and filter functionality.
- Analytics dashboard with charts and reports.

---

# 📡 REST API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

---

## Tables

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/tables` | Fetch all restaurant tables |

---

## Reservations

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/reservations` | Create reservation |
| GET | `/api/reservations/my` | View user reservations |
| DELETE | `/api/reservations/:id` | Cancel reservation |

---

## Admin

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/admin/reservations` | View all reservations |
| DELETE | `/api/admin/reservations/:id` | Cancel any reservation |

---

# 🏗️ System Architecture

```
                 React Frontend (Vercel)
                         │
                         │ REST API
                         ▼
                Node.js + Express Backend
                         │
                JWT Authentication
                         │
                         ▼
                  MongoDB Atlas Database
```

---

# 🎯 Conclusion

The Restaurant Reservation Management System successfully demonstrates the implementation of a modern full-stack web application using the MERN ecosystem.

The project provides secure authentication, role-based authorization, efficient reservation management, and a responsive user interface. The backend follows RESTful API principles, while MongoDB ensures scalable data storage.

The application satisfies the core requirements of the assignment and can be further extended with advanced features such as online payments, real-time updates, notifications, and multi-restaurant support.