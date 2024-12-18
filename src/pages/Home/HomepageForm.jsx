import styled from 'styled-components';
import { useState } from 'react';
import { createSubject } from '../../api/subjectApi';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useStore';

function HomeForm() {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 7) {
      setErrorMessage('7글자 안에 이름을 적어주세요');
      setIsDisabled(true);
    } else {
      setInputValue(value);
      setErrorMessage('');
      setIsDisabled(false);
    }

    if (value.trim() !== '' && value.length <= 7) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled || inputValue.trim() === '') {
      setErrorMessage('이름을 입력하세요.');
    } else {
      try {
        const data = await createSubject(inputValue);
        const { id: feedId, name: ownerName } = data;

        setUser(feedId, ownerName);
        setErrorMessage('');
        setInputValue('');

        navigate(`/post/${feedId}/answer`);
      } catch (error) {
        setErrorMessage(error.message);
        console.error(error);
      }
    }
  };

  return (
    <>
      <HomePageForm onSubmit={handleSubmit}>
        <HomeInputCon>
          <HomeInputWrap>
            <InputIcon src='/images/icons/Person.svg' alt='사람아이콘' />
            <HomePageInput
              type='text'
              id='username'
              name='username'
              value={inputValue}
              onChange={handleChange}
              placeholder='이름을 입력하세요'
              autoComplete='off'
            />
          </HomeInputWrap>
          {errorMessage && <ErrorTxt $isVisible>{errorMessage}</ErrorTxt>}
          <QuestionReceiveBtn as='button' type='submit' disabled={isDisabled}>
            질문 받기
          </QuestionReceiveBtn>
        </HomeInputCon>
      </HomePageForm>
      <HomePageBackground src='/images/backgrounds/home-page-bg.svg' alt='메인이미지' />
    </>
  );
}

const HomePageForm = styled.form`
  max-width: 305px;
  width: 100%;
  padding: 24px;
  margin: 0 auto;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.gray[10]};
  z-index: 2;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    max-width: 400px;
    padding: 32px;
  }
`;

const HomeInputCon = styled.div`
  max-width: 257px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    max-width: 336px;
  }
`;

const HomeInputWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.gray[40]};
`;

const InputIcon = styled.img``;

const HomePageInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.typography.body3.fontSize};

  &::placeholder {
    font-family: 'Pretendard';
    font-size: ${({ theme }) => theme.typography.body3.fontSize};
    transition: opacity 0.3s;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`;
const ErrorTxt = styled.p`
  color: ${({ theme }) => theme.red};
  opacity: 0;
  animation: ${({ isVisible }) => (isVisible ? 'fadeOut 0.5s forwards' : 'fadeIn 0.5s forwards')};

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;
const QuestionReceiveBtn = styled.div`
  width: 100%;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 12px 0px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.brown[40]};
  color: ${({ theme }) => theme.gray[10]};
  font-size: ${({ theme }) => theme.typography.body3.fontSize};
  cursor: pointer;
`;

const HomePageBackground = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 1;
`;

export default HomeForm;
