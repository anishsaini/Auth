import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase';


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(" Reset link sent to your email");
      setError("");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setError(" Email not registered");
      } else {
        setError(" Something went wrong");
      }
      setMessage("");
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
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
