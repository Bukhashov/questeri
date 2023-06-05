const {Schema, model} = require('mongoose');

const chat = new Schema({
    user_id:       {type: String},
    massage:       {type: String},
});

module.exports = model('chats', chat);