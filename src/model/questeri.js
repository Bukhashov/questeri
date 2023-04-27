const {Schema, model} = require('mongoose');

const questeri = new Schema({
    title:          {type: String},
    description:    {type: String},
    imgPath:        {type: Array},
    tag:            {type: String},
    city:           {type: String},
    price:          {type: Number},
    award:          {type: Number},
    map: {
        x: {type: Number},
        y: {type: Number}
    }    
});

module.exports = model('questeri', questeri);