import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
      Top
    </ScrollToTopButton>
  );
}

const ScrollToTopButton = styled.button`
  position: fixed;
  top: 5%;
  right: 24px;
  padding: 8px 16px;
  z-index: 200;
  font-size: 14px;
  background-color: ${({ theme }) => theme.brown[40]};
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  transition:
    opacity 0.2s ease,
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.brown[50]};
    transform: scale(1.05);
  }
`;

export default ScrollToTop;
