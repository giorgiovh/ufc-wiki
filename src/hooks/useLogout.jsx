import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// we'll use projectAuth once the firebase auth works and we uncomment the logic on this file that uses projectAuth
import { projectAuth } from '../firebase/config'
import { useDispatch } from 'react-redux'
import { authActions } from '../store/auth'

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  
  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      // sign the user out
      // await projectAuth.signOut()
      
      // dispatch logout action
      dispatch(authActions.logout())

      // navigate to login route
      navigate('/login')

      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      } 
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}