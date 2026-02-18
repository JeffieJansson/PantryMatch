import { useState } from "react";
import styled from "styled-components";
import { useRecipeActions } from "../hooks/useRecipeActions";
import RecipeList from "./RecipeList";
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

  @media ${media.tablet} {
    min-width: 350px;
    width: auto;
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
  transition: background 0.2s;

  &:hover {
    background: #119a65;
  }

  @media ${media.tablet} {
    width: auto;
    margin-left: 0.5rem;
  }
`;

const IngredientsInfo = styled.div`
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const IngredientTag = styled.span`
  display: inline-block;
  background: #e8f5e9;
  color: #2e8b57;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  margin: 0.2rem;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background: #c8e6c9;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
  background: #fff;
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
  cursor: pointer;
`;

const Radio = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
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
  box-shadow: 0 4px 16px rgba(46, 139, 87, 0.15);
  transition: background 0.2s;

  &:hover {
    background: #119a65;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.p`
  color: #d32f2f;
  font-weight: 500;
  margin: 1rem 0;
`;

const SearchRecipe = () => {
  const [input, setInput] = useState("");
  const {
    ingredients,
    recipes,
    mode,
    loading,
    error,
    setMode,
    addIngredient,
    removeIngredient,
    searchRecipes,
  } = useRecipeActions();

  const handleAdd = () => {
    const trimmed = input.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      addIngredient(trimmed);
      setInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  return (
    <Section>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="onion, garlic, chicken..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <AddButton type="submit">Add</AddButton>
      </Form>

      {ingredients.length > 0 && (
        <IngredientsInfo>
          <strong>Ingredients:</strong>{" "}
          {ingredients.map((ing) => (
            <IngredientTag key={ing} onClick={() => removeIngredient(ing)}>
              {ing} ×
            </IngredientTag>
          ))}
        </IngredientsInfo>
      )}

      <FilterSection>
        <FilterTitle>Filter</FilterTitle>
        <FilterLabel>
          <Radio
            type="radio"
            name="filter"
            value="exact"
            checked={mode === "exact"}
            onChange={() => setMode("exact")}
          />
          Use only these ingredients (no extras allowed)
        </FilterLabel>
        <FilterLabel>
          <Radio
            type="radio"
            name="filter"
            value="allowExtra"
            checked={mode === "allowExtra"}
            onChange={() => setMode("allowExtra")}
          />
          Allow extra ingredients (recipe may contain more)
        </FilterLabel>
      </FilterSection>

      <ShowButton onClick={searchRecipes} disabled={loading || ingredients.length < 1}>
        {loading ? "Searching..." : "Show recipes"}
      </ShowButton>

      {error && <ErrorMsg>{error}</ErrorMsg>}
      {recipes && recipes.length > 0 && <RecipeList recipes={recipes} />}
      {!loading && recipes.length === 0 && ingredients.length > 0 && !error && (
        <p>No recipes found. Try different ingredients!</p>
      )}
    </Section>
  );
};

export default SearchRecipe;