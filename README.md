# PantryMatch – Final Project

PantryMatch is a web app that helps users find recipes based on the ingredients they already have at home. The assignment was to build a fullstack project with user authentication, recipe search, and a modern UI.

## The problem

The challenge was choosing endpoint from Spoonacular adn deciding what parameters I want to use. In the beginning I struggled with making missing and matched ingredients visible. I tried to manually calculate at first, but after experimenting in postman I found the fillIngredients=true parameters that add information about the ingredients and whether they are used or missing in relation to the query. By using postman I solved the struggle and no unnecessary extra code for calculation was needed and also made my code more clean. So in the end I landed on the complex search endpoint 

Technologies used:
- Backend: Node.js, Express, MongoDB, Mongoose, JWT
- Frontend: React, Vite, styled-components, react-icons

If I had more time, I would add:
- Autocomplete a partial input to suggest possible ingredient names.
- User profiles and recipe ratings
- Create an add to shopping list for ingredients
- Pagination or 'more recipes' button 

## View it live

The project is deployed here:
[https://pantrymatch.netlify.app/](https://pantrymatch.onrender.com/)