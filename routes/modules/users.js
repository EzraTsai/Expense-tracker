const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users.login'
}))

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    User.findOne({ email })
        .then(user => {
            if (user) {
                console.log('Email has already existed.')
                res.render('register', { name, email, password, confirmPassword })
            } else {
                return User.create({ name, email, password, confirmPassword })
                    .then(() => res.redirect('login'))
                    .catch(err => console.log(err))
            }


        })
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/users/login')
})

module.exports = router