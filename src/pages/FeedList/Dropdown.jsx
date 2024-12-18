import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

function Dropdown({ onSortCard }) {
  const [isDropDown, setIsDropDown] = useState(false);
  const [orderBy, setOrderBy] = useState('최신순');
  const sortingOptions = [
    { label: '이름순', value: 'name' },
    { label: '최신순', value: 'createdAt' },
  ];

  const toggleDropdown = () => setIsDropDown(!isDropDown);

  const handleSortCard = (value, label) => {
    onSortCard(value);
    setOrderBy(label);
    setIsDropDown(false);
  };

  return (
    <DropdownContainer>
      <DropdownBtn onClick={toggleDropdown}>
        {orderBy}
        <img
          src={isDropDown ? 'images/icons/Arrow-up.svg' : 'images/icons/Arrow-down.svg'}
          alt={isDropDown ? '화살표위' : '화살표아래'}
        />
      </DropdownBtn>
      {isDropDown && (
        <DropdownList>
          {sortingOptions.map((option) => (
            <DropdownOption
              key={option.value}
              onClick={() => handleSortCard(option.value, option.label)}
              selected={orderBy === option.label}
            >
              {option.label}
            </DropdownOption>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

export default Dropdown;

const DropdownContainer = styled.div`
  height: 34px;
  background-color: ${theme.gray[10]};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Pretendard';
  line-height: 18px;
  margin-right: 24px;
  @media ${theme.typography.device.tabletMn} {
    margin-top: 20px;
  }
`;

const DropdownBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  padding: 5px 12px;
  cursor: pointer;
  background: none;
  border-color: black;
  border-radius: 8px;
  font-size: inherit;
  font-weight: inherit;
  img {
    width: 16px;
    height: 16px;
    transition: transform 0.3s;
    transform: ${({ isDropDown }) => (isDropDown ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;

const DropdownList = styled.div`
  margin-top: 4px;
  border: 1px solid ${theme.gray[40]};
  background-color: ${theme.gray[10]};
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Pretendard';
  line-height: 18px;
  cursor: pointer;
`;

const DropdownOption = styled.div`
  height: 28px;
  padding: 8px;
  text-align: center;
  color: ${({ selected }) => (selected ? theme.blue[50] : 'inherit')};
  &:hover {
    background-color: ${theme.blue[50]};
    color: blue;
  }
`;
