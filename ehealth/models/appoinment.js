const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Appoinment = sequelize.define('appoinment',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    patientId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    patientName:Sequelize.STRING,
    doctorId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    doctorName:{
        type:Sequelize.STRING,
    },
    confirmation:Sequelize.BOOLEAN,
    prescripted: Sequelize.BOOLEAN,
});


module.exports = Appoinment;