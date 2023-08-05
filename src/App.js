import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from './store/auth'
import { projectAuth } from './firebase/config'

// components
import Navbar from './components/Navbar';

// pages
import { Home } from './pages/home/Home';
import { Fighters } from './pages/fighters/Fighters';
import { About } from './pages/about/About';
import { Event } from './pages/event/Event';
import { Fighter } from './pages/fighter/Fighter';
import Login from './pages/login/Login';

// styles
import './App.css';
import SignUp from './pages/signup/Signup';
import { Sessions } from './pages/sessions/Sessions';
import { SessionDetails } from './pages/session-details/SessionDetails';

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch();

  console.log('isAuth on App.js is', isAuth);

  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged(user => {
      if (user) {
        const userData = { uid: user.uid, displayName: user.displayName };
        localStorage.setItem('authUser', JSON.stringify(userData));
        dispatch(authActions.login(userData));
      } else {
        localStorage.removeItem('authUser');
        dispatch(authActions.logout());
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter >
        <Navbar />
        <main>
          <Routes>
            <Route exact path='/' element={<Home />} />
            {/* <Route path='/sessions/:sessionId' element={isAuth ? <SessionDetails /> : <Login />} /> */}
            <Route path='/sessions/:sessionId' element={<SessionDetails />} />
            <Route path='/signup' element={isAuth ? <Navigate to="/" /> : <SignUp />} />
            <Route path='/login' element={isAuth ? <Navigate to="/" /> : <Login />} />
            <Route path='/fighters' element={<Fighters />} />
            <Route path='/sessions' element={isAuth ? <Sessions /> : <Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/events/:id' element={<Event />} />
            <Route path='/fighters/:id' element={<Fighter />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
