import RecipeCard from "./RecipeCard";

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
