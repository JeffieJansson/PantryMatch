import mongoose from "mongoose";

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
  ingredients: [String],
  instructions: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;