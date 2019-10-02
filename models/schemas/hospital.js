var bcrypt = require('bcrypt');
var sequelize = require('../model.js').sequelize;
var Sequelize = require('sequelize');

var Hospital = module.exports = sequelize.define('hospital', {
    name: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
    },
    latitude: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    longitude: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    place: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    emergency: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    neurology:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    therapy:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    oncology:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    ophthalmology:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    orthopaedics:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    physiotherapy:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    rheumatology:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    psychiatrists:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    doctors:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    traumatologists:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    comment:{
        type:Sequelize.STRING,
        allowNull:true
    },

});
