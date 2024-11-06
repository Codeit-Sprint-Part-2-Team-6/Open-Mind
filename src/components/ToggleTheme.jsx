import styled from 'styled-components';

export default function ToggleThemeBtn({ isDarkMode, toggleTheme }) {
  return (
    <ToggleContainer $isDarkMode={isDarkMode}>
      <BgMove $isDarkMode={isDarkMode} />
      <ToggleButton
        $active={!isDarkMode}
        $isDarkMode={isDarkMode}
        onClick={() => toggleTheme(false)}
      >
        Light
      </ToggleButton>
      <ToggleButton $active={isDarkMode} $isDarkMode={isDarkMode} onClick={() => toggleTheme(true)}>
        Dark
      </ToggleButton>
    </ToggleContainer>
  );
}
const ToggleContainer = styled.div`
  display: flex;
  width: 90px;
  height: 30px;
  border-radius: 20px;
  background: ${({ $isDarkMode }) => ($isDarkMode ? '#1F1D2A' : '#E8E8E8')};
  position: fixed;
  top: 15px;
  right: 24px;
  z-index: 3;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all 0.3s ease;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    width: 120px;
    height: 40px;
    top: unset;
    right: unset;
    bottom: 45px;
    left: 45px;
  }
`;

const ToggleButton = styled.button`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.caption1.fontSize};
  color: ${({ $active, $isDarkMode }) => ($active ? ($isDarkMode ? '#fff' : '#666') : '#9b9b9b')};
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: 600;
  position: relative;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:first-child {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  &:last-child {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    padding: 10px 0;
    font-size: ${({ theme }) => theme.typography.body3.fontSize};
  }
`;

const BgMove = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: ${({ $isDarkMode }) => ($isDarkMode ? '50%' : '0')};
  background: ${({ $isDarkMode }) => ($isDarkMode ? '#34323F' : '#ffffff')};
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'transparent' : '#E8E8E8')};
`;
