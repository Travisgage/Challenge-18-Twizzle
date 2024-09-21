const router = require('express').Router();
const {
getUsers,
getSingleUser,
createNewUser,
updateUser,
deleteUser,
addFriend,
deleteFriend
} = require('../../controllers/userController');

// /api/users endpoint to GET all users and create new user
router.route('/').get(getUsers).post(createNewUser);

// /api/users/:userId endpoint to GET a single user and update user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId endpoint to add or delete friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;