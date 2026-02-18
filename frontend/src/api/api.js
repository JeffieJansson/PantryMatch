
export const API_URL = 'https://pantrymatch.onrender.com';
//export const API_URL = 'http://localhost:8080';

// Helper to handle fetch responses
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }
  return response.json();
}

// Fetch recipes by ingredients from backend API
export async function fetchRecipeByIngredients(ingredients, mode = "allowExtra") {
  const query = ingredients.join(",");
  const params = new URLSearchParams({ 
    ingredients: query,
    mode: mode
  });
  const res = await fetch(`${API_URL}/recipes/search?${params}`);
  const data = await handleResponse(res);
  return data.response;
}

// Fetch recipe details by ID from Spoonacular API (public)
export async function fetchRecipeDetails(id) {
  const res = await fetch(`${API_URL}/recipes/details/${id}`);
  const data = await handleResponse(res);
  return data.response;
}

// get details for a single recipe
export async function fetchSavedRecipeDetails(id) {
  const res = await fetch(`${API_URL}/recipes/saved/${id}`);
  const data = await handleResponse(res);
  return data.response;
}

// Save a recipe to the database for logged-in user (auth required)
export async function saveRecipe(recipeData, token) {
  const res = await fetch(`${API_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  });
  return handleResponse(res);
}

// Get all saved recipes for logged-in user (auth required)
export async function getSavedRecipes(token) {
  const res = await fetch(`${API_URL}/recipes`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  const data = await handleResponse(res);
  return data.response;
}

// Delete a saved recipe by ID (auth required)
export async function deleteRecipe(recipeId, token) {
  const res = await fetch(`${API_URL}/recipes/${recipeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}` 
    },
  });
  return handleResponse(res);
}