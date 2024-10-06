const { validationResult } = require("express-validator");
const bcypt = require("bcryptjs");

const Patient = require("../models/patient");
const User = require("../models/user");

exports.getRegistration = (req, res, next) => {
  res.render("auth/registration", {
    pageTitle: "Register as a patient",
    firstNameErr: "",
    userNameErr: "",
    passwordErr: "",
  });
};

exports.postRegistration = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());

  if (!errors.isEmpty()) {
    return res.render("auth/registration", {
      pageTitle: "Please enter valid information",
      firstNameErr: errors.array().find((e) => e.param == "firstName")
        ? errors.array().find((e) => e.param == "firstName").msg
        : "",
      userNameErr: errors.array().find((e) => e.param == "userName")
        ? errors.array().find((e) => e.param == "userName").msg
        : "",
    });
  }

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;

  const tempPatient = new Patient({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
  });

  tempPatient
    .save()
    .then((success) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login to our hospital",
    userNameErr: "",
    passwordErr: "",
  });
};

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("auth/login", {
      pageTitle: "login to our hospital",
      userNameErr: errors.array().find((e) => e.param == "userName")
        ? errors.array().find((e) => e.param == "userName").msg
        : "",
      passwordErr: errors.array().find((e) => e.param == "password")
        ? errors.array().find((e) => e.param == "password").msg
        : "",
    });
  }

  const userName = req.body.userName;
  const password = req.body.password;

  User.findAll({ where: { userName: userName } })
    .then((user) => {
      if (user.length > 0) {
        bcypt.compare(password, user[0].password).then((doMatch) => {
          if (doMatch) {
            req.session.user = user[0];
            console.log(user[0]);
            req.session.save(() => {
              res.redirect("/");
            });
          } else {
            res.render("auth/login", {
              pageTitle: "Login",
              userNameErr: "",
              passwordErr: "Password was incorrect",
            });
          }
        });
      } else {
        res.render("auth/login", {
          pageTitle: "login",
          userNameErr: "Email does not exist",
          passwordErr: "",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLogout = (req, res, next) => {
  if (req.session.user) {
    req.session.destroy((success) => {
      res.redirect("/");
    });
  }
};

exports.getDoctorRegistration = (req, res, next) => {
  res.render("auth/doctor-registration", {
    pageTitle: "Signup as a doctor",
  });
};

/*exports.checkIt = (req,res,next)=>{
    const category = req.session.user.category;
    res.render('index',{
      userType:category,
    })
  };
  */
