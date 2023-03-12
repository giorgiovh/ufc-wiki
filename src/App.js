import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// components
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { Home } from './pages/home/Home';
import { Fighters } from './pages/fighters/Fighters';
import { About } from './pages/about/About';

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
            <Route exact path='/fighters' element={<Fighters />} />
            <Route exact path='/about' element={<About />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
