
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pictures, setPictures] = useState([]);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [availability, setAvailability] = useState('');
  const [cuisinesList, setCuisinesList] = useState([
    {
      name: '',
      description: '',
      dishes: [
        {
          name: '',
          description: '',
          veg: true,
          pictures: [],
          ingredients: [],
        }
      ]
    }
  ]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const restaurantData = {
        name,
        address,
        phone,
        pictures,
        title,
        subtitle,
        availability,
        cuisines: cuisinesList.map((cuisine) => ({
          name: cuisine.name,
          description: cuisine.description,
          veg: cuisine.veg,
          pictures: cuisine.pictures,
          ingredients: cuisine.ingredients,
          dishes: cuisine.dishes.map((dish) => ({
            name: dish.name,
            description: dish.description,
            veg: dish.veg,
            pictures: dish.pictures,
            ingredients: dish.ingredients,
          })),
        })),
      };
  
      if (editingRestaurant) {
        await axios.put(`http://localhost:5000/api/restaurants/${editingRestaurant._id}`, restaurantData);
        setEditingRestaurant(null);
      } else {
        await axios.post('http://localhost:5000/api/restaurants', restaurantData);
      }
  
      fetchRestaurants();
      setName('');
      setAddress('');
      setPhone('');
      setPictures([]);
      setTitle('');
      setSubtitle('');
      setAvailability('');
      setCuisinesList([
        {
          name: '',
          description: '',
          dishes: [
            {
              name: '',
              description: '',
              veg: true,
              pictures: [],
              ingredients: [],
            },
          ],
        },
      ]);
    } catch (error) {
      console.error('Error saving restaurant:', error);
    }
  };
  

  const handleEdit = (restaurant) => {
    setEditingRestaurant(restaurant);
    setName(restaurant.name);
    setAddress(restaurant.address);
    setPhone(restaurant.phone || '');
    setPictures(restaurant.pictures || []);
    setTitle(restaurant.title || '');
    setSubtitle(restaurant.subtitle || '');
    setAvailability(restaurant.availability || '');
  
    const cuisineList = restaurant.cuisines.map((cuisine) => ({
      name: cuisine.name || '',
      description: cuisine.description || '',
      dishes: cuisine.dishes.map((dish) => ({
        name: dish.name || '',
        description: dish.description || '',
        veg: dish.veg || true,
        pictures: dish.pictures || [],
        ingredients: dish.ingredients || [],
      })),
    }));
  
    setCuisinesList(cuisineList);
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/restaurants/${id}`);
      fetchRestaurants();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleAddCuisine = () => {
    setCuisinesList([...cuisinesList, {
      name: '',
      description: '',
      dishes: [{
        name: '',
        description: '',
        veg: true,
        pictures: [],
        ingredients: [],
      }]
    }]);
  };
  
  const handleAddDish = (cuisineIndex) => {
    const updatedCuisinesList = [...cuisinesList];
    updatedCuisinesList[cuisineIndex].dishes.push({
      name: '',
      description: '',
      veg: true,
      pictures: [],
      ingredients: [],
    });
    setCuisinesList(updatedCuisinesList);
  };
  
  const setCuisineField = (cuisineIndex, field, value) => {
    const updatedCuisinesList = [...cuisinesList];
    updatedCuisinesList[cuisineIndex][field] = value;
    setCuisinesList(updatedCuisinesList);
  };
  
  const setDishesField = (cuisineIndex, dishIndex, field, value) => {
    const updatedCuisinesList = [...cuisinesList];
    updatedCuisinesList[cuisineIndex].dishes[dishIndex][field] = value;
    setCuisinesList(updatedCuisinesList);
  };
  

  const handleRemoveCuisine = (index) => {
    const updatedCuisinesList = [...cuisinesList];
    updatedCuisinesList.splice(index, 1);
    setCuisinesList(updatedCuisinesList);
  };
  
  const handleRemoveDish = (cuisineIndex, dishIndex) => {
    const updatedCuisinesList = [...cuisinesList];
    updatedCuisinesList[cuisineIndex].dishes.splice(dishIndex, 1);
    setCuisinesList(updatedCuisinesList);
  };
  

  return (
    <div>
      <h1>Add a Restaurant</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label>Restaurant Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <label>Pictures(Use , seprated for multiple):</label>
        <input type="text" value={pictures} onChange={(e) => setPictures(e.target.value.split(','))} />
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Subtitle:</label>
        <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
        <label>Availability:</label>
        <input type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} />
        <div className='flex justify-center items-center'>
        <div className='my-3'>
          <button className='mr-5 btn btn-primary btn-sm' onClick={handleAddCuisine}>Add New Cuisine</button>
          <button className='mr-5 btn btn-primary btn-sm' type="submit">{editingRestaurant ? 'Update Restaurant' : 'Add Restaurant'}</button>
        </div>
        {editingRestaurant && <button className='btn btn-danger btn-sm' onClick={() => setEditingRestaurant(null)}>Cancel Edit</button>}
        </div>
        {cuisinesList.map((cuisine, cuisineIndex) => (
          <div key={cuisineIndex} className='flex flex-col'>
            <h2 className='my-3'>Cuisine {cuisineIndex + 1} Details:</h2>
            <label>Cuisine Name:</label>
            <input type="text" value={cuisine.name} onChange={(e) => setCuisineField(cuisineIndex, 'name', e.target.value)} required />
            <label>Cuisine Description:</label>
            <input type="text" value={cuisine.description} onChange={(e) => setCuisineField(cuisineIndex, 'description', e.target.value)} />
            <button className='btn btn-danger btn-sm  my-2' onClick={() => handleRemoveCuisine(cuisineIndex)}>Remove Cuisine</button>
            
            {cuisine.dishes.map((dish, dishIndex) => (
              <div key={dishIndex} className='flex flex-col'>
                <h3 className='my-2'>Dish {dishIndex + 1} Details:</h3>
                <label>Dish Name:</label>
                <input type="text" value={dish.name} onChange={(e) => setDishesField(cuisineIndex, dishIndex, 'name', e.target.value)} required />
                <label>Dish Description:</label>
                <input type="text" value={dish.description} onChange={(e) => setDishesField(cuisineIndex, dishIndex, 'description', e.target.value)} />
                <label>Is Veg: <input type="checkbox" checked={dish.veg} onChange={(e) => setDishesField(cuisineIndex, 'veg', e.target.checked)} /></label>
            <label>Dishe Pictures (Use , seprated for multiple):</label>
            <input type="text" value={dish.pictures} onChange={(e) => setDishesField(cuisineIndex, 'pictures', e.target.value.split(','))} />
            <label>Ingredients (Use , seprated for multiple):</label>
            <input type="text" value={dish.ingredients} onChange={(e) => setDishesField(cuisineIndex, 'ingredients', e.target.value.split(','))} />
                <button className='btn btn-danger btn-sm my-2' onClick={() => handleRemoveDish(cuisineIndex, dishIndex)}>Remove Dish</button>
              </div>
            ))}
            
            <button type='button' className='btn btn-primary btn-sm  my-2' onClick={() => handleAddDish(cuisineIndex)}>Add New Dish</button>
          </div>
        ))}
        
      </form>
      <h1 className='my-4'>List of Restaurants</h1>
      <ul>
        {restaurants.map((restaurant,index) => (
          <li key={restaurant._id}>
            <strong>{index+1}.&nbsp; {restaurant.name}</strong> - {restaurant.address}
            <div className='flex'>
            <button className='mx-5 btn btn-primary btn-sm' onClick={() => handleEdit(restaurant)}>Edit</button>
            <button className='btn btn-danger btn-sm' onClick={() => handleDelete(restaurant._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
