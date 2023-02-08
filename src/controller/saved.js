const savedModel = require('../model/saved');
const questeriModel = require('../model/questeri');

class Saved{
    getAll = async (req, res) => {
        const user_id = req.body.user_id;
        const allSavedById = await savedModel.find({user_id: user_id})

        console.log(allSavedById)
        let savedQuesteri = []
        if (allSavedById.length >= 1) {            
            for(let i = 0; i < allSavedById.length; i++) {
                let questeri = await questeriModel.findById(allSavedById[i].questeri_id)
                savedQuesteri.push(questeri)
                console.log(savedQuesteri)
            }

            res.status(200).json(savedQuesteri)
        }
    }
    add = async (req, res) => {
        const questeri_id = req.body.questeri_id;
        const user_id = req.body.user_id;

        const controllerSaved = await savedModel.find({user_id: user_id, questeri_id: questeri_id})

        if(controllerSaved.length == 0) {
            const newSaved = new savedModel({
                questeri_id: questeri_id,
                user_id: user_id
            }).save()

            res.status(200).json({massage: "saved"})
        }else{
            res.status(400).json({massage: "this questeri saved"})
        }

    }
    delete = async (req, res) => {
        const questeri_id = req.body.questeri_id;
        const user_id = req.body.user_id;
        const reqq = await savedModel.deleteOne({user_id: user_id, questeri_id: questeri_id})
        if(reqq.deletedCount == 1){
            res.status(200).json({massage: "deleted"})
        }
        else {
            res.status(400)
        }
    }
}

module.exports = new Saved