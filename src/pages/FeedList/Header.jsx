import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import CommonBtn from '../../components/CommonButton';
import theme from '../../styles/theme';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 54px;

  @media ${theme.typography.device.tabletMn} {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 40px;
    padding-left: 50px;
    padding-right: 50px;
  }
`;

const Logo = styled.img`
  width: 146px;
  height: 57px;
  margin-top: 40px;

  @media ${theme.typography.device.tabletMn} {
    margin-top: 0px;
  }
`;

const HomePageBtn = styled.div`
  @media ${theme.typography.device.tabletMn} {
    display: flex;
    justify-content: right;
    margin-left: 40px;
  }
`;

const StyledCommonBtn = styled(CommonBtn)`
  width: 100%;
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();
  const data = localStorage.getItem('user-storage'); // user-storage 키와 연결된 데이터를 검색
  const parsedData = JSON.parse(data); // JS 객체로 구문 분석해서 state 및 users와 같은 속성에 문자열 대신 개체로 액세스
  const userIds = Object.keys(parsedData.state.users); // 사용자 ID를 나타내는 parsedData.state 내의 users 객체에서 키를 추출
  // console.log(userIds[userIds.length - 1]);
  const key = userIds[userIds.length - 1]; // 가장 최근의 값을 가져옴

  const handleAnswerBtn = () => {
    const nextPath = key ? `/post/${key}/answer` : '/';
    navigate(nextPath);
  };

  return (
    <HeaderContainer>
      <Link to='/' aria-label='메인페이지이동'>
        <Logo src='/images/contents/logo.svg' alt='logo' />
      </Link>
      <HomePageBtn>
        <StyledCommonBtn text='답변하러가기' onClick={handleAnswerBtn} />
      </HomePageBtn>
    </HeaderContainer>
  );
}

export default Header;
