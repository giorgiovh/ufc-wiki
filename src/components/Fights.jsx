import React from 'react'
import { Fight } from './Fight'

export const Fights = ({ fights }) => {
  const mainCardFights = fights.slice(0, 5);

  return (
    <>
      {mainCardFights && mainCardFights.map(fight => <Fight key={fight.FightId} fight={fight}/>)}
    </>
  )
}
