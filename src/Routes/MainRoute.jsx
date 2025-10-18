import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Products from '../Pages/Products/Products';
const MainRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/products' element={<Products />}/>
    </Routes>
  )
}

export default MainRoute