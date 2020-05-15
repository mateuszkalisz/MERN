const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const {DUMMY_USERS} = require('../util/dummyData');

exports.login = (req,res,next) =>{
    const {name, password} = req.body;

    const ifUserExists = DUMMY_USERS.find(user => user.name === name);

    if(!ifUserExists || ifUserExists.password !== password){
        throw new HttpError('Could not login. Credentials seem to be wrong.', 401)
    }

    res.json('Logged in!');
};

exports.signup = (req,res,next) =>{
    const {name, email, password, team} = req.body;

    const ifUserExists = DUMMY_USERS.find(user => user.name === name || user.email === email);

    if(ifUserExists){
        throw new HttpError('Username or email already exists, please try again', 401)
    }

    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password,
        team
    }

    DUMMY_USERS.push(createdUser);

    res.status(201).json({DUMMY_USERS});
};

exports.getTeamUsers = (req,res,next) =>{
    const teamId = req.params.teamId;

    const teamUsers = DUMMY_USERS.filter(user => user.team === teamId);

    if(teamUsers.length === 0){
        throw new HttpError('Could not find users for provided team', 404);
    }

    res.json({teamUsers});
};