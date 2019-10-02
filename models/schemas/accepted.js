var bcrypt = require('bcrypt');
var sequelize = require('../model.js').sequelize;
var Sequelize = require('sequelize');

var Accepted = module.exports = sequelize.define('accepted', {
    name: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    criticalCare:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    generalSurgery:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    haematology:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    maternityDep:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    microbiology:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    therapy:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    psychiatrists:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    traumatologists:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    distance:{
        type:Sequelize.STRING,
        allowNull:true
    },
    accept:{
        type:Sequelize.STRING,
        allowNull:true
    },

});
