import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LogoutButton from "../../pages/Auth/Logout";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="profile-container">
        <h2>Not Logged In</h2>
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-container" style={styles.container}>
      <h2 style={styles.heading}>👤 Profile</h2>
      {user.photoURL && (
        <img src={user.photoURL} alt="User Avatar" style={styles.avatar} />
      )}
      <p>
        <strong>Name:</strong> {user.displayName || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>UID:</strong> {user.uid}
      </p>
      <LogoutButton />
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "500px",
    margin: "60px auto",
    backgroundColor: "#111",
    borderRadius: "12px",
    color: "#fff",
    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    color: "#1da1f2",
  },
  avatar: {
    width: "100px",
    borderRadius: "50%",
    marginBottom: "20px",
  },
};

export default Profile;
