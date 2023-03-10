const testModel = require('../model/test');

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
    getById = async (req, res) => {
        const questeriId = req.body.questeri_id;
        const test = await testModel.find({questeri_id: questeriId});
        
        if(test.length >= 1) {
            res.status(200).send(test);
        } else {
            res.status(400).json({massage: "id is wrong"})
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
        const userId = req.body.user_id;
        const questeriId = req.body.questeri_id;
        const answers = JSON.parse(req.body.answers);

        const tests = await testModel.find({questeri_id: questeriId});
        
        let countСorrectAnswers = 0
        if(tests.length >= 1){
            for(let tst=0; tst < tests.length; tst++){
                for(let ans=0; ans < answers.length; ans++){
                    if(answers[ans].question == tests[tst].question && answers[ans].answer == tests[tst].answer){
                        countСorrectAnswers += 1
                    }
                }
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