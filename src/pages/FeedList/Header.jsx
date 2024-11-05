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
  position: relative;
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
  background-color: ${({ theme }) => theme.gray[10]};
  // padding: 3px 0;
  width: 120px;
  border-radius: 8px;
  z-index: 1000;
  opacity: 0;
  transform: translateY(-10px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  pointer-events: none;

  ${({ show }) =>
    show &&
    `
      display: block;
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    `}

  @media ${theme.typography.device.tabletMn} {
    width: 160px;
  }
`;

const DropdownOption = styled.div`
  width: 90%;
  margin: 4px auto 0;
  padding: 1px 0;
  border: 1px solid ${({ theme }) => theme.gray[40]};
  border-radius: 5px;
  text-align: center;
  font-size: ${(props) => props.theme.typography.caption1.fontSize};
  color: ${({ theme }) => theme.gray[50]};
  font-weight: 400;
  font-family: 'Pretendard';
  line-height: 20px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.red};
    border-color: ${({ theme }) => theme.red};
    opacity: 1;
    transform: translateY(-2px);
  }
`;

function Header() {
  const navigate = useNavigate();
  const { getUserIds, getUserNames } = useUser();
  const userKeys = getUserIds();
  const userNames = getUserNames();
  const [isDropDown, setIsDropDown] = useState(false);

  const handleAnswerBtn = () => {
    setIsDropDown((prev) => !prev);
  };

  const handleSelectName = (index) => {
    setIsDropDown(false);
    const selectedId = userKeys[index];
    const nextPath = selectedId ? `/post/${selectedId}/answer` : '/';
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
          {userNames.map((name, index) => (
            <DropdownOption key={index} onClick={() => handleSelectName(index)}>
              {name}
            </DropdownOption>
          ))}
        </Dropdown>
      </HomePageBtn>
    </HeaderContainer>
  );
}

export default Header;
