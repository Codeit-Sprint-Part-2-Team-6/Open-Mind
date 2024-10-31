import styled, { useTheme } from 'styled-components';
import ThumbsUpIcon from './SvgIcons/thumbs-up';
import ThumbsDownIcon from './SvgIcons/thumbs-down';
import { useEffect, useRef, useState } from 'react';
import initialQuestions from './mock.json';

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
  const [questions, setQuestions] = useState(initialQuestions);
  const [isFeedOwner, setIsFeedOwner] = useState(true);

  const [menuOpen, setMenuOpen] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [isRejected, setIsRejected] = useState({});
  const [answerText, setAnswerText] = useState({});
  const [isLiked, setIsLiked] = useState(new Set());
  const [isDisliked, setIsDisliked] = useState(new Set());

  const handleToggleMenu = (id) => {
    setMenuOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMenuItemClick = (action, questionId) => {
    switch (action) {
      case 'edit': {
        setMenuOpen((prev) => ({ ...prev, [questionId]: false }));
        // questions 에서 해당 id와 일치하는 질문을 찾아 질문과 답변이 있는지 확인하고 기존 답변 내용 불러옴
        const editQuestion = questions.find((question) => question.id === questionId);
        if (editQuestion && editQuestion.answer) {
          setAnswerText((prev) => ({
            ...prev,
            [questionId]: editQuestion.answer.content, // 수정된 질문의 답변 내용을 올바르게 설정
          }));
          setEditingAnswerId(questionId); // 현재 수정 중인 답변 ID 저장
          setIsEditing(true);
        }
        break;
      }
      case 'delete':
        setMenuOpen((prev) => ({ ...prev, [questionId]: false }));
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === questionId ? { ...question, answer: null } : question,
          ),
        );
        setIsRejected((prev) => ({ ...prev, [questionId]: false })); // 거절 상태 초기화
        setEditingAnswerId(null); // // 이후 수정했을 때 수정모드에 진입하지 않도록
        setAnswerText((prev) => ({
          ...prev,
          [questionId]: '', // 답변 내용을 빈 문자열로 초기화
        }));
        break;
      case 'reject':
        setMenuOpen((prev) => ({ ...prev, [questionId]: false }));
        setIsRejected((prev) => ({ ...prev, [questionId]: true }));
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === questionId
              ? {
                  ...question,
                  answer: {
                    ...question.answer,
                    isRejected: true,
                  },
                } // 기존 답변 유지
              : question,
          ),
        );
        break;
      default:
        break;
    }
  };

  const handleEditComplete = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === editingAnswerId
          ? {
              ...question,
              answer: { ...question.answer, content: answerText[editingAnswerId] },
              isRejected: false,
            }
          : question,
      ),
    );
    setIsRejected((prev) => ({ ...prev, [editingAnswerId]: false }));
    setIsEditing(false);
    setEditingAnswerId(null);
    setAnswerText((prev) => ({ ...prev, [editingAnswerId]: '' }));
  };

  const handleAnswerComplete = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              answer: { content: answerText[questionId], isRejected: false },
            }
          : question,
      ),
    );
    setIsRejected((prev) => ({ ...prev, [questionId]: false }));
    setAnswerText((prev) => ({ ...prev, [questionId]: '' }));
  };

  const handleChange = (questionId, event) => {
    setAnswerText((prev) => ({
      ...prev,
      [questionId]: event.target.value,
    }));
  };

  // 메뉴창에 ref 설정
  const menuRef = useRef();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen({});
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isButtonDisabled = (questionId) => !answerText[questionId]?.trim();

  const handleReaction = (questionId, type) => {
    if (type === 'like') {
      setIsLiked((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(questionId)) {
          newSet.delete(questionId);
        } else {
          newSet.add(questionId);
          isDisliked.delete(questionId);
        }
        return newSet;
      });
    } else if (type === 'dislike') {
      setIsDisliked((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(questionId)) {
          newSet.delete(questionId);
        } else {
          newSet.add(questionId);
          isLiked.delete(questionId);
        }
        return newSet;
      });
    }
  };

  const theme = useTheme();

  return (
    <BoxContainer>
      {questions.map((question) => (
        <QuestionCard key={question.id}>
          <QuestionToolbar>
            <AnswerTag answered={!!question.answer || isRejected[question.id]}>
              {question.answer ? '답변 완료' : '미답변'}
            </AnswerTag>
            {isFeedOwner && (
              <KebabButton onClick={() => handleToggleMenu(question.id)}>
                <img src='/images/icons/kebab-button.svg' alt='케밥 메뉴' />
              </KebabButton>
            )}
            {menuOpen[question.id] && (
              <KebabMenu ref={menuRef}>
                {question.answer ? ( // 질문에 답변이 있을 때
                  question.answer.isRejected ? ( // 답변이 거절된 경우
                    <>
                      <KebabMenuItem onClick={() => handleMenuItemClick('edit', question.id)}>
                        답변수정
                      </KebabMenuItem>
                      <KebabMenuItem onClick={() => handleMenuItemClick('delete', question.id)}>
                        답변삭제
                      </KebabMenuItem>
                    </>
                  ) : (
                    // 답변이 완료된 경우
                    <>
                      <KebabMenuItem onClick={() => handleMenuItemClick('edit', question.id)}>
                        답변수정
                      </KebabMenuItem>
                      <KebabMenuItem onClick={() => handleMenuItemClick('reject', question.id)}>
                        답변거절
                      </KebabMenuItem>
                      <KebabMenuItem onClick={() => handleMenuItemClick('delete', question.id)}>
                        답변삭제
                      </KebabMenuItem>
                    </>
                  )
                ) : (
                  // 질문에 답변이 없는 경우
                  <KebabMenuItem onClick={() => handleMenuItemClick('reject', question.id)}>
                    답변거절
                  </KebabMenuItem>
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
                {isEditing && editingAnswerId === question.id ? (
                  <AnswerRegisterContainer>
                    <AnswerTextArea
                      placeholder='답변을 입력해주세요'
                      value={answerText[question.id] || ''}
                      onChange={(event) => handleChange(question.id, event)}
                    />
                    <AnswerRegisterButton
                      onClick={handleEditComplete}
                      disabled={isButtonDisabled(question.id)}
                    >
                      수정 완료
                    </AnswerRegisterButton>
                  </AnswerRegisterContainer>
                ) : isRejected[question.id] || (question.answer && question.answer.isRejected) ? (
                  <AnswerContent isRejected>답변 거절</AnswerContent>
                ) : question.answer ? (
                  <AnswerContent>{question.answer.content}</AnswerContent>
                ) : (
                  <AnswerRegisterContainer>
                    <AnswerTextArea
                      placeholder='답변을 입력해주세요'
                      value={answerText[question.id] || ''}
                      onChange={(event) => handleChange(question.id, event)}
                    />
                    <AnswerRegisterButton
                      onClick={() => handleAnswerComplete(question.id)}
                      disabled={isButtonDisabled(question.id)}
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
              <Reaction
                isActive={isLiked.has(question.id)}
                type='like'
                onClick={() => handleReaction(question.id, 'like')}
              >
                <ThumbsUpIcon
                  color={isLiked.has(question.id) ? theme.blue : theme.gray[40]}
                  size={16}
                />
                좋아요 {question.like}
              </Reaction>
              <Reaction
                isActive={isDisliked.has(question.id)}
                type='dislike'
                onClick={() => handleReaction(question.id, 'dislike')}
              >
                <ThumbsDownIcon
                  color={isDisliked.has(question.id) ? theme.gray[60] : theme.gray[40]}
                  size={16}
                />
                싫어요 {question.dislike}
              </Reaction>
            </ReactionBox>
          </ReactionContainer>
        </QuestionCard>
      ))}
    </BoxContainer>
  );
}
