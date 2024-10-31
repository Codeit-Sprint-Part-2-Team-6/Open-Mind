import styled, { useTheme } from 'styled-components';
import ThumbsUpIcon from './SvgIcons/thumbs-up';
import ThumbsDownIcon from './SvgIcons/thumbs-down';
import { useFeed } from '../../hooks/useStore';
import { useState } from 'react';

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  background-color: transparent;
`;

const QuestionCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 32px;
  gap: 32px;
  background-color: ${({ theme }) => theme.gray[10]};
  box-shadow: ${({ theme }) => theme.shadows.small};
  border-radius: 16px;
`;

const QuestionToolbar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 26px;
`;

const AnswerTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  background-color: ${({ theme }) => theme.gray[10]};
  border: 1px solid ${({ answered, theme }) => (answered ? theme.brown[40] : theme.gray[40])};
  border-radius: 8px;
  font-weight: ${({ theme }) => theme.typography.caption1Medium.fontWeight};
  font-size: ${({ theme }) => theme.typography.caption1.fontSize};
  color: ${({ answered, theme }) => (answered ? theme.brown[40] : theme.gray[40])};
  line-height: 18px;
`;

const KebabButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const KebabMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.small};
  border: 0.5px solid ${({ theme }) => theme.gray[20]};
  border-radius: 8px;
  z-index: 1000;
`;

const KebabMenuItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.gray[20]};
  }

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 5px;
    right: 5px;
    bottom: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.gray[30]};
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
`;

const TitleInfo = styled.p`
  font-weight: ${({ theme }) => theme.typography.caption1Medium.fontWeight};
  font-size: ${({ theme }) => theme.typography.caption1.fontSize};
  line-height: 18px;
  color: ${({ theme }) => theme.gray[40]};
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.typography.body3.fontSize};
  font-weight: ${({ theme }) => theme.typography.body3.fontWeight};
  line-height: 22px;
  color: ${({ theme }) => theme.gray[60]};

  @media ${({ theme }) => theme.typography.device.tabletMn} {
    font-size: ${({ theme }) => theme.typography.body2.fontSize};
    font-weight: ${({ theme }) => theme.typography.body2.fontWeight};
  }
`;

const AnswerContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
`;

const AnswerProfile = styled.img`
  width: 2rem;
  height: auto;

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
  color: ${({ isRejected, theme }) => (isRejected ? theme.red : theme.gray[60])};
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

const ReactionContainer = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.gray[30]};
`;

const ReactionBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  padding-top: 24px;
`;

const Reaction = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.typography.caption1.fontSize};
  font-weight: ${({ theme }) => theme.typography.caption1.fontWeight};
  line-height: 18px;
  color: ${({ isActive, type, theme }) =>
    isActive ? (type === 'like' ? theme.blue : theme.gray[60]) : theme.gray[40]};
  cursor: pointer;
`;

// 상대 시간
const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: '년', value: 31536000 },
    { label: '개월', value: 2592000 },
    { label: '주', value: 604800 },
    { label: '일', value: 86400 },
    { label: '시간', value: 3600 },
    { label: '분', value: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.value);
    if (count > 0) {
      return `${count}${interval.label}전`;
    }
  }

  return '방금 전';
};

export default function QuestionBox() {
  //----- 추후 상태 받아오기 -----
  // const {} = useFeed;
  const isActive = false;
  const isFeedOwner = false;

  const [answerText, setAnswerText] = useState('');

  const handleChange = (event) => {
    setAnswerText(event.target.value);
  };

  const isButtonDisabled = answerText.trim() === '';

  const [menuOpen, setMenuOpen] = useState({});

  const handleToggleMenu = (id) => {
    setMenuOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  //---------------------------

  const theme = useTheme();

  return (
    <BoxContainer>
      {questions.map((question) => (
        <QuestionCard key={question.id}>
          <QuestionToolbar>
            <AnswerTag answered={!!question.answer}>
              {question.answer ? '답변 완료' : '미답변'}
            </AnswerTag>
            {isFeedOwner && (
              <KebabButton onClick={() => handleToggleMenu(question.id)}>
                <img src='/images/icons/kebab-button.svg' alt='케밥 메뉴' />
              </KebabButton>
            )}
            {menuOpen[question.id] && (
              <KebabMenu>
                {question.answer ? ( // 질문에 답변이 있을 때
                  question.answer.isRejected ? ( // 답변이 거절된 경우
                    <>
                      <KebabMenuItem>답변수정</KebabMenuItem>
                      <KebabMenuItem>답변삭제</KebabMenuItem>
                    </>
                  ) : (
                    // 답변이 완료된 경우
                    <>
                      <KebabMenuItem>답변수정</KebabMenuItem>
                      <KebabMenuItem>답변거절</KebabMenuItem>
                      <KebabMenuItem>답변삭제</KebabMenuItem>
                    </>
                  )
                ) : (
                  // 질문에 답변이 없는 경우
                  <KebabMenuItem>답변거절</KebabMenuItem>
                )}
              </KebabMenu>
            )}
          </QuestionToolbar>
          <TitleContainer>
            <TitleInfo>질문 · {getRelativeTime(question.createdAt)}</TitleInfo>
            <Title className='actor-regular'>{question.content}</Title>
          </TitleContainer>
          {isFeedOwner ? ( // 질문자인 경우
            <AnswerContainer>
              <AnswerProfile src='/images/contents/profile.svg' alt='프로필 이미지' />
              <AnswerTextContainer>
                <AnswerInfo>
                  <UserName className='actor-regular'>아초는 고양이</UserName>
                  <AnswerAt>{getRelativeTime(question.createdAt)}</AnswerAt>
                </AnswerInfo>
                {question.answer ? (
                  question.answer.isRejected ? (
                    <AnswerContent isRejected>답변 거절</AnswerContent>
                  ) : (
                    <AnswerContent>{question.answer.content}</AnswerContent>
                  )
                ) : (
                  <AnswerRegisterContainer>
                    <AnswerTextArea
                      placeholder='답변을 입력해주세요'
                      value={answerText}
                      onChange={handleChange}
                    />
                    <AnswerRegisterButton disabled={isButtonDisabled}>
                      답변 완료
                    </AnswerRegisterButton>
                  </AnswerRegisterContainer> // 미답변인 경우 보여줄 답변창
                )}
              </AnswerTextContainer>
            </AnswerContainer>
          ) : (
            question.answer && ( // 답변자인 경우에만 보여주고, 답변자 시점이지만 미답변인 경우는 아예 숨김
              <AnswerContainer>
                <AnswerProfile src='/images/contents/profile.svg' alt='프로필 이미지' />
                <AnswerTextContainer>
                  <AnswerInfo>
                    <UserName className='actor-regular'>아초는 고양이</UserName>
                    <AnswerAt>{getRelativeTime(question.answer.createdAt)}</AnswerAt>
                  </AnswerInfo>
                  <AnswerContent>{question.answer.content}</AnswerContent>
                </AnswerTextContainer>
              </AnswerContainer>
            )
          )}
          <ReactionContainer>
            <ReactionBox>
              <Reaction isActive={isActive} type='like'>
                <ThumbsUpIcon color={isActive ? theme.blue : theme.gray[40]} size={16} />
                좋아요 {question.like}
              </Reaction>
              <Reaction isActive={!isActive} type='dislike'>
                <ThumbsDownIcon color={!isActive ? theme.gray[60] : theme.gray[40]} size={16} />
                싫어요 {question.dislike}
              </Reaction>
            </ReactionBox>
          </ReactionContainer>
        </QuestionCard>
      ))}
    </BoxContainer>
  );
}
