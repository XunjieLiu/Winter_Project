const express = require('express');
const router = express.Router();
var connection = require('./config_DB');

router.get('/register', function (req, res) {
    res.render('signUp');
});
router.post('/register', function (req, res) {
    var result = req.body;
    id += 1;
    var user = {
        "id": id,
        "username": result.username,
        "password": result.password,
        "authority": "customer",
        "first_name": result.fname,
        "last_name": result.lname,
        "city": result.city,
        "country": result.country,
        "address": result.address,
        "postcode": result.postcode,
        "tel_num": result.tel
    }
    //console.log('success');
    connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
        if (error) {
            console.log(error.message)
        }
        else {
            console.log('The query was successful')
        }
    })
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    var input_data = req.body;
    let sql = `SELECT * FROM users WHERE username = \'${input_data.username}\' AND password = \'${input_data.password}\';`
    let query = connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/login')
        } else {
            if (result.length > 0) {
                console.log(result);
                res.send(`Hello! ${input_data.username}`);
            } else {
                res.redirect('/login')
            }
        }
    });
});

module.exports = router;