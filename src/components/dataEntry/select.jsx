import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function NativeSelects(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
    props.onChangeSelect(event.target.value)
    setState({
        display: 'none'
      });
   
  };

  return (
    <div className={classes.root}>
     
      <FormControl className={classes.formControl}>
        {/* <InputLabel htmlFor="age-native-helper">Age</InputLabel> */}
        <NativeSelect
          value={props.selected}
          onChange={handleChange('age')}
          input={<Input name="age" id="age-native-helper" />}
        >
          {props.data.map((row,id) => (
             <option key={id} value={row.name}>{row.name}</option>
          ))}
        </NativeSelect>
        <FormHelperText style={{color:'green',display:props.display}}>Nearest Hospital</FormHelperText>
      </FormControl>
    
    </div>
  );
}

export default NativeSelects;