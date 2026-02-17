import { useRecipeStore } from "../stores/recipeStore";
import { fetchRecipeByIngredients } from "../api/api";

export const useRecipeActions = () => {
  const {
    ingredients, recipes, mode, loading, error,
    setRecipes, setLoading, setError, setMode, addIngredient,
  } = useRecipeStore();


  const searchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecipeByIngredients(ingredients, mode);
      setRecipes(data);
    } catch (err) {
      setError(err.message);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    ingredients, recipes, mode, loading, error,
    setMode, addIngredient, searchRecipes
  };
};