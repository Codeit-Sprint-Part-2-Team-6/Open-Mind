import React from 'react';
import Dropdown from './Dropdown';

function Header() {
  return (
    <div>
      <div>
        <img alt='logo' />
        <button>답변하러 가기</button>
      </div>

      <div>
        <h1>누구에게 질문할까요?</h1>
        <Dropdown />
      </div>
    </div>
  );
}

export default Header;
