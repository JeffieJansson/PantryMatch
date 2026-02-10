
import { useState } from "react";
import { API_URL } from "../api";
import styled from "styled-components";


const StyledForm = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  max-width: 350px;
  margin: 2rem auto;
`;

const StyledHeading = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 500;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  margin-top: 0.3rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const StyledButton = styled.button`
  background: #2e8b57;
  color: #fff;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  transition: background 0.2s;
  &:hover {
    background: #256b45;
  }
`;

const AuthActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
`;

const ToggleAuth = styled.span`
  color: #2e8b57;
  cursor: pointer;
  font-size: 0.95rem;
  text-decoration: underline;
`;

const ErrorMessage = styled.p`
  color: #c0392b;
  text-align: center;
  margin-top: 1rem;
`;

export const SignupForm = ({ handleLogin, onToggleAuth }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/user/signup`, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

    
    if (!response.ok && response.status > 499) {
      throw new Error("Server error.");
    }

      const resJson = await response.json();

    if (!resJson.success) {
      throw new Error(resJson.message || "Failed to create user");
    }

      handleLogin(resJson.response);
      // Reset form
      e.target.reset();

    } catch (error) {
      setError(error.message);
      console.log("error occurred during signup", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledHeading>Sign up</StyledHeading>
      <InputsWrapper>
        <StyledLabel>
          Email
          <StyledInput
            onChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
          />
        </StyledLabel>
        <StyledLabel>
          Password
          <StyledInput
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
          />
        </StyledLabel>
      </InputsWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <AuthActions>
        <StyledButton type="submit">Sign up</StyledButton>
        <ToggleAuth onClick={onToggleAuth}>
          Already have an account? Log in
        </ToggleAuth>
      </AuthActions>
    </StyledForm>
  );
};