import styled from 'styled-components';
import Header from './component/Header';
import AllSubjects from './component/AllSubjects';

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
