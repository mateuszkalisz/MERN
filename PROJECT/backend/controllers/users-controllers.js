const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const { v4: uuidv4 } = require('uuid');
// const {DUMMY_USERS} = require('../util/dummyData');
const User = require('../models/users');

exports.login = async (req,res,next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const {name, password} = req.body;
    
    let existingUser;

    try{
        existingUser = await User.findOne({name: name});
    }
    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }

    if(!existingUser || existingUser.password !== password){
        const error = new HttpError('Could not login. Credentials seem to be wrong.', 401);
        return next(error);
    }


    // const ifUserExists = DUMMY_USERS.find(user => user.name === name);

    // if(!ifUserExists || ifUserExists.password !== password){
    //     throw new HttpError('Could not login. Credentials seem to be wrong.', 401)
    // }

    res.json('Logged in!');
};

exports.signup = async (req,res,next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const {name, email, password, team} = req.body;

    // const ifUserExists = DUMMY_USERS.find(user => user.name === name || user.email === email);

    let ifNameExists;
    let ifEmailExists;

    try{
        ifNameExists = await User.find({email: email});
        ifEmailExists = await User.find({name: name});    
    }
    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }
    
    if(ifNameExists.length !=0 || ifEmailExists.length!=0){
        return next(new HttpError('Username or email already exists, please try again', 401));
    }

    const createdUser = new User({
        name,
        email,
        password,
        team,
        notes: []
    })

    try{
        await createdUser.save();
    }
    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }

    // DUMMY_USERS.push(createdUser);
    

    res.status(201).json({createdUser: createdUser.toObject({getters: true})});
};

exports.getTeamUsers = async (req,res,next) =>{
    const teamId = req.params.teamId;

    // const teamUsers = DUMMY_USERS.filter(user => user.team === teamId);

    const teamUsers  = await User.find({team: teamId});

    if(teamUsers.length === 0){
        return next(new HttpError('Could not find users for provided team', 404));
    }

    res.json({teamUsers: teamUsers.map(user => user.toObject({getters: true}))});
};