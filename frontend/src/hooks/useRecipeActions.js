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
    offset,        
    hasMore,       
    setRecipes,
    setLoading,
    setError,
    setMode,
    setFilters,
    hasSearched,
    setHasSearched,
    setOffset,     
    setHasMore,    
    appendRecipes, 
    resetSearch,   
    addIngredient,
    removeIngredient,
  } = useRecipeStore();

  const searchRecipes = async () => {
    setLoading(true);
    setError(null);
    resetSearch(); 

    try {
      const data = await fetchRecipeByIngredients(ingredients, mode, filters, 0);
      setRecipes(data); 
      setHasSearched(true);
      setOffset(15);
      
      if (data.length < 15) {
        setHasMore(false);
      }

    } catch (err) {
      setError(err.message);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreRecipes = async () => {
    if (!hasMore || loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchRecipeByIngredients(ingredients, mode, filters, offset);
      appendRecipes(data);
      setOffset(offset + 15);
      
      if (data.length < 15) {
        setHasMore(false);
      }
      
    } catch (err) {
      setError(err.message);
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
    hasMore,
    setFilters,
    setMode,
    addIngredient,
    removeIngredient,
    searchRecipes,
    loadMoreRecipes,
  };
};