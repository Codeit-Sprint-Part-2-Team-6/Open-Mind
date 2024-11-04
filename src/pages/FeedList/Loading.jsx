import React from 'react';
import styled from 'styled-components';
// import SyncLoader from 'react-spinners/SyncLoader'; -> 스피너 회의 후 예상?

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

const Loding = () => {
  return (
    <StyledLoding>
      <StyledContainer>
        <div>loading</div>
      </StyledContainer>
    </StyledLoding>
  );
};

export default Loding;
