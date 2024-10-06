const express = require('express');
const { check } = require('express-validator');

const User= require('../models/user');
const doctorController = require('../controller/doctorController');
const isAuth = require('../middleware/is-Auth');

const router = express.Router();

router.get('/doctors',doctorController.getAllDoctors);

router.get('/doctor-registration',doctorController.getDoctorRegistration);

router.post('/doctor-registration',[
    check("firstName", "firstName is required!").notEmpty(),
    check('userName', 'please enter a valid userName!').custom((value, { req }) => {
        return User.findAll({ where: { userName: value } }).then((user) => {
            if (user.length > 0) {
                throw new Error("User Name already taken!");
            }
        });
    }),
    check('password', "please enter a password minimum 8 characters long!").isLength({ min: 8 }),
    check('speciality',"speciality can not be empty!!!").notEmpty(),
    check('imagePath',"imagePath can not be empty!!!").notEmpty(),
],doctorController.postDoctorRegistration);


//router.get('/waiting-patient-list',isAuth.isDoctor,doctorController.getWaitingPatientList);

router.get('/patient-confirm/:appoinmentId',isAuth.isDoctor,doctorController.patientAppoinmentConfirm);

router.get('/patient-appoinment-details/:patientId',isAuth.isDoctor,doctorController.getPatientAppoinmentDetails);

router.get('/visitors-patient',isAuth.isDoctor,doctorController.getVisitorsPatient);

router.get('/give-prescription/:appoinmentId' ,isAuth.isDoctor,doctorController.getGivePrescription);

router.post('/give-prescription' , isAuth.isDoctor, doctorController.postGivePrescription);

router.get('/my-patient-history',isAuth.isDoctor,doctorController.getMyPatientHistory);


module.exports = router;