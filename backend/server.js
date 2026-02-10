import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import userRoutes from "./routes/user.js";
import recipeRoutes from "./routes/recipes.js";
import dotenv from "dotenv";
dotenv.config();

const mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// documentation of the API with express-list-endpoints
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json([{
    message: "Welcome to the Recipe API. Here are the available endpoints:",
    endpoints: endpoints
  }]);
});

app.use("/user", userRoutes);
app.use("/recipes", recipeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
