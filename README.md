<<<<<<< HEAD
# JOVAC-x-CB-2025

## About
This repository contains my learning journey in fullstack development. I am currently learning and practicing various web development technologies to become a fullstack developer.

## Current Focus
- HTML, CSS, and JavaScript fundamentals
- Frontend development
- Backend development
- Database management
- Web application architecture



## Learning Path
I am actively working on improving my skills in:
1. Frontend Technologies
   - HTML5
   - CSS3
   - JavaScript
   - Modern frameworks (to be added)

2. Backend Technologies
   - Server-side programming
   - API development
   - Database management

Feel free to explore my code and provide feedback!
=======
# E-Commerce Website

A modern e-commerce website built with Express.js, MongoDB, and EJS templating engine.

## Features

- ✅ User authentication (login/signup)
- ✅ Session management
- ✅ Responsive design
- ✅ Modern UI with animations
- ✅ Dashboard for authenticated users
- ✅ Secure password hashing
- ✅ Form validation
- ✅ Error handling

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-COMMERXCE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the MongoDB URI and session secret

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas (cloud service)

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   - Open your browser and go to `http://localhost:3000`

## Project Structure

```
E-COMMERXCE/
├── config/
│   └── database.js          # Database configuration
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   └── User.js              # User model
├── public/
│   ├── css/
│   │   └── style.css        # Stylesheets
│   └── js/
│       └── main.js          # Client-side JavaScript
├── routes/
│   ├── auth.js              # Authentication routes
│   └── main.js              # Main routes
├── views/
│   ├── dashboard.ejs        # Dashboard page
│   ├── error.ejs            # Error page
│   ├── login.ejs            # Login page
│   ├── signup.ejs           # Signup page
│   └── welcome.ejs          # Welcome page
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
├── README.md                # Project documentation
└── server.js                # Main application file
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Template Engine**: EJS
- **Authentication**: Express sessions, bcryptjs
- **Styling**: CSS3 with modern design
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)

## API Endpoints

- `GET /` - Welcome page
- `GET /auth/login` - Login page
- `POST /auth/login` - Login form submission
- `GET /auth/signup` - Signup page
- `POST /auth/signup` - Signup form submission
- `GET /auth/logout` - Logout user
- `GET /dashboard` - User dashboard (protected)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
>>>>>>> master
>>>>>>> live link=https://e-com-p8t5.onrender.com/
