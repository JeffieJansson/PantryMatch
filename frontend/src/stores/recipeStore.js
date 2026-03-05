import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  ingredients: [],
  recipes: [],
  mode: "allowExtra",
  loading: false,
  hasSearched: false,
  error: null,
  filters: {
    vegetarian: false,
    vegan: false,
    dairyFree: false,
    glutenFree: false,
  },

  setMode: (mode) => set({ mode }),
  setFilters: (filters) => set({ filters }),

  addIngredient: (ing) =>
    set((state) => ({
      ingredients: [...state.ingredients, ing],
    })),

  removeIngredient: (ing) =>
    set((state) => ({
      ingredients: state.ingredients.filter((i) => i !== ing),
    })),
    
  setRecipes: (recipes) => set({ recipes }),
  setLoading: (loading) => set({ loading }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
  setError: (error) => set({ error }),
}));