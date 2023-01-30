const {Schema, model} = require('mongoose');

const user = new Schema({
    fullName:   {type: String},
    email:      {type: String},
    password:   {type: String},
    city:       {type: String},
});

module.exports = model('users', user);