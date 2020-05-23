const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true, minlength: 8},
    email: {type: String, required: true, unique: true},
    team: {type: String, required: true},
    notes:  [{type: mongoose.Types.ObjectId , required: true, ref: 'Note'}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);