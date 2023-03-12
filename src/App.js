import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// components
import { Home } from './pages/home/Home';
import Navbar from './components/Navbar';
import ResponsiveAppBar from './components/ResponsiveAppBar';

// styles
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter >
        {/* <Navbar /> */}
        <ResponsiveAppBar />
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;
