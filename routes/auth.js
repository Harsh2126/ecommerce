const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { isNotAuthenticated } = require('../middleware/auth');

// Login page
router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login', { error: null });
});

// Login POST
router.post('/login', isNotAuthenticated, [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('login', { 
                error: errors.array()[0].msg,
                email: req.body.email 
            });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('login', { 
                error: 'Invalid email or password',
                email: req.body.email 
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('login', { 
                error: 'Invalid email or password',
                email: req.body.email 
            });
        }

        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { error: 'An error occurred during login' });
    }
});

// Signup page
router.get('/signup', isNotAuthenticated, (req, res) => {
    res.render('signup', { error: null });
});

// Signup POST
router.post('/signup', isNotAuthenticated, [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('signup', { 
                error: errors.array()[0].msg,
                name: req.body.name,
                email: req.body.email 
            });
        }

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('signup', { 
                error: 'Email already registered',
                name: req.body.name,
                email: req.body.email 
            });
        }

        // Create new user
        const user = new User({ name, email, password });
        await user.save();

        // Auto-login after signup
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Signup error:', error);
        res.render('signup', { 
            error: 'An error occurred during signup',
            name: req.body.name,
            email: req.body.email 
        });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/');
    });
});

module.exports = router; 