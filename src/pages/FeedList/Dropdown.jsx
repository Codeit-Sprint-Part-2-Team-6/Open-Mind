import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--Grayscale-60);
  background-color: var(--Grayscale-10);
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 12px 8px 12px;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 5px 12px;
  font-weight: inherit;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
    transform: ${(props) => (props.isDropdownVisible ? 'rotate(0deg)' : 'rotate(180deg)')};
    transition: transform 0.3s;
  }
`;

function Dropdown() {
  // const [isDropDown, setIsDropDown] = useState(false);
  // const [orderBy, setOrderBy] = useState('최신순');

  return (
    <DropdownContainer>
      <DropdownButton>
        {'최신순'}
        <img src='images/icons/Arrow-up.svg' alt='드롭다운 토글' />
      </DropdownButton>
    </DropdownContainer>
  );
}

export default Dropdown;
