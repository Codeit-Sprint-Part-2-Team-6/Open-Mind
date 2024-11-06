import styled from 'styled-components';
import CommonBtn from '../../components/CommonButton';
import { Link } from 'react-router-dom';

function HomeHeader() {
  return (
    <HomePageHeader>
      <LogoLink to='/'>
        <HomePageLogo src='/images/contents/logo.svg' alt='로고'></HomePageLogo>
      </LogoLink>
      <HomePageBtn>
        <AskLink to='/list'>
          <StyledCommonBtn text='질문하러가기'></StyledCommonBtn>
        </AskLink>
      </HomePageBtn>
    </HomePageHeader>
  );
}
const HomePageHeader = styled.header`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 80px;
  z-index: 2;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    flex-direction: column-reverse;
    margin: 45px 0px 0px 0px;
  }
`;
const LogoLink = styled(Link)`
  width: 248px;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
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

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    display: flex;
    justify-content: right;
    margin: 0px 50px 0px 0px;
  }

  @media (${({ theme }) => theme.typography.device.laptopMn}) {
    margin: 0px 135px 0px 0px;
  }
`;
const StyledCommonBtn = styled(CommonBtn)`
  width: 100%;
  cursor: pointer;
`;
const AskLink = styled(Link)``;
export default HomeHeader;
