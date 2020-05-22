const { v4: uuidv4 } = require('uuid');
const {DUMMY_NOTES} = require('../util/dummyData');
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const Note = require('../models/notes');

exports.getAllNotes = async (req,res,next) =>{
    // const notes = DUMMY_NOTES;

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

    // const note = DUMMY_NOTES.find(n => n.id.toString() === noteId);
    let note;

    try{
        note = await Note.findById(noteId);
    }
    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }
    

    if(!note){
        // res.status(404).json({message: 'Could not find note for the provided id'});
        // next(error);
        const error = new HttpError('Could not find a notes for this user id', 404)
        return next(error);
    }

    res.json({note: note.toObject({getters: true})});
};

exports.getUserNotes = async (req,res,next)=>{
    const userId = req.params.userId;
    // const notes = DUMMY_NOTES.filter(n => n.creatorId.toString() === userId);

    let notes;

    try{
        notes = await Note.find({creator: userId})
    }
    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }

    if(notes.length === 0){
        throw new HttpError('Could not find a notes for this user id', 404);
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

    try{
        await createdNote.save();
    }
    catch (err){
        // const error = new HttpError(err, 500)
        const error = new HttpError('Something went wrong... please try again.', 500)
        return next(error);
    }

    // const createdNote = {
    //     id: uuidv4(),
    //     title,
    //     description,
    //     category,
    //     creator,
    //     privacy,
    //     createDate: new Date().toLocaleString()
    // };

    // DUMMY_NOTES.push(createdNote);

    res.status(201).json({createdNote});
};

exports.updateNote = async (req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const noteId = req.params.noteId;
    const {title, description, privacy} = req.body;

    // const updatedNote = DUMMY_NOTES.find(note => note.id.toString() === noteId.toString());

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

    // const noteIndex = DUMMY_NOTES.findIndex(note => note.id.toString() === noteId);

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

    // DUMMY_NOTES[noteIndex] = updatedNote;

    res.status(200).json({updatedNote: updatedNote.toObject({getters: true})});
};

exports.deleteNote = async (req,res,next) =>{
    const noteId = req.params.noteId;

    let deletedNote;

    try{
        deletedNote = await Note.findById(noteId);
    }
    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }

    // const deletedNote = DUMMY_NOTES.find(note => note.id.toString() === noteId.toString());

    if(!deletedNote){
        const error = new HttpError('Could not find a note for this note id', 404)
        next(error);
    };

    // const noteIndex = DUMMY_NOTES.findIndex(note => note.id.toString() === noteId);

    // DUMMY_NOTES.splice(noteIndex, 1);

    try{
        await deletedNote.remove();
    }

    catch(err){
        const error = new HttpError(err, 500);
        return next(error);
    }

    res.status(200).json(`${deletedNote.title} has been successfully deleted`);
};

exports.findNoteByContent = async (req,res,next) =>{
    const {description} = req.query;

    // const selectedNotes = DUMMY_NOTES.filter(note => note.description.toLowerCase().includes(content.toLowerCase()));

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