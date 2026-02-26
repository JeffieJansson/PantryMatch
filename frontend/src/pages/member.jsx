import { LoginForm } from '../components/LoginForm';
import { SignupForm } from '../components/SignupForm';
import styled from "styled-components";


const Intro = styled.div`
  margin-top: 3rem;
  text-align: center;
  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }
  p {
    color: #555;
    font-size: 1.1rem;
  }
`;

const AuthContainer = styled.div`
  margin-top: 2rem;
`;

const Member = ({ user, isSigningUp, setIsSigningUp, handleLogin, handleLogout }) => {
  return (
    <>
      <Intro>
        <h1>What to cook?</h1>
        <p>Sign up or log in and start discovering recipes based on what you have at home</p>
        <p>And save your favorite recipes</p>
      </Intro>
      {!user && (
        <AuthContainer>
          {isSigningUp ? (
            <SignupForm handleLogin={handleLogin} onToggleAuth={() => setIsSigningUp(false)} />
          ) : (
            <LoginForm handleLogin={handleLogin} onToggleAuth={() => setIsSigningUp(true)} />
          )}
        </AuthContainer>
      )}
    </>
  );
};

export default Member;
