import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import DistanceForm from './DistanceForm';
import { Leaderboard } from './Leaderboard';


const App = () => {
  return (

    <div>

<Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/leaerbrd" element={<Leaderboard />} />
      </Routes>
    </Router>
    
    </div>

    
    
  );
};

export default App;
