const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const bcrypt = require('bcryptjs');

const sequelize = require("./util/database");

const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const Patient = require("./models/patient");
const User = require('./models/user');
const Prescription = require('./models/prescription');
const Doctor = require('./models/doctor');
const Appoinment = require('./models/appoinment');


const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({secret:"my secret", saveUninitialized:false, resave:false}));

app.use((req,res,next)=>{
    if(req.session.user){
        res.locals.userType = req.session.user.category;
    }else{
        res.locals.userType = null;
    }

    next();
})

app.use(doctorRoutes);
app.use(patientRoutes);
app.use(authRoutes);
app.use(adminRoutes);


User.hasOne(Doctor);
Appoinment.belongsTo(Patient);
Appoinment.hasOne(Prescription);



sequelize.sync().then(result => {
    bcrypt.hash("123",12).then((encryptedPassword)=>{
        const admin= new User({
            userName:"Rohid",
            password:encryptedPassword,
            category:"admin",
        });

        admin.save().then(success=>{
            console.log("admin created successfully");
        })

    }).catch(err=>{
        console.log(err);
    });
    app.listen(3000);
}).catch(err => {
    console.log(err);
});



