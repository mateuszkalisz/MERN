const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');
const { validationResult} = require('express-validator');

const DUMMY_users = [
    {
        id: "u1",
        name: "MK",
        email: "mk@mk.pl",
        password: "test123",
    }
]

const getUsersList = (req,res,next) =>{
    res.status(200).json({users: DUMMY_users});
};
const signup = (req,res,next) =>{

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new HttpError('Invalid unputs passed, please check your data.', 422);
        // return res.status(422).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;

    const hasUser = DUMMY_users.find(user => user.email === email);

    if(hasUser){
        throw new HttpError('Could not create user. Email already exist!')
    }

    const createUser = {
        id: uuid(),
        name,
        email,
        password
    };

    DUMMY_users.push(createUser);

    res.status(201).json({newUser: createUser});
};
const login = (req,res,next) =>{
    const {email, password} = req.body;

    const identifiedUser = DUMMY_users.find(u => u.email === email);

    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Could not identify user, credentials seem to be wrong', 401);
    }
    
    res.json({message: "Logged in!"});

};


exports.getUsersList = getUsersList;
exports.signup = signup;
exports.login = login;