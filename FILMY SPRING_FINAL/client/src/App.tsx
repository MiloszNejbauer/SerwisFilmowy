import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './screens/MainScreen';
import MovieScreen from './screens/MovieScreen';


const App: React.FC = () => {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/movie" element={<MovieScreen />} />
      </Routes>
    </Router>
  );
}

export default App;