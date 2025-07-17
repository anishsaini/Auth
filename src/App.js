import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Auth/Login.jsx';
import Signup from './pages/Auth/Signup.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import { firestore } from './firebase.js';
import './App.css';
import Upload from './components/upload.jsx';
import Card from './components/card.jsx';
import Feed from './components/feed/Feed.jsx';
import Profile from './components/feed/profile.jsx';
import Explore from './components/feed/explore.jsx';
import Bookmark from './components/feed/bookmark.jsx';

console.log('API KEY:', process.env.REACT_APP_API_KEY);

function Logout() {
  return <h1>Logout</h1>;
}

function App() {
  
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
          <Route path="/explore" element={<Explore/>} />
          <Route path="/bookmark" element={<Bookmark/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/feed" element={<Feed/>} />
          <Route path="/card" element={<Card />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<Login />} />
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
