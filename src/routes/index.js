const {Router} = require('express');
const router = Router();

const Auth = require('../controller/auth');
const Questeri = require('../controller/questeri');

// auth
router.post('/singin', Auth.singin);
router.post('/singup', Auth.singup);

router.get('/questeri/get/all', Questeri.getAll);
router.get('/questeri/get/:id', Questeri.getById);
router.post('/questeri/add', Questeri.add);

module.exports = router