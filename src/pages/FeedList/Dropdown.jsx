import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  height: 34px;
  border: 1px solid var(--Grayscale-60);
  background-color: var(--Grayscale-10);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 5px 12px;
  width: 100%;
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
  padding: 4px;
  text-align: center;
  color: ${(props) => (props.isActive ? '#1877F2' : '#515151')};
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
    onSortCard(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        {orderBy}
        <img src='images/icons/Arrow-up.svg' alt='드롭다운 토글' />
      </DropdownButton>
      {isDropDown && (
        <DropdownList>
          {sortingOptions.map((option) => (
            <DropdownOption
              key={option.value}
              isActive={orderBy === option.label}
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
