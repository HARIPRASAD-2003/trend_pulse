import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Home.css'
import { Link } from 'react-router-dom';

const MovieRecommendations = ({ userInterest, setUserInterests }) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const API_KEY = '0d6f8da79a1d1e3e89c45646b16e7d4b';
  const userInterests = userInterest; // Example user interests (comma-separated genres)
  const contentListRef = useRef(null);
  const selectedLanguage = 'en'
//   const navigate = useNavigate();
console.log(recommendedMovies)

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${userInterests}&language=${selectedLanguage}`);
        setRecommendedMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchRecommendedMovies();
  }, [userInterests]);

  const scrollLeft = () => {
    const contentList = contentListRef.current;
    contentList.scrollLeft -= 200; // Adjust the scroll distance as needed
  };
  
  const scrollRight = () => {
    const contentList = contentListRef.current;
    contentList.scrollLeft += 200; // Adjust the scroll distance as needed
  };
  
  return (
    <div className="content-block">
        <h2>Recommended Movies</h2>
  <div className="content-list" ref={contentListRef}>
    {recommendedMovies.map(movie => (
        <Link to={`/movies/details/${movie.id}`}>
      <div key={movie.id} className="content-item" >
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        <h4>{movie.title}</h4>
      </div>
      </Link>
    ))}
  </div>
  <button className="scroll-left" onClick={scrollLeft}>←</button>
  <button className="scroll-right" onClick={scrollRight}>→</button>
</div>


  
  );
};

export default MovieRecommendations;




