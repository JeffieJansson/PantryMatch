# PantryMatch Backend

This is the backend part of the PantryMatch project.
The server is built with Express and handles users, recipes, and authentication.
External API - Spoonacular

## Structure

- `server.js` – Main file for the Express server
- `routes/` – API routes for users and recipes
- `model/` – Mongoose models for User and Recipe
- `middleware/` – Middleware for authentication

## API Endpoints

### Users
- `POST /api/users/signup` – Create a new user
- `POST /api/users/login` – Log in a user

### Recipes
- `GET /api/recipes` – Get all recipes
- `POST /api/recipes` – Create a new recipe
- `GET /api/recipes/:id` – Get recipe by id

## Environment Variables

Using a `.env` file with :
```
MONGO_URL
Spoonacular API key
```

## Development

- Nodemon is used for automatic restarts
- All code is in ES6 modules