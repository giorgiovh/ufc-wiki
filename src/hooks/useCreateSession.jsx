import { useState } from 'react'
import { useSelector } from 'react-redux'
import { generateUniqueCode } from '../utils/utils'
import { projectFirestore } from '../firebase/config'

export const useCreateSession = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  
  // get the logged in user from Redux store
  const loggedInUser = useSelector(state => ({
    uid: state.auth.uid,
    displayName: state.auth.displayName
  }))

  const createSession = async (sessionName, event) => {
    setError(null)
    setIsPending(true)

    try {
      // Get a reference to the 'sessions' collection
      const sessionsRef = projectFirestore.collection('sessions');

      // Generate a code that is unique in the 'sessions' collection
      const code = await generateUniqueCode(sessionsRef)

      const newSession = {
        name: sessionName,
        eventId: 290,
        code,
        members: [{
          id: loggedInUser.uid,
          displayName: loggedInUser.displayName,
        }],
      }

      // add the new session to the 'sessions' collection
      const newlyAddedSession = await sessionsRef.add(newSession)

      setIsPending(false)

      // return the newly created session's id
      return newlyAddedSession.id
      
    } catch (error) {
      setError(error.message)
      console.log('error creating session', error.message);
      setIsPending(false)
    }
  }

  return { createSession, error, setError, isPending }
}
