import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import { createQuestions } from '../../api/questionApi';

const overlayFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const overlayFadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const modalSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const modalSlideDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${({ isVisible }) => (isVisible ? overlayFadeIn : overlayFadeOut)} 0.2s ease-out
    forwards;
`;

const ModalContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 24px;
  border-radius: 24px;
  box-shadow: ${(props) => props.theme.shadows['large']};
  animation: ${({ isVisible }) => (isVisible ? modalSlideUp : modalSlideDown)} 0.4s ease forwards;
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
  border-radius: 50%;
  mix-blend-mode: ${(props) => props.theme.mixBlendMode};
`;

const ReceiverNickname = styled.p`
  font-family: 'Pretendard-Regular';
`;

const QuestionTextArea = styled.textarea`
  width: 280px;
  height: 358px;
  padding: 16px;
  border: none;
  background-color: ${(props) => props.theme.gray[20]};
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

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    height: 180px;
    width: 532px;
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

function CreateQuestionModal({
  id,
  image,
  name,
  setCreatedQuestionsCount,
  setQuestions,
  onModalClose,
  onToastshow,
}) {
  const [questionText, setQuestionText] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const handleChange = (event) => {
    setQuestionText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const newQuestion = await createQuestions(id, questionText);
      setQuestions((prevQuestions) => [newQuestion, ...prevQuestions]);
      setCreatedQuestionsCount((prev) => prev + 1);

      onModalClose();
      onToastshow();
    } catch (error) {
      alert('질문 전송에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onModalClose, 400);
  };

  const isButtonDisabled = questionText.trim() === '';

  return (
    <ModalOverlay isVisible={isVisible} onClick={handleClose}>
      <ModalContainer isVisible={isVisible} onClick={(e) => e.stopPropagation()}>
        <ModalTitle>
          <ModalTitleWrapper>
            <MessageIcon src='/images/icons/ic_messages_black.svg' />
            <ModalTitleText>질문을 작성하세요</ModalTitleText>
          </ModalTitleWrapper>
          <CloseIcon onClick={handleClose} src='/images/icons/ic_close.svg' />
        </ModalTitle>

        <ReceiverNicknameWrapper>
          <ToReceiveText>To.</ToReceiveText>
          <ReceiverProfileImage src={image} />
          <ReceiverNickname>{name}</ReceiverNickname>
        </ReceiverNicknameWrapper>

        <QuestionTextArea
          placeholder='질문을 입력해주세요'
          value={questionText}
          onChange={handleChange}
        />

        <QuestionRegisterButton onClick={handleSubmit} disabled={isButtonDisabled}>
          질문 보내기
        </QuestionRegisterButton>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default CreateQuestionModal;
