import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserStore } from "../stores/userStore";
import { getSavedRecipes, deleteRecipe } from "../api/api";
import { media } from "../styles/media";
import CopyButton from "../components/CopyButton";
import LoadingSpinner from "../components/LoadingSpinner";

const Container = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
    max-width: 98vw;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2e8b57;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2.5rem;
`;
const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin: 2rem 0;

  @media ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.5rem;
`;

const RecipeTitle = styled.h3`
  margin: 0.5rem 0;
  color: #222;
`;

const Info = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0.3rem 0;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ToggleBtn = styled.button`
  background: none;
  border: 1px solid #2e8b57;
  color: #2e8b57;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:hover {
    background: #2e8b57;
    color: white;
  }
`;

const DeleteBtn = styled.button`
  background: #c0392b;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    background: #a93226;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #666;

  h3 {
    margin-bottom: 1rem;
  }
`;

const Details = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;

  h4 {
    margin-top: 1rem;
    color: #222;
  }

  ul {
    padding-left: 1.5rem;
  }

  li {
    margin: 0.3rem 0;
  }
`;

const SavedRecipes = () => {
  const { user } = useUserStore();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (user) {
      fetchSavedRecipes();
    }
  }, [user]);

  const fetchSavedRecipes = async () => {
    try {
      setLoading(true);
      const data = await getSavedRecipes(user.accessToken);
      console.log("Fetched saved recipes:", data); // Debug
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recipeId) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    try {
      await deleteRecipe(recipeId, user.accessToken);
      setRecipes(recipes.filter(r => r._id !== recipeId));
    } catch (err) {
      alert("Failed to delete recipe");
    }
  };

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <Container>
        <Title>Saved Recipes</Title>
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>Saved Recipes</Title>
        <p style={{ textAlign: 'center', color: '#c0392b' }}>Error: {error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Saved Recipes</Title>
      <Subtitle>Your recipe collection</Subtitle>

      {recipes.length === 0 ? (
        <EmptyState>
          <h3>No saved recipes yet</h3>
          <p>Start searching for recipes and save your favorites!</p>
        </EmptyState>
      ) : (
        <RecipeGrid>
          {recipes.map((recipe) => {
            const isExpanded = expandedId === recipe._id;

            return (
              <Card key={recipe._id}>
                {recipe.image && <Image src={recipe.image} alt={recipe.title} />}
                <RecipeTitle>{recipe.title}</RecipeTitle>
                
                <Info>
                  {recipe.readyInMinutes && `⏱️ ${recipe.readyInMinutes} min`}
                  {recipe.servings && ` | 🍽️ ${recipe.servings} servings`}
                </Info>

                <ButtonRow>
                  <ToggleBtn onClick={() => toggleDetails(recipe._id)}>
                    {isExpanded ? "Show less" : "Show more"}
                  </ToggleBtn>
                  <DeleteBtn onClick={() => handleDelete(recipe._id)}>
                    Delete
                  </DeleteBtn>
                </ButtonRow>

              {isExpanded && (
                  <Details>
                    <CopyButton url={recipe.sourceUrl || `https://spoonacular.com/recipes/${recipe.title.toLowerCase().replace(/\s+/g, "-")}-${recipe.spoonacularId}`} />
                    {recipe.summary && (
                      <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                    )}

                    <h4>Ingredients:</h4>
                      <ul>
                        {recipe.extendedIngredients?.map((ing, index) => (
                          <li key={index}>{ing.original || ing.name}</li>
                        ))}
                      </ul>

                    <h4>Instructions:</h4>
                      {recipe.analyzedInstructions?.length > 0 ? (
                        <ol>
                          {recipe.analyzedInstructions[0].steps.map((step) => (
                            <li key={step.number}>{step.step}</li>
                          ))}
                        </ol>
                      ) : recipe.instructions ? (
                        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                      ) : (
                        <p>No instructions available</p>
                      )}
                  </Details>
                )}
              </Card>
            );
          })}
        </RecipeGrid>
      )}
    </Container>
  );
};

export default SavedRecipes;