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

const getPlaceByUserId = async (req,res,next)=>{
    const userId = req.params.uid;

    // const userPlaces = DUMMY_PLACES.filter(userPlace => userPlace.creator === userId);

    let userPlaces;

    try{
        userPlaces = await Place.find({creator: userId});

    }catch(err){
        const error = new HttpError('Something went wrong, could not find a place for this user',500);
        return next(error);
    }

    if(!userPlaces || userPlaces.length === 0){
        // return res.status(404).json({message: 'Place not found for provided user id'});
        error = new HttpError('Place not found for provided user id', 404);
        return next(error);
    }
    else{
        res.json({userPlaces: userPlaces.map(place => place.toObject({getters: true}))});
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

const updatePlace = async (req,res,next) =>{
    const placeId = req.params.pid;

    const errors = validationResult(req);

    const {title, description} = req.body;

    if (!errors.isEmpty()) {
        const error =  new HttpError('Invalid unputs passed, please check your data.', 422);
        return next(error);
    }

    // const updatedPlace = {...DUMMY_PLACES.find(place => place.id === placeId)};
    // const placeIndex = DUMMY_PLACES.findIndex(place => place.id === placeId);

    let updatedPlace;

    try{
        updatedPlace = await Place.findById(placeId);
    }
    catch(err){
        const error = new HttpError('Something went wrong, could not update place',500);
        return next(error);
    }

    updatedPlace.title = title;
    updatedPlace.description = description;

    try{
        await updatedPlace.save();
    }
    catch(err){
        const error = new HttpError('Something went wrong, could not update place',500);
        return next(error);
    }

    // console.log("przy update typ: " + typeof(updatedPlace));
    res.status(200).json({place: updatedPlace.toObject({getters:true})});

};

const deletePlace = async (req,res,next) =>{

    const placeId = req.params.pid;

    // if(!DUMMY_PLACES.find(place => place.id === placeId)){
    //     throw new HttpError('Could not find a place for that id');
    // }

    // DUMMY_PLACES = DUMMY_PLACES.filter(place => place.id !== placeId);

    let deletedPlace;

    try{
        deletedPlace = await Place.findById(placeId);
        await deletedPlace.remove();
    }
    catch(err){
        const error = new HttpError('Something went wrong, could not delete place');
        return next(error);
    }

    res.status(202).json({message: 'Place deleted.'});

};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;