import express from "express";
import Recipe from "../model/Recipe.js";
import mongoose from "mongoose";
import axios from "axios";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();


// (GET)Search for recipes based on ingredients and mode (allowExtra or exact)
router.get("/search", async (req, res) => {
  const { ingredients, mode } = req.query;

  if (!ingredients) {
    return res.status(400).json({
      success: false,
      message: "Ingredients are required",
      response: null,
    });
  }

  // split ingredients by comma and trim whitespace, also filter out empty strings
  const ingredientList = ingredients.split(",").map(i => i.trim()).filter(Boolean);
  
  if (ingredientList.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least 2 ingredients",
      response: null,
    });
  }

  //  ingredient list for the API call
  try {
    const params = {
      includeIngredients: ingredients,
      number: 15,
      instructionsRequired: true,
      addRecipeInformation: true,
      ranking: 2, // 1 = maximize used ingredients, 2 = minimize missing ingredients
      apiKey: process.env.SPOONACULAR_API_KEY,
    };
    
    if (mode === "exact") {
      params.fillIngredients = false;
      params.ignorePantry = false;
    }
    
    const response = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      { params }
    );

    // Extract recipes from response, handle case where data or results might be missing
    const recipes = response.data.results || [];

    // Format the recipes to only include necessary fields for the frontend
    const formattedRecipes = recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      usedIngredients: recipe.usedIngredients || [],
      missedIngredients: recipe.missedIngredients || [],
      likes: recipe.aggregateLikes || 0,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
    }));

    res.status(200).json({
      success: true,
      message: "Recipes fetched from Spoonacular",
      response: formattedRecipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch recipes from Spoonacular",
      response: error.response?.data || error.message,
    });
  }
});

// (GET) Get all saved recipes for logged-in user
router.get("/", authenticateUser, async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user._id });
    res.status(200).json({
      success: true,
      message: "Recipes fetched successfully",
      response: recipes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch recipes",
      response: err.message || err,
    });
  }
});

// (GET) Get recipe by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
        response: null,
      });
    }
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
        response: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Recipe found",
      response: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Recipe couldn't be found",
      response: error.message || error,
    });
  }
});

// (POST) Post a new recipe to the database when user clicks save recipe button
router.post("/", authenticateUser, async (req, res) => {
  try {
    // Check if user already saved this recipe
    const existing = await Recipe.findOne({
      userId: req.user._id,
      spoonacularId: req.body.spoonacularId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Recipe already saved",
        response: null,
      });
    }

    const recipe = new Recipe({
      ...req.body,
      userId: req.user._id,
    });

    await recipe.save();

    res.status(201).json({
      success: true,
      message: "Recipe saved successfully",
      response: recipe,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to save recipe",
      response: err.message || err,
    });
  }
});

// (DELETE) Delete a saved recipe
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id, // make sure user can only delete their own saved recipes
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found or you don't have permission to delete it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
      response: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete recipe",
      response: error.message,
    });
  }
});

export default router;