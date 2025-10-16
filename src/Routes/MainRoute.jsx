import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
const MainRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
    </Routes>
  )
}

export default MainRoute