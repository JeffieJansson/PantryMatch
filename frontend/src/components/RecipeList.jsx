import RecipeCard from "./RecipeCard";


// TODO: show list of recipes with basic info:
// - image
// - title
// - ingredients used (those that match the user's search)
// - missing ingredients
// - servings
// - summary

const RecipeList = ({ recipes }) => {
  if (!recipes || recipes.length === 0) return <p>No recipes found.</p>;
  return (
    <div>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
