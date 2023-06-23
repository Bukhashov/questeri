const {Schema, model} = require('mongoose');

const chat = new Schema({
    fullname:       {type: String},
    massage:       {type: String},
});

module.exports = model('chats', chat);