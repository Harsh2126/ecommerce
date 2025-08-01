const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

const isNotAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        res.redirect('/dashboard');
    }
};

module.exports = { isAuthenticated, isNotAuthenticated }; 