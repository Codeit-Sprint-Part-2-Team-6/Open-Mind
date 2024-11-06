import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function ForbiddenPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <ForbiddenPageContainer>
      <ErrorMessage>403 - 접근 권한이 없습니다</ErrorMessage>
      <ErrorDescription>이 페이지에 접근할 권한이 없습니다.</ErrorDescription>
      <HomeButton onClick={handleGoHome}>홈으로 돌아가기</HomeButton>
    </ForbiddenPageContainer>
  );
}

export default ForbiddenPage;

const ForbiddenPageContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 40px 24px;
  margin: 100px auto;
  text-align: center;
  border-radius: 16px;
  position: relative;
  z-index: 2;

  @media (min-width: 768px) {
    max-width: 460px;
    padding: 48px 32px;
  }
`;

const ErrorMessage = styled.h1`
  font-size: ${({ theme }) => theme.typography.h3.fontSize};
  color: ${({ theme }) => theme.red};
  margin-bottom: 16px;
`;

const ErrorDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  color: ${({ theme }) => theme.gray[70]};
  margin-bottom: 24px;
`;

const HomeButton = styled.button`
  width: 100%;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.brown[40]};
  color: ${({ theme }) => theme.gray[10]};
  font-size: ${({ theme }) => theme.typography.body3.fontSize};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.brown[50]};
  }
`;
