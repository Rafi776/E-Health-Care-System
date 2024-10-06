const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Doctor = sequelize.define('doctor',{
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
    }
});


module.exports = Doctor;