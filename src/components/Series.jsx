import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Home.css'
import { Link } from 'react-router-dom';

const SeriesRecommendations = ({ userInterest }) => {
  const [recommendedSeries, setRecommendedSeries] = useState([]);
  const API_KEY = '0d6f8da79a1d1e3e89c45646b16e7d4b';
  const userInterests = userInterest; // Example user interests (comma-separated genres)
  const contentListSeriesRef = useRef(null);
//   const navigate = useNavigate();

  const selectedLanguage = 'en';
  useEffect(() => {
    const fetchRecommendedSeries = async () => {
      try {
        const responseSeries = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${userInterests}&language=${selectedLanguage}`);
        setRecommendedSeries(responseSeries.data.results);
      } catch (error) {
        console.error('Error fetching TV series:', error);
      }
    };

    fetchRecommendedSeries();
  }, [userInterests]);

  const scrollLeftSeries = () => {
    const contentListSeries = contentListSeriesRef.current;
    contentListSeries.scrollLeft -= 200; // Adjust the scroll distance as needed
  };

  const scrollRightSeries = () => {
    const contentListSeries = contentListSeriesRef.current;
    contentListSeries.scrollLeft += 200; // Adjust the scroll distance as needed
  };

  return (
    <div className="content-block">
      <h2>Recommended TV Series</h2>
      <div className="content-list" ref={contentListSeriesRef}>
        {recommendedSeries.map(series => (
            <Link to={`/series/details/${series.id}`}>
          <div key={series.id} className="content-item" >
            <img src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`} alt={series.name} />
            <h4>{series.name}</h4>
          </div>
          </Link>
        ))}
      </div>
      <button className="scroll-left" onClick={scrollLeftSeries}>←</button>
      <button className="scroll-right" onClick={scrollRightSeries}>→</button>
    </div>
  );
};

export default SeriesRecommendations;
