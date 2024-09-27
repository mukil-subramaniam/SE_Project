import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DiseasePrediction from './components/DiseasePrediction';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<Home />} />

        {}
        <Route path="/prediction" element={<DiseasePrediction />} />
      </Routes>
    </Router>
  );
};

export default App;
