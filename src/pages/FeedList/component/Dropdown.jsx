import React from 'react';

function Dropdown({ onSortCard }) {
  return (
    <>
      <div>
        <div onClick={() => onSortCard('name')}>이름순</div>
        <div onClick={() => onSortCard('createdAt')}>최신순</div>
      </div>
    </>
  );
}

export default Dropdown;
