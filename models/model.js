var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var config = require('../config.json');
var sequelize = module.exports.sequelize = new Sequelize(config.database, {logging: false});
var Model = module.exports.Model = {};

Model.User = require('./schemas/user.js');
Model.Hospital = require('./schemas/hospital.js');
Model.Position = require('./schemas/position.js');
Model.Accepted = require('./schemas/accepted.js');

sequelize.sync().catch(error => console.log('This error occured', error));
