import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  unit: String,
  original: String
}, { _id: false });

const recipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  spoonacularId: {
    type: Number,
    required: true,
  },
  title: String,
  image: String,
  summary: String,
  readyInMinutes: Number,
  servings: Number,
  extendedIngredients: [ingredientSchema], // detailed ingredient info from Spoonacular
  instructions: String, // HTML or plain text from Spoonacular
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;