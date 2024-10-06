const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const DoctorWaiting = sequelize.define('doctorWaiting',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    firstName: {
        type:Sequelize.STRING,
        allowNull:false
    },
    lastName:Sequelize.STRING,
    imagePath:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    speciality:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    userName:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});


module.exports = DoctorWaiting;