import styled from "styled-components";

const Container = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background: var(--color-bg);
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-green-light);
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: var(--color-text);
  margin-bottom: 2.5rem;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
  color: var(--color-title);
`;

const Text = styled.p`
  line-height: 1.7;
  color: var(--color-text);
  font-size: 1rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

const FeatureItem = styled.li`
  margin-bottom: 0.6rem;
  font-size: 1rem;
  color: var(--color-text);

  &::before {
    content: "✔ ";
    color: var(--color-green-light);
    font-weight: bold;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 0.95rem;
`;

const About = () => {
  return (
    <Container>
      <Title>About PantryMatch</Title>
      <Subtitle>Find recipes with what you already have at home</Subtitle>

      <Section>
        <SectionTitle>Our Mission</SectionTitle>
        <Text>
          PantryMatch helps home cooks reduce food waste and save time by
          suggesting recipes based on ingredients they already have. Our goal
          is to make cooking simple, fun, and accessible for everyone.
        </Text>
      </Section>

      <Section>
        <SectionTitle>How It Works</SectionTitle>
        <Text>
          Simply enter the ingredients you have in your kitchen, choose your
          preferred search filters, and get instant recipe suggestions. You can
          explore full cooking instructions and save your favorite recipes for
          later.
        </Text>
      </Section>

      <Section>
        <SectionTitle>Main Features</SectionTitle>
        <FeatureList>
          <FeatureItem>Search recipes by ingredients</FeatureItem>
          <FeatureItem>Filter: exact match or allow extra ingredients, diets and intolerances</FeatureItem>
          <FeatureItem>View full recipe instructions</FeatureItem>
          <FeatureItem>Save favorite recipes (for logged-in users)</FeatureItem>
          <FeatureItem>Personal recipe history</FeatureItem>
        </FeatureList>
      </Section>

      <Section>
        <SectionTitle>Why PantryMatch?</SectionTitle>
        <Text>
          Many people struggle with deciding what to cook and often waste food.
          PantryMatch solves this problem by turning your available ingredients
          into delicious meal ideas in seconds.
        </Text>
      </Section>

      <Footer>
        <p>© 2026 PantryMatch</p>
      </Footer>
    </Container>
  );
};

export default About;
