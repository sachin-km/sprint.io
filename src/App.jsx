import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Import the AuthContext
import Home from './pages/Home';
import CommunityModules from './pages/CommunityModules';
import Sprints from './pages/Sprints';
import SprintPlanning from './pages/SprintPlanning';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';

const App = () => {
  const { isAuthenticated } = useAuth(); // Get the auth state

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <div className={`flex-1 p-4 ${isAuthenticated ? '' : 'h-screen'}`}>
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/community-modules" element={<CommunityModules />} />
                <Route path="/sprints" element={<Sprints />} />
                <Route path="/sprint-planning" element={<SprintPlanning />} />
              </>
            ) : (
              // Redirect unauthenticated users to login
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
