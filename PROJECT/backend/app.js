const express = require('express');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/note-routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(noteRoutes);

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!!'});
})

app.listen(port);