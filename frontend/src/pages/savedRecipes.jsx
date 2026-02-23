import { useEffect, useState } from "react";
import { getSavedRecipes, deleteRecipe } from "../api/api";
import { useUserStore } from "../stores/userStore";

const SavedRecipes = () => {
  const { user } = useUserStore();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSavedRecipes(user.accessToken);
        setRecipes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    await deleteRecipe(id, user.accessToken);
    setRecipes(recipes.filter(r => r._id !== id));
  };

  return (
    <div>
      <h2>Saved Recipes</h2>
      {recipes.map(recipe => (
        <div key={recipe._id}>
          <h3>{recipe.title}</h3>
          <button onClick={() => handleDelete(recipe._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default SavedRecipes;
