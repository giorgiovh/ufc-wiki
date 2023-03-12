import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const moment = require('moment');

export default function ImgMediaCard({ event }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={require('./../images/ufc_logo.png')}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {moment(event.Day).format('MMM Do, YYYY')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">See Card</Button>
        <Button size="small">Favorite</Button>
      </CardActions>
    </Card>
  );
}