import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Reset link sent to your email");
      setError("");
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setError("Email not registered");
      } else {
        setError("Something went wrong");
      }
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-form">
        <label>Email address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        {loading && <div className="loader"></div>}
      </form>
    </div>
  );
};

export default ForgotPassword;
