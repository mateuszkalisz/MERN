const express = require('express');
const {getAllNotes, getSelectedNote, getUserNotes, createNewNote, updateNote, deleteNote, findNoteByContent} = require('../controllers/notes-controllers');

const router = express.Router();

router.get('/', getAllNotes);

router.get('/notes/:noteId', getSelectedNote);

router.get('/user/:userId/notes', getUserNotes);

router.get('/team/user/:userId', getUserNotes);

router.get('/notes', findNoteByContent);

router.post('/note/new', createNewNote);

router.patch('/notes/:noteId/update', updateNote);

router.delete('/notes/:noteId', deleteNote);

module.exports = router;