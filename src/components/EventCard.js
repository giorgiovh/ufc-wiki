// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { useNavigate } from 'react-router-dom';

// const moment = require('moment');

// export default function EventCard({ event }) {
//   const navigate = useNavigate()

//   return (
//     <Card sx={{ maxWidth: 345, marginTop: '20px', marginBottom: '20px' }}>
//       <CardMedia
//         component="img"
//         alt="ufc logo"
//         height="140"
//         image={require('./../images/ufc_logo.png')}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {event.Name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {moment(event.Day).format('MMM Do, YYYY')}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small" onClick={() => navigate(`/events/${event.EventId}`)}>See Details</Button>
//       </CardActions>
//     </Card>
//   );
// }

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const moment = require('moment');

export default function EventCard({ event }) {
  const navigate = useNavigate()

  return (
    <Card sx={{ maxWidth: 345, marginTop: '20px', marginBottom: '20px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={require('./../images/ufc_logo.png')}
          alt="ufc logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.Name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {moment(event.Day).format('MMM Do, YYYY')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}