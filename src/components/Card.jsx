import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const CardContainer = styled(Link)`
  display: block;
  height: 168px;
  width: 80%;
  min-width: 155.5px;
  background-color: ${({ theme }) => theme.gray[10]};
  border: 1px solid ${({ theme }) => theme.gray[40]};
  border-radius: 16px;
  transition: transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.red};
    opacity: 1;
    transform: translateY(-3px);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    height: 187px;
    width: 100%;
  }

  @media (${({ theme }) => theme.typography.device.laptopMn}) {
    width: 220px;
  }
`;

const CardPadding = styled.div`
  padding: 16px;
  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    padding: 20px;
  }
`;

const CardImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  mix-blend-mode: ${(props) => props.theme.mixBlendMode};
  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    width: 60px;
    height: 60px;
  }
`;

const CardName = styled.p`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: ${({ theme }) => theme.typography.body2.fontWeight};
  margin-top: 12px;
  margin-bottom: 30px;
  @media (${({ theme }) => theme.typography.device.tabletMn}) {
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
  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    font-size: ${({ theme }) => theme.typography.body3.fontSize};
  }
`;

const CardQuestionCount = styled.div`
  font-size: ${({ theme }) => theme.typography.caption1.fontSize};
  color: ${({ theme }) => theme.gray[40]};
  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    font-size: ${({ theme }) => theme.typography.body3.fontSize};
  }
`;
