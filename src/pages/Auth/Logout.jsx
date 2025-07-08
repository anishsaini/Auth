import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      alert('Logged out from Firebase!');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        className="logout-button nav-btn"
        onClick={handleLogout}
        disabled={loading}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>

      {loading && <div className="loader"></div>}
    </div>
  );
};

export default LogoutButton;
