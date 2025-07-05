import React from "react";

export default function Home() {
  return (
    <div className="home-root">
      <h1>Welcome to the Home Page!</h1>
      <p>This is a simple home page for your application.</p>
      <img src="/home-illustration.jpg" alt="Home Illustration" style={{ width: '100%', maxWidth: '600px' }} />
    </div>
  );
}
