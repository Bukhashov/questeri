const chatModel = require('../model/chat');

class Chat {
    add = async (req, res) => {
        const {fullname, massage} = req.body;

        new chatModel({
            fullname: fullname,
            massage: massage
        }).save();

        res.status(200).json({massage: "saved"});
    }
    get = async (req, res) => {
        const allMassage = await chatModel.find({});
        res.status(200).json(allMassage);
    }
}

module.exports = new Chat;