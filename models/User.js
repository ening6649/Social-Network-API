

const {Schema,model,Types}= require('mongoose');
const dataFormat = require ();

const UserSchema = new Schema (
    {
        username: {
            type: String,
            required: 'must enter a user name!',
            trim: true,

        },
        email: {
            type: String,
            required: 'must enter an email',
            validation: 
        }

    }
)