import styled, { useTheme } from 'styled-components';
import ThumbsUpIcon from './thumbs-up';
import ThumbsDownIcon from './thumbs-down';

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

  @media (min-width: 768px) {
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

  @media (min-width: 768px) {
    width: 3rem;
  }
`;

const AnswerTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const AnswerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserName = styled.p`
  font-size: ${({ theme }) => theme.typography.caption1.fontSize};
  font-weight: ${({ theme }) => theme.typography.caption1.fontWeight};

  @media (min-width: 768px) {
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
  color: ${({ theme }) => theme.gray[60]};
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
  color: ${({ isActive, theme }) => (isActive ? theme.blue : theme.gray[40])};
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
  const isActive = true;
  const theme = useTheme();

  return (
    <BoxContainer>
      {questions.map((question) => (
        <QuestionCard key={question.id}>
          <QuestionToolbar>
            <AnswerTag answered={!!question.answer}>
              {question.answer ? '답변 완료' : '미답변'}
            </AnswerTag>
          </QuestionToolbar>
          <TitleContainer>
            <TitleInfo>질문 · {getRelativeTime(question.createdAt)}</TitleInfo>
            <Title className='actor-regular'>{question.content}</Title>
          </TitleContainer>
          {question.answer && (
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
          )}
          <ReactionContainer>
            <ReactionBox>
              <Reaction isActive={isActive}>
                <ThumbsUpIcon color={isActive ? theme.blue : theme.gray[40]} size={16} />
                좋아요 {question.like}
              </Reaction>
              <Reaction isActive={!isActive}>
                <ThumbsDownIcon color={!isActive ? theme.blue : theme.gray[40]} size={16} />
                싫어요 {question.dislike}
              </Reaction>
            </ReactionBox>
          </ReactionContainer>
        </QuestionCard>
      ))}
    </BoxContainer>
  );
}
