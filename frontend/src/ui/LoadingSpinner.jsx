import styled from "styled-components";
import { media } from "../styles/media";

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2e8b57;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media ${media.tablet} {
    width: 50px;
    height: 50px;
  }

  @media ${media.desktop} {
    width: 60px;
    height: 60px;
  }
`;

const LoadingSpinner = () => <Spinner />;

export default LoadingSpinner;
