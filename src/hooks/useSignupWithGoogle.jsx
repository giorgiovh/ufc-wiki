import { useState } from "react"
import { projectAuth, provider } from '../firebase/config'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../store/auth'

export const useSignupWithGoogle = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const dispatch = useDispatch()

  const signupWithGoogle = async () => {
    setError(null)
    setIsPending(true)

    // sign the user up
    const res = await projectAuth.signInWithPopup(provider)

    if (!res) {
      throw new Error('Could not complete signup')
    }

    // dispatch login action
    // dispatch({
    //   type: 'LOGIN',
    //   payload: res.user
    // })
    dispatch(authActions.login())
  }

  return { error, setError, isPending, signupWithGoogle }
}