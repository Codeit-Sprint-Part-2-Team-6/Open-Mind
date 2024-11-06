import styled from 'styled-components';
import RotateLoader from 'react-spinners/RotateLoader';

const Loding = () => {
  return (
    <StyledLoding>
      <StyledContainer>
        <RotateLoader />
      </StyledContainer>
    </StyledLoding>
  );
};

export default Loding;

const StyledLoding = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1000px;
  opacity: 0.5;
`;
