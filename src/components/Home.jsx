// src/components/HomePage.js
import React, { useState } from 'react'; 
// import axios from 'axios';
import './Home.css';
// import { urlencoded } from 'express';
import Navbar from './Navbar';
import MovieRecommendations from './Movie';
import SeriesRecommendations from './Series';

const Home = () => {
  // const ACCESS_KEY = '1yaEJjHcZ80AGbnprPy3s96jQe5weRwXtBk_hzJWaQE';
  // const searchQuery = 'stranger things'; // Example search query
  // const [content, setContent] = useState([]);
  const initialSelection = {
    Action: false,
    Adventure: false,
    Animation: false,
    Comedy: false,
    Crime: false,
    Drama: false,
    Fantasy: false,
    Horror: false,
    Mystery: false,
    Romance: false,
    'Sci-Fi': false,
    Thriller: false,
    Western: false,
    Documentary: false,
};
const categoryList = Object.keys(initialSelection);
  console.log(categoryList)

  const [userInterests, setUserInterests] = useState(['romance', 'thriller']);
  // const [userSelectedLanguages, setUserSelectedLanguages] = useState('EN');


  // axios.get(`https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${ACCESS_KEY}`)
  //   .then(response => {
  //     const imageUrls = response.data.results.map(result => result.urls.regular);
  //     setContent(imageUrls)
  //   })
  //   .catch(error => {
  //     console.error('Error fetching images:', error);
  //   });

  return (
    <div className="home-page">
      <header className="header">
        <div className="trend_pulse-logo"></div>
        <Navbar/>
      </header>
      <main className="main-content">
      <section className="category-section">
          {/* <h2 className="category-title">Popular Now</h2> */}
          <MovieRecommendations userInterest={userInterests} setUserInterests={setUserInterests}/>
      </section>
      <section className="category-section">
          {/* <h2 className="category-title">Popular Now</h2> */}
          <SeriesRecommendations userInterest={userInterests}/>
      </section>
      </main>
      <footer>
        
      </footer>
    </div>
  );
};

export default Home;
