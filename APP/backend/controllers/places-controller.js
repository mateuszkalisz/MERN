const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
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
];

const getPlaceById = (req,res,next)=>{
    const placeId = req.params.pid;

    const place = DUMMY_PLACES.find(place => place.id === placeId);

    if(!place){
        // return res.status(404).json({message: 'Place not found for provided place id'});
        throw error = new HttpError('Place not found for provided place id', 404);
    }

    res.json({place});
};

const getPlaceByUserId = (req,res,next)=>{
    const userId = req.params.uid;

    const userPlaces = DUMMY_PLACES.filter(userPlace => userPlace.creator === userId);

    if(userPlaces.length === 0){
        // return res.status(404).json({message: 'Place not found for provided user id'});
        next(error = new HttpError('Place not found for provided user id', 404));
    }
    else{
        res.json({userPlaces});
    }
};

const createPlace = (req,res,next) =>{
    const {title, description, coordinates, address, creator} = req.body;

    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({place: createdPlace});
};

const updatePlace = (req,res,next) =>{
    const placeId = req.params.pid;

    const {title, description} = req.body;

    const updatedPlace = {...DUMMY_PLACES.find(place => place.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(place => place.id === placeId);

    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});

};

const deletePlace = (req,res,next) =>{

    const placeId = req.params.pid;

    DUMMY_PLACES = DUMMY_PLACES.filter(place => place.id !== placeId);

    res.status(202).json({message: 'Place deleted.'});

};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;