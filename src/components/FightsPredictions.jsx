import React from 'react'
import { PredictableFight } from './PredictableFight';
import { useSelector } from 'react-redux'

export const FightsPredictions = ({ fights, predictions }) => {
  const mainCardFights = fights.slice(0, 5);

  // get the logged in user from Redux store
  const loggedInUserId = useSelector(state => state.auth.uid)

  return (
    <>
      {mainCardFights && mainCardFights.map(fight => <PredictableFight key={fight.FightId} fight={fight} loggedInUserId={loggedInUserId} predictions={predictions}/>)}
    </>
  )
}
