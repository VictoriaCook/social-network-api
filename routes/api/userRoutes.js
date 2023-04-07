const router = require('express').Router();

const {
    allUsers, 
    addUser,
    userById, 
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// .../api/users

router.route('/').post(addUser).get(allUsers);

// .../api/users/:id

router.route('/:id').get(userById).put(updateUser);
// .delete(deleteUser);

// .../api/users/:id/friends/:friendId

// router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router; 