import React, { useState } from 'react';

const Card = ({ post }) => {
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
    <div className="card-wrapper">
      <div className="card-header">
        <img src="/PlaygroundImage2.jpg" alt="User" className="avatar" />
        <div className="user-info">
          <h4>User</h4>
          <span className="timestamp">{post.uploadedAt}</span>
        </div>
      </div>

      <div className="card-content">
        <p>{post.title} 🎉</p>
        <img src={post.fileUrl} alt="Uploaded Media" className="media" />
      </div>

      <div className="card-actions">
        <button onClick={handleLike}>{liked ? '💔' : '🤍'} {likes}</button>
        <button>💬 1</button>
        <button>🔗 Share</button>
        <button onClick={handleSave}>{saved ? '💾 Saved' : '💾 Save'}</button>
      </div>
    </div>
  );
};

export default Card;
