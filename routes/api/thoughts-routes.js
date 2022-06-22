//set up code for express.js
const router = require('express').Router();

//import functionality and hook it up with the routes
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller')

//set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

//set up GET one, PUT, and DELETE at /api/thoughts/:id
router
    .route('/:id')
    .route('getThoughtById')
    .route('updateThought')
    .route('deleteThought');

module.exports = router;