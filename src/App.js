import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// components
import { Home } from './pages/home/Home';
import Navbar from './components/Navbar';

// styles
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Navbar />
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;
