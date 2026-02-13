import { useState } from "react";
import styled from "styled-components";
import { media } from "../styles/media";

const Section = styled.section`
  max-width: 98vw;
  margin: 0 auto;
  padding: 0 0.5rem;

  @media ${media.tablet} {
    max-width: 700px;
    padding: 0;
  }
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: stretch;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
  min-width: 0;
  max-width: 100%;

  @media ${media.tablet} {
    min-width: 350px;
    width: auto;
    font-size: 1.05rem;
    max-width: none;
  }
  @media ${media.desktop} {
    font-size: 1.1rem;
  }
`;

const AddButton = styled.button`
  background: #2e8b57;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  margin-left: 0;
  transition: background 0.2s;
  &:hover {
    background: #119a65;
  }

  @media ${media.tablet} {
    width: auto;
    margin-left: 0.5rem;
    font-size: 1.05rem;
  }
  @media ${media.desktop} {
    font-size: 1.1rem;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
  background: #f7f7f7;
  border-radius: 8px;
  padding: 1.2rem 1rem;
`;

const FilterTitle = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: #222;
  margin-bottom: 1rem;
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Radio = styled.input`
  margin-right: 0.5rem;
`;

const ShowButton = styled.button`
  background: #2e8b57;
  color: #fff;
  border: none;
  padding: 0.7rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 1rem;
  box-shadow: 0 4px 16px rgba(46,139,87,0.15);
  transition: background 0.2s;
  &:hover {
    background: #119a65;
  }
`;

const SearchRecipe = () => {
  const [input, setInput] = useState("");

  return (
    <Section>
      <Form>
        <Input
          type="text"
          placeholder="onion, garlic, chicken..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <AddButton 
          type="button">
            Add
        </AddButton>
     
      </Form>
      <FilterSection>
        <FilterTitle>Filter</FilterTitle>
        <FilterLabel>
          <Radio 
            type="radio" 
            name="filter" 
            defaultChecked 
            />
            Use only these ingredients (no extras allowed)
        </FilterLabel>
        <FilterLabel>
          <Radio 
            type="radio" 
            name="filter" 
            />
            Allow extra ingredients (recipe may contain more)
        </FilterLabel>
      </FilterSection>

      <ShowButton 
          type="button">
          Show recipes
      </ShowButton>
    </Section>
  );
};

export default SearchRecipe;
