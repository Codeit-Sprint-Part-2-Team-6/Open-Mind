import styled from 'styled-components';
import HomeHeader from './HomepageHeader';
import HomeForm from './HomepageForm';

function HomePage() {
  return (
    <HomePageContainer>
      <HomeHeader />
      <HomeForm />
    </HomePageContainer>
  );
}
const HomePageContainer = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.gray[20]};
`;
export default HomePage;
