import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {OutdoorGrill} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor: '#767676', 
    color: 'whitesmoke'
  },
});

export default function ImgMediaCard({title, date, onclick}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={onclick}>
      <CardActionArea>
        <CardContent>
        <OutdoorGrill />
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{fontWeight: 'bold'}}>
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}