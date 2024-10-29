import styled from 'styled-components';
import Header from './Header.jsx';
import { useState } from 'react';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  margin-top: 150px;
`;

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
  text-align: center;
  padding: 24px 16px;
  background-color: ${(props) => props.theme.brown[10]};
  border: 1px solid ${(props) => props.theme.brown[20]};
  border-radius: 16px;
`;

const QuestionCounterContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const QuestionIcon = styled.img`
  width: 22px;
  height: 22px;
`;

const QuestionCountText = styled.p`
  font-size: ${(props) => props.theme.typography.body2.fontSize};
  color: ${(props) => props.theme.brown[40]};
`;

function FeedDetailPage() {
  const [QuestionCount, setQuestionCount] = useState(0);
  return (
    <>
      <Header />
      <Main>
        <QuestionsContainer>
          <QuestionCounterContainer>
            <QuestionIcon src='/images/icons/ic_messages.svg' />
            <QuestionCountText>{`${QuestionCount}개의 질문이 있습니다.`}</QuestionCountText>
          </QuestionCounterContainer>
        </QuestionsContainer>
      </Main>
    </>
  );
}

export default FeedDetailPage;
