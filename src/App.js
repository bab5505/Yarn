import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Inventory from './components/Inventory';
import ProgressTracker from './components/ProgressTracker';
import Projects from './components/Projects';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Yarn Inventory</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/inventory">Inventory</Link>
            </li>
            <li>
              <Link to="/progress">Progress Tracker</Link>
            </li>
            <li>
              <Link to="/projects">Current Projects</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the Yarn Inventory App!</p>
      <p>Click on the links above to navigate to different sections.</p>
    </div>
  );
}

export default App;
