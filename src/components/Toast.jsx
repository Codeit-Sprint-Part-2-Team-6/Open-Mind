import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInOut = keyframes`
  0% { opacity: 0; bottom: 30px; }
  20% { opacity: 1; bottom: 64px; }
  80% { opacity: 1; bottom: 64px; }
  100% { opacity: 0; bottom: 30px; }
`;

const ToastMessage = styled.div`
  position: fixed;
  // bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 0.875rem;
  animation: ${fadeInOut} 5s ease-in-out forwards;
  z-index: 1005;
`;

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return <ToastMessage>{message}</ToastMessage>;
}
