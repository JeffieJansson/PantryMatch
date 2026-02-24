import { useRecipeStore } from "../stores/recipeStore";
import { useState } from "react";
import { fetchRecipeByIngredients } from "../api/api";

export const useRecipeActions = () => {
  const {
    ingredients,
    recipes,
    mode,
    loading,
    error,
    setRecipes,
    setLoading,
    setError,
    setMode,
    addIngredient,
    removeIngredient,
  } = useRecipeStore();

  const [filters, setFilters] = useState({
    vegetarian: false,
    vegan: false,
    lactoseFree: false,
    dairyFree: false,
    glutenFree: false,
  });

  const searchRecipes = async () => {
    if (ingredients.length < 1) {
      setError("Add at least 1 ingredient");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecipeByIngredients(ingredients, mode, filters);
      setRecipes(data);
    } catch (err) {
      setError(err.message);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    ingredients,
    recipes,
    mode,
    loading,
    error,
    filters,
    setFilters,
    setMode,
    addIngredient,
    removeIngredient,
    searchRecipes,
  };
};