import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'

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

  console.log('isAuth on App.js is', isAuth);

  return (
    <div className="App">
      <BrowserRouter >
        <Navbar />
        <main>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/sessions/:sessionId' element={isAuth ? <SessionDetails /> : <Login />} />
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
