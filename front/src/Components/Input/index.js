import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  fontStyle: {
    fontWeight: 'bold'
  }
}));

export default function BasicTextFields({classname,textInput, onchange, onkeypress,value}) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" 
        label={textInput} onChange={onchange} value={value}
        onKeyPress={onkeypress}
        className={classname}
        
        />
    </form>
  );
}