const router = require('express').Router();

const {
    allThoughts,
    createThought,
    thoughtById, 
    updateThought,
    deleteThought,
    createReaction, 
    deleteReaction
} = require('../../controllers/thoughtController');

// .../api/thoughts

router.route('/').get(allThoughts).post(createThought);

// .../api/thoughts/:id

router.route('/:id').get(thoughtById).put(updateThought).delete(deleteThought);

// .../api/thoughts/:id/reactions

router.route('/:thoughtId/reactions').post(createReaction)

// .../api/thoughts/:id/reactions/:reactionId

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;