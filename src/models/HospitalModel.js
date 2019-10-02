import { EventEmitter } from "events";
import { getPositions, getHospitals, updateHospital, updatePosition } from '../api/requests'
import databaseDataEntry from "../models/DataEntryModel";


class HospitalModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            hospitals: [],
            positions: [],
            card: [],
            disp: 'none'


        };

    }

    getData() {

        getHospitals({}).then(response => {
            if (response.status === 200) {
                response.text().then(response => {
                    var res = JSON.parse(response);
                    this.state = {
                        ...this.state,
                        hospitals: res
                    };
                    this.emit("change", this.state);
                })
            }
        })
    }

    changeCardInfo(name){
        var hospital = this.state.hospitals.filter((a)=> a.name === name) 
        let card = hospital[0]
        this.state.disp = 'none'
        card.expanded = true
        card.emptyCard = true
        this.state.card = card
        this.emit("change", this.state);
    }

    dispNearestCard(name){
        var hospital = this.state.hospitals.filter((a)=> a.name === name) 
        let card = hospital[0]
        this.state.disp = true
        card.expanded = true
        card.emptyCard = true
        this.state.card = card
        this.emit("change", this.state);
    }

    calculateSituation(info,name,address){
        console.log(info);
        var hospital = this.state.hospitals.filter((a)=> a.name === name) 
        let card = hospital[0]
        this.state.card = card
        console.log(card);
        
       var rest = this.calcSit(card,info,address)
    //   var anotherRest = this.calcSit(card,rest)
       console.log(rest);
    //  console.log(anotherRest);

        
       
    }

    calcSit(card,info,address) {
        var situation = []
        situation.name = card.name
        situation.adress = info.adress
        situation.distance = info.distance


        var rest = []
        if(card.emergency > 0) {
            if(card.criticalCare >= info.criticalCondition)
            situation.criticalCare = info.criticalCondition
            else if (card.criticalCare < info.criticalCondition) {
                situation.criticalCare = card.criticalCare
                rest.criticalCare = parseInt(info.criticalCondition) - (situation.criticalCare)
            }

            if(card.traumatologists >= info.brokenBones)
            situation.traumatologists = info.brokenBones
            else if (card.traumatologists < info.brokenBones) {
                situation.traumatologists = card.traumatologists
                rest.traumatologists = parseInt(info.brokenBones) - (situation.traumatologists)
            }

            if(card.haematology >= info.openWounds)
            situation.haematology = info.openWounds
            else if (card.haematology < info.openWounds) {
                situation.haematology = card.haematology
                rest.haematology = parseInt(info.openWounds) - (situation.haematology)
            }

            if(card.generalSurgery >= info.skullDamage)
            situation.generalSurgery = info.skullDamage
            else if (card.generalSurgery < info.skullDamage) {
                situation.generalSurgery = card.generalSurgery
                rest.generalSurgery = parseInt(info.skullDamage) - (situation.generalSurgery)
            }

            if(card.therapy >= info.internalOrgans)
            situation.therapy = info.internalOrgans
            else if (card.therapy < info.internalOrgans) {
                situation.therapy = card.generalSurgery
                rest.therapy = parseInt(info.internalOrgans) - (situation.therapy)
            }

            if(card.maternityDep >= info.pregnant)
            situation.maternityDep = info.pregnant
            else if (card.maternityDep < info.pregnant) {
                situation.maternityDep = card.maternityDep
                rest.maternityDep = parseInt(info.pregnant) - (situation.maternityDep)
            }

            if(card.microbiology >= info.infected)
            situation.microbiology = info.infected
            else if (card.microbiology < info.infected) {
                situation.microbiology = card.microbiology
                rest.microbiology = parseInt(info.infected) - (situation.microbiology)
            }

            if(card.psychiatrists >= info.mentallyDisturbed)
            situation.psychiatrists = info.mentallyDisturbed
            else if (card.psychiatrists < info.mentallyDisturbed) {
                situation.psychiatrists = card.psychiatrists
                rest.psychiatrists = parseInt(info.mentallyDisturbed) - (situation.psychiatrists)
            }

            
        }
        console.log(situation);
        //fill situation card
        databaseDataEntry.changeCardInfo(situation,address)
        return rest;

    }

    changeCardRow(field,value){
        var card = this.state.card
        card[field] = value
        this.state = {
            ...this.state,
           card:card
        };
        this.emit("change", this.state);
    }

}




const databaseHospital = new HospitalModel();
export default databaseHospital;