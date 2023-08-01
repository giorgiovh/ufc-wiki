import { useState } from 'react'

// TODO: CONTINUE HERE. We're not using auth context anymore? so we need to change this logic?
import { useAuthContext } from './useAuthContext'
import { generateUniqueCode } from '../utils/utils'
import { projectFirestore } from '../firebase/config'

export const useCreateSession = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  
  // get the logged in user
  const { user: loggedInUser } = useAuthContext()

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
        event,
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
