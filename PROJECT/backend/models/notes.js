const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
        title: {type: String, required: true},
        description: {type: String, required: true, minlength: 10},
        category: {type: String, required: true},
        createDate: {type: Date, default: Date.now},
        privacy: {type: Boolean},
        creator: {type: mongoose.Types.ObjectId , required: true, ref: 'User'}
});

module.exports = mongoose.model('Note', noteSchema);