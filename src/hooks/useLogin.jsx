import { useState } from "react"
// we'll use projectAuth once the firebase auth works and we uncomment the logic on this file that uses projectAuth
import { projectAuth } from '../firebase/config'
import { useDispatch } from 'react-redux'
import { authActions } from '../store/auth'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const dispatch = useDispatch()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    // sign the user in
    try {
      // const res = await projectAuth.signInWithEmailAndPassword(email, password)

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

  return { error, isPending, login }
}