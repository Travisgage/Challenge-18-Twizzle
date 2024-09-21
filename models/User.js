const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']},
        thoughts: [ { type: Schema.Types.ObjectId, ref: 'thought'},],
        friends: [{ type: Schema.Types.ObjectId, ref: 'user'},],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual retrieves length friends array to be displayed as friend count
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;