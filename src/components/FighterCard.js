import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function FighterCard({ fighter }) {
  const navigate = useNavigate()

  return (
    <Card sx={{ maxWidth: 345, marginTop: '20px', marginBottom: '20px' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={require('./../images/mma_glove.png')}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${fighter.FirstName} ${fighter.LastName}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {fighter.Nickname && `"${fighter.Nickname}"`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/fighters/${fighter.FighterId}`)}>See Details</Button>
      </CardActions>
    </Card>
  );
}