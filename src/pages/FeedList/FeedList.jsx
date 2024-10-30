import styled from 'styled-components';
import Header from './Header';
import AllSubjects from './AllSubjects';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--Grayscale-20);
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
