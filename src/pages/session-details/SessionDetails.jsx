import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import { FightCard } from '../../components/Fights';
import { useCollection } from '../../hooks/useCollection';
import { FightsPredictions } from '../../components/FightsPredictions';
const moment = require('moment');

export const SessionDetails = () => {
  const [event, setEvent] = useState([])

  const { sessionId } = useParams()

  const { document: session } = useDocument('sessions', sessionId)

  const { documents: fights, error } = useCollection('sessions', sessionId, 'fights')

  fights && console.log('fights:', fights);

  const getEvent = () => {
    session &&
      axios.get(`https://api.sportsdata.io/v3/mma/scores/json/Event/${session.eventId}?key=${process.env.REACT_APP_API_KEY}`)
        .then(res => setEvent(res.data))
        .catch(err => console.error(err))
  }

  useEffect(() => {
    getEvent()
  }, [session])

  session && console.log('session:', session);

  return (
    <div className="page">
      {session && event &&
        <>
          <h1>{session.name}</h1>
          <p>Code to join: <strong>{session.code}</strong></p>
          <h3>Members:</h3>
          <ul>{session.members.map(
            member => <li>{member.displayName}</li>
          )}</ul>
          <hr />
          <h2>{event.Name}</h2>
          <h3>{moment(event.Day).format('MMM Do, YYYY')}</h3>
          {event.Fights && <FightsPredictions fights={event.Fights} />}

          <h2>Predictions:</h2>
          <ul>
            {fights && fights.map(fight =>
              <li>
                {fight.id}
              </li>
            )}
          </ul>
        </>
      }
    </div>
  )
}
