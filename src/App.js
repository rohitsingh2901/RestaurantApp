import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RestaurantList from './RestaurantList';
import DishList from './DishList';
import Dish from './Dish';
import Admin from './Admin'

function App() {
  return (
    <Router>
      <div className='container '>
        <div className='my-3 flex justify-center items-center'>
      <Link to="/admin"><button className='btn btn-primary btn-sm mx-8'>Admin View</button></Link>
      <Link to="/restaurant"><button className='btn btn-primary btn-sm mx-8'>Customer View</button></Link>
      </div>
        <Routes>
          <Route path="/" element={<div><h1 className='text-center'>Welcome to Restaurant App</h1></div>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/restaurant" element={<RestaurantList />} />
          <Route path="/restaurant/:id" element={<DishList />} />
          <Route path="/dish/:dishId" element={<Dish />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
