import styled from 'styled-components';
import Header from './Header.jsx';

import { useEffect, useState } from 'react';
import CreateQuestionModal from './CreateQuestionModal.jsx';
import { getSubjectById } from '../../api/subjectApi.js';
import { getQuestions } from '../../api/questionApi.js';
import { useParams } from 'react-router-dom';

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  margin-top: 54px;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    padding: 0 32px;
  }

  @media (${({ theme }) => theme.typography.device.laptopMn}) {
    padding: 0 242px;
  }
`;

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
  aspect-ratio: ${(props) => (props.isNoQuestion ? null : 1)};
  text-align: center;
  padding: 24px 16px;
  background-color: ${(props) => props.theme.brown[10]};
  border: 1px solid ${(props) => props.theme.brown[20]};
  border-radius: 16px;
  position: relative;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    aspect-ratio: ${(props) => (props.isNoQuestion ? null : 2.1)};
  }
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

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    font-size: ${(props) => props.theme.typography.body1Bold.fontSize};
  }
`;

const NoQuestionImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    width: 150px;
    height: 154px;
  }
`;

const CreateQuestionBtn = styled.button`
  position: fixed;
  bottom: 30px;
  right: 24px;
  font-size: ${(props) => props.theme.typography.body1.fontSize};
  color: ${(props) => props.theme.gray[10]};
  padding: 14px 24px;
  background-color: ${(props) => props.theme.brown[40]};
  border: none;
  border-radius: 200px;
  box-shadow: ${(props) => props.theme.shadows['medium']};
  line-height: 26px;
  cursor: pointer;

  &::after {
    content: '질문 작성';
  }

  @media (${(props) => props.theme.typography.device.tabletMn}) {
    width: 208px;
    padding: 12px 24px;

    &::after {
      content: '질문 작성하기';
    }
  }
`;

function FeedDetailPage() {
  const { id } = useParams();
  const [subject, setSubject] = useState({});
  const [questions, setQuestions] = useState([]);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(true);

  useEffect(() => {
    if (!isQuestionSubmitted) return;

    const fetchSubject = async () => {
      const response = await getSubjectById(id);
      setSubject(response);

      console.log(response);
    };

    const fetchQuestions = async () => {
      const response = await getQuestions(id);
      const { count, results } = response;

      setQuestions(results);
      setQuestionsCount(count);

      console.log(response);
    };

    fetchSubject();
    fetchQuestions();
    setIsQuestionSubmitted(false);
  }, [id, isQuestionSubmitted]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header image={subject.imageSource} name={subject.name} />
      <Main>
        <QuestionsContainer>
          {questionsCount ? (
            <>
              <QuestionCounterContainer>
                <QuestionIcon src='/images/icons/ic_messages_brown.svg' />
                <QuestionCountText>{`${questionsCount}개의 질문이 있습니다.`}</QuestionCountText>
              </QuestionCounterContainer>

              {console.log(questions)}
            </>
          ) : (
            <>
              <QuestionCounterContainer>
                <QuestionIcon src='/images/icons/ic_messages_brown.svg' />
                <QuestionCountText>아직 질문이 없습니다.</QuestionCountText>
              </QuestionCounterContainer>

              <NoQuestionImage src='/images/contents/no-question.svg' />
            </>
          )}
        </QuestionsContainer>
        <CreateQuestionBtn onClick={handleOpenModal} />

        {isModalOpen && (
          <CreateQuestionModal
            id={id}
            image={subject.imageSource}
            name={subject.name}
            setIsQuestionSubmitted={setIsQuestionSubmitted}
            onClose={handleCloseModal}
          />
        )}
      </Main>
    </>
  );
}

export default FeedDetailPage;
