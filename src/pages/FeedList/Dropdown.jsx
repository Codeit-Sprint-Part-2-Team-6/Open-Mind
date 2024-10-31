import React, { useState } from 'react';
import styled from 'styled-components';

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
    <div>
      <button onClick={toggleDropdown}>
        {orderBy}
        <img src='images/icons/Arrow-up.svg' alt='드롭다운 토글' />
      </button>

      {isDropDown && (
        <div>
          {sortingOptions.map((option) => (
            <div key={option.value} onClick={() => handleSortCard(option.value, option.label)} >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
