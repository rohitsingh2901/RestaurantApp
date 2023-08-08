
import React from 'react';

function Dish({ dish }) {
  return (
    <div>
      <h3>{dish.name}</h3>
      <p>Description: {dish.description}</p>
      <p>Veg: {dish.veg ? 'Yes' : 'No'}</p>
      <p>Ingredients: {dish.ingredients.join(', ')}</p>
      <div>
        {dish.pictures.map((picture, index) => (
          <img key={index} src={picture} alt={`Picture ${index}`} />
        ))}
      </div>
    </div>
  );
}

export default Dish;
