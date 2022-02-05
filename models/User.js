

const {Schema, model ,Types}= require('mongoose');
// const dataFormat = require ();

const UserSchema = new Schema (
    {
        username: {
            type: String,
            required: 'must enter a user name!',
            unique: true,
            trim: true,
            
        },
        email: {
            type: String,
            required: 'must enter an email',
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length; 
});

// random name givenn to the model parameter
const User = model('User', UserSchema);

module.exports = User; 