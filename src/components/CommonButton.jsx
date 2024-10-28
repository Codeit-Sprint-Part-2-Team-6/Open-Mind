import styled from 'styled-components';
import { theme } from '../styles/theme';

const CommonButtonWrap = styled.div`
  border: 1px solid ${theme.brown[40]};
  border-radius: 8px;
  background-color: ${theme.brown[10]};
`;
const CommonButtonFlex = styled.div`
  padding: 8px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  @media (min-width: 768px) {
    padding: 12px 24px;
    gap: 8px;
  }
`;
const CommonButtonTxt = styled.p`
  color: ${theme.brown[40]};
  font-size: ${theme.typography.caption1.fontSize};

  @media (min-width: 768px) {
    font-size: ${theme.typography.body3.fontSize};
  }
`;
const CommonButtonArrowIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export default function CommonBtn({ text, onClick }) {
  return (
    <CommonButtonWrap as='button' onClick={onClick}>
      <CommonButtonFlex>
        <CommonButtonTxt>{text}</CommonButtonTxt>
        <CommonButtonArrowIcon src='/images/icons/arrow-right.svg' alt='화살표 이미지' />
      </CommonButtonFlex>
    </CommonButtonWrap>
  );
}
