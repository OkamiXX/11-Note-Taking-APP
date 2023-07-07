// Dependecies for exprss router and the path packages.
const router = require('express').Router();
const path = require('path');

// When notes is selected in the url.
router.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
})

// for root directorie.
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

// For anything else besides /notes.
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

module.exports = router;