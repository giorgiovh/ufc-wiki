import { useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useDispatch } from 'react-redux'
import { authActions } from '../store/auth'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const dispatch = useDispatch()

  const signup = async (email, password, displayName) => {
    try {
      // sign the user up
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)
      if (!res) {
        throw new Error('Could not complete signup')
      }
      await res.user.updateProfile({
        displayName
      })

      // dispatch login action
      // dispatch({
      //   type: 'LOGIN',
      //   payload: res.user
      // })
      dispatch(authActions.login())
    } catch (error) {
      setError(error.message)
      setIsPending(false)
    }
  }

  return { error, setError, isPending, signup }
}