import styled from 'styled-components';
import Header from './Header';
import AllSubjects from './AllSubjects';
import theme from '../../styles/theme';

const Container = styled.div`
  height: 105vh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.gray[20]};

  @media (min-width: 768px) {
    height: 100vh;
  }
`;

function FeedList() {
  return (
    <Container>
      <Header />
      <AllSubjects />
    </Container>
  );
}

export default FeedList;
