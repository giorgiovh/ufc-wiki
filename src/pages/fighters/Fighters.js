import React, { useEffect, useState } from 'react'
import axios from 'axios'

import FighterCard from '../../components/FighterCard'

export const Fighters = () => {
  const [fighters, setFighters] = useState([])

  const getFighters = () => {
    axios.get(`https://api.sportsdata.io/v3/mma/scores/json/Fighters?key=${process.env.REACT_APP_API_KEY}`)
      .then(res => setFighters(res.data))
  }

  useEffect(() => {
    getFighters()
  }, [])

  return (
    <>
      <h2>Fighters</h2>
      {fighters && fighters.map(fighter => {
        return (
          <FighterCard key={fighter.FighterId} fighter={fighter}/>
        )
      })}
    </>
  )
}
