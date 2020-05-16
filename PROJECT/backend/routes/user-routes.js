const express = require('express');
const {check} = require('express-validator');
const {login, signup, getTeamUsers} = require('../controllers/users-controllers');

const router = express.Router();

router.post('/login', [
    check('name').isLength({min: 2}),
    check('password').isLength({min: 6})
] ,login);

router.post('/signup', [
    check('name').isLength({min: 2}),
    check('email').isEmail(),
    check('password').isLength({min: 6})
], signup);

router.get('/team/:teamId', getTeamUsers);

module.exports = router;