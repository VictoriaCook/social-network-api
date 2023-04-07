const router = require('express').Router();

const {
    addThought,
    allThoughts,
    thoughtById, 
    updateThought,
    deleteThought,
    addReaction, 
    deleteReaction
} = require('../../controllers/thoughtController');

// .../api/thoughts

router.route('/').get(allThoughts).post(addThought);

// .../api/thoughts/:id

router.route('/:id').get(thoughtById).put(updateThought).delete(deleteThought);

// .../api/thoughts/:id/reactions

router.route('/:thoughtId/reactions').post(addReaction);

// .../api/thoughts/:id/reactions/:reactionId

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;