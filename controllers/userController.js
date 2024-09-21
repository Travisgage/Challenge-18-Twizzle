const { User, Thought } = require('../models');

module.exports = {
    // GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },
    
    // GET a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // CREATE a new user
    async createNewUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json({user, message: 'New user created!' });
        } catch (error) {
            res.status(500).json({error, message: 'Server error.' });
            console.error(error);
        }
    },

    // Update existing user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({_id: req.params.userId}, req.body, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            res.status(200).json({ user, message: 'User updated!' });
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // DELETE user (also deletes user's thoughts array)
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            const { deletedThoughts } = await Thought.deleteMany({ username: user.username });
            if (deletedThoughts === 0) {
                return res.status(200).json({ message: 'User deleted.  No thoughts to delete.' });
            }
            res.status(200).json({ message: 'User deleted. All user thoughts have also been deleted.' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Add new friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: {friends: req.params.friendId }}, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            res.status(200).json({user, message: 'Added friend!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // DELETE existing friend
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: {friends: req.params.friendId }}, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            res.status(200).json({user, message: 'Deleted friend!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error' });
            console.error(error);
        }
    }
};