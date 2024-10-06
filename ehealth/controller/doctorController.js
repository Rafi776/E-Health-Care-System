const brypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const DoctorWaiting = require("../models/doctorWaiting");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Appoinment = require("../models/appoinment");
const Prescription = require("../models/prescription");

exports.getAllDoctors = (req, res, next) => {
  Doctor.findAll()
    .then((doctors) => {
      res.render("doctor/all-doctors", {
        pageTitle: "All the doctors in our hospital",
        doctors: doctors,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDoctorRegistration = (req, res, next) => {
  res.render("auth/doctor-registration", {
    pageTitle: "hi doctor .. please register",
    firstNameErr: "",
    userNameErr: "",
    passwordErr: "",
    specialityErr: "",
    imagePathErr: "",
  });
};

exports.postDoctorRegistration = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());

  if (!errors.isEmpty()) {
    return res.render("auth/doctor-registration", {
      pageTitle: "Please enter valid information",
      firstNameErr: errors.array().find((e) => e.param == "firstName")
        ? errors.array().find((e) => e.param == "firstName").msg
        : "",
      userNameErr: errors.array().find((e) => e.param == "userName")
        ? errors.array().find((e) => e.param == "userName").msg
        : "",
      passwordErr: errors.array().find((e) => e.param == "password")
        ? errors.array().find((e) => e.param == "password").msg
        : "",
      specialityErr: errors.array().find((e) => e.param == "speciality")
        ? errors.array().find((e) => e.param == "speciality").msg
        : "",
      imagePathErr: errors.array().find((e) => e.param == "imagePath")
        ? errors.array().find((e) => e.param == "imagePath").msg
        : "",
    });
  }

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const tempPassword = req.body.password;
  const speciality = req.body.speciality;
  const imagePath = req.body.imagePath;

  brypt
    .hash(tempPassword, 12)
    .then((encryptedPassword) => {
      const thisDoctorWaiting = new DoctorWaiting({
        firstName: firstName,
        lastName: lastName,
        imagePath: imagePath,
        userName: userName,
        password: encryptedPassword,
        speciality: speciality,
      });

      thisDoctorWaiting.save().then((success) => {
        console.log("SUccessfully in the waiting list");
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


/*
exports.getWaitingPatientList = (req, res, next) => {
  const userId = req.session.user.id;

  Doctor.findAll({ where: { userId: userId } })
    .then((doctor) => {
      const doctorId = doctor[0].id;

      Appoinment.findAll({
        where: { doctorId: doctorId, confirmation: false },
      }).then((waitingPatientList) => {
        res.render("doctor/waiting-patient-list", {
          pageTitle: "waiting list",
          waitingPatientList: waitingPatientList,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
*/



exports.patientAppoinmentConfirm = (req, res, next) => {
  const userId = req.session.user.id;
  const appoinmentId = req.params.appoinmentId;

  Appoinment.findAll({ where: { id: appoinmentId } })
    .then((appoinment) => {
      Doctor.findAll({ where: { userId: userId } }).then((doctor) => {
        if (doctor[0].id !== appoinment[0].doctorId) {
          return res.render("/login", {
            pageTitle: "Hack attempted",
          });
        }
      });

      appoinment[0].confirmation = true;
      appoinment[0].save().then((success) => {
        console.log("confirmed patient");
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getPatientAppoinmentDetails = (req, res, next) => {
  const patientId = req.params.patientId;
  Appoinment.findAll({ where: { patientId: patientId } })
    .then((myAppoinment) => {
      res.render("patient/my-appoinment-list", {
        pageTitle: "Patient appoinment list",
        myAppoinment: myAppoinment,
        patientId:patientId,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getVisitorsPatient = (req, res, next) => {
  const userId = req.session.user.id;

  Doctor.findAll({ where: { userId: userId } })
    .then((doctor) => {
      const doctorId = doctor[0].id;
      Appoinment.findAll({
        where: { doctorId: doctorId, confirmation: true, prescripted: false},
      }).then((appoinments) => {
        return res.render("doctor/visitors", {
          pageTitle: "Visitors",
          appoinments: appoinments,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getGivePrescription = (req, res, next) => {
  const appoinmentId = req.params.appoinmentId;
  res.render("doctor/give-prescription", {
    pageTitle: "GIve prescription to this user",
    appoinmentId: appoinmentId,
  });
};

exports.postGivePrescription = (req, res, next) => {
  const appoinmentId = req.body.appoinmentId;

  const drugsName = req.body.drugsName;

  console.log(drugsName);

  Appoinment.findAll({ where: { id: appoinmentId } })
    .then((appoinment) => {
      appoinment[0]
        .createPrescription({
          drugsName: drugsName,
        })
        .then((success) => {
          console.log("prescription save");
          appoinment[0].prescripted = true;
          appoinment[0].save().then((success) => {
            res.redirect("/");
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.getMyPatientHistory =(req,res,next)=>{
  const userId = req.session.user.id;

  Doctor.findAll({where:{userId:userId}}).then((doctor)=>{
    Appoinment.findAll({where:{doctorId:doctor[0].id,prescripted:true}}).then((appoinments)=>{
      res.render('doctor/patientHistory',{
        pageTitle:"My patient history",
        myAppoinment:appoinments,
      });
    });
  }).catch((err)=>{
    console.log(err);
  })
};
