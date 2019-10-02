import { EventEmitter } from "events";
import { getPositions, updatePosition } from '../api/requests'


class PositionModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            positions: [],
            card: []


        };

    }

    getData() {

        getPositions({}).then(response => {
            if (response.status === 200) {
                response.text().then(response => {
                    var res = JSON.parse(response);
                    this.state = {
                        ...this.state,
                        positions: res
                    };
                    this.emit("change", this.state);
                    console.log("databasePosition",res);
                    
                })
            }
        })

    }

    changeCardInfo(terminalID){
        var position = this.state.positions.filter((a)=> a.terminalID === terminalID) 
        let card = position[0]
        card.expanded = true
        card.emptyCard = true
        this.state.card = card
        this.emit("change", this.state);

    }

    changeCardRow(field,value){
        // var card = this.state.card
        // card[field] = value
        // this.state = {
        //     ...this.state,
        //    card:card
        // };
        // this.emit("change", this.state);
    }


}




const databasePosition = new PositionModel();
export default databasePosition;