import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MultipleSelect from '../dataEntry/select.jsx'
import databaseHospital from "../../models/HospitalModel";
import LinearDeterminate from '../schedule/progress.jsx';
import Timer from 'react-compound-timer';
import databaseDataEntry from "../../models/DataEntryModel";
import databaseSchedule from "../../models/ScheduleModel";
import { addAccepted } from '../../api/requests'


const styles = {
    card: {
        width: "900px",
        height: "320px",
        margin: "10px ",
        marginTop: "20px ",
        fontWeight: "300",
        padding: "20px",
        position: "relative",
        display: "column",
        textAlign: "left",
        background: "linear-gradient(135deg, #fff8f4 30%,#b6dffa 100%)",
        background: "-moz-linear-gradient(-70deg, #fff8f4 30%,#b6dffa 100%)",
        background: "-webkit-linear-gradient(-70deg, #fff8f4 30%,#b6dffa 100%)"
    },
    firstColumn: {
        display: "flex",

    },
    cardWraper: {
        display: "inline-block",
        perspective: "2px",
        
    },
    description: {
        fontSize: "30px"
    },
    cardSuggestion: {
        //display:'table-caption',
        fontSize: 'small',

    },
    time: {
        marginLeft: 50,
        marginRight: 50,
        textAlign: 'center',
        color:'green',
        fontStyle: 'italic',
    },
    estimatedTime: {
        display: "column",
        textAlign: 'center',
    },
    position: {
        color: 'red',
        width: 320,
        fontSize: 'medium',

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    textField: {
        marginLeft: 10,
        marginRight: 0,
        width: "245px",
    },
    button: {
        margin: '23px',
        float: 'right',
        marginTop: -30
    },

};

const mapModelStateToComponentState = model =>  ({
  card:model.card
});

const setComponentState = (componentState, newState) => {
    return Object.assign({}, componentState, newState);
  };
  

class DataEntry extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = setComponentState(
          mapModelStateToComponentState(databaseDataEntry.state)
        );
    
        this.componentListener = modelState =>
        this.setState(
          setComponentState(this.state, mapModelStateToComponentState(modelState))
        );
        databaseDataEntry.addListener("change", this.componentListener);
    
      };
    
    
      componentDidMount() {
        databaseDataEntry.getData()
      //  this.setState(({ disp: 'none' }));
      }
    
      componentWillUnmount() {
        databaseDataEntry.removeListener("change", this.componentListener);
      }

      handleAccept() {
          databaseSchedule.changeCardInfo(databaseDataEntry.state)
        console.log(databaseDataEntry.state.card);
        var accepted = databaseDataEntry.state.card
        addAccepted({
            name: accepted.name,
            address: accepted.adress,
            distance: accepted.distance,
            criticalCare: accepted.criticalCare,
            generalSurgery: accepted.generalSurgery,
            haematology: accepted.haematology,
            maternityDep: accepted.maternityDep,
            microbiology: accepted.microbiology,
            psychiatrists: accepted.psychiatrists,
            therapy: accepted.therapy,
            traumatologists: accepted.traumatologists,
        }).then(response => {
            if (response.status === 200) {
                response.text().then(response => {
                })
            }
        })
      }
    

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.cardWraper}>
                <Card className={classes.card}>
                <div className={classes.firstColumn}>
                    
                     <Typography 
                        className={classes.position}
                        component="h5"
                        variant="h5"
                        color="primary"
                    >
                       {this.state.card.adress}
                     </Typography>
                     <div className={classes.estimatedTime}>
                     <Typography 
                        className={classes.time}
                        component="h5"
                        variant="h5"
                        color="primary"
                            >
                                Estimated time: 
                     </Typography>
                     <div className={classes.time}>
                            {/* <Timer 
                                initialTime={60000}
                                direction="backward"
                            >
                                {() => (
                                    <React.Fragment>
                                      <Timer.Minutes /> minutes { " " }
                                      <Timer.Seconds /> seconds
                                    </React.Fragment>
                                )}
                            </Timer> */}
                     <Typography 
                     className={classes.time}
                        component="h5"
                        variant="h5"
                        color="primary"
                            >
                            {this.state.card.distance} minutes
                     </Typography>
                     </div>
                     {/* <LinearDeterminate /> */}

                     </div>
                     <Typography
                        className={classes.position}
                        component="h5"
                        variant="h5"
                        color="primary"
                    >
                       {this.state.card.name}
                     </Typography>
                     </div>
                     <Typography
                        className={classes.cardSuggestion}
                        component="h5"
                        variant="h5"
                        color="primary"
                    > 
                       Critical care: {this.state.card.criticalCare} <br />
                       Traumatologists: {this.state.card.traumatologists} <br />
                       Haematology: {this.state.card.haematology} <br />
                       General surgery: {this.state.card.generalSurgery} <br />
                       Therapy: {this.state.card.therapy} <br />
                       Maternity department: {this.state.card.maternityDep} <br />
                       Microbiology: {this.state.card.microbiology} <br />
                       Psychiatrists: {this.state.card.psychiatrists} <br />

                       <Button variant="contained" 
                       onClick={this.handleAccept}
                       color="primary" 
                       className={classes.button}>
                        Accept 
                       </Button>
                     </Typography>
                    {/* <Typography className={classes.description} component="p" variant="p">
                        Description
                    </Typography> */}
                    
                </Card>
            </div>
        );
    }
}

DataEntry.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataEntry);