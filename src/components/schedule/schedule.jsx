import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearDeterminate from '../schedule/progress.jsx';
import databaseSchedule from "../../models/ScheduleModel";

const styles = theme => ({
  root: {
    width: "900px",
   
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: 'chocolate'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  panel: {
    margin:10,
    background: "linear-gradient(135deg, #fff8f4 30%,#b6dffa 100%)",
    background: "-moz-linear-gradient(-70deg, #fff8f4 30%,#b6dffa 100%)",
    background: "-webkit-linear-gradient(-70deg, #fff8f4 30%,#b6dffa 100%)"
  }
});

const mapModelStateToComponentState = model =>  ({
  card:model.card
});

const setComponentState = (componentState, newState) => {
    return Object.assign({}, componentState, newState);
  };
  

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,

    };
    this.state = setComponentState(
      mapModelStateToComponentState(databaseSchedule.state)
    );

    this.componentListener = modelState =>
    this.setState(
      setComponentState(this.state, mapModelStateToComponentState(modelState))
    );
    databaseSchedule.addListener("change", this.componentListener);

  };

  componentDidMount() {
    databaseSchedule.getData()
  //  this.setState(({ disp: 'none' }));
  }

  componentWillUnmount() {
    databaseSchedule.removeListener("change", this.componentListener);
  }
    
    handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
    };
    render() {
        const { classes } = this.props;
        const { expanded } = this.state;
    
  return (
    <div className={classes.root}>
      {this.state.card.map((row,id) =>
       <ExpansionPanel key={id + 1.5} className={classes.panel} expanded={this.state.card.id} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary key={id + 10} expandIcon={<ExpandMoreIcon />}>
            <Typography key={id + 100} className={classes.heading}>Emergency on way</Typography>
            <Typography key={id + 1000} className={classes.secondaryHeading}>{row.distance}:00  =>  {row.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails key={id}>
              <Typography
             key={id}
            className={classes.cardSuggestion}
            component="h5"
            variant="subtitle2"
            color="primary"
          >
            Critical care: {row.criticalCare} <br />
            Traumatologists: {row.traumatologists} <br />
            Haematology: {row.haematology} <br />
            General surgery: {row.generalSurgery} <br />
            Therapy: {row.therapy} <br />
            Maternity department: {row.maternityDep} <br />
            Microbiology: {row.microbiology} <br />
            Psychiatrists: {row.psychiatrists} <br />
          </Typography>
          
          </ExpansionPanelDetails>
        </ExpansionPanel>
       )}  

    </div>
  );
}
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Schedule);