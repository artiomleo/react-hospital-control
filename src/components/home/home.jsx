import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DataEntry from '../../components/dataEntry/dataEntry.jsx';
import MapApp from '../../components/map/Map.js';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Shedule from '../../components/schedule/schedule.jsx';

const styles = {
  root: {
    flexGrow: 1,
    background: "aliceblue"
  },
  grow: {
    flexGrow: 1,
    marginLeft: 30
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  box: {
    display: 'flex',
    // margin: '10px'

  },
  data: {
    width: '70%',
    height: '50%',
    marginTop: '-10px',
  },
  bar: {
    background: 'darkslateblue',
    borderRadius: '0px 0px 30px 30px',
    marginBottom: '10px'
    
  }

};

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display:'none',
      position: '',
    }
    this.handleNearest = this.handleNearest.bind(this);
    this.handlePosition = this.handlePosition.bind(this);
    this.changeNearest = this.changeNearest.bind(this);

  }

  componentDidMount() {
    window.addEventListener('', this.handleNearest, false);
    window.addEventListener('', this.handlePosition, false);
    window.addEventListener('', this.changeNearest, false);

  }

  handlePosition = (id) => {
    this.setState({position: id})
    
  }

  handleNearest = (id) => {
     this.setState({nearest: id.name})
     this.setState({nearestObj: id})
    this.setState({display: 'flex'})
  }

  changeNearest = (val) => {
    this.setState({display: 'none'})
    this.setState({nearest: val})
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.bar} position="static">
          <Toolbar>
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" color="inherit" className={classes.grow}>
              TrackDrone
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.box}>

            <MapApp
            handleNearest={this.handleNearest}
            handlePosition={this.handlePosition}

            />

          <div className={classes.data}>
            <DataEntry />
            <Shedule /> 

          </div>

        </div>

      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);