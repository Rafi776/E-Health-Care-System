const express = require('express');
const { check } = require('express-validator');

const User = require('../models/user');

const authController = require('../controller/authController');
const isAuth = require('../middleware/is-Auth');

const router = express.Router();

router.get('/registration', isAuth.isDoctor,  authController.getRegistration);

router.post('/registration', [
    check("firstName", "firstName is required!").notEmpty(),
    check('userName', 'Please enter a valid userName!').custom((value, { req }) => {
        return User.findAll({ where: { userName: value } }).then((user) => {
            if (user.length > 0) {
                throw new Error("User Name already taken!");
            }
        });
    }),
], authController.postRegistration);


router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    check("userName", "please enter valid userName").notEmpty(),
    check("password", "password is required").notEmpty(),
  ],
  authController.postLogin
);

router.get('/logout',authController.getLogout);


module.exports = router;

