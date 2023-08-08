import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function DishList() {
  const { id } = useParams();
  const [dishes, setDishes] = useState([]);
  const [showVeg, setShowVeg] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDishes();
    // eslint-disable-next-line
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/restaurants/${id}/dishes`);
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const filteredDishes = () => {
    let filtered = dishes;

    if (showVeg !== null) {
      filtered = filtered.filter(dish => dish.veg === showVeg);
    }

    if (searchTerm.trim() !== '') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(dish =>
        dish.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        dish.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return filtered;
  };

  const clearFilter = () => {
    setShowVeg(null);
    setSearchTerm('');
  };

  return (
    <div>
      <h2>Cuisine and Dishes available in this restaurant:</h2>
      <div>
        <button className='btn btn-primary btn-sm' onClick={() => setShowVeg(true)}>Vegetarian</button>
        <button className='btn btn-danger btn-sm mx-3' onClick={() => setShowVeg(false)}>Non-Vegetarian</button>
        <button className='btn btn-danger btn-sm' onClick={clearFilter}>Clear Filter</button>
      </div>
      <div className="my-3 flex items-center">
        <input
          type="text"
          placeholder="Search Dishes"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-danger btn-sm mx-3" onClick={clearFilter}>Clear</button>
      </div>
      <ul>
        {filteredDishes().map((dish, index) => (
          <div key={dish._id}>
            <li><b>Dish {index + 1}</b></li>
            <li>
              Name: <strong>{dish.name}</strong>
            </li>
            <li>
              Description: {dish.description}
            </li>
            <li>
              Veg: {dish.veg === true ? 'Yes' : 'No'}
            </li>
            <li>
              Pictures: {dish.pictures.join(', ')}
            </li>
            <li>
              Ingredients: {dish.ingredients.join(', ')}
            </li>
          </div>
        ))}
      </ul>
      <Link to="/restaurant">Back to Restaurants</Link>
    </div>
  );
}

export default DishList;
