import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { updateAnswer, deleteAnswer } from '../../api/answerApi';
import { createAnswer } from '../../api/questionApi';
import QuestionToolbar from './QuestionToolbar';
import AnswerSection from './AnswerSection';
import ReactionSection from './ReactionSection';

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
          console.log(currentAnswer.id);
          setIsEditing(true);
          setAnswerText(currentAnswer.content);
        } catch (error) {
          console.log('답변 정보를 불러오지 못했습니다');
        }
        break;
      }
      case 'delete':
        setMenuOpen(false);
        try {
          await deleteAnswer(currentAnswer.id);
          setCurrentAnswer(null);
          setAnswerText('');
        } catch (error) {
          console.error('답변 삭제 중 오류가 발생했습니다:', error);
        }
        break;
      case 'reject':
        setMenuOpen(false);
        if (currentAnswer && currentAnswer.id) {
          // 기존 답변이 있을 때
          try {
            const response = await updateAnswer(currentAnswer.id, currentAnswer.content, true); // 답변 거절 API 호출
            setCurrentAnswer((prev) => ({ ...prev, isRejected: true }));
            console.log('거절: 기존 답변이 있을 때:', response);
          } catch (error) {
            console.error('답변 거절 중 오류가 발생했습니다:', error);
          }
        } else {
          // 기존 답변이 없을 때
          try {
            const response = await createAnswer({
              questionId: question.id,
              content: '답변 거절',
              isRejected: true,
            }); // POST 요청으로 새로운 답변 생성
            setCurrentAnswer({ id: response.id, content: '답변 거절', isRejected: true });
            console.log('거절: 기존 답변이 없을 때:', response);
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
      await updateAnswer(currentAnswer.id, answerText);
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
      const response = await createAnswer({ questionId: question.id, content: answerText }); // POST 요청으로 새로운 답변 생성
      setCurrentAnswer({ id: response.id, content: answerText, isRejected: false });
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

  useEffect(() => {
    setCurrentAnswer(question.answer);
  }, [question.answer]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const questionToolbarProps = {
    isOwner,
    menuOpen,
    handleToggleMenu,
    handleMenuItemClick,
    currentAnswer,
    menuRef,
  };

  const answerSectionProps = {
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
  };

  const reactionSectionProps = {
    isLiked,
    isDisliked,
    question,
    handleReaction,
  };

  return (
    <QuestionCard key={question.id}>
      <QuestionToolbar {...questionToolbarProps} />
      <TitleContainer>
        <TitleInfo>질문 · {getRelativeTime(question.createdAt)}</TitleInfo>
        <Title className='actor-regular'>{question.content}</Title>
      </TitleContainer>
      <AnswerSection {...answerSectionProps} />
      <ReactionSection {...reactionSectionProps} />
    </QuestionCard>
  );
}
