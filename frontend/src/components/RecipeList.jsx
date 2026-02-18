import RecipeCard from "./RecipeCard";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #222;
`;

const RecipeList = ({ recipes }) => {
  if (!recipes || recipes.length === 0) return null;

  return (
    <Container>
      <Title>Found {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}</Title>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Container>
  );
};

export default RecipeList;