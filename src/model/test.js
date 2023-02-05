const {Schema, model} = require('mongoose');

const test = new Schema({
    questeri_id:    {type: String},
    question:       {type: String},
    option:         {type: Array},
    answer:         {type: String}
});

module.exports = model('tests', test);