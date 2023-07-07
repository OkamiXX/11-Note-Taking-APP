// Dependencies
const router = require('express').Router();
const notesAlgorithm = require('../helpers/dbHelper');

// GET request to retrive notes.
router.get('/notes', function (req, res) {
    notesAlgorithm
        .getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

// POST request to add new notes.
router.post('/notes', (req, res) => {
    notesAlgorithm
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});


// DELETE requeest to delete previus notes.
router.delete('/notes/:id', function (req, res) {
    notesAlgorithm
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err));
});


module.exports = router;