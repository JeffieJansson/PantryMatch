import { create } from "zustand";

export const useRecipeStore = create((set) => ({

  ingredients: [],
  recipes: [],
  loading: false,
  error: null,

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
  setError: (error) => set({ error }),

}));
