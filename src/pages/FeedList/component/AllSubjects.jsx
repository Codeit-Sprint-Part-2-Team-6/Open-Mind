import styled from 'styled-components';
import theme from '../../../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: var(--Grayscale-20);

  @media ${theme.typography.device.tabletMn} {
    gap: 8px;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 6px 0;

  @media ${theme.typography.device.tabletMn} {
    flex-direction: column;
    padding: 8px;
    gap: 5px;
  }
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: normal;

  @media ${theme.typography.device.tabletMn} {
    font-size: 2.5rem;
  }
`;

function AllSubjects() {
  return (
    <Container>
      <HeaderContainer>
        <Title>누구에게 질문할까요?</Title>
      </HeaderContainer>
    </Container>
  );
}

export default AllSubjects;
