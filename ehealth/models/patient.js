const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Patient = sequelize.define('patient',{
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
    userName:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});


module.exports = Patient;