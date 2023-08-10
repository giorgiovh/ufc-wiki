import React from 'react'
import { createFightName } from '../utils/utils';

export const Fight = ({ fight }) => {
  return (
    <>
      {
        fight.Fighters.length === 2 &&
        <h4>{createFightName(fight.Fighters)}</h4>
      }
    </>
  )
}
