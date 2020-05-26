const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const Note = require('../models/notes');
const User = require('../models/users');

exports.getAllNotes = async (req,res,next) =>{

    let notes;

    try{
        notes = await Note.find({});
    }
    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }
    

    if(notes.length === 0){
      next(new HttpError('Could not find a notes for this user id', 404));
    }

    res.json({notes: notes.map(note => note.toObject({getters: true}))});
};

exports.getSelectedNote = async (req,res,next)=>{
    const noteId = req.params.noteId;

    let note;

    try{
        note = await Note.findById(noteId);
    }
    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }
    

    if(!note){
        const error = new HttpError('Could not find a notes for this user id', 404)
        return next(error);
    }

    res.json({note: note.toObject({getters: true})});
};

exports.getUserNotes = async (req,res,next)=>{
    const userId = req.params.userId;

    let notes;

    try{
        notes = await Note.find({creator: userId})
    }
    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }

    if(notes.length === 0){
        const error = new HttpError('Could not find a notes for this user id', 404);
        return next(error);
    }

    res.json({notes: notes.map(note => note.toObject({getters: true}))});
};

exports.createNewNote = async (req,res,next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const {title, description, category, creator, privacy} = req.body;

    const createdNote = new Note({
      title,
      description,
      category,
      creator,
      privacy,
      createDate: new Date()
    });

    let user;

    try{
        user = await User.findById(creator);
    }
    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }

    if(!user){
        const error = new HttpError('We could not find the user for the provided id');
        return next(error);
    }

    try{

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdNote.save({session: sess});
        user.notes.push(createdNote);
        await user.save({session: sess});
        sess.commitTransaction();

    }
    catch (err){
        const error = new HttpError(err, 500)
        return next(error);
    }

    res.status(201).json({createdNote: createdNote.toObject({getters: true})});
};

exports.updateNote = async (req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const noteId = req.params.noteId;
    const {title, description, privacy} = req.body;

    let updatedNote;

    try{
        updatedNote = await Note.findById(noteId);
    }
    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }


    if(!updatedNote){
        const error = new HttpError('Could not find a note for this note id', 404)
        next(error);
    };

    updatedNote.title = title;
    updatedNote.description = description;
    updatedNote.privacy = privacy;
    updatedNote.updatedDate = new Date().toLocaleDateString();

    try{
        await updatedNote.save();
    }
    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }

    res.status(200).json({updatedNote: updatedNote.toObject({getters: true})});
};

exports.deleteNote = async (req,res,next) =>{
    const noteId = req.params.noteId;

    let deletedNote;

    try{
        deletedNote = await Note.findById(noteId).populate('creator');
    }
    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }

    if(!deletedNote){
        const error = new HttpError('Could not find a note for this note id', 404)
        next(error);
    };

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await deletedNote.remove({session: sess});
        deletedNote.creator.notes.pull(deletedNote);
        await deletedNote.creator.save({session: sess});
        sess.commitTransaction();
    }

    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }

    res.status(200).json(`${deletedNote.title} has been successfully deleted`);
};

exports.findNoteByContent = async (req,res,next) =>{
    const {description} = req.query;

    let selectedNotes;

    try{
        selectedNotes = await Note.find({
            "description": { "$regex": description, "$options": "i" }
        });    
    }
    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }
    
    res.json({selectedNotes: selectedNotes.map(note => note.toObject({getters: true}))});
}