/*import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App*/
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  increment,
  query,
  orderBy
} from 'firebase/firestore';

function App() {
  const [responses, setResponses] = useState([]);
  const [newResponse, setNewResponse] = useState("");

  const responsesRef = collection(db, "responses");

  const fetchResponses = async () => {
    const q = query(responsesRef, orderBy("upvotes", "desc"));
    const snapshot = await getDocs(q);
    setResponses(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newResponse.trim() === "") return;

    await addDoc(responsesRef, {
      text: newResponse,
      upvotes: 0,
      timestamp: new Date().toISOString()
    });

    setNewResponse("");
    fetchResponses();
  };

  const handleUpvote = async (id) => {
    const responseDoc = doc(db, "responses", id);
    await updateDoc(responseDoc, {
      upvotes: increment(1)
    });
    fetchResponses();
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "2rem" }}>
      <h1>🌍 What’s the best fictional universe to live in?</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newResponse}
          onChange={(e) => setNewResponse(e.target.value)}
          placeholder="Add your answer..."
          style={{ width: "70%", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px" }}>Submit</button>
      </form>

      <ul style={{ marginTop: "2rem" }}>
        {responses.map((resp) => (
          <li key={resp.id} style={{ margin: "1rem 0" }}>
            <strong>{resp.text}</strong> - {resp.upvotes} upvotes
            <button onClick={() => handleUpvote(resp.id)} style={{ marginLeft: "10px" }}>
              👍 Upvote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
