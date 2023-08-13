import React from 'react'
import Home from './components/Home'
import ContentDetails from './components/ContentDetails'
import { Route, Routes } from 'react-router-dom';

const Routing = () => {
  return (
    <Routes>
        <Route path="/" Component={Home} />
        <Route path="/details/:contentId" Component={ContentDetails} />
    </Routes>
  )
}

export default Routing;