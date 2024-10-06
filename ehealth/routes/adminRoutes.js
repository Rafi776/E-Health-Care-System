const express = require('express');

const adminController = require('../controller/adminController');
const isAuth = require('../middleware/is-Auth');

const router = express.Router();

router.get('/waiting-doctor',isAuth.isAdmin,adminController.getWaitingDoctor);

router.post('/confirm-doctor',isAuth.isAdmin,adminController.confirmDoctor);
module.exports = router;