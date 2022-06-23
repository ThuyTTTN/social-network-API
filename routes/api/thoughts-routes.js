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
    .put(addReaction)
    .delete(deleteThought);

//DELETE route to handle removeReaction
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;