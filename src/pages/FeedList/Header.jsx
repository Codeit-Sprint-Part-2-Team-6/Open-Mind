import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

function Header() {
  return (
    <header>
      <div>
        <Link to='/' aria-label='메인페이지이동'>
          <img src='/images/contents/logo.svg' alt='logo' />
        </Link>
        <button>답변하러 가기</button>
      </div>

      <div>
        <h1>누구에게 질문할까요?</h1>
        <Dropdown />
      </div>
    </header>
  );
}

export default Header;
