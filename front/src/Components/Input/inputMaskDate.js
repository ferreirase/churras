import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[' ', /[0-9]/, /\d/, '/' , /\d/,/\d/, '/', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default function FormattedInputs({textInput, handlechange, value}) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    textmask: '',
  });

  return (
    <div className={classes.root}>
      <FormControl >
        <InputLabel 
          htmlFor="formatted-text-mask-input" style={{fontSize: '18px'}}>{textInput}</InputLabel>
          <br/>
        <Input
          value={value}
          onChange={handlechange}
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
          style={{width: '200px'}}
        />
      </FormControl>
    </div>
  );
}
