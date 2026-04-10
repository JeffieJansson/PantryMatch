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
  
  offset: 0,
  hasMore: true,
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
  
  setOffset: (offset) => set({ offset }),
  setHasMore: (hasMore) => set({ hasMore }),

  appendRecipes: (newRecipes) => set((state) => ({
    recipes: [...state.recipes, ...newRecipes],
  })),
  
  resetSearch: () => set({
    recipes: [],
    offset: 0,
    hasMore: true,
    hasSearched: false,
    error: null,
  }),
}));