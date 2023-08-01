import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
  isAuthenticated: false,
  uid: null,
  displayName: null
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
  }
})

export const authActions = authSlice.actions

export default authSlice.reducer