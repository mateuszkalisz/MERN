const express = require('express');
const {login, signup, getTeamUsers} = require('../controllers/users-controllers');

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.get('/team/:teamId', getTeamUsers);

module.exports = router;