import { useRecipeStore } from "../stores/recipeStore";
import { fetchRecipeByIngredients } from "../api/api";

export const useRecipeActions = () => {
  const {
    ingredients,
    recipes,
    mode,
    filters,
    loading,
    error,
    setRecipes,
    setLoading,
    setError,
    setMode,
    setFilters,
    hasSearched,
    setHasSearched,
    addIngredient,
    removeIngredient,
  } = useRecipeStore();

  const searchRecipes = async () => {
    if (ingredients.length < 1) {
      setError("Add at least 1 ingredient");
      return;
    }
    setLoading(true);
    setError(null);
    setHasSearched(true);
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
    filters,
    loading,
    error,
    hasSearched,
    setFilters,
    setMode,
    addIngredient,
    removeIngredient,
    searchRecipes,
  };
};