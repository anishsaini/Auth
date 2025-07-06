import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Auth/Login.jsx';
import Signup from './pages/Auth/Signup.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import { firestore } from './firebase.js';
import './App.css';

function Logout() {
  return <h1>Logout</h1>;
}

function App() {
  // Initialize Firebase app
  React.useEffect(() => {
    if (!firestore) {
      console.error('Firebase app not initialized');
    } else {
      console.log('Firebase app initialized successfully');
    }
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
