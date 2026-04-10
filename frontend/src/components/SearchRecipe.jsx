import { useState } from "react";
import styled from "styled-components";
import { useRecipeActions } from "../hooks/useRecipeActions";
import RecipeList from "./RecipeList";
import LoadingSpinner from "../ui/LoadingSpinner";
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

  @media ${media.tablet}, ${media.desktop} {
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
`;

const InputWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 2px solid var(--color-tag);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--color-green-light);
    box-shadow: 0 0 0 4px rgba(46, 139, 87, 0.1);
  }

  &::placeholder {
    color: var(--color-label);
  }
`;

const AddButton = styled.button`
  background: var(--color-button);
  color: var(--color-bg);
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 90px;
  transition: background 0.2s;

  &:hover {
    background: var(--color-green);
  }

  &:focus-visible {
    outline: 3px solid var(--color-green-light);
    outline-offset: 2px;
  }

  @media ${media.tablet}, ${media.desktop} {
    width: auto;
    margin-left: 0.5rem;
  }
`;

const IngredientsInfo = styled.div`
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const IngredientsLabel = styled.div`
  font-weight: 600;
  color: var(--color-label);
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const IngredientTag = styled.button`
  display: inline-block;
  background: var(--color-tag);
  color: var(--color-green);
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  margin: 0.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;

  &:hover {
    background: #c8e6c9;
  }

  &:focus-visible {
    outline: 3px solid var(--color-green-light);
    outline-offset: 2px;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
`;

const FilterCard = styled.fieldset`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
  border: none;
`;

const FilterTitle = styled.legend`
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-title);
  margin: 0 0 1.25rem 0;
  padding: 0;
`;

const ModeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ModeOption = styled.label`
  cursor: pointer;
  padding: 1.25rem;
  border: 2px solid ${(props) => (props.checked ? "var(--color-green)" : "var(--color-tag)")};
  border-radius: 12px;
  background: ${(props) => (props.checked ? "var(--color-tag)" : "white")};
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover {
    border-color: var(--color-green-light);
  }

  &:focus-within {
    outline: 3px solid var(--color-green-light);
    outline-offset: 2px;
  }
`;

const ModeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const NativeRadio = styled.input`
  width: 22px;
  height: 22px;
  margin: 0;
  accent-color: var(--color-green);
  cursor: pointer;
`;

const ModeTitle = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: ${(props) => (props.checked ? "var(--color-green)" : "var(--color-title)")};
`;

const ModeDescription = styled.div`
  font-size: 0.85rem;
  color: var(--color-title);
  line-height: 1.4;
  margin-left: 2rem;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: ${(props) => (props.checked ? "var(--color-tag)" : "transparent")}
  transition: 0.2s ease;

  &:focus-within {
    outline: 3px solid var(--color-green-light);
    outline-offset: 2px;
  }
`;

const NativeCheckbox = styled.input`
  width: 22px;
  height: 22px;
  margin: 0;
  accent-color: var(--color-green);
  cursor: pointer;
`;

const CheckboxText = styled.span`
  font-size: 0.95rem;
  color: ${(props) => (props.checked ? "var(--color-green)" : "var(--color-title)")};
`;

const ShowButton = styled.button`
  background: var(--color-button);
  color: var(--color-bg);
  border: none;
  padding: 0.7rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 1rem;
  box-shadow: 0 4px 16px rgba(46, 139, 87, 0.15);
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: var(--color-green);
  }

  &:focus-visible {
    outline: 3px solid var(--color-green-light);
    outline-offset: 2px;
  }

  &:disabled {
    background: var(--color-border);
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.p`
  color: var(--color-error);
  font-weight: 500;
  margin: 1rem 0;
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const LoadMoreButton = styled.button`
  background: white;
  color: var(--color-button);
  border: 2px solid var(--color-button);
  padding: 1rem 2.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: var(--color-button);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(46, 139, 87, 0.2);
  }

  &:disabled {
    background: #f5f5f5;
    color: #ccc;
    border-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const NoMoreText = styled.p`
  text-align: center;
  color: var(--color-label);
  font-style: italic;
  margin: 2rem 0;
  font-size: 0.95rem;
`;

const SearchRecipe = () => {
  const [input, setInput] = useState("");

  const {
    ingredients,
    recipes,
    mode,
    loading,
    error,
    hasSearched,
    filters,
    hasMore,
    setFilters,
    setMode,
    addIngredient,
    removeIngredient,
    searchRecipes,
    loadMoreRecipes,
  } = useRecipeActions();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();

    if (trimmed && !ingredients.includes(trimmed)) {
      addIngredient(trimmed);
      setInput("");
    }
  };

  const toggleFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Section>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            id="ingredient-input"
            type="text"
            placeholder="onion, garlic, chicken..."
            value={input}
            onChange={handleInputChange}
            aria-label="Add ingredient"
          />
        </InputWrapper>

        <AddButton type="submit">Add</AddButton>
      </Form>

      {ingredients.length > 0 && (
        <IngredientsInfo>
          <IngredientsLabel>Ingredients ({ingredients.length})</IngredientsLabel>

          {ingredients.map((ing) => (
            <IngredientTag
              key={ing}
              type="button"
              onClick={() => removeIngredient(ing)}
              aria-label={`Remove ingredient ${ing}`}
            >
              {ing} ×
            </IngredientTag>
          ))}
        </IngredientsInfo>
      )}

      <FilterSection>
        <FilterCard>
          <FilterTitle>Search Mode</FilterTitle>

          <ModeGrid>
            <ModeOption checked={mode === "exact"}>
              <ModeRow>
                <NativeRadio
                  type="radio"
                  name="search-mode"
                  value="exact"
                  checked={mode === "exact"}
                  onChange={() => setMode("exact")}
                />
                <ModeTitle checked={mode === "exact"}>Exact Match</ModeTitle>
              </ModeRow>
              <ModeDescription>Use only these ingredients</ModeDescription>
            </ModeOption>

            <ModeOption checked={mode === "allowExtra"}>
              <ModeRow>
                <NativeRadio
                  type="radio"
                  name="search-mode"
                  value="allowExtra"
                  checked={mode === "allowExtra"}
                  onChange={() => setMode("allowExtra")}
                />
                <ModeTitle checked={mode === "allowExtra"}>Allow Extras</ModeTitle>
              </ModeRow>
              <ModeDescription>Recipe may contain more</ModeDescription>
            </ModeOption>
          </ModeGrid>
        </FilterCard>

        <FilterCard>
          <FilterTitle>Diet Preferences</FilterTitle>

          <CheckboxGrid>
            <CheckboxLabel checked={filters.vegetarian}>
              <NativeCheckbox
                type="checkbox"
                checked={filters.vegetarian}
                onChange={() => toggleFilter("vegetarian")}
              />
              <CheckboxText checked={filters.vegetarian}>Vegetarian</CheckboxText>
            </CheckboxLabel>

            <CheckboxLabel checked={filters.vegan}>
              <NativeCheckbox
                type="checkbox"
                checked={filters.vegan}
                onChange={() => toggleFilter("vegan")}
              />
              <CheckboxText checked={filters.vegan}>Vegan</CheckboxText>
            </CheckboxLabel>

            <CheckboxLabel checked={filters.dairyFree}>
              <NativeCheckbox
                type="checkbox"
                checked={filters.dairyFree}
                onChange={() => toggleFilter("dairyFree")}
              />
              <CheckboxText checked={filters.dairyFree}>Dairy Free</CheckboxText>
            </CheckboxLabel>

            <CheckboxLabel checked={filters.glutenFree}>
              <NativeCheckbox
                type="checkbox"
                checked={filters.glutenFree}
                onChange={() => toggleFilter("glutenFree")}
              />
              <CheckboxText checked={filters.glutenFree}>Gluten Free</CheckboxText>
            </CheckboxLabel>
          </CheckboxGrid>
        </FilterCard>
      </FilterSection>

      <ShowButton
        type="button"
        onClick={searchRecipes}
        disabled={loading || ingredients.length < 1}
      >
        {loading ? "Searching..." : "Show recipes"}
      </ShowButton>

      {loading && <LoadingSpinner />}
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {recipes && recipes.length > 0 && (
        <>
          <RecipeList recipes={recipes} />
          
          {hasMore && (
            <LoadMoreContainer>
              <LoadMoreButton
                onClick={loadMoreRecipes}
                disabled={loading}
              >
                {loading ? "Loading..." : `Load More (${recipes.length} shown)`}
              </LoadMoreButton>
            </LoadMoreContainer>
          )}
          
          {!hasMore && (
            <NoMoreText>
              No more recipes available. Showing all {recipes.length} results!
            </NoMoreText>
          )}
        </>
      )}

      {hasSearched && !loading && !error && recipes.length === 0 && (
        <p>No recipes found. Try different ingredients!</p>
      )}
    </Section>
  );
};

export default SearchRecipe;