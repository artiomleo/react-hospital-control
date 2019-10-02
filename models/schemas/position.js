var bcrypt = require('bcrypt');
var sequelize = require('../model.js').sequelize;
var Sequelize = require('sequelize');

var Position = module.exports = sequelize.define('position', {
    terminalID: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    latitude: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    longitude:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    place: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    injured: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    criticalCondition: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    brokenBones: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    openWounds: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    skullDamage: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    internalOrgans: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    bleeding: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    pregnant: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    infected: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    mentallyDisturbed:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    info:{
        type: Sequelize.STRING,
        allowNull: true
    },
});