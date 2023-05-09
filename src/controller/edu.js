const eduModel = require('../model/edu');

class Edu {
    get = async (req, res) => {
        const allEdu = await eduModel.find({}, {name: 1, icon: 1});
        res.status(200).json(allEdu);
    }
    getByID = async (req, res) => {
        const eduId = req.params.id;
        const edu = await eduModel.findById(eduId);

        if(edu) { 
            res.status(200).json(edu);
        }
        else{
            res.status(400).json({message: "bad request"});
        }
    }
    add = async (req, res) => {
        const {
            name, 
            type,
            icon, 
            img,
            city,
            year,
            student,
            description,
            url,
            instagram
        } = req.body;

        new eduModel({
            name: name,
            type: type,
            icon: icon,
            img: img,
            city: city,
            year: year,
            student: student,
            url: url,
            instagram: instagram,
            description: description
        }).save();

        res.status(201).json({message: "saved"});
    }
}

module.exports = new Edu;