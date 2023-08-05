import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
  isAuthenticated: false,
  uid: null,
  displayName: null,
  authIsReady: false
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true
      state.uid = action.payload.uid
      state.displayName = action.payload.displayName
    },
    logout(state) {
      state.isAuthenticated = false
      state.uid = null
      state.displayName = null
    },
    setAuthIsReady(state, action) {
      state.authIsReady = action.payload;
    }
  }
})

export const authActions = authSlice.actions

export default authSlice.reducer