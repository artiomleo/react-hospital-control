import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import databaseHospital from "../../models/HospitalModel";


const styles = theme => ({
  card: {
    width: 400,
    marginLeft: 3,
    float: 'left',
    marginTop: '-35px',
    background: "linear-gradient(135deg, #fff8f4 30%,#b6dffa 100%)",
    background: "-moz-linear-gradient(-70deg, #fff8f4 30%,#b6dffa 100%)",
    background: "-webkit-linear-gradient(-70deg, #fff8f4 30%,#b6dffa 100%)"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
    padding: 0
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

const mapModelStateToComponentState = model =>  ({
          hospital:model.card,
          name:model.card.name,
          availableDoctors:model.card.doctors,
          comment:model.card.comment,
          emergency:model.card.emergency,
          criticalCare:model.card.criticalCare,
          generalSurgery:model.card.generalSurgery,
          haematology:model.card.haematology,
          maternityDep:model.card.maternityDep,
          microbiology:model.card.microbiology,
          neurology:model.card.neurology,
          therapy:model.card.therapy,
          oncology:model.card.oncology,
          ophthalmology:model.card.ophthalmology,
          physiotherapy:model.card.physiotherapy,
          rheumatology:model.card.rheumatology,
          psychiatrists:model.card.psychiatrists,
          traumatologists:model.card.traumatologists,
          expanded:model.card.expanded,
          emptyCard:model.card.emptyCard,
          disp:model.disp
});

const setComponentState = (componentState, newState) => {
  return Object.assign({}, componentState, newState);
};


class InfoHospital extends React.Component {

  constructor(props) {
    super(props);

    this.state = setComponentState(
      mapModelStateToComponentState(databaseHospital.state)
    );

    this.componentListener = modelState =>
    this.setState(
      setComponentState(this.state, mapModelStateToComponentState(modelState))
    );
    databaseHospital.addListener("change", this.componentListener);

  };


  componentDidMount() {
    databaseHospital.getData()
  //  this.setState(({ disp: 'none' }));

  }

  componentWillUnmount() {
    databaseHospital.removeListener("change", this.componentListener);
  }


  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));

  };

  handleExpandClick() {
    const [expanded, setExpanded] = React.useState(false);

    setExpanded(!expanded);
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {this.state.availableDoctors}
            </Avatar>
          }
          action={
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          }
          title={this.state.name}
          subheader={
            this.state.emptyCard === true 
            ? "Available doctors: " + this.state.availableDoctors 
            : "Choose a hospital" 
          }
          
        />
        <CardContent>
        <Typography variant="body2" style={{display:this.state.disp,color:'rgb(31, 195, 11)',fontSize:'xx-large'}} >
              Nearest hospital!
            </Typography>
          <Typography component="p">
            {this.state.comment}
          </Typography>
        </CardContent>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {/* <Typography variant="body2" >
              Emergency: {this.state.emergency}
            </Typography> */}
            <Typography variant="body2" >
              Critical care: {this.state.criticalCare}
            </Typography>
            <Typography variant="body2" >
              General surgery: {this.state.generalSurgery}
            </Typography>
            <Typography variant="body2" >
              Haematology: {this.state.haematology}
            </Typography>
            <Typography variant="body2" >
              Maternity department: {this.state.maternityDep}
            </Typography>
            <Typography variant="body2" >
              Microbiology: {this.state.microbiology}
            </Typography>
            {/* <Typography variant="body2" >
              Neurology: {this.state.neurology}
            </Typography> */}
            <Typography variant="body2" >
              Therapy: {this.state.therapy}
            </Typography>
            {/* <Typography variant="body2" >
              Oncology: {this.state.oncology}
            </Typography>
            <Typography variant="body2" >
              Ophthalmology: {this.state.ophthalmology}
            </Typography>
            <Typography variant="body2" >
              Orthopaedics: {this.state.orthopaedics}
            </Typography>
            <Typography variant="body2" >
              Physiotherapy: {this.state.physiotherapy}
            </Typography>
            <Typography variant="body2" >
              Rheumatology: {this.state.rheumatology}
            </Typography> */}
            <Typography variant="body2" >
              Psychiatrists: {this.state.psychiatrists}
            </Typography>
            <Typography variant="body2" >
              Traumatologists: {this.state.traumatologists}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

InfoHospital.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoHospital);