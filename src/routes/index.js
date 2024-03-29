// Роутерлер тізімі 
const {Router} = require('express');
const router = Router();

// Роутерлерді орындайтын класстар мен функияларды шақырады
const Auth = require('../controller/auth');
const Questeri = require('../controller/questeri');
const Saved = require('../controller/saved');
const Test = require('../controller/test');
const Edu = require('../controller/edu');
const Chat = require('../controller/chat');

// auth қолданушымен жұмыс жасау үшін
router.post('/singin', Auth.singin);
router.post('/singup', Auth.singup);
router.get('/ballance/:id', Auth.getBallance);


router.get('/questeri/get/:city/all', Questeri.getAll);
router.get('/questeri/get/:id', Questeri.getById);
router.post('/questeri/add', Questeri.add);

router.get('/edu/get/all', Edu.get);
router.get('/edu/get/:id', Edu.getByID);
router.post('/edu/add', Edu.add);

router.post('/saved/get/', Saved.getAll);
router.post('/saved/add', Saved.add);
router.post('/saved/delete', Saved.delete);
router.post('/saved/control', Saved.control);

router.get('/test/get/all', Test.getAll);
router.post('/test/get', Test.getById)
router.post('/test/control', Test.control)
router.post('/test/add', Test.add)
router.post('/test/delete', Test.delete);

router.get('/chat/all', Chat.get);
router.post('/chat/add', Chat.add);

module.exports = router