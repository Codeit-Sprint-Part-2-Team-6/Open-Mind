import styled from 'styled-components';
import CommonBtn from '../../components/CommonButton';
import { Link } from 'react-router-dom';

const HomePageHeader = styled.header`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 80px;
  z-index: 2;

  @media (min-width: 768px) {
    flex-direction: column-reverse;
    margin: 45px 0px 0px 0px;
  }
`;
const LogoLink = styled(Link)`
  width: 248px;

  @media (min-width: 768px) {
    width: 456px;
    margin: 0 auto;
    margin-top: 70px;
    margin-bottom: 24px;
  }
`;
const HomePageLogo = styled.img`
  width: 100%;
`;
const HomePageBtn = styled.div`
  margin: 0 auto;
  margin-top: 24px;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    display: flex;
    justify-content: right;
    margin: 0px 50px 0px 0px;
  }

  @media (min-width: 1200px) {
    margin: 0px 135px 0px 0px;
  }
`;
const StyledCommonBtn = styled(CommonBtn)`
  width: 100%;
  cursor: pointer;
`;
const AskLink = styled(Link)``;

function HomeHeader() {
  return (
    <HomePageHeader>
      <LogoLink to='/'>
        <HomePageLogo src='/images/contents/logo.svg' alt='로고'></HomePageLogo>
      </LogoLink>
      <HomePageBtn>
        <AskLink to='/'>
          <StyledCommonBtn text='질문하러가기'></StyledCommonBtn>
        </AskLink>
      </HomePageBtn>
    </HomePageHeader>
  );
}
export default HomeHeader;
