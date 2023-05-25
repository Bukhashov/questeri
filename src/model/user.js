const {Schema, model} = require('mongoose');

const user = new Schema({
    fullName:   {type: String},
    email:      {type: String},
    password:   {type: String},
    city:       {type: String},
    tests:      {type: Array},
    balance:    {type: Number}
});

module.exports = model('users', user);