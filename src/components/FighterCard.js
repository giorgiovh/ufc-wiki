import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function FighterCard({ fighter }) {
  const navigate = useNavigate()

  return (
    <Card sx={{ maxWidth: 345, marginTop: '20px', marginBottom: '20px' }} onClick={() => navigate(`/fighters/${fighter.FighterId}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={require('./../images/ufc_logo.png')}
          alt="ufc logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${fighter.FirstName} ${fighter.LastName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {fighter.Nickname && `"${fighter.Nickname}"`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}