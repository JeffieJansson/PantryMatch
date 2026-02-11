import { useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  max-width: 700px;
  margin: 0 auto;
  
`;


const Form = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  min-width: 350px;
`;

const AddButton = styled.button`
  background: #2e8b57;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
  transition: background 0.2s;
  &:hover {
    background: #119a65;
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
