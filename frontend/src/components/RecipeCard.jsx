import { useState } from "react";
import styled from "styled-components";
import { fetchRecipeDetails } from "../api/api";

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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

  return (
    <Card>
      {recipe.image && <Image src={recipe.image} alt={recipe.title} />}
      <Title>{recipe.title}</Title>
      <IngredientInfo>
        <Matched>
          ✅ Matched: {recipe.usedIngredients?.map((i) => i.name).join(", ") || "No matched ingredients"}
        </Matched>
      </IngredientInfo>

      <IngredientInfo>
        <Missing>
          ❌ Missing: {recipe.missedIngredients?.map((i) => i.name).join(", ") || "No missing ingredients"}
        </Missing>
      </IngredientInfo>

      <ToggleBtn onClick={handleToggle}>
        {loadingDetails ? "Loading..." : isOpen ? "Show less" : "Show more"}
      </ToggleBtn>

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
          <p>{details.instructions || "No instructions available"}</p>
        </Details>
      )}
    </Card>
  );
};

export default RecipeCard;