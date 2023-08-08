require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

const upload = multer({ storage });

const mongoURI = process.env.REACT_APP_MONGO_URI;



mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

  const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String },
    pictures: [{ type: String }],
    title: { type: String },
    subtitle: { type: String },
    availability: { type: String },
    cuisines: [{
      name: { type: String, required: true },
      description: { type: String },
      veg: { type: Boolean },
      pictures: [{ type: String }],
      ingredients: [{ type: String }],
      dishes: [{
        name: { type: String, required: true },
        description: { type: String },
        veg: { type: Boolean },
        pictures: [{ type: String }],
        ingredients: [{ type: String }],
      }],
    }],
  });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);


app.get('/api/restaurants', (req, res) => {
  Restaurant.find()
    .then((restaurants) => {
      res.json(restaurants);
    })
    .catch((err) => {
      console.error('Error fetching restaurants:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});


app.post('/api/restaurants', (req, res) => {
  const {
    name,
    address,
    phone,
    pictures,
    title,
    subtitle,
    availability,
    cuisines,
  } = req.body;

  const newCuisines = cuisines.map((cuisine) => ({
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
  }));

  const newRestaurant = new Restaurant({
    name,
    address,
    phone,
    pictures,
    title,
    subtitle,
    availability,
    cuisines: newCuisines,
  });

  newRestaurant.save()
    .then((restaurant) => {
      res.json(restaurant);
    })
    .catch((err) => {
      console.error('Error creating a new restaurant:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});



app.put('/api/restaurants/:id', (req, res) => {
  const { id } = req.params;
  const { name, address, phone, pictures, title, subtitle, availability, cuisines } = req.body;

  const newCuisines = cuisines.map((cuisine) => ({
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
  }));

  Restaurant.findByIdAndUpdate(id,
    {
      name,
      address,
      phone,
      pictures,
      title,
      subtitle,
      availability,
      cuisines: newCuisines,
    },
    { new: true }
  )
    .then((updatedRestaurant) => {
      if (!updatedRestaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.json(updatedRestaurant);
    })
    .catch((err) => {
      console.error('Error updating restaurant:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});


app.delete('/api/restaurants/:id', (req, res) => {
  const { id } = req.params;

  Restaurant.findByIdAndRemove(id)
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.json(restaurant);
    })
    .catch((err) => {
      console.error('Error deleting restaurant:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});




// app.post('/api/restaurants/:id/pictures', upload.array('pictures'), (req, res) => {
//     const { id } = req.params;
//     const picturePaths = req.files.map((file) => file.path);
    
//     Restaurant.findByIdAndUpdate(id, { $push: { pictures: picturePaths } }, { new: true })
//       .then((updatedRestaurant) => {
//         if (!updatedRestaurant) {
//           return res.status(404).json({ error: 'Restaurant not found' });
//         }
//         res.json(updatedRestaurant);
//       })
//       .catch((err) => {
//         console.error('Error uploading pictures:', err);
//         res.status(500).json({ error: 'Internal server error' });
//       });
//   });


app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  
app.get('/api/restaurants/:id/dishes', async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const dishes = restaurant.cuisines.reduce((acc, cuisine) => {
      if (cuisine.dishes && Array.isArray(cuisine.dishes)) {
        acc.push(...cuisine.dishes);
      }
      return acc;
    }, []);

    res.json(dishes);
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
