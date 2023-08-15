import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import _debounce from 'lodash/debounce';
import axios from 'axios';
import './ContentDetails.css';
import UserInterestAnalyzer from './UserInterestAnalyzer'; // Adjust the path based on your project structure

const analyzer = new UserInterestAnalyzer(); // Initialize the user interest analyzer


export const MovieContentDetails = () => {
  const { contentId } = useParams();
  const [contentDetails, setContentDetails] = useState(null);
  const [streamingPlatforms, setStreamingPlatforms] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const userCountry = 'IN';
  const API_KEY = '0d6f8da79a1d1e3e89c45646b16e7d4b';
  // setUserCountry('IN');

  
  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${contentId}?api_key=${API_KEY}`);
        setContentDetails(response.data);

        const platformsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${contentId}/watch/providers?api_key=${API_KEY}`);
        setStreamingPlatforms(platformsResponse.data.results[userCountry]?.flatrate || []);

        const trailerResponse = await axios.get(`https://api.themoviedb.org/3/movie/${contentId}/videos?api_key=${API_KEY}`);
        const trailer = trailerResponse.data.results.find(video => video.type === 'Trailer'); 
        if (trailer) {
          setTrailerKey(trailer.key);
        }
        if (contentId) {
          // Analyze user interests based on content's genres
          const contentGenres = response.data.genres.map(genre => genre.name.toLowerCase());
          // const matchingInterests = userInterests.filter(interest => contentGenres.includes(interest));
          
          // Add interaction and analyze user interests
          analyzer.addInteraction(contentId, 'view', contentGenres);
          const userInterests = analyzer.analyzeUserInterests();
          // setUserInterests(userInterests);
          console.log(userInterests);
        }
      } catch (error) {
        console.error('Error fetching content details:', error);
      }
    };

    fetchContentDetails();
  }, [contentId, userCountry]);

  if (!contentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-details">
      <h2>{contentDetails.title}</h2>
      <div className="content-details-container">
        <div className="content-details-image">
          <img
            src={`https://image.tmdb.org/t/p/w500/${contentDetails.poster_path}`}
            alt={contentDetails.title}
          />
        </div>
        <div className="content-details-info">
          <p><strong>Overview:</strong> {contentDetails.overview}</p>
          <p><strong>Release Date:</strong> {contentDetails.release_date}</p>
          <p><strong>Runtime:</strong> {contentDetails.runtime} minutes</p>
          <p><strong>Vote Average:</strong> {contentDetails.vote_average}</p>
          <div>
            <strong>Available on Streaming Platforms:</strong>
            <ul className="platform-list" style={{display: 'flex', justifyContent: "space-evenly"}}>
              {streamingPlatforms.map(platform => (
                <li key={platform.provider_id}>
                  {console.log(platform)}
                  <a
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={platform.provider_name}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original/${platform.logo_path}`}
                      alt={`${platform.provider_name} logo`}
                      className="platform-logo"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {trailerKey && (
            <div>
              <strong>Trailer:</strong>
              <div className="trailer-container">
                <iframe
                  title={`${contentDetails.title} Trailer`}
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const SeriesContentDetails = () => {
  const { contentId } = useParams();
  const [contentDetails, setContentDetails] = useState(null);
  const [streamingPlatforms, setStreamingPlatforms] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const API_KEY = '0d6f8da79a1d1e3e89c45646b16e7d4b';

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${contentId}?api_key=${API_KEY}`);
        setContentDetails(response.data);

        const platformsResponse = await axios.get(`https://api.themoviedb.org/3/tv/${contentId}/watch/providers?api_key=${API_KEY}`);
        setStreamingPlatforms(platformsResponse.data.results.IN?.flatrate || []);

        const trailerResponse = await axios.get(`https://api.themoviedb.org/3/tv/${contentId}/videos?api_key=${API_KEY}`);
        const trailer = trailerResponse.data.results.find(video => video.type === 'Trailer');
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching content details:', error);
      }
    };

    fetchContentDetails();
  }, [contentId]);

  if (!contentDetails) {
    return <div>Loading...</div>;
  }


  return (
    <div className="content-details">
      <h2>{contentDetails.title}</h2>
      <div className="content-details-container">
        <div className="content-details-image">
          <img
            src={`https://image.tmdb.org/t/p/w500/${contentDetails.poster_path}`}
            alt={contentDetails.title}
          />
        </div>
        <div className="content-details-info">
          <p><strong>Overview:</strong> {contentDetails.overview}</p>
          <p><strong>Release Date:</strong> {contentDetails.release_date}</p>
          <p><strong>Runtime:</strong> {contentDetails.runtime} minutes</p>
          <p><strong>Vote Average:</strong> {contentDetails.vote_average}</p>
          <div>
            <strong>Available on Streaming Platforms:</strong>
            <ul className="platform-list" style={{display: 'flex', justifyContent: "space-evenly"}}>
              {streamingPlatforms.map(platform => (
                <li key={platform.provider_id}>
                  <a
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={platform.provider_name}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original/${platform.logo_path}`}
                      alt={`${platform.provider_name} logo`}
                      className="platform-logo"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {trailerKey && (
            <div>
              <strong>Trailer:</strong>
              <div className="trailer-container">
                <iframe
                  title={`${contentDetails.title} Trailer`}
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


