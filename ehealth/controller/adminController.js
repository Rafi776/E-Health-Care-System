const DoctorWaiting = require('../models/doctorWaiting');
const User = require('../models/user');
const Doctor = require('../models/doctor');

exports.getWaitingDoctor = (req,res,next)=>{
    DoctorWaiting.findAll().then((Waitingdoctors)=>{
        res.render('admin/waiting-doctor',{
            pageTitle:"Add A doctor",
            doctors:Waitingdoctors,
        });
    });
};


exports.confirmDoctor = (req,res,next)=>{
    const waitingDoctorsId = req.body.id;
    console.log(waitingDoctorsId);

    DoctorWaiting.findByPk(waitingDoctorsId).then(waitingDoctor=>{
        const userName = waitingDoctor.userName;
        const password = waitingDoctor.password;
        
        const firstName = waitingDoctor.firstName;
        const lastName = waitingDoctor.lastName;
        const imagePath = waitingDoctor.imagePath;
        const speciality = waitingDoctor.speciality;
        
        const thisUser = new User({
            userName:userName,
            password:password,
            category:"doctor",
          });
  
          thisUser.save().then((success)=>{
            const userId = success.dataValues.id;
            User.findByPk(userId).then(myUser=>{
              myUser.createDoctor({
                firstName: firstName,
                lastName: lastName,
                imagePath:imagePath,
                speciality:speciality,
              })

              console.log("doctor save successfully");
              waitingDoctor.destroy();
              console.log("waiting list deleted");
              return res.redirect('/doctors');
            })
          }).catch(err=>{
              console.log(err);
          })
    })
};