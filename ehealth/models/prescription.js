const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Prescription = sequelize.define('prescription',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    drugsName:{
        type:Sequelize.STRING,
    },
});


module.exports = Prescription;