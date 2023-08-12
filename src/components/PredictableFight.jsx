import React, { useState } from 'react'
import { createFighterName } from '../utils/utils';
import { useFirestore } from '..//hooks/useFirestore';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../firebase/config';
import { useCollection } from '../hooks/useCollection';
import { Card, CardContent, Button, LinearProgress, Typography, Collapse, List, ListItem, Avatar } from '@mui/material';

export const PredictableFight = ({ fight, loggedInUserId }) => {
  const { sessionId } = useParams();
  const [showVotes, setShowVotes] = useState(false);

  const { addDocument: addPrediction, updateDocument: updatePrediction } = useFirestore('sessions', sessionId, 'predictions')

  const { documents: predictionsByLoggedInUser } = useCollection(
    'sessions',
    sessionId,
    'predictions',
    [['userId', '==', loggedInUserId], ['fightId', '==', fight.FightId]]
  );

  const predictionByLoggedInUser = predictionsByLoggedInUser && predictionsByLoggedInUser[0]

  const handlePrediction = async (fighter) => {
    const prediction = {
      fightId: fight.FightId,
      fighterId: fighter.FighterId,
      userId: loggedInUserId
    };

    if (!predictionByLoggedInUser) {
      addPrediction(prediction)
    } else {
      updatePrediction(prediction, predictionByLoggedInUser.id)
    }
  };

  const handleShowVotes = () => {
    setShowVotes(!showVotes);
  };

  return (
    <>
      {
        fight.Fighters.length === 2 &&
        <Card>
          <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div onClick={() => handlePrediction(fight.Fighters[0])} style={{ cursor: 'pointer' }}>
                <Typography variant="h6">{createFighterName(fight.Fighters[0])}</Typography>
              </div>
              <LinearProgress variant="determinate" value={60} /> {/* Replace 60 with the real percentage */}
              <Button onClick={handleShowVotes}>Show Votes</Button>
            </div>
            <Typography variant="subtitle1" style={{ alignSelf: 'center' }}>vs</Typography>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div onClick={() => handlePrediction(fight.Fighters[1])} style={{ cursor: 'pointer' }}>
                <Typography variant="h6">{createFighterName(fight.Fighters[1])}</Typography>
              </div>
              <LinearProgress variant="determinate" value={40} /> {/* Replace 40 with the real percentage */}
              <Button onClick={handleShowVotes}>Show Votes</Button>
            </div>
          </CardContent>
          <Collapse in={showVotes}>
            <List>
              {/* Loop through voters here */}
              <ListItem>
                <Avatar /> {/* Add avatar image */}
                <Typography variant="body2">Username</Typography> {/* Add real username */}
              </ListItem>
              {/* ... more voters ... */}
            </List>
          </Collapse>
        </Card>
      }
    </>
  )
}  