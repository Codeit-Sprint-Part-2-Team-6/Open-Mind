import styled from 'styled-components';

export default function CommonBtn({ text, onClick, className }) {
  return (
    <CommonButtonWrap as='button' className={className} onClick={onClick}>
      <CommonButtonFlex>
        <CommonButtonTxt>{text}</CommonButtonTxt>
        <CommonButtonArrowIcon src='/images/icons/arrow-right.svg' alt='화살표 이미지' />
      </CommonButtonFlex>
    </CommonButtonWrap>
  );
}

const CommonButtonWrap = styled.div`
  border: 1px solid ${({ theme }) => theme.brown[40]};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.brown[10]};
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.brown[20]};
    transform: scale(1.05);
  }
`;

const CommonButtonFlex = styled.div`
  padding: 8px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    padding: 12px 24px;
    gap: 8px;
  }
`;

const CommonButtonTxt = styled.p`
  color: ${({ theme }) => theme.brown[40]};
  font-size: ${({ theme }) => theme.typography.caption1.fontSize};

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    font-size: ${({ theme }) => theme.typography.body3.fontSize};
  }
`;

const CommonButtonArrowIcon = styled.img`
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;

  ${CommonButtonWrap}:hover & {
    transform: translateX(6px);
  }
`;
