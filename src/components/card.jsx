import React, { useState } from 'react';


const Card = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => (liked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header">
        <img
          src="/PlaygroundImage2.jpg"
          alt="User Avatar"
          className="avatar"
        />
        <div className="user-info">
          <h4>User</h4>
          <span className="timestamp">2 hours ago</span>
        </div>
      </div>

      {/* Content */}
      <div className="card-content">
        <p>This is a sample post description. Enjoy the post! 🎉</p>
        <img
          src="/3127706-3840x2160-desktop-hd-royal-enfield-background-Photoroom.png"
          alt="Post Media"
          className="media"
        />
      </div>

      {/* Actions */}
      <div className="card-actions">
        <button onClick={handleLike}>
          {liked ? '💔' : '🤍'} {likes}
        </button>
        <button>💬 1</button>
        <button>🔗 Share</button>
        <button onClick={handleSave}>
          {saved ? '💾 Saved' : '💾 Save'}
        </button>
      </div>
    </div>
  );
};

export default Card;
