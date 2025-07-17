import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LogoutButton from './Auth/Logout';
import Feed from '../components/feed/Feed';


const Home = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <div className="home-layout">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">📷 Media</h2>
        <nav className="nav">
          <Link to="#" className="nav-link">🏠 Home</Link>
          <Link to="/explore" className="nav-link">🔍 Explore</Link>
          <Link to="/profile" className="nav-link">👤 Profile</Link>
          <Link to="/bookmark" className="nav-link">📚 Bookmarks</Link>
        </nav>
        <LogoutButton />
        <button className="upload-post-button" onClick={handleUploadClick}>
          Upload Post
        </button>
      </aside>

      {/* CENTER FEED */}
      <main className="feed-wrapper">
        <h2 className="feed-title">Latest Posts</h2>
        <Feed />
      </main>

      {/* RIGHT PANEL */}
      <aside className="right-panel">
        <div className="right-box">
          <h4>📤 Ready to share?</h4>
          <button className="upload-button" onClick={handleUploadClick}>
            Upload a File
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Home;
