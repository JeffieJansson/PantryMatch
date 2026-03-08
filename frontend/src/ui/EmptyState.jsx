import styled from "styled-components";

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmptyTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #353535;
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: #353535;
`;

const EmptyState = () => {
  return (
    <EmptyContainer>
      <EmptyTitle>No saved recipes yet</EmptyTitle>
      <EmptyText>Start searching for recipes and save your favorites!</EmptyText>
    </EmptyContainer>
  );
};

export default EmptyState;
