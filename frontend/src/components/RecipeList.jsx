import RecipeCard from "./RecipeCard";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: var(--color-title);
`;

const RecipeGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 2rem auto;
  max-width: 900px;
`;


const RecipeList = ({ recipes }) => {
  if (!recipes || recipes.length === 0) return null;

  return (
    <Container>
      <Title>Found {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}</Title>
      <RecipeGrid>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </RecipeGrid>
    </Container>
  );
};

export default RecipeList;