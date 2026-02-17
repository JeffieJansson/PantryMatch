import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 1rem;
  margin-bottom: 1rem;
`;

const RecipeCard = ({ recipe }) => (
  <Card>
    <h3>{recipe.title}</h3>
    {recipe.image && 
    <img 
      src={recipe.image} 
      alt={recipe.title} 
      style={{ width: "100%", 
      borderRadius: "8px" }} 
      />}
    <p>{recipe.details}</p>
  </Card>
);

export default RecipeCard;
