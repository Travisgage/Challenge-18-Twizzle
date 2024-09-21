const { Thought, User } = require('../models');

module.exports = {
    // GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // GET single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found.' });
            }
            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // CREATE new thought
    async newThought(req, res) {
        try {
            // Find ID asscociated with username 
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json({ message: 'User cannot be found' });
            }
            const thought = await Thought.create(req.body);
            // Find user and update with newly created thought
            await User.findByIdAndUpdate( user._id , { $addToSet: { thoughts: thought._id }}, { new: true });

            res.status(200).json({thought, message: 'New thought posted!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Update existing thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId}, req.body, { new: true });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found.' });
            }
            res.status(200).json({thought, message: 'Thought updated!' });
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // DELETE thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found.' });
            }
            // Remove thought (by ID) from user's thought array
            const user = await User.findOneAndUpdate({ username: thought.username }, { $pull: {thoughts: req.params.thoughtId }}, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'Cannot find thought to delete.' });
            }
            res.status(200).json({ message: 'Thought deleted!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // CREATE reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body }}, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found.' });
            }
            res.status(200).json({ thought, message: 'Reaction added successfully!' });
        } catch(error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },
    // DELETE reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {$pull: { reactions: {_id: req.params.reactionId}}}, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found..' });
            }
            res.status(200).json({ thought, message: 'Reaction successfully deleted.' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    }
};