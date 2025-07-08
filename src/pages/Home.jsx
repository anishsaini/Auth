import React from 'react';
import LogoutButton from './Auth/Logout'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate('/upload');
  };

  return (
    <div className="home-wrapper">
      <header className="header">
        <div className="logo">MySite</div>
        
        <nav className="nav">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          
          
          <LogoutButton />
        </nav>
      </header>

      <section id="hero" className="hero">
        <h1>Welcome to My Website</h1>
        <p>Your gateway to something amazing 🚀</p>
        <button onClick={handlenavigate} >Get Started</button>
        
      </section>

      <section id="about" className="about">
        <h2>About Us</h2>
        <p>We are passionate developers building modern web experiences.</p>
      </section>

      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">Send</button>
          
        </form>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} MySite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
