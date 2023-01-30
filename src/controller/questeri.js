const questeriModel = require('../model/questeri');

class Questeri {
    getAll = async (req, res) => {
        const questeri = await questeriModel.find({city: 'Karaganda'})
        
        if(questeri.length >= 1) {
            res.status(200).json(questeri)
        }else{
            res.status(400).json({massage: "error"})
        }
    }
    getById = async (req, res) => {
        const qid = req.params.id;
        const questeri = await questeriModel.findById(qid)
                
        if(questeri) {
            res.status(200).send(questeri);
        } else {
            res.status(400).json({massage: "id is wrong"})
        }
    }
    add = async (req, res) => {
        const title = req.body.title;
        const description = req.body.description;
        const imgPath = req.body.imgPath;
        const tag = req.body.tag;
        const city = req.body.city;
        const map = req.body.map;

        const newQuesteri = new questeriModel({
            title: title,
            description: description,
            imgPath: imgPath,
            tag: tag,
            city: city,
            map: {
                x: map.x,
                y: map.y
            }
        }).save()

        res.status(200).json({massage: "saved"})
    }
}

module.exports = new Questeri