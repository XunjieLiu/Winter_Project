const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render("welcome")
});

//Login page
router.get('/login', (req, res) => {
    res.send("login")
});

//Register page
router.get('/register', (req, res) => {
    res.send("register")
});

module.exports = router;