import { EventEmitter } from "events";


class DataEntryModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            card: [],


        };

    }

    getData() {

    }

    changeCardInfo(card,address){

        card.distance = Math.round(card.distance * 2.8)
        console.log(card.distance);
        
        card.adress = address
        this.state.card = card
        this.emit("change", this.state);
    }

   

}




const databaseDataEntry = new DataEntryModel();
export default databaseDataEntry;