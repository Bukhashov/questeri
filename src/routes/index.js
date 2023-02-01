const {Router} = require('express');
const router = Router();

const Auth = require('../controller/auth');
const Questeri = require('../controller/questeri');
const Saved = require('../controller/saved');
// auth
router.post('/singin', Auth.singin);
router.post('/singup', Auth.singup);

router.get('/questeri/get/all', Questeri.getAll);
router.get('/questeri/get/:id', Questeri.getById);
router.post('/questeri/add', Questeri.add);

router.post('/saved/all', Saved.getAll)
router.post('/saved/add', Saved.add)
router.post('/saved/delete', Saved.delete)

module.exports = router