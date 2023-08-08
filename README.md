# Restaurant Management Application 

This repository contains a restaurant management application that allows users to view a list of restaurants, their details, available dishes, and more. The application is built using MongoDB for data storage and provides functionalities for both customers and administrators.

## Features

### Customer View

- **Browse Restaurants:** Users can view a list of restaurants, along with their names, addresses, phone numbers, and pictures.
- **Restaurant Details:** Customers can see detailed information about a restaurant, including its title, subtitle, availability for food, and cuisines offered.
- **Dish Information:** Customers can explore the dishes available in each restaurant, including dish name, description, veg/non-veg category, pictures, ingredients, and more.

### Admin View

- **Add Restaurants:** Administrators have the privilege to add new restaurants to the system. They can input restaurant details such as name, address, phone number, and list of pictures.
- **Manage Dishes:** Admins can add, update, or delete dishes for a restaurant. Each dish can have a name, description, veg/non-veg category, pictures, ingredients, and other customizable fields.
- **Delete Restaurants:** Administrators can also delete entire restaurants from the system.

## Installation

To run the application locally, follow these steps:

1. Clone this repository to your local machine.
   ```
   git clone https://github.com/your-username/restaurant-management-app.git
   ```

2. Install the required dependencies.
   ```
   Change MongoURI = Your_MongoDB_URI
   cd backend
   node server
   ```

3. Set up your MongoDB database and configure the connection in the application.

4. Start the application.
   ```
   npm run start
   ```

## Working Link
https://rohitsingh2901.github.io/RestaurantApp/

## Technologies Used

- MongoDB: Used as the database to store restaurant and dish information.
- Node.js: Provides the backend environment for the application.
- Express.js: A web application framework for Node.js used to build RESTful APIs.
- HTML/CSS: Used for frontend rendering and styling.
- Bootstrap: Frontend framework for responsive and attractive UI.

## Contributing

Contributions are welcome! If you find any bugs or want to add new features, please submit a pull request. For major changes, please open an issue first to discuss the proposed changes.

