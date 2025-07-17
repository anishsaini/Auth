import React, { useEffect, useState } from 'react';
import Card from '../card';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/list-uploads')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error loading posts:', err));
  }, []);

  return (
    <div className="feed-section">
      {posts.map((post, i) => (
        <Card key={i} post={post} />
      ))}
    </div>
  );
};

export default Feed;
