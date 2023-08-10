import React from 'react'
import { createFightName, createFighterName } from '../utils/utils';

export const Fight = ({ fight }) => {
  console.log(fight);
  return (
    <>
      {
        fight.Fighters.length === 2 && 
        <h4>{createFightName(fight.Fighters)}</h4>
      }
    </>
  )
}
