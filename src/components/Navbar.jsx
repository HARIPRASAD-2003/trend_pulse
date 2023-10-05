import React, { useState } from 'react';
import './Home.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // You can implement the search functionality here
    console.log('Search query:', searchQuery);
    // Clear the search input
    setSearchQuery('');
  };

  return (
    <div className="nav">
      <ul>
        <li>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
            />
          </form>
        </li>
        <li>Browse</li>
        <li>My List</li>
        <li>Top Picks</li>
        <li>Recent</li>
      </ul>
    </div>
  );
};

export default Navbar;
