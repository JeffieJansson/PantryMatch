import RecipeCard from "./RecipeCard";
import styled from "styled-components";
import { media } from "../styles/media";

const Container = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #222;
`;

const RecipeGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;

  @media ${media.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
  }
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