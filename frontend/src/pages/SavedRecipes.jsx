import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserStore } from "../stores/userStore";
import { getSavedRecipes, deleteRecipe } from "../api/api";
import { media } from "../styles/media";
import ShareButton from "../ui/ShareButton";
import LoadingSpinner from "../ui/LoadingSpinner";
import EmptyState from "../ui/EmptyState";
import { MdDelete } from "react-icons/md";

const Container = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2e8b57;
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
  color: #353535;
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
  background: #ab0303;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;

`;

const ErrorMsg = styled.p`
  color: #ab0303;
  font-weight: 500;
  margin: 1rem 0;
  text-align: center;
`;

const Details = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;

  ul {
    padding-left: 1.5rem;
  }

  li {
    margin: 0.3rem 0;
  }
`;

const DetailTitle = styled.h4`
  margin-top: 1rem;
  color: #222;
`;

const IngredientContainer = styled.div`
  background: #e8f5e9;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin-top: 1rem;
`;

const InstructionList = styled.ol`
  padding-left: 0.1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  counter-reset: step;
`;

const InstructionStep = styled.li`
  margin-bottom: 0.7rem;
  line-height: 1.5;
  position: relative;
  list-style: none;
  counter-increment: step;

  &::before {
    content: counter(step);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.7rem;
    height: 1.7rem;
    margin-right: 0.7rem;
    background: #22633E;
    color: #fff;
    border-radius: 50%;
    font-weight: bold;
    font-size: 1rem;
  }
`;

const InstructionHtml = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const InstructionContainer = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin-top: 1rem;
`;

const SavedRecipes = () => {
  const { user } = useUserStore();

  //state
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

  //handlers
  const fetchSavedRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getSavedRecipes(user.accessToken);
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
  
  //loading state
  if (loading) {
    return (
      <Container>
        <Title>Saved Recipes</Title>
        <LoadingSpinner />
      </Container>
    );
  }
  //error state
  if (error) {
    return (
      <Container>
        <Title>Saved Recipes</Title>
        <ErrorMsg>Error: {error}</ErrorMsg>
      </Container>
    );
  }

  // Main render
  return (
    <Container>
      <Title>Saved Recipes</Title>
      {deleteError && <ErrorMsg>{deleteError}</ErrorMsg>}
      
      {/* show empty state if no saved recipes, otherwise show recipe grid */}
        {recipes.length === 0 ? (
          <EmptyState />
        ) : (
          <RecipeGrid>
            {recipes.map((recipe) => {
              const isExpanded = expandedId === recipe._id;

              //helper variables
              const displayTime = recipe.readyInMinutes 
                ? `${recipe.readyInMinutes} min` 
                : "unknown time";

              const displayServings = recipe.servings 
                ? `${recipe.servings} servings` 
                : "unknown servings";

              const recipeUrl = recipe.sourceUrl || 
                `https://spoonacular.com/recipes/${recipe.title.toLowerCase().replace(/\s+/g, "-")}-${recipe.spoonacularId}`;

              return (
                <Card key={recipe._id}>
                  <CardTop>
                    <Image src={recipe.image} alt={recipe.title} />
                    <CardContent>
                      <RecipeTitle>{recipe.title}</RecipeTitle>

                      <Info>
                        ⏱️ {displayTime} | 🍽️ {displayServings}
                      </Info>

                      <ButtonRow>
                        <ToggleBtn 
                          onClick={() => toggleDetails(recipe._id)}>
                          {isExpanded ? "Show less" : "Show more"}
                        </ToggleBtn>

                        <DeleteBtn 
                          onClick={() => handleDelete(recipe._id)}
                          aria-label={`Delete ${recipe.title} from your saved recipes`}>
                          <MdDelete />
                        </DeleteBtn>
                      </ButtonRow>

                    </CardContent>
                  </CardTop>

                  {isExpanded && (
                    <Details>
                      <ShareButton url={recipeUrl} />

                      <IngredientContainer>
                        <DetailTitle>Ingredients:</DetailTitle>
                        <ul>
                          {recipe.extendedIngredients?.map((ing, index) => (
                            <li key={index}>{ing.original || ing.name}</li>
                          ))}
                        </ul>
                      </IngredientContainer>

                      <InstructionContainer>
                        <DetailTitle>Instructions:</DetailTitle>
                        {recipe.analyzedInstructions?.length > 0 ? (
                          <InstructionList>
                            {recipe.analyzedInstructions[0].steps.map((step) => (
                              <InstructionStep key={step.number}>{step.step}</InstructionStep>
                            ))}
                          </InstructionList>
                        ) : recipe.instructions ? (
                          <InstructionHtml dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                        ) : (
                          <p>No instructions available</p>
                        )}
                      </InstructionContainer>
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