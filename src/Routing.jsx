import React from 'react'
import Home from './components/Home'
import {MovieContentDetails, SeriesContentDetails} from './components/ContentDetails'
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';

const Routing = () => {
  return (
    <Routes>
        <Route path="/" Component={Home} />
        <Route path="/movies/details/:contentId" Component={MovieContentDetails} />
        <Route path="/series/details/:contentId" Component={SeriesContentDetails} />
        <Route path="/login" Component={Login}/>
        <Route path="/signup" Component={Signup}/>
    </Routes>
  )
}

export default Routing;