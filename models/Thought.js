

const {Schema,model,Types}= require('mongoose');
const dataFormat = require ();

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'no text!',
            validate: [({ length }) => length <= 280, 'must be between 1 and 280 characters.']
        },
        // user puts this in ?
        username: {
            type: String,
            required: true, 
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
    }
)

const ThoughtSchema = new Schema (
    {
        
        // so user enter this data?
        username: {
            type: String,
            required: 'need a username!'
        },

        thoughtText: {
            type: String,
            required: 'no text!',
            // >=1 && <=280 ??
            validate: [({ length }) => length >= 1, 'must be between 1 and 280 characters.']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        reactions: [ReactionSchema]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

UserSchema.virtual('reactionCount').get(function(){
    return this.reactions.length; 
});

// thought???
const User = model('Thought', ThoughtSchema);

module.exports = User; 