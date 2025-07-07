import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out from Firebase!');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button className="logout-button nav-btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
