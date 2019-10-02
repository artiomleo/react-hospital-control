var express = require('express');
var Model = require('../models/model.js').Model;
var router = module.exports = express.Router();
var Sequelize = require('sequelize');
var config = require('../config.json');
var sequelize = new Sequelize(config.database, { query: { raw: true } });
const Op = Sequelize.Op;
var sessionUser;
var randomstring = require("randomstring");


String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

router.route('/addPosition')
    .post((req, res) => {
        if (req.body) {
            const position = req.body;
            if (position.terminalID === undefined) {
                res.status(401).end();
            } else {
                Model.Position.create({
                    terminalID: position.terminalID,
                    latitude: position.latitude,
                    longitude: position.longitude,
                    injured: position.injured,
                    place: position.place,
                    info: position.info
                },
                    {
                        where: { id: position.id }
                    });
                res.status(200).end();

            }
        }
    });

router.route('/getPositions')
    .get((req, res) => {
        if (req.body) {
            Model.Position.findAll({
            }).then(result => {
                if (!result) {
                    res.status(401);
                } else {
                    res.status(200);
                    res.send(result);
                }
            })
        } else {
            res.status(400).end();
        }
    });

router.route('/updatePosition')
    .post((req, res, next) => {
        var position = req.body;
        if (position.terminalID == undefined) {
            res.status(400).end();
            return next();
        }
        Model.Position.update({
            terminalID: position.terminalID,
            latitude: position.latitude,
            longitude: position.longitude,
            place: position.place,
            injured: position.injured,
            criticalCondition: position.criticalCondition,
            brokenBones: position.brokenBones,
            openWounds: position.openWounds,
            skullDamage: position.skullDamage,
            internalOrgans: position.internalOrgans,
          //  bleeding: position.bleeding,
            pregnant: position.pregnant,
            infected: position.infected,
            mentallyDisturbed: position.mentallyDisturbed,
        },
            {
                where: { terminalID: position.terminalID }
            }
        );
        res.status(200).end();
    });

router.route('/deletePosition')
    .delete((req, res, next) => {
        var position = req.body;
        if (position.terminalID === "") {
            res.status(400).end();
            return next();
        }
        Model.Position.destroy({
            where: { terminalID: position.terminalID }
        });
        res.status(200).end();
    });
