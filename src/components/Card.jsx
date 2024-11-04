import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardContainer = styled(Link)`
  display: block;
  height: 168px;
  width: 155.5px;
  background-color: ${({ theme }) => theme.gray[10]};
  position: relative;
  border: 1px solid ${({ theme }) => theme.gray[40]};
  border-radius: 16px;
  &:hover {
    border-color: ${({ theme }) => theme.red};
    opacity: 1;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  @media (min-width: 768px) {
    height: 187px;
    width: 220px;
  }
  @media (min-width: 868px) {
    min-width: 186px;
    max-width: 206.5px;
  }
  @media (min-width: 1200px) {
    width: 220px;
  }
`;

const CardPadding = styled.div`
  padding: 16px;
  @media (min-width: 768px) {
    padding: 20px;
  }
`;

const CardImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  mix-blend-mode: ${(props) => props.theme.mixBlendMode};
  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const CardName = styled.p`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: ${({ theme }) => theme.typography.body2.fontWeight};
  margin-top: 12px;
  margin-bottom: 30px;
  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
    font-weight: ${({ theme }) => theme.typography.body1.fontWeight};
    margin-bottom: 28px;
  }
`;

const CardQuestionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardQuestionBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5.5px;
`;

const CardQuestionIcos = styled.img`
  width: auto;
`;

const CardQuestionTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.caption1.fontSize};
  color: ${({ theme }) => theme.gray[40]};
  margin: 0;
  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.body3.fontSize};
  }
`;

const CardQuestionCount = styled.div`
  font-size: ${({ theme }) => theme.typography.caption1.fontSize};
  color: ${({ theme }) => theme.gray[40]};
  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.body3.fontSize};
  }
`;

export default function Card({ item }) {
  return (
    <CardContainer to={`/post/${item.id}`}>
      <CardPadding>
        <CardImage src={item.imageSource} alt={`${item.name}의 이미지`} />
        <CardName>{item.name}</CardName>
        <CardQuestionWrap>
          <CardQuestionBox>
            <CardQuestionIcos src='/images/icons/Messages.svg' alt='메시지 아이콘' />
            <CardQuestionTxt>받은 질문</CardQuestionTxt>
          </CardQuestionBox>
          <CardQuestionCount>{item.questionCount}개</CardQuestionCount>
        </CardQuestionWrap>
      </CardPadding>
    </CardContainer>
  );
}
