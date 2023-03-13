import React from 'react'

export const Fight = ({ fight }) => {
  console.log(fight);
  return (
    <>
      {
        fight.Fighters.length === 2 && 
        <h4>{fight.Fighters[0].FirstName} {fight.Fighters[0].LastName} vs. {fight.Fighters[1].FirstName} {fight.Fighters[1].LastName}</h4>
      }
    </>
  )
}
