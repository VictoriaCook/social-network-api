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

router.route('/').get(allUsers).post(addUser);

// .../api/users/:id

router.route('/:id').get(userById).delete(deleteUser).put(updateUser);

// .../api/users/:id/friends/:friendId

router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router; 