import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EventCard from '../../components/EventCard';

export const Home = () => {
  const [events, setEvents] = useState([])
  
  const currentYear = new Date().getFullYear();

  const getEvents = () => {
    axios.get(`https://api.sportsdata.io/v3/mma/scores/json/Schedule/UFC/${currentYear}?key=${process.env.REACT_APP_API_KEY}`)
      .then(res => setEvents(res.data))
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <>
      <h2>Upcoming Events</h2>
      {events && events.filter(event => new Date(event.Day) >= new Date()).map(event => {
        return (
          <EventCard key={event.EventId} event={event}/>
        )
      })}
    </>
  )
}
