const questeriModel = require('../model/questeri');
const accessModel = require('../model/access');
const userModle = require('../model/user');

class Questeri {
    getAll = async (req, res) => {
        const questeri = await questeriModel.find({city: 'Karaganda'})
        
        console.log("req all questeri")

        if(questeri.length >= 1) {
            console.log(questeri.length)
            res.status(200).json(questeri)
            
        }else{
            res.status(400).json({massage: "error"})
        }
    }
    getById = async (req, res) => {
        const qid = req.params.id;
        const uid = req.params.userid;
        
        const access = await accessModel.find({questeri_id: qid, user_id: uid});
        const user = await userModle.findById(uid);
        const questeri = await questeriModel.findById(qid);
        
        if(questeri) {
            let bal = user.balance;
            
            if(access.length < 1) {
                if(bal >= questeri.price) {
                    bal = bal - questeri.price;
                }else {
                    res.status(400).json({massage: "ballace not "}) 
                }
    
                const newAccess = new accessModel({
                   questeri_id: qid,
                   user_id: uid 
                })
                newAccess.save();
            
            
            res.status(200).json({data: questeri, 
                balance: ""
            });

        
        } 
        else {
            res.status(400).json({massage: "id is wrong"})
            return
        }
        }
    }
    add = async (req, res) => {
        const title = req.body.title;
        const description = req.body.description;
        const imgPath = req.body.imgPath;
        const tag = req.body.tag;
        const city = req.body.city;
        const map = req.body.map;
        const price = req.body.price;
        const award = req.body.award;


        const newQuesteri = new questeriModel({
            title: title,
            description: description,
            imgPath: imgPath,
            tag: tag,
            city: city,
            price: price,
            award: award,
            map: {
                x: map.x,
                y: map.y
            }
        }).save()

        res.status(200).json({massage: "saved"})
    }
}

module.exports = new Questeri