import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './landing.css'; // Import the CSS file

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(response => {
        setPosts(response.data);
        setFilteredPosts(response.data);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value === '') {
      setFilteredPosts(posts);
    } else {
      const searchLower = event.target.value.toLowerCase();
      setFilteredPosts(posts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
      ));
    }
    setCurrentPage(1);
  };

  return (
    <div className="home-container">
      <div className="search-create-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search posts by title or content..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <Link to="/create" className="create-button">Create Post</Link>
      </div>
      {filteredPosts.length === 0 && <p>No posts found.</p>}

      {currentPosts.map(post => (
        <div key={post._id} className="post-card">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{post.content.substring(0, 100)}...</p>
          <Link to={`/posts/${post._id}`} className="read-more">Read More</Link>
        </div>
      ))}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 || totalPages === 1 ? 'disabled' : ''}`}>
          <button
            onClick={currentPage > 1 ? handlePrevPage : null}
            className="page-link"
            disabled={currentPage === 1 || totalPages === 1}
          >
            &lt;
          </button>
        </li>

        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages || totalPages === 1 ? 'disabled' : ''}`}>
          <button
            onClick={currentPage < totalPages ? handleNextPage : null}
            className="page-link"
            disabled={currentPage === totalPages || totalPages === 1}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
}



export default HomePage;
