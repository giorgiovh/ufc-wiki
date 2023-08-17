import React, { useState } from 'react'
import { createFighterName } from '../utils/utils';
import { useFirestore } from '..//hooks/useFirestore';
import { useParams } from 'react-router-dom';
import { timestamp } from "../firebase/config";
import { useCollection } from '../hooks/useCollection';
import { Card, CardContent, Button, LinearProgress, Typography, Collapse, List, ListItem, Avatar } from '@mui/material';

export const PredictableFight = ({ fight, loggedInUserId, loggedInUserDisplayName, predictions }) => {
  const { sessionId } = useParams();
  const [showVotes, setShowVotes] = useState(false);

  const { addDocument: addPrediction, updateDocument: updatePrediction } = useFirestore('sessions', sessionId, 'predictions')

  const { documents: predictionsByLoggedInUser } = useCollection(
    'sessions',
    sessionId,
    'predictions',
    [['createdBy.userId', '==', loggedInUserId], ['fightId', '==', fight.FightId]]
  );

  const predictionByLoggedInUser = predictionsByLoggedInUser && predictionsByLoggedInUser[0]

  const handlePrediction = async (fighter) => {
    const prediction = {
      fightId: fight.FightId,
      fighterId: fighter.FighterId,
      createdBy: {
        userId: loggedInUserId,
        displayName: loggedInUserDisplayName
      },
      createdAt: timestamp.fromDate(new Date())
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

  const votesForFighter1 = predictions.filter(prediction => prediction.fightId === fight.FightId && prediction.fighterId === fight.Fighters[0].FighterId);
  const votesForFighter2 = predictions.filter(prediction => prediction.fightId === fight.FightId && prediction.fighterId === fight.Fighters[1].FighterId);

  const totalVotes = votesForFighter1.length + votesForFighter2.length;

  const percentageFighter1 = totalVotes !== 0 ? (votesForFighter1.length / totalVotes) * 100 : 0;
  const percentageFighter2 = totalVotes !== 0 ? (votesForFighter2.length / totalVotes) * 100 : 0;

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
            </div>
            <Typography variant="subtitle1" style={{ alignSelf: 'center' }}>vs</Typography>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div onClick={() => handlePrediction(fight.Fighters[1])} style={{ cursor: 'pointer' }}>
                <Typography variant="h6">{createFighterName(fight.Fighters[1])}</Typography>
              </div>
            </div>
          </CardContent>
          <div style={{ display: 'flex', flexDirection: 'row', height: '4px' }}>
            <div style={{ width: `${percentageFighter1}%`, backgroundColor: 'blue' }} />
            <div style={{ width: `${percentageFighter2}%`, backgroundColor: 'red' }} />
          </div>
          <div style={{ alignSelf: 'center' }}>
            <Button onClick={handleShowVotes}>Show Votes</Button>
          </div>
          <Collapse in={showVotes}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <List style={{ flex: 1 }}>
                {votesForFighter1.map(prediction => (
                  <ListItem>
                    <Avatar /> {/* Add avatar image */}
                    <Typography variant="body2">{prediction.createdBy.displayName}</Typography>
                  </ListItem>
                ))}
              </List>
              <div style={{ flex: 1 }}></div> {/* spacer */}
              <List style={{ flex: 1 }}>
                {votesForFighter2.map(prediction => (
                  <ListItem>
                    <Avatar /> {/* Add avatar image */}
                    <Typography variant="body2">{prediction.createdBy.displayName}</Typography>
                  </ListItem>
                ))}
              </List>
            </div>
          </Collapse>
        </Card>
      }
    </>
  )
}