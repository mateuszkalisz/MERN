const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');

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

const getPlaceById = async (req,res,next)=>{
    const placeId = req.params.pid;

    // const place = DUMMY_PLACES.find(place => place.id === placeId);
    let place;
    
    try{
        place = await Place.findById(placeId);
    }
    catch(err){
        const error = new HttpError('Something went wrong, could not find a place',500);
        return next(error);
    };

    if(!place){
        // return res.status(404).json({message: 'Place not found for provided place id'});
        const error = new HttpError('Place not found for provided place id', 404);
        return next(error);
    }

    res.json({place: place.toObject({getters: true})});
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

const createPlace = async (req,res,next) =>{

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        next(new HttpError('Invalid unputs passed, please check your data.', 422));
        // return res.status(422).json({ errors: errors.array() });
    }

    const {title, description, address, creator, coordinates} = req.body;

    // let coordinates;

    // try{
    //     coordinates = await getCoordsForAddress(address);
    // } catch (error){
    //     next(error);
    // }

    // if(coordinates === undefined || coordinates === null || !coordinates){
    //     coordinates = {
    //         lat: 40.7484474,
    //         long: -73.9871516
    //     };
    // };

    // console.log(coordinates);

    const createdPlace = new Place({
        title,
        description,
        location: coordinates,
        address,
        image: 'https://static.toiimg.com/photo/48885654/.jpg',
        creator
    });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

    res.status(201).json({place: createdPlace});
};

const updatePlace = (req,res,next) =>{
    const placeId = req.params.pid;

    const errors = validationResult(req);

    const {title, description} = req.body;

    if (!errors.isEmpty()) {
        throw new HttpError('Invalid unputs passed, please check your data.', 422);
    }

    const updatedPlace = {...DUMMY_PLACES.find(place => place.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(place => place.id === placeId);

    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});

};

const deletePlace = (req,res,next) =>{

    const placeId = req.params.pid;

    if(!DUMMY_PLACES.find(place => place.id === placeId)){
        throw new HttpError('Could not find a place for that id');
    }

    DUMMY_PLACES = DUMMY_PLACES.filter(place => place.id !== placeId);

    res.status(202).json({message: 'Place deleted.'});

};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;