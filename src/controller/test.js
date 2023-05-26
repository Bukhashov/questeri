const testModel = require('../model/test');
const questeriModel = require('../model/questeri');
const userModel = require('../model/user');

class Tests{
    // post
    add = async (req, res) => {
        const questeriId = req.body.questeri_id;
        const question = req.body.question;
        const option = req.body.option;
        const answer = req.body.answer;

        const newTest = new testModel({
            questeri_id: questeriId,
            question: question,
            option: option,
            answer: answer
        }).save();

        res.status(200).json({massage: "saved"})
    }
    // get
    getAll = async (req, res) => {
        const allTests = await testModel.find({});
        res.status(200).json(allTests);
    }
    // get
    getById = async (req, res) => {
        const { uid, questeriId } = req.body;
        
        const test = await testModel.find({questeri_id: questeriId});
        let control = await userModel.find({_id: uid, tests: questeriId });
        
        if(control.length >= 1) {
            if(test.length >= 1) {
                res.status(200).send(test);
            } else {
                res.status(400).json({massage: "id is wrong"})
            }
        }
        else{
            const questeri = await questeriModel.findById(questeriId);
            const user = await userModel.findById(uid);

            if(user.balance >= questeri.price) {
                let newBall = user.balance - questeri.price;
                let uptest = user.tests;
                uptest.push(String(questeri._id))

                await user.updateOne({ balance:  newBall, tests: uptest});

            }else{
                res.status(200).json({massage: "ballance min"})
            }
            
        }       
    }
    //  method: POST
    //  BODY
    //  user_id     type uid
    //  questeri_id type qid
    //  answers     type []map
    //  [
    //      question:   type string
    //      answer:     type string
    //  ]
    control = async (req, res) => {
        const {userId, questeriId } = req.body.user_id;
        const answers = JSON.parse(req.body.answers);

        const tests = await testModel.find({});
        const user = await userModel.findById(userId);
        
        let countСorrectAnswers = 0;
        
        if(tests.length >= 1){
            for(let tst=0; tst < tests.length; tst++) {
                for(let ans=0; ans < answers.length; ans++){
                    if(answers[ans].question == tests[tst].question && answers[ans].answer == tests[tst].answer){
                        countСorrectAnswers += 1
                    }
                }
            }
            
            if(countСorrectAnswers == tests.length) {
                const q = await questeriModel.findById(questeriId)
                let newball = user.balance + q.award;
                await user.updateOne({balance: newball})

            }
            
            res.status(200).json({ count: countСorrectAnswers});
        }else{
            res.status(400)
        }
    }

    // post
    delete = async (req, res) => {
        
    }
}

module.exports = new Tests