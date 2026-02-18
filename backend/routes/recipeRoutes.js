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
  if (ingredientList.length < 1) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least 1 ingredient",
      response: null,
    });
  }
  //  ingredient list for the API call
  try {
    const params = {
      ingredients: ingredientList.join(","),
      number: 15,
      ranking: 2,
      ignorePantry: mode === "exact",
      apiKey: process.env.SPOONACULAR_API_KEY,
    };
    const response = await axios.get(
      "https://api.spoonacular.com/recipes/findByIngredients",
      { params }
    );
    // Extract recipes from response, handle case where data or results might be missing

    const recipes = response.data.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      usedIngredients: recipe.usedIngredients || [],
      missedIngredients: recipe.missedIngredients || [],
    }));

    res.status(200).json({
      success: true,
      message: "Recipes fetched from Spoonacular",
      response: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch recipes from Spoonacular",
      response: error.response?.data || error.message,
    });
  }
});

// (GET) Get recipe details by Spoonacular ID
router.get("/details/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: { 
          apiKey: process.env.SPOONACULAR_API_KEY,
          includeNutrition: false
        }
      }
    );

    const details = response.data;

    res.status(200).json({
      success: true,
      response: {
        id: details.id,
        title: details.title,
        summary: details.summary,
        instructions: details.instructions,
        extendedIngredients: details.extendedIngredients,
        readyInMinutes: details.readyInMinutes,
        servings: details.servings,
      }
    });
  } catch (error) {
    console.error("Spoonacular details error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recipe details",
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
router.get("/:id", authenticateUser, async (req, res) => {
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

    if (recipe.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this recipe",
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
        response: null,
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