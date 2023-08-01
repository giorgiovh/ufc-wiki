import { useState } from 'react'
import { useSelector } from 'react-redux'
import { projectFirestore } from '../firebase/config'

export const useJoinSession = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  // get the logged in user from the Redux store
  const loggedInUser = useSelector(state => ({
    uid: state.auth.uid,
    displayName: state.auth.displayName
  }))

  const joinSession = async (sessionCode) => {
    setError(null)
    setIsPending(true)

    try {
      // Get a reference to the 'sessions' collection
      const sessionsRef = projectFirestore.collection('sessions');

      // check that the session code has a match
      const matchedSession = await sessionsRef.where('code', '==', sessionCode).get()

      // if there's a match, add logged in user as a member of the matched session
      let matchedSessionId;
      if (matchedSession.docs.length > 0) {
        matchedSessionId = matchedSession.docs[0].id
        const matchedSessionData = matchedSession.docs[0].data()
        await sessionsRef.doc(matchedSessionId).update({
          members: [...matchedSessionData.members, {
            id: loggedInUser.uid,
            displayName: loggedInUser.displayName,
          }]
        })
      } else {
        console.log('No session found with that code')
        throw new Error('No session found with that code')
      }

      setIsPending(false)

      // return the session's id
      return matchedSessionId;

    } catch (error) {
      setError(error.message)
      console.log('error joining session', error.message);
      setIsPending(false)
    }
  }

  return { joinSession, error, setError, isPending }
}
