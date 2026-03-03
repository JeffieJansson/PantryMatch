import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserStore } from "../stores/userStore";
import { getSavedRecipes, deleteRecipe } from "../api/api";
import { media } from "../styles/media";
import ShareButton from "../components/ShareButton";
import LoadingSpinner from "../components/LoadingSpinner";

const Container = styled.div`
  margin-top: 2rem;
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
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 2rem auto;
  max-width: 900px;
`;

const Card = styled.div`
  background: #fff;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media ${media.tablet}, ${media.desktop} {
    flex-direction: row;
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 6px;

  @media ${media.tablet}, ${media.desktop} {
    width: 250px;
    height: 170px;
    object-fit: cover;
    flex-shrink: 0;
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const RecipeTitle = styled.h2`
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
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ToggleBtn = styled.button`
  background: none;
  border: 1px solid #22633E;
  color: #22633E;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:hover {
    background: #22633E;
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

const ErrorMsg = styled.p`
  color: #990606;
  font-weight: 500;
  margin: 1rem 0;
  text-align: center;
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
  const [deleteError, setDeleteError] = useState(null);
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
      setDeleteError(null);
    } catch (err) {
      setDeleteError(err.message);
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
        <ErrorMsg>Error: {error}</ErrorMsg>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Saved Recipes</Title>
      <Subtitle>Your recipe collection</Subtitle>
      {deleteError && <ErrorMsg>{deleteError}</ErrorMsg>}

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
            <CardTop>
                {recipe.image && <Image src={recipe.image} alt={recipe.title} />}
              <CardContent>
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
              </CardContent>
            </CardTop>

              {isExpanded && (
                  <Details>
                    <ShareButton url={recipe.sourceUrl || `https://spoonacular.com/recipes/${recipe.title.toLowerCase().replace(/\s+/g, "-")}-${recipe.spoonacularId}`} />
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