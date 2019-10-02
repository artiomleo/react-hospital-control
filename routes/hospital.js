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

router.route('/addHospital')
    .post((req, res) => {
        if (req.body) {
            const hospital = req.body;
            if (hospital.name === undefined) {
                res.status(401).end();
            } else {
                Model.Hospital.create({
                    name: hospital.name,
                    latitude: hospital.latitude,
                    longitude: hospital.longitude,
                    place: hospital.place,
                    

                },
                    {
                        where: { id: hospital.id }
                    });
                res.status(200).end();

            }
        }
    });

router.route('/getHospitals')
    .get((req, res) => {
        if (req.body) {
            Model.Hospital.findAll({
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

router.route('/updateHospital')
    .post((req, res, next) => {
        var hospital = req.body;
        if (hospital.name == undefined) {
            res.status(400).end();
            return next();
        }
        Model.Hospital.update({
            name: hospital.name,
            latitude: hospital.latitude,
            longitude: hospital.longitude,
            place: hospital.place,
            emergency: hospital.emergency,
            criticalCare: hospital.criticalCare,
            generalSurgery: hospital.generalSurgery,
            haematology: hospital.haematology,
            maternityDep: hospital.maternityDep,
            microbiology: hospital.microbiology,
            neurology: hospital.neurology,
            therapy: hospital.therapy,
            oncology: hospital.oncology,
            ophthalmology: hospital.ophthalmology,
            orthopaedics: hospital.orthopaedics,
            physiotherapy: hospital.physiotherapy,
            rheumatology: hospital.rheumatology,
            psychiatrists: hospital.psychiatrists,
            traumatologists: hospital.traumatologists,
            doctors: hospital.doctors,
            comment: hospital.comment,
        },
            {
                where: { name: hospital.name }
            }
        );
        res.status(200).end();
    });

router.route('/deleteHospital')
    .delete((req, res, next) => {
        var hospital = req.body;
        if (hospital.name === "") {
            res.status(400).end();
            return next();
        }
        Model.Hospital.destroy({
            where: { name: hospital.name }
        });
        res.status(200).end();
    });
