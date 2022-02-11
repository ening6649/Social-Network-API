const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  createThought,
  addReaction,
  updateThought,
  removeThought,
  removeReaction,
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThought)

router
  .route('/:userId')
  .post(createThought)

router.route('/:thoughtId').get(getThoughtById)

router
  .route('/:userId/:thoughtId')
  .put(updateThought)
  .delete(removeThought)
  // .post(addReaction)


  // http://localhost:3001/api/thoughts/61fec4bbf2e01132cb9d6e55/reactions
router.route('/:thoughtId/reactions').post(addReaction)

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;