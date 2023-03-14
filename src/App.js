import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// components
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { Home } from './pages/home/Home';
import { Fighters } from './pages/fighters/Fighters';
import { About } from './pages/about/About';
import { Event } from './pages/event/Event';
import { Fighter } from './pages/fighter/Fighter';

// styles
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <ResponsiveAppBar />
        <main>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/fighters' element={<Fighters />} />
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
