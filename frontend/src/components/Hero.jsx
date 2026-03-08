import styled, { keyframes } from "styled-components";
import { media } from "../styles/media";
import { useState, useEffect } from "react";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const cursorBlink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const HeroSection = styled.section`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  
  position: relative;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    min-height: 50vh;
  }
`;

const Container = styled.div`
  text-align: center;
  max-width: 900px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 2rem;
  background: var(--color-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 60%;
    height: 60%;
    object-fit: contain;
  }
`;

const MainTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 300;
  margin: 0 0 1rem 0;
  color: var(--color-title);
  line-height: 1.2;
`;

const BoldText = styled.span`
  font-weight: 900;
  color: var(--color-green-light);
`;

const TypingText = styled.span`
  position: relative;
  color: var(--color-green-light);
  font-weight: 900;

  &::after {
    content: "|";
    position: absolute;
    right: -0.5ch;
    animation: ${cursorBlink} 1s step-end infinite;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--color-text);
  margin: 2rem 0;
  font-weight: 300;
  line-height: 1.6;
`;

const Divider = styled.div`
  width: 80px;
  height: 2px;
  background: var(--color-green-light);
  margin: 3rem auto;
`;

const QuickStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 3rem;

  @media (max-width: 600px) {
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-green-light);
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: var(--color-label);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Hero = () => {
  const words = ["pasta", "salads", "desserts", "soups"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <HeroSection>
      <Container>
        <Logo>
          <img src="/PantryMatch.svg" alt="PantryMatch Logo" loading="lazy" />
        </Logo>
        <MainTitle>
          Find perfect <TypingText key={currentWord}>{words[currentWord]}</TypingText>
          <br />
          with <BoldText>PantryMatch</BoldText>
        </MainTitle>
        <Subtitle>
          Your ingredients. Our recipes. Zero waste.
        </Subtitle>
        <Divider />
        <QuickStats>
          <StatItem>
            <StatNumber>300K+</StatNumber>
            <StatLabel>Recipes</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>15</StatNumber>
            <StatLabel>Cuisines</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>100%</StatNumber>
            <StatLabel>Free</StatLabel>
          </StatItem>
        </QuickStats>
      </Container>

  
    </HeroSection>
  );
};

export default Hero;