# Service Booking Backend Application

A professional backend API for managing service bookings, schedules, and user authentication built with Node.js and Express.

## Overview

This application provides a comprehensive REST API for service booking management. It handles user authentication, service management, schedule coordination, and booking operations with role-based access control.

## Features

- User authentication and authorization with JWT tokens
- Service management and categorization
- Schedule creation and management
- Booking system with status tracking
- Role-based access control (Admin, Trainer, User)
- Password encryption with bcryptjs
- PostgreSQL database with Sequelize ORM
- Request validation and error handling
- CORS support for cross-origin requests
- Database migrations and seeders

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: PostgreSQL with Sequelize ORM v6.37.8
- **Authentication**: JSON Web Token (JWT) v9.0.3
- **Password Hashing**: bcryptjs v3.0.3
- **Environment Management**: dotenv v17.3.1
- **Development Tools**: nodemon, Sequelize CLI, dotenv-cli

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd crack-be-stephen1234567890000000
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=service_booking_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=24h
```

## Database Setup

Run migrations to set up the database schema:

```bash
npx sequelize-cli db:migrate
```

Seed initial data (optional):

```bash
npx sequelize-cli db:seed:all
```

## Running the Application

Start the development server with auto-reload:

```bash
npm run dev
```

Or start the production server:

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## Project Structure

```
├── app.js                    # Application entry point
├── config/                   # Configuration files
├── controller/               # Request handlers
│   ├── auth.controller.js
│   ├── booking.controller.js
│   ├── schedule.controller.js
│   └── service.controller.js
├── data/                     # Static data files
├── middleware/               # Custom middleware
│   ├── authentication.middleware.js
│   ├── authoritazion.middleware.js
│   └── errorHandler.js
├── migrations/               # Database migrations
├── models/                   # Sequelize models
├── routes/                   # API route definitions
├── services/                 # Business logic layer
├── seeders/                  # Database seeders
└── utils/                    # Utility functions
    ├── bcrypt.js
    └── jwt.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Services
- `GET /api/services` - List all services
- `POST /api/services` - Create new service
- `GET /api/services/:id` - Get service details
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Schedules
- `GET /api/schedules` - List all schedules
- `POST /api/schedules` - Create new schedule
- `GET /api/schedules/:id` - Get schedule details
- `PUT /api/schedules/:id` - Update schedule
- `DELETE /api/schedules/:id` - Delete schedule

### Bookings
- `GET /api/bookings` - List all bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| NODE_ENV | Environment (development/production) | development |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_NAME | Database name | service_booking_db |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | - |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRATION | JWT token expiration time | 24h |

## Error Handling

The application implements centralized error handling through the `errorHandler` middleware. All errors are caught and returned in a standardized format with appropriate HTTP status codes.

## Authentication

The API uses JWT-based authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Database Models

- **User**: Stores user account information and credentials
- **Service**: Defines available services
- **Schedule**: Manages service schedules
- **Booking**: Records user bookings

## Development

Install development dependencies and run with auto-reload:

```bash
npm install --save-dev
npm run dev
```

## License

ISC

## Support

For issues and questions, please create an issue on the GitHub repository.

---

**Project Repository**: https://github.com/Revou-FSSE-Oct25/crack-be-stephen1234567890000000
