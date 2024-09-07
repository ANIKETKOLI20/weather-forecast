import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cities from './pages/Cities';
import Weather from './pages/Weather';

function App() {
  return (
      <Router>
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Cities />} />
            <Route path="/weather/:cityName" element={<Weather />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
