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
    padding-left: 130px;
    padding-right: 130px;
  }
`;

const Logo = styled.img`
  width: 146px;
  height: 57px;
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

  const handleAnswerBtn = () => {
    const subjectId = localStorage.getItem('subjectId');
    if (subjectId) {
      navigate(`/post/${subjectId}/answer`);
    } else {
      navigate('/');
    }
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
