import { EventEmitter } from "events";
import { getAccepted } from '../api/requests'


class ScheduleModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            card: [],

        };

    }

    getData() {
        getAccepted({}).then(response => {
            if (response.status === 200) {
                response.text().then(response => {
                    var res = JSON.parse(response);
                    this.state = {
                        ...this.state,
                        card: res
                    };
                    console.log(res);
                    
                    this.emit("change", this.state);
                })
            }
        })
    }

    changeCardInfo(card){

        var newCard = this.state.card
        newCard.push(card.card)
        this.state.card = newCard
        console.log(card.card);

        this.emit("change", this.state);
    }



}




const databaseSchedule = new ScheduleModel();
export default databaseSchedule;