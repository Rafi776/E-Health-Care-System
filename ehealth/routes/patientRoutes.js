const express = require('express');

const patientController = require('../controller/patientController');
const isAuth = require('../middleware/is-Auth');

const router = express.Router();

router.get('/',patientController.getIndex);

router.get('/doctor-appoinment/:patientId',isAuth.isDoctor,patientController.postDoctorAppoinment);

router.get('/appoinment-list/:patientId',patientController.getMyAppoinment);

router.get('/see-prescription/:appoinmentId',isAuth.isAuthenticated,patientController.seeMyPrescription);

router.get('/patient/find/:patientUserName',isAuth.isDoctor,patientController.getFindPatient);

router.get('/patient/view/:patientUserName',isAuth.isDoctor,patientController.getSinglePatient);

module.exports = router;