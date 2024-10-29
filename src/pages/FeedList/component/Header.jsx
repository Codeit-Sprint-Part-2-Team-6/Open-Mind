import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../../styles/theme';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 12px;

  @media ${theme.typography.device.tabletMn} {
    justify-content: flex-start;
    padding-left: 14px;
  }
`;

const Logo = styled.img`
  width: 146px;
  height: 57px;
`;

function Header() {
  return (
    <HeaderContainer>
      <Link to='/' aria-label='메인페이지이동'>
        <Logo src='/images/contents/logo.svg' alt='logo' />
      </Link>
    </HeaderContainer>
  );
}

export default Header;
