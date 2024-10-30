import styled from 'styled-components';

const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const PaginationButton = styled.button`
  width: 40px;
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ disabled }) => (disabled ? '#d1d5db' : '#4b5563')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
`;

const PageNumButton = styled.button`
  width: 40px;
  height: 40px;
  font-size: 16px;
  font-weight: ${({ active }) => (active ? 700 : 600)};
  color: ${({ active }) => (active ? '#542f1a' : '#4b5563')};
  background: none;
  border: none;
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
    <PaginationBar>
      <PaginationButton disabled={currentPage === 1} onClick={() => pageChange(currentPage - 1)}>
        <img src='images/icons/Arrow-left.svg' alt='왼쪽화살표' />
      </PaginationButton>
      {pages.map((page) => (
        <PageNumButton key={page} active={currentPage === page} onClick={() => pageChange(page)}>
          {page}
        </PageNumButton>
      ))}
      <PaginationButton
        disabled={currentPage === totalPage}
        onClick={() => pageChange(currentPage + 1)}
      >
        <img src='images/icons/A-right.svg' alt='오른쪽화살표' />
      </PaginationButton>
    </PaginationBar>
  );
};

export default Pagination;
