import React from "react";
import "../../App.css";

export default function Signup() {
  return (
    <div className="auth-root">
      <div className="auth-left">
        <div className="auth-logo">
          <div className="logo-circle"></div>
          <span>Logo</span>
        </div>
        <h1>Welcome Back <span role="img" aria-label="wave">👋</span></h1>
        <p className="auth-subtext">We are happy to see you again!</p>
        <form className="auth-form">
          
          <label>Email address*</label>
          <input type="email" placeholder="Enter email address" />
          <label>Password*</label>
          <div className="password-input" style={{position: 'relative'}}>
            <input type="password" placeholder="Create a password" />
            {<span style={{position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#888', cursor: 'pointer'}}>&#128065;</span>}
          </div>
          <div className="auth-checkbox">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">I agree to terms & conditions</label>
          </div>
          <button className="auth-btn" type="submit">Signup</button>
        </form>
        <div className="auth-divider">
          <hr className="divider-line" />
          <span>or</span>
          <hr className="divider-line" />
        </div>
        <button className="google-btn" style={{background: '#111', color: '#fff'}}>
          <img src="/google.png" alt="Google" style={{width: '20px', marginRight: '8px'}} />
          Register with Google
        </button>
      </div>
      <div className="auth-right">
        <img src="/main.jpg" alt="Illustration" />
      </div>
    </div>
  );
} 