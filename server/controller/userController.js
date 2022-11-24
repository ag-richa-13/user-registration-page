const mysql = require('mysql');
const path = require('path');
const alert = require('alert');

const sourceFolder = path.join(__dirname, '../../public')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Root@1234',
    database: 'account'
});

module.exports.view = function(req, res, next) {
    res.sendFile(sourceFolder + '/index.html');
}

module.exports.form = function(req, res, next) {
    res.sendFile(sourceFolder + '/register.html');

}

module.exports.create = function(req, res, next) {
    const { name, email, password, cpassword, gender } = req.body;

    pool.query('SELECT email FROM user WHERE email = ?', [email], async function(err, result) {
        if (err) {
            console.error(err);
        }
        if (result.length > 0) {
            req.flash('error', { message: 'Email already exist.' });
            return alert("Email Is already in use");

        } else {
            if (password !== cpassword) {
                return alert('Password does not match');
            } else {
                pool.query('INSERT INTO user SET ?', { name, email, password, cpassword, gender }, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/home');
                    }
                })
            }
        }
    })
}

module.exports.loginform = function(req, res, next) {
    res.sendFile(sourceFolder + '/login.html');
}

module.exports.login = function(req, res) {
    const { email, password } = req.body;


    pool.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], function(err, result) {
        if (err) {
            console.log(err);
        };
        if (result.length <= 0) {
            return res.redirect('back');
        } else {
            req.session.loggedIn = true;
            res.redirect('/home');
        }
        res.end();
    });
}

module.exports.homepage = function(req, res) {

    res.sendFile(sourceFolder + '/home.html');
}