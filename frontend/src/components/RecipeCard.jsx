import { useState } from "react";
import styled from "styled-components";
import { useUserStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { fetchRecipeDetails, saveRecipe } from "../api/api";
import ShareButton from "../ui/ShareButton";
import { media } from "../styles/media";

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

const Title = styled.h3`
  margin: 0.5rem 0;
  color: #222;
`;

const Info = styled.p`
  font-size: 0.9rem;
  color: #353535;
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
  color: #1D5334;
`;

const Missing = styled.span`
  color: #990606;
`;

const BtnRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ToggleBtn = styled.button`
  background: none;
  border: 1px solid #1D5334;
  color: #1D5334;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:hover {
    background: #1D5334;
    color: white;
  }
`;

const SaveBtn = styled.button`
  background: #FFEACC;
  color: #1D5334;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #1D5334;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.95rem;
  transition: all 0.2s;

`;

const SavedBtn = styled(SaveBtn)`
  background: #e8f5e9;
  color: #1D5334;
  border: 1px solid #1D5334;
  cursor: default;

   &:disabled {
    cursor: not-allowed;
  }
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

const ErrorMsg = styled.p`
  color: #990606;
  font-weight: 500;
  margin: 1rem 0;
`;

const DetailTitle = styled.h4`
  margin: 0;
  color: #222;
  font-weight: bold;
  font-size: 1.1rem;
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

const RecipeCard = ({ recipe }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  
  // State
  const [isOpen, setIsOpen] = useState(false);

  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // handlers
  const handleToggle = async () => {
    if (!isOpen && !details) {
      setLoadingDetails(true);
      setError("");

      try {
        const data = await fetchRecipeDetails(recipe.id);
        setDetails(data);
      } catch (err) {
        setError("Failed to fetch recipe details");
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
      let recipeDetails = details;

      if (!recipeDetails) {
        recipeDetails = await fetchRecipeDetails(recipe.id);
        setDetails(recipeDetails);
      }

      await saveRecipe(
        {
          spoonacularId: recipeDetails.id,
          title: recipeDetails.title,
          image: recipe.image,
          readyInMinutes: recipeDetails.readyInMinutes,
          servings: recipeDetails.servings,
          extendedIngredients: recipeDetails.extendedIngredients,
          instructions: recipeDetails.instructions,
          analyzedInstructions: recipeDetails.analyzedInstructions,
        },
        user.accessToken
      );

      setSaved(true);
      setError("");

    } catch (error) {
      if (error.message === "Recipe already saved") {
        setSaved(true);
        setError("You have already saved this recipe."); // specific message for duplicate save
      } else {
        setError(error.message);
      }
    }
  };

  // helper variables 
  const matchedIngredients = recipe.usedIngredients
    ?.map((i) => i.name || i.original)
    .join(", ") || "No matched ingredients";

  const missingIngredients = recipe.missedIngredients
    ?.map((i) => i.name || i.original)
    .join(", ") || "No missing ingredients";

  const displayTime = details?.readyInMinutes 
    ? `${details.readyInMinutes} min` 
    : "unknown time";

  const displayServings = details?.servings 
    ? `${details.servings} servings` 
    : "unknown servings";

  const recipeUrl = details?.sourceUrl || `https://spoonacular.com/recipes/${recipe.id}`;

  return (
    <Card>
      <CardTop>
        <Image src={recipe.image} alt={recipe.title} />

          <CardContent>
            <Title>{recipe.title}</Title>

            <IngredientInfo>
              <Matched>✅ Matched: {matchedIngredients}</Matched>
            </IngredientInfo>

            <IngredientInfo>
              <Missing>❌ Missing: {missingIngredients}</Missing>
            </IngredientInfo>

            <BtnRow>
              <ToggleBtn onClick={handleToggle}>
                {loadingDetails ? "Loading..." : isOpen ? "Show less" : "Show more"}
              </ToggleBtn>

              {saved ? (
                <SavedBtn 
                disabled
                aria-label={`${recipe.title} is already saved in your collection`}
                >
                Saved
                </SavedBtn>
              ) : (
                <SaveBtn 
                  onClick={handleSave}
                  aria-label={`Save ${recipe.title} to your collection`}
                  >
                  Save Recipe
                </SaveBtn>
              )}
            </BtnRow>

            {error && <ErrorMsg>{error}</ErrorMsg>}
          </CardContent>
        </CardTop>

        {isOpen && details && (
          <Details>
            <Info>
              ⏱️ {displayTime} | 🍽️ {displayServings}
              <ShareButton url={recipeUrl} />
            </Info>

            <IngredientContainer>
            <DetailTitle>All ingredients:</DetailTitle>
            <ul>
              {details.extendedIngredients
                ?.filter((ing) => 
                  ing.original && !/other (things|ingredients) needed/i.test(ing.original)
                )
                .map((ing, index) => (
                  <li key={index}>{ing.original}</li>
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
  };
export default RecipeCard;