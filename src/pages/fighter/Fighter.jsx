import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { getWeightClass } from '../../utils/utils';
const moment = require('moment');


export const Fighter = () => {
  const [fighter, setFighter] = useState({})
  const { id } = useParams()

  const getFighter = () => {
    axios.get(`https://api.sportsdata.io/v3/mma/scores/json/Fighter/${id}?key=${process.env.REACT_APP_API_KEY}`)
      .then(res => setFighter(res.data))
  }

  useEffect(() => {
    getFighter()
  }, [])

  return (
    <div className='page'>
      {fighter && (
        <>
          <h2>{`${fighter.FirstName} ${fighter.LastName}`}</h2>
          <h3>{fighter.Nickname && `"${fighter.Nickname}"`}</h3>
          <h4>{`${getWeightClass(fighter.Weight)} Division`}</h4>
          <h4>{fighter.Wins}-{fighter.Losses}-{fighter.Draws} (W-L-D)</h4>
        </>
      )}
    </div>
  )
}
