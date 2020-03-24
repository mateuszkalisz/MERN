const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');
const { validationResult} = require('express-validator');
const User = require('../models/user');

const DUMMY_users = [
    {
        id: "u1",
        name: "MK",
        email: "mk@mk.pl",
        password: "test123",
    }
]

const getUsersList = async (req,res,next) =>{

    let users;

    try{
        users = await User.find({}, '-password'); //pokaz wszystko poza haslem
    }catch(err){
        const error = new HttpError('Fetching users failed, please try again later', 500);
        return next(error);
    }

    res.status(200).json({users: users.map(user => user.toObject({getters: true}))});
};
const signup = async (req,res,next) =>{

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error =  new HttpError('Invalid unputs passed, please check your data.', 422);
        return next(error);
        // return res.status(422).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;

    // const hasUser = DUMMY_users.find(user => user.email === email);

    // if(hasUser){
    //     throw new HttpError('Could not create user. Email already exist!')
    // }

    let existingUser;
    
    try{
        existingUser = await User.findOne({email: email});
    }catch(err){
        const error = new HttpError('Signing up failed, please try again!', 500);
        return next(error);
    }

    if(existingUser){
        const error = new HttpError('Could not create user. Email already exist!', 422);
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        password,
        image: 'https://pngimage.net/wp-content/uploads/2018/06/no-user-image-png-2.png',
        places: []
    });

    // DUMMY_users.push(createdUser);

    try{
        createdUser.save();
    }catch(err){
        const error = new HttpError('Something went wrong, cound not create user. Please try again', 500);
        return next(error);
    }

    res.status(201).json({newUser: createdUser.toObject({getters: true})});
};
const login = async (req,res,next) =>{
    const {email, password} = req.body;

    // const identifiedUser = DUMMY_users.find(u => u.email === email);

    // if(!identifiedUser || identifiedUser.password !== password){
    //     throw new HttpError('Could not identify user, credentials seem to be wrong', 401);
    // }

    let existingUser;
    
    try{
        existingUser = await User.findOne({email: email});
    }catch(err){
        const error = new HttpError('Logging in failed, please try again!', 500);
        return next(error);
    }
    
    if(!existingUser || existingUser.password !== password){
        const error = new HttpError('Invalid credentials, could not log in', 401);
        return next(error);
    }


    res.json({message: "Logged in!", user: existingUser.toObject({getters: true})});

};


exports.getUsersList = getUsersList;
exports.signup = signup;
exports.login = login;