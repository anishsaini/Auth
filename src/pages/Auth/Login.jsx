import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function Login() {
  const navigate = useNavigate(); 
  const handleClick = (e) => {
    e.preventDefault(); 
    navigate("/Signup"); 
  };

  return (
    <div className="auth-root">
      <div className="auth-left">
        <div className="auth-logo">
          <div className="logo-circle"></div>
          <span>Logo</span>
        </div>
        <h1>Create an Account <span role="img" aria-label="wave">👋</span></h1>
        <p>Kindly fill in your details to create an account</p>
        <form className="auth-form">
          <label>Your fullname*</label>
          <input type="text" placeholder="Enter your name" />
          <label>Email address*</label>
          <input type="email" placeholder="Enter email address" />
          <label>Create password*</label>
          <div className="password-input">
            <input type="password" placeholder="Create a password" />
          </div>
          <div className="auth-checkbox">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">I agree to terms & conditions</label>
          </div>
          <button className="auth-btn" type="submit" onClick={handleClick}>
            Register Account
          </button>
        </form>
        <div className="auth-divider">
          <span>or</span>
        </div>
        <button className="google-btn">
          <img src="/google.png" alt="Google" style={{ width: '20px', marginRight: '8px' }} />
          Register with Google
        </button>
      </div>
      <div className="auth-right">
        <img src="/main.jpg" alt="Illustration" />
      </div>
    </div>
  );
}