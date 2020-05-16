const express = require('express');
const {check} = require('express-validator');
const {getAllNotes, getSelectedNote, getUserNotes, createNewNote, updateNote, deleteNote, findNoteByContent} = require('../controllers/notes-controllers');

const router = express.Router();

router.get('/', getAllNotes);

router.get('/notes/:noteId', getSelectedNote);

router.get('/user/:userId/notes', getUserNotes);

router.get('/team/user/:userId', getUserNotes);

router.get('/notes', findNoteByContent);

router.post('/note/new', [
    check('title').not().isEmpty(),
    check('description').isLength({min: 10})
], createNewNote);

router.patch('/notes/:noteId/update', [
    check('title').not().isEmpty(),
    check('description').isLength({min: 10})
], updateNote);

router.delete('/notes/:noteId', deleteNote);

module.exports = router;