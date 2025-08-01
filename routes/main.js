const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

// Welcome page
router.get('/', (req, res) => {
    res.render('welcome');
});

// Dashboard (protected route)
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.session.user });
});

// Shop page (protected route)
router.get('/shop', isAuthenticated, (req, res) => {
    res.render('shop', { user: req.session.user });
});

// Wishlist page (protected route)
router.get('/wishlist', isAuthenticated, (req, res) => {
    res.render('wishlist', { user: req.session.user });
});

// Orders page (protected route)
router.get('/orders', isAuthenticated, (req, res) => {
    res.render('orders', { user: req.session.user });
});

module.exports = router; 