import { useState } from "react";
import styled from "styled-components";
import { useUserStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { fetchRecipeDetails } from "../api/api";
import { saveRecipe } from "../api/api";
import { media } from "../styles/media";

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 6px;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  margin: 0.5rem 0;
  color: #222;
`;

const Info = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0.3rem 0;
`;

const IngredientInfo = styled.p`
  font-size: 0.9rem;
  margin: 0.5rem 0;

  strong {
    font-weight: 600;
  }
`;

const Matched = styled.span`
  color: #2e8b57;
`;

const Missing = styled.span`
  color: #ff6b6b;
`;

const BtnRow = styled.div`
  display: flex;
  justify-content: space-between;
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

const SaveBtn = styled.button`
  background: #ff9800;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:hover {
    background: #e68900;
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


const RecipeCard = ({ recipe }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const handleToggle = async () => {
    if (!isOpen && !details) {
      setLoadingDetails(true);
      try {
        const data = await fetchRecipeDetails(recipe.id);
        setDetails(data);
      } catch (err) {
        console.error("Failed to fetch details:", err);
      } finally {
        setLoadingDetails(false);
      }
    }
    setIsOpen(!isOpen);
  };

const handleSave = async () => {
  if (!user) {
    navigate("/member");
    return;
  }

  try {
    const recipeDetails = details || await fetchRecipeDetails(recipe.id);

    await saveRecipe(
      {
        spoonacularId: recipeDetails.id,
        title: recipeDetails.title,
        image: recipe.image,
        summary: recipeDetails.summary,
        readyInMinutes: recipeDetails.readyInMinutes,
        servings: recipeDetails.servings,
        extendedIngredients: recipeDetails.extendedIngredients,
        instructions: recipeDetails.instructions,
      },
      user.accessToken
    );

    alert("Recipe saved!");
  } catch (error) {
    alert(error.message);
  }
};


  return (
    <Card>
      {recipe.image && <Image src={recipe.image} alt={recipe.title} />}
      <Title>{recipe.title}</Title>
      <IngredientInfo>
        <Matched>
          ✅ Matched: {recipe.usedIngredients?.map((i) => i.name || i.original).join(", ") || "No matched ingredients"}
        </Matched>
      </IngredientInfo>

      <IngredientInfo>
        <Missing>
          ❌ Missing: {recipe.missedIngredients?.map((i) => i.name || i.original).join(", ") || "No missing ingredients"}
        </Missing>
      </IngredientInfo>

      <BtnRow>
      <ToggleBtn onClick={handleToggle}>
        {loadingDetails ? "Loading..." : isOpen ? "Show less" : "Show more"}
      </ToggleBtn>

      <SaveBtn onClick={handleSave}>Save Recipe</SaveBtn>
      </BtnRow>

      {isOpen && details && (
        <Details>          
          <Info>
            ⏱️ {details.readyInMinutes !== null && details.readyInMinutes !== undefined ? `${details.readyInMinutes} min` : 'unknown time'}
            {' | '}
            🍽️ {details.servings !== null && details.servings !== undefined ? `${details.servings} servings` : 'unknown servings'}
          </Info>
          {details.summary && (
            <div dangerouslySetInnerHTML={{ __html: details.summary }} />
          )}

          <h4>All ingredients:</h4>
          <ul>
            {details.extendedIngredients
              ?.filter(
                (ing) =>
                  ing.original &&
                  !/other (things|ingredients) needed/i.test(ing.original)
              )
              .map((ing, index) => (
                <li key={index}>{ing.original}</li>
              ))}
          </ul>

          <h4>Instructions:</h4>
          {details.analyzedInstructions?.length > 0 ? (
            <ol>
              {details.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          ) : details.instructions ? (
            <div dangerouslySetInnerHTML={{ __html: details.instructions }} />
          ) : (
            <p>No instructions available</p>
          )}
        </Details>
      )}
    </Card>
  );
};

export default RecipeCard;