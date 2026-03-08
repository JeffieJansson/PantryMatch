import SearchRecipe from "../components/SearchRecipe";
import styled from "styled-components";
import { media } from "../styles/media";
import Hero from "../components/Hero";

const Container = styled.div`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media ${media.tablet} {
    padding: 0 1rem;
    gap: 2rem;
  }
  @media ${media.mobile} {
    padding: 0 0.5rem;
    gap: 1rem;
  }
`;

const MainContent = styled.div`
  background: var(--color-bg);
  padding: 3rem;
  border-radius: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media ${media.tablet} {
    padding: 2rem 1.5rem;
    border-radius: 1rem;
  }
  @media ${media.mobile} {
    padding: 1rem 0.5rem;
    border-radius: 0.5rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  color: #1A6A1A;
  font-weight: 900;
  line-height: 1.1;
  text-align: center;

  @media ${media.tablet} {
    font-size: 2.5rem;
  }
  @media ${media.mobile} {
    font-size: 1.7rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--color-text);
  margin-bottom: 3rem;
  text-align: center;
`;

const Home = () => {
  return (
    <>
      <Hero />
      <Container>
        <MainContent>
          <Title>What to cook?</Title>
          <Subtitle>Find the perfect recipe using ingredients you already have.</Subtitle>
          <SearchRecipe />
        </MainContent>
      </Container>
    </>
  );
};

export default Home;