const {Schema, model} = require('mongoose');

const access = new Schema({
    questeri_id:   {type: String},
    user_id:       {type: String},
});

module.exports = model('access', access);