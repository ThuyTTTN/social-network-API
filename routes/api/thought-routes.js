//set up code for express.js
const router = require('express').Router();

//import functionality and hook it up with the routes
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller')

//set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThought)
    

//set up GET one, PUT, and DELETE at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .post(createThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/thoughtId/reactions
router
.route('/:thoughtId')
.post(addReaction);

router
.route('/:thoughtId/:reactionId')
.delete(removeReaction);

module.exports = router;