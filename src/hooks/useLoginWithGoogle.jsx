import { useState } from "react"
import { useDispatch } from 'react-redux'
import { authActions } from '../store/auth'
import { projectAuth, provider } from '../firebase/config'

export const useLoginWithGoogle = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const dispatch = useDispatch()
  
  const loginWithGoogle = async () => {
    setError(null)
    setIsPending(true)

    // sign the user in
    try {
      const res = await projectAuth.signInWithPopup(provider)

      // dispatch login action to update global state. We execute login bc this is an action creator returning the actual action object to be dispatched
      // dispatch({ type:'LOGIN', payload: res.user })
      dispatch(authActions.login())

      // update local state
      setIsPending(false)
      setError(null)

    } catch (err) {
      // update local state
      console.log(err.message);
      setError(err.message)
      setIsPending(false)
    }
  }

  return { error, isPending, loginWithGoogle }
}