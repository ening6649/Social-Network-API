const router = require('express').Router();

// import the functionality and hook it up with the routes
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');


router
  .route('/')
  .get(getAllUser)
  .post(createUser);


router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
