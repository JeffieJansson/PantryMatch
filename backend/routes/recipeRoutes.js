import express from "express";
import Recipe from "../model/Recipe.js";
import mongoose from "mongoose";
import axios from "axios";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

// post a new recipe to the database when user clicks on save recipe button in the frontend
router.post("/", authenticateUser, async (req, res) => {
  try {
    // check if user already liked recipe
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


// Get all recipes 
router.get('/', async (req, res) => {
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

// get recipes by id

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


// search for recipes based on ingredients and mode (allowExtra or exact)

router.get("/search", async (req, res) => {
  const { ingredients, mode } = req.query;
  try {
    const params = {
      includeIngredients: ingredients,
      number: 10,
      instructionsRequired: true,
      addRecipeInformation: true,
      apiKey: process.env.SPOONACULAR_API_KEY,
    };
    if (mode === "exact") {
      params.fillIngredients = false;
      params.ignorePantry = true;
    }
    const response = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      { params }
    );


    res.status(200).json({
      success: true,
      message: "Recipes fetched from Spoonacular",
      response: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch recipes from Spoonacular",
      response: error.message || error,
    });
  }
});



  
export default router;