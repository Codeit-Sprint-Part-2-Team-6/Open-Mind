import styled from 'styled-components';
import {
  overlayFadeIn,
  overlayFadeOut,
  modalSlideUp,
  modalSlideDown,
} from '../../utills/modal-animation.js';

function ConfirmModal({ message, confirmText, onConfirm, onCancel, $isVisible }) {
  return (
    <ModalOverlay $isVisible={$isVisible} onClick={onCancel}>
      <ModalContainer $isVisible={$isVisible} onClick={(e) => e.stopPropagation()}>
        <ConfirmText>{message}</ConfirmText>
        <ButtonContainer>
          <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
          <CancelButton onClick={onCancel}>취소</CancelButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${({ $isVisible }) => ($isVisible ? overlayFadeIn : overlayFadeOut)} 0.3s ease-out
    forwards;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.large};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${({ $isVisible }) => ($isVisible ? modalSlideUp : modalSlideDown)} 0.4s ease forwards;
`;

const ConfirmText = styled.p`
  margin-bottom: 20px;
  font-size: 1rem;
  color: ${({ theme }) => theme.gray[80]};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ConfirmButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.brown[40]};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.gray[30]};
  color: ${({ theme }) => theme.gray[80]};
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default ConfirmModal;
