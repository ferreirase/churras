import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {OutdoorGrill} from '@material-ui/icons';
import {PlusOne} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'grey',
    color: 'whitesmoke',
    margin: '0 auto'
  },
}));

export default function SimpleList({primary, secondary}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <PlusOne style={{color: 'whitesmoke'}} />
          </ListItemIcon>
          <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
        <Divider style={{backgroundColor: 'whitesmoke'}}/>
      </List>
      <Divider />
    </div>
  );
}