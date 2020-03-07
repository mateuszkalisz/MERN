const express = require('express');

const router = express.Router();

const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world',
        location: {
            lat: 40.7484474,
            long: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: '2Empire State Building',
        description: '2One of the most famous sky scrapers in the world',
        location: {
            lat: 40.7484474,
            long: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    }
]

router.get('/:pid', (req,res,next)=>{
    const placeId = req.params.pid;

    const place = DUMMY_PLACES.find(place => place.id === placeId);

    if(!place){
        // return res.status(404).json({message: 'Place not found for provided place id'});
        throw error = new HttpError('Place not found for provided place id', 404);
    }

    res.json({place});
});

router.get('/user/:uid', (req,res,next)=>{
    const userId = req.params.uid;

    const userPlaces = DUMMY_PLACES.filter(userPlace => userPlace.creator === userId);

    if(userPlaces.length === 0){
        // return res.status(404).json({message: 'Place not found for provided user id'});
        next(error = new HttpError('Place not found for provided user id', 404));
    }
    else{
        res.json({userPlaces});
    }
});

module.exports = router;