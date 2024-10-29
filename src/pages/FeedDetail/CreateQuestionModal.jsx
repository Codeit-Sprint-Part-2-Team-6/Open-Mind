import styled from 'styled-components';
import theme from '../../styles/theme';
import { useState } from 'react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 24px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 24px;
  border-radius: 24px;
  box-shadow: ${(props) => props.theme.shadows['large']};
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalTitleWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const MessageIcon = styled.img`
  width: 28px;
  height: auto;
`;

const ModalTitleText = styled.h3`
  font-family: actor-regular;
  font-size: ${(props) => props.theme.typography.body1.fontSize};
`;

const CloseIcon = styled.img`
  width: 22px;
  height: auto;
  cursor: pointer;
`;

const ReceiverNicknameWrapper = styled.div`
  display: flex;
  gap: 4px;
  margin: 40px 0 12px;
  align-items: center;
`;

const ToReceiveText = styled.p`
  font-family: actor-regular;
  font-size: ${(props) => props.theme.typography.body2.fontSize};
`;

const ReceiverProfileImage = styled.img`
  width: 28px;
  height: 28px;
`;

const ReceiverNickname = styled.p`
  font-family: 'Pretendard-Regular';
`;

const QuestionTextArea = styled.textarea`
  width: 100%;
  height: 358px;
  padding: 16px;
  border: none;
  outline-color: ${(props) => props.theme.gray[20]};
  transition: outline-color 0.2s ease;
  font-family: Pretendard-Regular;
  font-size: 1rem;
  color: black;
  resize: none;

  &::placeholder {
    font-family: Pretendard-Regular;
    font-size: 1rem;
    color: ${(props) => props.theme.gray[40]};
    border: none;
  }

  &:focus {
    outline-color: ${(props) => props.theme.gray[50]};
    border-radius: 8px;
  }
`;

const QuestionRegisterButton = styled.button`
  width: 100%;
  height: 46px;
  padding: 12px 24px;
  margin-top: 8px;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  background-color: ${(props) => props.theme.brown[40]};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  &:disabled {
    background-color: ${(props) => props.theme.brown[30]};
  }
`;

function CreateQuestionModal({ onClose }) {
  const [questionText, setQuestionText] = useState('');

  const handleChange = (event) => {
    setQuestionText(event.target.value);
  };

  const isButtonDisabled = questionText.trim() === '';

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitle>
          <ModalTitleWrapper>
            <MessageIcon src='/images/icons/ic_messages_black.svg' />
            <ModalTitleText>질문을 작성하세요</ModalTitleText>
          </ModalTitleWrapper>
          <CloseIcon onClick={onClose} src='/images/icons/ic_close.svg' />
        </ModalTitle>

        <ReceiverNicknameWrapper>
          <ToReceiveText>To.</ToReceiveText>
          <ReceiverProfileImage src='/images/contents/profile.svg' />
          <ReceiverNickname>이동훈</ReceiverNickname>
        </ReceiverNicknameWrapper>

        <QuestionTextArea
          placeholder='질문을 입력해주세요'
          value={questionText}
          onChange={handleChange}
        />

        <QuestionRegisterButton disabled={isButtonDisabled}>질문 보내기</QuestionRegisterButton>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default CreateQuestionModal;
