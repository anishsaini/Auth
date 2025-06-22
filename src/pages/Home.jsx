import React from "react";
import { firestore } from "../firebase.js";

import { collection, addDoc } from "firebase/firestore";

export default function Home() {
  const inputRef = React.useRef();
  const ref = collection(firestore, "messages");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = inputRef.current.value;
    inputRef.current.value = '';

    const data = {
      input: message,
    };

    try {
      const docRef = await addDoc(ref, data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <h1>Home Screen</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter a message</label>
        <input type="text" ref={inputRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
