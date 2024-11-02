import styled from 'styled-components';
import theme from '../../styles/theme';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 31px;

  @media (min-width: 768px) {
    margin-top: 11px;
  }

  @media (min-width: 868px) {
    margin-top: 11px;
  }

  @media (min-width: 1200px) {
    margin-top: 11px;
  }
`;

const PaginationButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-family: 'Actor', sans-serif;
  font-weight: ${({ $isCurrentPage }) => ($isCurrentPage ? '900' : '300')};
  color: ${({ $isCurrentPage }) => ($isCurrentPage ? theme.brown[40] : theme.gray[40])};
  width: 40px;
  height: 40px;
  cursor: pointer;
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
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => currentPage > 1 && pageChange(currentPage - 1)}
        type='button'
      >
        <img src='images/icons/Arrow-left.svg' alt='왼쪽화살표' />
      </PaginationButton>
      {pages.map((page) => (
        <PaginationButton
          key={page}
          $isCurrentPage={currentPage === page}
          onClick={() => pageChange(page)}
        >
          {page}
        </PaginationButton>
      ))}
      <PaginationButton
        disabled={currentPage === totalPage}
        onClick={() => currentPage < totalPage && pageChange(currentPage + 1)}
        type='button'
      >
        <img src='images/icons/A-right.svg' alt='오른쪽화살표' />
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
