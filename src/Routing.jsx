import React from 'react'
import Home from './components/Home'
import {MovieContentDetails, SeriesContentDetails} from './components/ContentDetails'
import { Route, Routes } from 'react-router-dom';

const Routing = () => {
  return (
    <Routes>
        <Route path="/" Component={Home} />
        <Route path="/movies/details/:contentId" Component={MovieContentDetails} />
        <Route path="/series/details/:contentId" Component={SeriesContentDetails} />
    </Routes>
  )
}

export default Routing;