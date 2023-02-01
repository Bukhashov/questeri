const {Schema, model} = require('mongoose');

const save = new Schema({
    questeri_id:   {type: String},
    user_id:       {type: String},
});

module.exports = model('saved', save);