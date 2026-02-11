import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
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

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
  color: #333;
`;

const Text = styled.p`
  line-height: 1.7;
  color: #444;
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
  color: #444;

  &::before {
    content: "✔ ";
    color: #2e8b57;
    font-weight: bold;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  color: #777;
  font-size: 0.95rem;
`;

const About = () => {
  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
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
          preferred search mode, and get instant recipe suggestions. You can
          explore full cooking instructions and save your favorite recipes for
          later.
        </Text>
      </Section>

      <Section>
        <SectionTitle>Main Features</SectionTitle>
        <FeatureList>
          <FeatureItem>Search recipes by ingredients</FeatureItem>
          <FeatureItem>Filter: exact match or allow extra ingredients</FeatureItem>
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
