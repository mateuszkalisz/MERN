const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/place-routes');
const usersRoutes = require('./routes/user-routes');
const HttpError = require('./models/http-error');
const mongoose = require('mongoose');
const dblink = require('./db-credentials');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);

app.use('/api/users', usersRoutes);

app.use((req,res,next)=>{
    throw error = new HttpError('Could not find this route', 404);
});

app.use((error, req, res, next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message} || 'An unknown error occured!');
});


mongoose
.connect(dblink.dblink)
.then(()=>{
    app.listen(5000);
    // console.log("polaczono z db");
})
.catch((err)=>{
    console.log(err);
});

