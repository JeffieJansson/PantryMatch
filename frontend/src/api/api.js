
export const API_URL = 'https://pantrymatch.onrender.com';

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
  if (!ingredients || ingredients.length < 2) {
    throw new Error("Please add at least 2 ingredients.");
  }
  // Create query string
  const query = ingredients.join(",");
  const params = new URLSearchParams({ ingredients: query, mode });
  const res = await fetch(`/api/recipes/search?${params}`);
  const data = await handleResponse(res);
  return data.response;
}

// Fetch recipe details by ID from Spoonacular API (public)
export async function fetchRecipeDetails(recipeId) {
  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) 
    throw new Error(`Failed to fetch recipe details: ${res.status}`);
  return await res.json();
}

// Save a recipe to the database for logged-in user (auth required)
export async function saveRecipe(recipeData, token) {
  const res = await fetch('/api/recipes', {
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
  const res = await fetch('/api/recipes', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await handleResponse(res);
  return data.response;
}

// Delete a saved recipe by ID (auth required)
export async function deleteRecipe(recipeId, token) {
  const res = await fetch(`/api/recipes/${recipeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
}