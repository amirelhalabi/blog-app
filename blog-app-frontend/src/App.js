// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/landing';
import PostDetails from './components/PostDetails';
import EditPost from './components/EditPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/create" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
