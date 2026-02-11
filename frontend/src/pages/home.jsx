import SearchRecipe from "../components/SearchRecipe";
import styled from "styled-components";

const Container = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  
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
const Home = () => {
  return (
    <Container>
    <Title>What to cook?</Title>
    <Subtitle>Discover recipes based on what you have at home</Subtitle>
  <SearchRecipe />
  </Container>

  );
};

export default Home;
