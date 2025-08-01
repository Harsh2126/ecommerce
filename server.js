const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection function
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error('Database connection error:', error);
        return false;
    }
};

// Initialize server
const startServer = async () => {
    // Connect to database first
    const dbConnected = await connectDB();
    
    if (!dbConnected) {
        console.error('Failed to connect to database. Server will not start.');
        process.exit(1);
    }

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));

    // View engine
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // Session configuration
    app.use(session({
        secret: process.env.SESSION_SECRET || 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce'
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 24 hours
        }
    }));

    // Global middleware to make user available to all views
    app.use((req, res, next) => {
        res.locals.user = req.session.user || null;
        next();
    });

    // Routes
    app.use('/', require('./routes/main'));
    app.use('/auth', require('./routes/auth'));

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).render('error', { error: 'Something went wrong!' });
    });

    // 404 handler
    app.use((req, res) => {
        res.status(404).render('error', { error: 'Page not found!' });
    });

    // Start server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

// Start the server
startServer().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
}); 