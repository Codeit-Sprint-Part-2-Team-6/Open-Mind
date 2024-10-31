import styled from 'styled-components';
import theme from '../../styles/theme';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  @media ${theme.typography.device.tabletMn} {
    margin-top: 20px;
  }

  @media ${theme.typography.device.laptopMn} {
    margin-top: 20px;
  }
`;

const PaginationButton = styled.button`
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: ${theme.typography.body3.fontSize};
`;

const Pagination = ({ totalPage, currentPage, pageChange }) => {
  const maxPage = 5;
  let startPage;

  if (totalPage <= maxPage) {
    startPage = 1;
  } else {
    startPage = Math.max(currentPage - Math.floor(maxPage / 2), 1);
    startPage = Math.min(startPage, totalPage - maxPage + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxPage, totalPage - startPage + 1) },
    (_, i) => startPage + i,
  );

  return (
    <PaginationContainer>
      <PaginationButton disabled={currentPage === 1} onClick={() => pageChange(currentPage - 1)}>
        <img src='images/icons/Arrow-left.svg' alt='왼쪽화살표' />
      </PaginationButton>
      {pages.map((page) => (
        <PaginationButton key={page} active={currentPage === page} onClick={() => pageChange(page)}>
          {page}
        </PaginationButton>
      ))}
      <PaginationButton
        disabled={currentPage === totalPage}
        onClick={() => pageChange(currentPage + 1)}
      >
        <img src='images/icons/Arrow-right.svg' alt='오른쪽화살표' />
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
