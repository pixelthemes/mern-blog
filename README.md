# MERN Blog Project

A full-stack web application with React frontend and Express backend.

## Features

- User Authentication with OTP verification
- Blog Management System
- Service Management
- Team Management
- Protected Dashboard
- RESTful API Integration

## Tech Stack

- Frontend: React, React Router
- Backend: Express.js, MongoDB
- Authentication: JWT

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pixelthemes/MERN-Blog-Project
```

2. Install Frontend Dependencies:
```bash
cd client
npm install
```

3. Install Backend Dependencies:
```bash
cd Backend
npm install
```

4. Configure Environment Variables:
- Copy the config example from `/Backend/app/config/config.js`
- Update MongoDB connection string and other credentials

### Running the Application

1. Start Backend Server:
```bash
cd Backend
npm start
```

2. Start Frontend Development Server:
```bash
cd client
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/Registration` - User registration
- POST `/api/VerifyOTP` - OTP verification
- POST `/api/UserLogout` - User logout (Protected)

### Blog Management
- POST `/api/CreateBlog` - Create new blog
- GET `/api/getAllBlog` - Fetch all blogs
- GET `/api/getBlogByID/:id` - Get specific blog
- PUT `/api/UpdateBlog/:id` - Update blog
- DELETE `/api/DeleteBlog/:id` - Delete blog

### Service Management
- POST `/api/CreateService` - Create service
- GET `/api/getAllService` - Fetch all services
- PUT `/api/UpdateService/:id` - Update service
- DELETE `/api/DeleteService/:id` - Delete service

### Team Management
- POST `/api/CreateTeam` - Create team member
- GET `/api/getTeam` - Fetch team members
- PUT `/api/UpdateTeam/:id` - Update team member
- DELETE `/api/deleteTeam/:id` - Delete team member

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

- Follow pixelthemes
# MERN-Blog-Project
