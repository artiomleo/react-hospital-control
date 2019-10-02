import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import databasePosition from "../../models/PositionModel";

const styles = theme => ({
  card: {
    width: 400,
    float: 'right',
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
  injured:model.card.injured,
  criticalCondition:model.card.criticalCondition,
  brokenBones:model.card.brokenBones,
  openWounds:model.card.openWounds,
  skullDamage:model.card.skullDamage,
  internalOrgans:model.card.internalOrgans,
  bleeding:model.card.bleeding,
  pregnant:model.card.pregnant,
  infected:model.card.infected,
  mentallyDisturbed:model.card.mentallyDisturbed,
  info:model.card.info,
  expanded:model.card.expanded,
  emptyCard:model.card.emptyCard
});

const setComponentState = (componentState, newState) => {
return Object.assign({}, componentState, newState);
};


class InfoDrone extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        expanded: false ,

    };


    this.state = setComponentState(
      mapModelStateToComponentState(databasePosition.state)
    );

    this.componentListener = modelState =>
    this.setState(
      setComponentState(this.state, mapModelStateToComponentState(modelState))
    );
    databasePosition.addListener("change", this.componentListener);

  };


  componentDidMount() {
    databasePosition.getData()
  }

  componentWillUnmount() {
    databasePosition.removeListener("change", this.componentListener);
  }



  

  handleExpandClick = () => {
    // this.setState(state => ({ expanded: !state.expanded }));
    this.setState({expanded: !this.state.expanded});
    // this.props.handleExpandPlace();

        
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
              !
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
          title={this.props.formatted_address}
          subheader={
            this.state.emptyCard === true 
            ? 'Total injured: '+this.state.injured
            : "Choose a position" 
          }
        />
        <CardContent>
          <Typography component="p">
            {this.state.info}
          </Typography>
        </CardContent>
        {/* <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <Typography paragraph style={{marginLeft:'126px',color:'green'}}>
            Additional information
          </Typography>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions> */}
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography >
            Critical condition: {this.state.criticalCondition}
            </Typography>
            <Typography  >
            Broken Bones: {this.state.brokenBones}
            </Typography>
            <Typography  >
            Open Wounds: {this.state.openWounds}
            </Typography>
            <Typography  >
            Skull Damage: {this.state.skullDamage}
            </Typography>
            <Typography  >
            Internal Organs: {this.state.internalOrgans}
            </Typography> 
            {/* <Typography  >
            Bleeding: {this.state.bleeding}
            </Typography> */}
            <Typography  >
            Pregnant: {this.state.pregnant}
            </Typography>
            <Typography  >
            Infected: {this.state.infected}
            </Typography>
            <Typography  >
            Mentally Disturbed: {this.state.mentallyDisturbed}
            </Typography>
           
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

InfoDrone.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoDrone);