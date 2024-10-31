import styled from 'styled-components';
import Header from './Header';
import AllSubjects from './AllSubjects';
import theme from '../../styles/theme';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.gray[20]};
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
