const {Schema, model} = require('mongoose');

const access = new Schema({
    name:           {type: String},
    type:           {type: String},
    icon:           {type: String},
    img:            {type: String},
    city:           {type: String},
    year:           {type: String},
    student:        {type: String},
    description:    {type: String},
    url:            {type: String},
    instagram:      {type: String}
});

module.exports = model('edu', access);