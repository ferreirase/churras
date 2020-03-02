import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import {GroupAdd} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function IconButtons({onclick}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton color="primary" 
        aria-label="add to shopping cart"
        style={{float: 'right', right: "50px", top: '30px', color: 'whitesmoke'}}
        >
        <GroupAdd fontSize="large" onClick={onclick} />
      </IconButton>
    </div>
  );
}