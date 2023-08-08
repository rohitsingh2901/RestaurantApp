import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line 
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleSearch = () => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  return (
    <div>
      <div className='flex items-center'>
      <h1>List of available Restaurants</h1>
     
      <input
        className='my-4 mx-4'
        type="text"
        placeholder="Search for restaurants..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className=' btn btn-primary btn-sm' onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {filteredRestaurants.length > 0
          ? filteredRestaurants.map((restaurant) => (
              <li key={restaurant._id}>
                <Link to={`/restaurant/${restaurant._id}`}>{restaurant.name}</Link>
              </li>
            ))
          : restaurants.map((restaurant,index) => (
              <li key={restaurant._id}>
                <Link to={`/restaurant/${restaurant._id}`}>{index+1}. {restaurant.name}</Link>
              </li>
            ))}
      </ul>
      <Link to="/admin">Back to Admin</Link>

    </div>
  );
}

export default RestaurantList;
