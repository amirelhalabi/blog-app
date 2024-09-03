import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './PostDetails.css';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  if (!post) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="post-details-container">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-meta">By {post.author} | {new Date(post.createdAt).toLocaleDateString()}</p>
      <div className="post-content">{post.content}</div>

      <div className="post-actions">
        <button onClick={() => navigate('/')} className="back-button">Back to Home </button>
        <Link to={`/edit/${post._id}`} className="edit-button">Edit Post</Link>
      </div>
    </div>
  );
}

export default PostDetails;
