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

router.route('/addAccepted')
    .post((req, res) => {
        if (req.body) {
            const accepted = req.body;
            if (accepted.name === undefined) {
                res.status(401).end();
            } else {
                Model.Accepted.create({
                    name: accepted.name,
                    address: accepted.address,
                    distance: accepted.distance,
                    criticalCare: accepted.criticalCare,
                    generalSurgery: accepted.generalSurgery,
                    haematology: accepted.haematology,
                    maternityDep: accepted.maternityDep,
                    microbiology: accepted.microbiology,
                    therapy: accepted.therapy,
                    psychiatrists: accepted.psychiatrists,
                    traumatologists: accepted.traumatologists,
                },
                    {
                        where: { id: accepted.id }
                    });
                res.status(200).end();

            }
        }
    });

router.route('/getAccepted')
    .get((req, res) => {
        if (req.body) {
            Model.Accepted.findAll({
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

router.route('/updateAccepted')
    .post((req, res, next) => {
        var accepted = req.body;
        if (accepted.name == undefined) {
            res.status(400).end();
            return next();
        }
        Model.Accepted.update({
            accept: accepted.accept,
        },
            {
                where: { name: accepted.name,
                         address: accepted.address }
            }
        );
        res.status(200).end();
    });

router.route('/deleteAccepted')
    .delete((req, res, next) => {
        var accepted = req.body;
        if (accepted.name === "") {
            res.status(400).end();
            return next();
        }
        Model.Accepted.destroy({
            where: { name: accepted.name,
                address: accepted.address }
        });
        res.status(200).end();
    });
