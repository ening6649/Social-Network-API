

const {Schema,model,Types}= require('mongoose');
const dataFormat = require ();

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: 'no text!',

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }

    }
)