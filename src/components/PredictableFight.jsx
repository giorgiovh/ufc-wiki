import React, { useState } from 'react'
import { createFighterName } from '../utils/utils';
import { useFirestore } from '..//hooks/useFirestore';
import { useParams } from 'react-router-dom';
import { timestamp } from "../firebase/config";
import { useCollection } from '../hooks/useCollection';
import { Box, Card, CardContent, Typography, Collapse, List, ListItem, Avatar, IconButton, Tooltip } from '@mui/material';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';


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
      {fight.Fighters.length === 2 &&
        <Box m={1}>
          <Card elevation={3}>
            <CardContent style={{ padding: '8px 16px' }}>

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div onClick={() => handlePrediction(fight.Fighters[0])} style={{ flex: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography variant="h6">{createFighterName(fight.Fighters[0])}</Typography>
                  <Box bgcolor="blue" width={10} height={10} ml={1}></Box>
                </div>

                <Typography variant="subtitle1" style={{ margin: '0 8px' }}>vs</Typography>

                <div onClick={() => handlePrediction(fight.Fighters[1])} style={{ flex: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <Box bgcolor="red" width={10} height={10} mr={1}></Box>
                  <Typography variant="h6">{createFighterName(fight.Fighters[1])}</Typography>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '8px' }}>
                <Collapse in={showVotes} style={{ flex: 1 }}>
                  <List dense>
                    {votesForFighter1.map(prediction => (
                      <ListItem>
                        <Avatar size="small" />
                        <Typography variant="body2">{prediction.createdBy.displayName}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>

                <div style={{ flex: 1 }}></div>  {/* spacer in the middle */}

                <Collapse in={showVotes} style={{ flex: 1 }}>
                  <List dense>
                    {votesForFighter2.map(prediction => (
                      <ListItem>
                        <Avatar size="small" />
                        <Typography variant="body2">{prediction.createdBy.displayName}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>

            </CardContent>

            <div style={{ display: 'flex', flexDirection: 'row', height: '4px' }}>
              <div style={{ width: `${percentageFighter1}%`, backgroundColor: 'blue' }} />
              <div style={{ width: `${percentageFighter2}%`, backgroundColor: 'red' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
              <Tooltip title={showVotes ? "Hide Votes" : "Show Votes"}>
                <IconButton onClick={handleShowVotes} size="small">
                  {showVotes ? <ArrowDropUp /> : <ArrowDropDown />}
                </IconButton>
              </Tooltip>
            </div>
          </Card>
        </Box>
      }
    </>
  )
}