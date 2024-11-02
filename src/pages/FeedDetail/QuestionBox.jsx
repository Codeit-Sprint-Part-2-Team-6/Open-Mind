import styled, { useTheme } from 'styled-components';
import ThumbsUpIcon from './SvgIcons/thumbs-up';
import ThumbsDownIcon from './SvgIcons/thumbs-down';
import { useEffect, useRef, useState } from 'react';
import { getAnswerById, updateAnswer, deleteAnswer } from '../../api/answerApi';
import { createAnswer } from '../../api/questionApi';
import { useLocation } from 'react-router-dom';

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
  border: 1px solid ${({ $answered, theme }) => ($answered ? theme.brown[40] : theme.gray[40])};
  border-radius: 8px;
  font-weight: ${({ theme }) => theme.typography.caption1Medium.fontWeight};
  font-size: ${({ theme }) => theme.typography.caption1.fontSize};
  color: ${({ $answered, theme }) => ($answered ? theme.brown[40] : theme.gray[40])};
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
  border-radius: 50%;

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
  color: ${({ $isActive, type, theme }) =>
    $isActive ? (type === 'like' ? theme.blue : theme.gray[60]) : theme.gray[40]};
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

export default function QuestionBox({ question, image, name, isOwner }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(question.answer);
  const [isEditing, setIsEditing] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleMenuItemClick = async (action) => {
    switch (action) {
      case 'edit': {
        setMenuOpen(false);
        try {
          const answerContent = await getAnswerById(question.answer.id);
          setAnswerText(answerContent.content);
          setIsEditing(true);
        } catch (error) {
          console.log('답변 정보를 불러오지 못했습니다');
        }
        break;
      }
      case 'delete':
        setMenuOpen(false);
        try {
          await deleteAnswer(question.answer.id);
          setCurrentAnswer(null);
        } catch (error) {
          console.error('답변 삭제 중 오류가 발생했습니다:', error);
        }
        break;
      case 'reject':
        setMenuOpen(false);
        if (question.answer && question.answer.id) {
          // 기존 답변이 있을 때
          try {
            const response = await updateAnswer(question.answer.id, question.answer.content, true); // 답변 거절 API 호출
            setCurrentAnswer((prev) => ({ ...prev, isRejected: true }));
            console.log('답변 생성 응답:', response);
          } catch (error) {
            console.error('답변 거절 중 오류가 발생했습니다:', error);
          }
        } else {
          // 기존 답변이 없을 때
          try {
            await createAnswer({ questionId: question.id, content: '답변 거절', isRejected: true }); // POST 요청으로 새로운 답변 생성
            setCurrentAnswer({ isRejected: true });
            console.log(question.id);
          } catch (error) {
            console.error('답변 거절 중 오류가 발생했습니다:', error);
          }
        }
        break;
      default:
        break;
    }
  };

  const handleEditComplete = async () => {
    try {
      await updateAnswer(question.answer.id, answerText);
      // 사용자 경험을 위해 GET 요청을 추가하지 않고 상태 업데이트
      setCurrentAnswer((prev) => ({ ...prev, content: answerText, isRejected: false }));
      setIsEditing(false);
      setAnswerText('');
    } catch (error) {
      console.error('답변 수정 중 오류가 발생했습니다');
    }
  };

  const handleAnswerComplete = async () => {
    try {
      await createAnswer({ questionId: question.id, content: answerText }); // POST 요청으로 새로운 답변 생성
      setCurrentAnswer({
        content: answerText,
        isRejected: false,
      });
      console.log(question.id);
    } catch (error) {
      console.error('답변 거절 중 오류가 발생했습니다:', error);
    }
    setAnswerText('');
  };

  const handleAnswerTextChange = (event) => {
    setAnswerText(event.target.value);
  };

  // 메뉴창에 ref 설정
  const menuRef = useRef();

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !event.target.closest('.kebab-button-class')
    ) {
      setMenuOpen(false);
    }
  };

  const isButtonDisabled = () => !answerText.trim();

  const handleReaction = async (type) => {
    if (type === 'like') {
      setIsLiked((prev) => !prev);
      setIsDisliked(false);
      // await createReaction({ id: question.id, type: 'like' });
    } else if (type === 'dislike') {
      setIsDisliked((prev) => !prev);
      setIsLiked(false);
      // await createReaction({ id: question.id, type: 'dislike' });
    }
  };

  const theme = useTheme();

  useEffect(() => {
    setCurrentAnswer(question.answer);
  }, [question.answer]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <QuestionCard key={question.id}>
      <QuestionToolbar>
        <AnswerTag $answered={!!currentAnswer || (currentAnswer && currentAnswer.isRejected)}>
          {currentAnswer ? '답변 완료' : '미답변'}
        </AnswerTag>
        {isOwner && (
          <KebabButton className='kebab-button-class' onClick={handleToggleMenu}>
            <img src='/images/icons/kebab-button.svg' alt='케밥 메뉴' />
          </KebabButton>
        )}
        {menuOpen && (
          <KebabMenu ref={menuRef}>
            {currentAnswer ? ( // 질문에 답변이 있을 때
              currentAnswer.isRejected ? ( // 답변이 거절된 경우
                <>
                  <KebabMenuItem onClick={() => handleMenuItemClick('edit')}>
                    답변수정
                  </KebabMenuItem>
                  <KebabMenuItem onClick={() => handleMenuItemClick('delete')}>
                    답변삭제
                  </KebabMenuItem>
                </>
              ) : (
                // 답변이 완료된 경우
                <>
                  <KebabMenuItem onClick={() => handleMenuItemClick('edit')}>
                    답변수정
                  </KebabMenuItem>
                  <KebabMenuItem onClick={() => handleMenuItemClick('reject')}>
                    답변거절
                  </KebabMenuItem>
                  <KebabMenuItem onClick={() => handleMenuItemClick('delete')}>
                    답변삭제
                  </KebabMenuItem>
                </>
              )
            ) : (
              // 질문에 답변이 없는 경우
              <KebabMenuItem onClick={() => handleMenuItemClick('reject')}>답변거절</KebabMenuItem>
            )}
          </KebabMenu>
        )}
      </QuestionToolbar>
      <TitleContainer>
        <TitleInfo>질문 · {getRelativeTime(question.createdAt)}</TitleInfo>
        <Title className='actor-regular'>{question.content}</Title>
      </TitleContainer>
      {isOwner ? ( // 질문자인 경우
        <AnswerContainer>
          <AnswerProfile src={image} alt='프로필 이미지' />
          <AnswerTextContainer>
            <AnswerInfo>
              <UserName className='actor-regular'>{name}</UserName>
              <AnswerAt>{getRelativeTime(question.createdAt)}</AnswerAt>
            </AnswerInfo>
            {isEditing && question.answer ? (
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
                <AnswerContent isRejected>답변 거절</AnswerContent>
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
              <AnswerContent>{question.answer.content}</AnswerContent>
            </AnswerTextContainer>
          </AnswerContainer>
        )
      )}
      <ReactionContainer>
        <ReactionBox>
          <Reaction $isActive={isLiked} type='like' onClick={() => handleReaction('like')}>
            <ThumbsUpIcon color={isLiked ? theme.blue : theme.gray[40]} size={16} />
            좋아요 {question.like}
          </Reaction>
          <Reaction $isActive={isDisliked} type='dislike' onClick={() => handleReaction('dislike')}>
            <ThumbsDownIcon color={isDisliked ? theme.gray[60] : theme.gray[40]} size={16} />
            싫어요 {question.dislike}
          </Reaction>
        </ReactionBox>
      </ReactionContainer>
    </QuestionCard>
  );
}
