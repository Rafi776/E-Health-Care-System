const Doctor = require("../models/doctor");
const Appoinment = require("../models/appoinment");
const Patient = require("../models/patient");
const Prescription = require("../models/prescription");
const { Op } = require("sequelize/dist");

exports.getIndex = (req, res, next) => {
  res.render("index", {
    pageTitle: "Welcome to our hospital",
    patientList: null,
  });
};

exports.postDoctorAppoinment = (req, res, next) => {
  const doctorUserId = req.session.user.id;

  const patientId = req.params.patientId;
  Doctor.findAll({ where: { userId: doctorUserId } })
    .then((doctor) => {
      Patient.findAll({ where: { id: patientId } }).then((patient) => {
        console.log(patient[0]);
        const thisAppoinment = new Appoinment({
          patientId: patient[0].id,
          patientName: patient[0].firstName,
          doctorId: doctor[0].id,
          doctorName: doctor[0].firstName,
          confirmation: true,
          prescripted: false,
        });
        thisAppoinment.save().then((success) => {
          console.log("appoinment done");
          res.redirect("/");
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getMyAppoinment = (req, res, next) => {
  const userId = req.params.patientId;
  Patient.findAll({ where: { id: userId } })
    .then((patient) => {
      const patientId = patient[0].id;
      Appoinment.findAll({ where: { patientId: patientId } }).then(
        (myAppoinment) => {
          res.render("patient/my-appoinment-list", {
            patientId: patientId,
            pageTitle: "MY appoinment list",
            myAppoinment: myAppoinment,
          });
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.seeMyPrescription = (req, res, next) => {
  const appoinmentId = req.params.appoinmentId;

  Prescription.findAll({ where: { appoinmentId: appoinmentId } })
    .then((prescription) => {
      console.log(prescription);
      res.render("patient/view-prescription", {
        pageTitle: "Prescription list for a patient",
        prescription: prescription[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getFindPatient = (req, res, next) => {
  const patientUserName = req.params.patientUserName;

  Patient.findAll({
    where: { userName: { [Op.like]: `%${patientUserName}%` } },
  })
    .then((patients) => {
      res.status(200).json({ patients });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSinglePatient = (req, res, next) => {
  const patientUserName = req.params.patientUserName;

  Patient.findAll({ where: { userName: patientUserName } })
    .then((patient) => {
      const patientId = patient[0].id;
      Appoinment.findAll({ where: { patientId: patientId } }).then(
        (myAppoinment) => {
          res.render("patient/my-appoinment-list", {
            pageTitle: "MY appoinment list",
            myAppoinment: myAppoinment,
            patientId: patientId,
          });
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
