import styled, { keyframes } from "styled-components";
import { media } from "../styles/media";

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styled Components
const HeroSection = styled.section`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 0.7rem 2rem;
  position: relative;
  overflow: hidden;

  @media ${media.tablet} {
    padding: 3.5rem 1.5rem 2.5rem;
  }
  @media ${media.desktop} {
    padding: 5rem 2rem 4rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(46, 139, 87, 0.03) 1px,
      transparent 1px
    );
    background-size: 50px 50px;
    animation: ${float} 20s ease-in-out infinite;
  }
`;

const LogoContainer = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 1.5rem;
  animation: ${fadeInUp} 0.8s ease-out;
  filter: drop-shadow(0 4px 12px rgba(46, 139, 87, 0.15));

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const TitleWrapper = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
`;

const MainTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 800;
  margin: 0;
  background: linear-gradient(
    135deg,
    #2e8b57 0%,
    #3ba569 25%,
    #48c07a 50%,
    #3ba569 75%,
    #2e8b57 100%
  );
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientShift} 6s ease infinite, ${fadeInUp} 0.8s ease-out 0.2s
    both;
  letter-spacing: -0.02em;
  line-height: 1.1;

  @media (max-width: 768px) {
    letter-spacing: -0.01em;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  color: #555;
  margin: 1.5rem 0 0;
  font-weight: 400;
  max-width: 600px;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
  line-height: 1.6;

  span {
    color: #2e8b57;
    font-weight: 600;
  }
`;

const AccentLine = styled.div`
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #2e8b57, transparent);
  margin: 2rem auto 0;
  border-radius: 2px;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
`;



// Component
const Hero = () => {
  return (
    <HeroSection>
      <LogoContainer>
        <img src="/PantryMatch.svg" alt="PantryMatch Logo" />
      </LogoContainer>
      
      <TitleWrapper>
        <MainTitle>PantryMatch</MainTitle>
        <Subtitle>
          Turn your ingredients into <span>delicious recipes</span>
        </Subtitle>
        <AccentLine />
      </TitleWrapper>
    </HeroSection>
  );
};

export default Hero;