const { v4: uuidv4 } = require('uuid');
const {DUMMY_NOTES} = require('../util/dummyData');
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');

exports.getAllNotes = (req,res,next) =>{
    const notes = DUMMY_NOTES;

    if(notes.length === 0){
      next(new HttpError('Could not find a notes for this user id', 404));
    }

    res.json({notes});
};

exports.getSelectedNote = (req,res,next)=>{
    const noteId = req.params.noteId;

    const note = DUMMY_NOTES.find(n => n.id.toString() === noteId);

    if(!note){
        // res.status(404).json({message: 'Could not find note for the provided id'});
        // next(error);
        const error = new HttpError('Could not find a notes for this user id', 404)
        next(error);
    }

    res.json({note});
};

exports.getUserNotes = (req,res,next)=>{
    const userId = req.params.userId;
    const notes = DUMMY_NOTES.filter(n => n.creatorId.toString() === userId);

    if(notes.length === 0){
        throw new HttpError('Could not find a notes for this user id', 404);
    }

    res.json({notes});
};

exports.createNewNote = (req,res,next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const {title, description, category, creator, privacy} = req.body;

    const createdNote = {
        id: uuidv4(),
        title,
        description,
        category,
        creator,
        privacy,
        createDate: new Date().toLocaleDateString()
    };

    DUMMY_NOTES.push(createdNote);

    res.status(201).json({createdNote});
};

exports.updateNote = (req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const noteId = req.params.noteId;
    const {title, description, privacy} = req.body;

    const updatedNote = DUMMY_NOTES.find(note => note.id.toString() === noteId.toString());

    if(!updatedNote){
        const error = new HttpError('Could not find a note for this note id', 404)
        next(error);
    };

    const noteIndex = DUMMY_NOTES.findIndex(note => note.id.toString() === noteId);

    updatedNote.title = title;
    updatedNote.description = description;
    updatedNote.privacy = privacy;
    updatedNote.updatedDate = new Date().toLocaleDateString();


    DUMMY_NOTES[noteIndex] = updatedNote;

    res.status(200).json({updatedNote});
};

exports.deleteNote = (req,res,next) =>{
    const noteId = req.params.noteId;
    const deletedNote = DUMMY_NOTES.find(note => note.id.toString() === noteId.toString());

    if(!deletedNote){
        const error = new HttpError('Could not find a note for this note id', 404)
        next(error);
    };

    const noteIndex = DUMMY_NOTES.findIndex(note => note.id.toString() === noteId);

    DUMMY_NOTES.splice(noteIndex, 1);

    res.status(200).json(`${deletedNote.title} has been successfully deleted`);
};

exports.findNoteByContent = (req,res,next) =>{
    const {content} = req.query;

    const selectedNotes = DUMMY_NOTES.filter(note => note.description.toLowerCase().includes(content.toLowerCase()));

    res.json({selectedNotes});
}