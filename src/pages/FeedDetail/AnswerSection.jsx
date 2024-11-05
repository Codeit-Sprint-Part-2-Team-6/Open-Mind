import styled from 'styled-components';

const AnswerContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
`;

const AnswerProfile = styled.img`
  width: 2rem;
  height: auto;
  border-radius: 50%;
  mix-blend-mode: ${(props) => props.theme.mixBlendMode};

  @media ${({ theme }) => theme.typography.device.tabletMn} {
    width: 3rem;
  }
`;

const AnswerTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex-grow: 1;
`;

const AnswerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserName = styled.p`
  font-size: ${({ theme }) => theme.typography.caption1.fontSize};
  font-weight: ${({ theme }) => theme.typography.caption1.fontWeight};

  @media ${({ theme }) => theme.typography.device.tabletMn} {
    font-size: ${({ theme }) => theme.typography.body2.fontSize};
    font-weight: ${({ theme }) => theme.typography.body2.fontWeight};
  }
`;

const AnswerAt = styled.p`
  font-size: ${({ theme }) => theme.typography.caption1Medium.fontSize};
  font-weight: ${({ theme }) => theme.typography.caption1Medium.fontWeight};
  line-height: 18px;
  color: ${({ theme }) => theme.gray[40]};
`;

const AnswerContent = styled.p`
  font-size: ${({ theme }) => theme.typography.body3.fontSize};
  font-weight: ${({ theme }) => theme.typography.body3.fontWeight};
  line-height: 22px;
  color: ${({ $isRejected, theme }) => ($isRejected ? theme.red : theme.gray[60])};
  white-space: pre-wrap;
  word-break: break-all;
  overflow-wrap: break-word;
  text-align: left;
`;

const AnswerRegisterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AnswerTextArea = styled.textarea`
  width: 100%;
  height: 186px;
  padding: 16px;
  border: none;
  background-color: ${({ theme }) => theme.gray[20]};
  transition: outline-color 0.2s ease;
  border-radius: 8px;

  font-size: ${({ theme }) => theme.typography.body3.fontSize};
  font-weight: ${({ theme }) => theme.typography.body3.fontWeight};
  line-height: 22px;
  color: ${({ theme }) => theme.gray[60]};
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.gray[40]};
    border: none;
  }
  &:focus {
    outline-color: ${({ theme }) => theme.gray[50]};
    border-radius: 8px;
  }
`;

const AnswerRegisterButton = styled.button`
  width: 100%;
  height: 46px;
  padding: 12px 24px;
  margin-top: 8px;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.brown[40]};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  &:disabled {
    background-color: ${({ theme }) => theme.brown[30]};
  }
`;

export default function AnswerSection({
  isOwner,
  image,
  name,
  getRelativeTime,
  question,
  isEditing,
  currentAnswer,
  answerText,
  handleAnswerComplete,
  handleEditComplete,
  handleAnswerTextChange,
}) {
  const isButtonDisabled = () => !answerText.trim();
  return (
    <AnswerContainer>
      {isOwner ? ( // 질문자인 경우
        <AnswerContainer>
          <AnswerProfile src={image} alt='프로필 이미지' />
          <AnswerTextContainer>
            <AnswerInfo>
              <UserName className='actor-regular'>{name}</UserName>
              <AnswerAt>{getRelativeTime(question.createdAt)}</AnswerAt>
            </AnswerInfo>
            {isEditing && currentAnswer ? (
              <AnswerRegisterContainer>
                <AnswerTextArea
                  placeholder='답변을 입력해주세요'
                  value={answerText}
                  onChange={handleAnswerTextChange}
                />
                <AnswerRegisterButton
                  onClick={() => handleEditComplete()}
                  disabled={isButtonDisabled()}
                >
                  수정 완료
                </AnswerRegisterButton>
              </AnswerRegisterContainer>
            ) : currentAnswer ? (
              currentAnswer.isRejected ? (
                <AnswerContent $isRejected>답변 거절</AnswerContent>
              ) : (
                <AnswerContent>{currentAnswer.content}</AnswerContent>
              )
            ) : (
              <AnswerRegisterContainer>
                <AnswerTextArea
                  placeholder='답변을 입력해주세요'
                  value={answerText}
                  onChange={handleAnswerTextChange}
                />
                <AnswerRegisterButton
                  onClick={() => handleAnswerComplete()}
                  disabled={isButtonDisabled()}
                >
                  답변 완료
                </AnswerRegisterButton>
              </AnswerRegisterContainer>
            )}
          </AnswerTextContainer>
        </AnswerContainer>
      ) : (
        question.answer && ( // 답변자인 경우에만 보여주고, 답변자 시점이지만 미답변인 경우는 아예 숨김
          <AnswerContainer>
            <AnswerProfile src={image} alt='프로필 이미지' />
            <AnswerTextContainer>
              <AnswerInfo>
                <UserName className='actor-regular'>{name}</UserName>
                <AnswerAt>{getRelativeTime(question.answer.createdAt)}</AnswerAt>
              </AnswerInfo>
              <AnswerContent $isRejected={question.answer.isRejected}>
                {question.answer.content}
              </AnswerContent>
            </AnswerTextContainer>
          </AnswerContainer>
        )
      )}
    </AnswerContainer>
  );
}
