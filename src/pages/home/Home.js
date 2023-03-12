import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EventCard from '../../components/EventCard';

export const Home = () => {
  const [events, setEvents] = useState([])

  const getEvents = () => {
    axios.get(`https://api.sportsdata.io/v3/mma/scores/json/Schedule/UFC/2023?key=${process.env.REACT_APP_API_KEY}`)
      .then(res => setEvents(res.data))
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <>
      <h2>Upcoming Events</h2>
      {events && events.map(event => {
        return (
          <EventCard key={event.EventId} event={event}/>
        )
      })}
    </>
  )
}
