import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditPost.css';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/posts/${id}`)
        .then(response => setPost(response.data))
        .catch(error => console.error('Error fetching post:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:5000/posts/${id}`, post)
        .then(() => navigate(`/posts/${id}`))
        .catch(error => console.error('Error updating post:', error));
    } else {
      axios.post('http://localhost:5000/posts', post)
        .then(() => navigate('/'))
        .catch(error => console.error('Error creating post:', error));
    }
  };

  const handleDelete = () => {
    if (id) {
      axios.delete(`http://localhost:5000/posts/${id}`)
        .then(() => {
          alert('Post deleted successfully');
          navigate('/');
        })
        .catch(error => console.error('Error deleting post:', error));
    }
  };

  return (
    <div className="edit-post-container">
      <div className="post-actions">
        <button onClick={() => navigate('/')} className="back-button">Back to Home</button>
        {id && (
          <button onClick={handleDelete} className="delete-button">
            Delete Post
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="edit-post-form">
        <label className="form-label">Title:
          <input type="text" name="title" value={post.title} onChange={handleChange} required className="form-input" />
        </label>
        <label className="form-label">Content:
          <textarea name="content" value={post.content} onChange={handleChange} required className="form-textarea" />
        </label>
        <label className="form-label">Author:
          <input type="text" name="author" value={post.author} onChange={handleChange} required className="form-input" />
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default EditPost;
