import React, { useState, useEffect } from 'react';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
// import Home from './components/Home';
import { BrowserRouter as Router } from 'react-router-dom';
// import ContentDetails from './components/ContentDetails';
import Routing from './Routing';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay (e.g., API calls, data fetching)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Set the time as needed
  }, []);

  return (
    <div className="app">
      {isLoading ? <LoadingScreen /> : null}
      {/* <Home/> */}
      <Router>
        <Routing/>
      </Router>
    </div>
  );
}

export default App;
