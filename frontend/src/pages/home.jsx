import SearchRecipe from "../components/SearchRecipe";
import styled from "styled-components";
import Hero from "../components/Hero";

const Container = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
    max-width: 98vw;
  }
  @media (min-width: 601px) and (max-width: 1024px) {
    padding: 1.5rem 1rem;
    max-width: 98vw;
  }
  @media (min-width: 1205px) {
    max-width: 1100px;
    padding: 2.5rem 3rem;
  }
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
    <>
    <Hero />
    <Container>
    <Title>What to cook?</Title>
    <Subtitle>Discover recipes based on what you have at home</Subtitle>
  <SearchRecipe />
  </Container>
</>
  );
};

export default Home;
