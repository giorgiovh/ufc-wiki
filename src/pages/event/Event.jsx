import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Fights } from '../../components/Fights';
const moment = require('moment');

export const Event = () => {
  const [event, setEvent] = useState({})
  const { id } = useParams()

  const getEvent = () => {
    axios.get(`https://api.sportsdata.io/v3/mma/scores/json/Event/${id}?key=${process.env.REACT_APP_API_KEY}`)
      .then(res => setEvent(res.data))
  }

  useEffect(() => {
    getEvent()
  }, [])

  return (
    <>
      {event && (
        <>
          <h2>{event.Name}</h2>
          <h3>{moment(event.Day).format('MMM Do, YYYY')}</h3>
          {event.Fights && <Fights fights={event.Fights} />}
        </>
      )}
    </>
  )
}

