/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import Header from './Header.jsx';

import { useEffect, useState, useCallback } from 'react';
import CreateQuestionModal from './CreateQuestionModal.jsx';
import { deleteSubjectById, getSubjectById } from '../../api/subjectApi.js';
import { getQuestions } from '../../api/questionApi.js';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionBox from './QuestionBox.jsx';
import { useUser } from '../../hooks/useStore.js';
import Toast from '../../components/Toast.jsx';
import ConfirmModal from './ConFirmModal.jsx';

const FeedDetailPageWrapper = styled.div`
  background-color: ${({ theme }) => theme.gray[20]};
`;

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  // margin-top: 54px;

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
  overflow: auto;

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

const DeleteSubjectBtn = styled.button`
  width: 70px;
  height: 25px;
  padding: 0 12px;
  margin: 20px 0 12px;
  font-size: 0.625rem;
  align-self: end;
  color: ${(props) => props.theme.gray[10]};
  background-color: ${(props) => props.theme.brown[40]};
  border: none;
  border-radius: 200px;
  box-shadow: ${(props) => props.theme.shadows['medium']};
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.brown[30]};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (${(props) => props.theme.typography.device.tabletMn}) {
    width: 116px;
    height: 40px;
    font-size: ${(props) => props.theme.typography.body3.fontSize};
  }
`;

function FeedDetailPage({ isAnswer }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { canEditFeed } = useUser();
  const isOwner = canEditFeed(id);

  const [subject, setSubject] = useState({});
  const [questions, setQuestions] = useState([]);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [createdQuestoinsCount, setCreatedQuestionsCount] = useState(0);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleteCompleteModalOpen, setIsDeleteCompleteModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const limit = window.innerWidth <= 768 ? 5 : 10;

  const fetchSubject = useCallback(async () => {
    try {
      const response = await getSubjectById(id);
      setSubject(response);
    } catch (error) {
      console.error(error.message);
    }
  }, [id]);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getQuestions(id, limit, (page - 1) * limit + createdQuestoinsCount);
      const { count, results } = response;
      setQuestions((prevQuestions) => [...prevQuestions, ...results]);
      setQuestionsCount(count);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  }, [id, limit, page]);

  useEffect(() => {
    if (isAnswer && !isOwner) {
      navigate('/403');
    }
    fetchSubject();
  }, [fetchSubject, isAnswer, isOwner, navigate]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    if (isInitialLoad) return;

    const observer = new IntersectionObserver(handleObserver, { threshold: 0 });
    const observerTarget = document.getElementById('observer');

    if (observerTarget) {
      observer.observe(observerTarget);
    }
    return () => observer.disconnect();
  }, [isInitialLoad]);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];

      if (target.isIntersecting && !isLoading && !isInitialLoad) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [isLoading, isInitialLoad],
  );

  const handleDeleteSubject = async () => {
    try {
      await deleteSubjectById(id);
      setIsConfirmModalOpen(false);
      setIsDeleteCompleteModalOpen(true);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseQuestionModal = () => {
    setIsModalVisible(false);

    setTimeout(() => {
      setIsModalOpen(false);
    }, 400);
  };

  const handleCloseConfirmModal = () => {
    setIsModalVisible(false);

    setTimeout(() => {
      setIsConfirmModalOpen(false);
    }, 400);
  };

  const handleCloseDeleteCompleteModal = () => {
    setIsModalVisible(false);

    setTimeout(() => {
      setIsDeleteCompleteModalOpen(false);
      navigate('/list'); // 모달이 닫힌 후 이동
    }, 400);
  };

  const handleShowToast = () => setShowToast(true);
  const handleHideToast = () => setShowToast(false);

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
    setIsModalVisible(true);
  };

  const handleCompleteModalConfirm = () => {
    handleCloseDeleteCompleteModal();
  };

  const handleToggleMenu = (questionId) => {
    setOpenMenuId((prevId) => {
      const newId = prevId === questionId ? null : questionId;
      return newId;
    });
  };

  return (
    <FeedDetailPageWrapper>
      <Header
        id={id}
        image={subject.imageSource}
        name={subject.name}
        questionsCount={questionsCount}
      />
      <Main>
        <DeleteSubjectBtn onClick={handleOpenConfirmModal}>삭제하기</DeleteSubjectBtn>
        <QuestionsContainer>
          {questionsCount ? (
            <>
              <QuestionCounterContainer>
                <QuestionIcon src='/images/icons/ic_messages_brown.svg' />
                <QuestionCountText>{`${questionsCount}개의 질문이 있습니다.`}</QuestionCountText>
              </QuestionCounterContainer>

              {questions.map((question) => (
                <QuestionBox
                  key={question.id}
                  question={question}
                  image={subject.imageSource}
                  name={subject.name}
                  isOwner={isOwner}
                  isMenuOpen={openMenuId === question.id}
                  onToggleMenu={() => handleToggleMenu(question.id)}
                />
              ))}
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
            setCreatedQuestionsCount={setCreatedQuestionsCount}
            setQuestions={setQuestions}
            onModalClose={handleCloseQuestionModal}
            onToastshow={handleShowToast}
          />
        )}

        {showToast && (
          <Toast message={'질문이 성공적으로 작성되었습니다.'} onClose={handleHideToast} />
        )}

        {/* 삭제 확인 모달 */}
        {isConfirmModalOpen && (
          <ConfirmModal
            message='정말 삭제하시겠습니까?'
            confirmText='삭제'
            onConfirm={handleDeleteSubject}
            onCancel={handleCloseConfirmModal}
            isVisible={isModalVisible}
          />
        )}

        {/* 삭제 완료 모달 */}
        {isDeleteCompleteModalOpen && (
          <ConfirmModal
            message='피드가 삭제되었습니다.'
            confirmText='확인'
            onConfirm={handleCompleteModalConfirm}
            onCancel={handleCloseDeleteCompleteModal}
            isVisible={isModalVisible}
          />
        )}

        <div id='observer' style={{ height: '10px' }}></div>
      </Main>
    </FeedDetailPageWrapper>
  );
}

export default FeedDetailPage;
