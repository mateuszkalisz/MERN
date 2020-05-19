const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/note-routes');
const userRoutes = require('./routes/user-routes');
const {dbLink} = require('./dbLink');

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());

app.use(noteRoutes);
app.use(userRoutes);

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!!'});
})

mongoose.connect(dbLink)
.then(()=>{
    app.listen(port);
}).catch(err => console.log(err));
