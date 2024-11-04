import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import CommonBtn from '../../components/CommonButton';
import theme from '../../styles/theme';
import { useUser } from '../../hooks/useStore';
import { useState } from 'react';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 54px;
  position: relative;
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
  position: relative; /* Ensures dropdown is aligned to this parent */
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

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${({ theme }) => theme.gray[20]};
  border: 4px solid ${theme.brown[10]};
  padding: 3px 0;
  width: 160px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const DropdownOption = styled.div`
  margin-top: 4px;
  border: 1px solid ${theme.gray[40]};
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  font-family: 'Pretendard';
  line-height: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.blue[50]};
    color: blue;
  }
`;

function Header() {
  const navigate = useNavigate();
  const { getUserIds } = useUser();
  const userKeys = getUserIds();
  const [isDropDown, setIsDropDown] = useState(false);

  const handleAnswerBtn = () => {
    setIsDropDown((prev) => !prev);
  };

  const handleSelectKey = (key) => {
    setIsDropDown(false);
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
        <Dropdown show={isDropDown}>
          {userKeys.map((key) => (
            <DropdownOption key={key} onClick={() => handleSelectKey(key)}>
              {key}
            </DropdownOption>
          ))}
        </Dropdown>
      </HomePageBtn>
    </HeaderContainer>
  );
}

export default Header;
