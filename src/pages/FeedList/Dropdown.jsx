import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  height: 34px;
  margin-top: 20px;
  border: 1px solid var(--Grayscale-60);
  background-color: var(--Grayscale-10);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 100;
`;

const DropdownButton = styled.button`
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
  height: 64px;
  border: 1px solid #8c8c8c;
  background-color: var(--Grayscale-10);
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

const DropdownOption = styled.div`
  height: 28px;
  padding: 8px;
  text-align: center;
`;

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
      <DropdownButton onClick={toggleDropdown}>
        {orderBy}
        <img
          src={isDropDown ? 'images/icons/Arrow-up.svg' : 'images/icons/Arrow-down.svg'}
          alt={isDropDown ? '화살표위' : '화살표아래'}
        />
      </DropdownButton>

      {isDropDown && (
        <DropdownList>
          {sortingOptions.map((option) => (
            <DropdownOption
              key={option.value}
              onClick={() => handleSortCard(option.value, option.label)}
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
