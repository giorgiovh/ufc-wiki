import React from 'react'
import { createFighterName } from '../utils/utils';
import { useFirestore } from '../hooks/useFirestore';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../firebase/config'
import { useCollection } from '../hooks/useCollection'

export const PredictableFight = ({ fight, loggedInUserId }) => {
  const { sessionId } = useParams();

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

  return (
    <>
      {
        fight.Fighters.length === 2 &&
        <h4 style={{ display: 'flex' }}>
          <div onClick={() => handlePrediction(fight.Fighters[0])}>{createFighterName(fight.Fighters[0])}</div>
          <div style={{ margin: '0 5px' }}>vs</div>
          <div onClick={() => handlePrediction(fight.Fighters[1])}>{createFighterName(fight.Fighters[1])}</div>
        </h4>
      }
    </>
  )
}
