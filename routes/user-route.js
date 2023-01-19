const express = require('express');
const router = express.Router();

const usertask = require('../controller/user-controller');

router.get('/',usertask.getallusers);

router.post('/signup',usertask.signup);

router.post("/login",usertask.login);

module.exports = router;