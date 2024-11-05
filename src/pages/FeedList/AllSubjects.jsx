import styled from 'styled-components';
import theme from '../../styles/theme';
import { getSubjects } from '../../api/subjectApi';
import React, { useEffect, useState, useCallback } from 'react';
import Dropdown from './Dropdown';
import UserCard from '../../components/Card';
import Pagination from './Pagination';
import { debounce } from 'lodash';
import Loding from './Loading';

const getPageSize = () => (window.innerWidth < 868 ? 6 : 8);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: ${({ theme }) => theme.gray[20]};
  @media ${theme.typography.device.tabletMn} {
    gap: 8px;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 6px 0;
  @media ${theme.typography.device.tabletMn} {
    flex-direction: column;
    padding: 8px;
    gap: 5px;
  }
`;

const Title = styled.p`
  font-family: 'Actor';
  font-size: 24px;
  font-weight: 400;
  margin-left: 24px;
  @media ${theme.typography.device.tabletMn} {
    font-size: 40px;
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 1.5rem;
  margin-top: 20px;
  margin-left: 12px;
  margin-right: 12px;
`;

const UserCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 868px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const PaginationContainer = styled.div`
  position: absolute;
  top: 820px;
  @media ${theme.typography.device.tabletMn} {
    top: 718px;
  }
  @media (min-width: 950px) {
    top: 701px;
  }
  @media ${theme.typography.device.laptopMn} {
    top: 695px;
  }
`;

function AllSubjects() {
  const [pageSize, setPageSize] = useState(getPageSize());
  const [subjectList, setSubjectList] = useState([]);
  const [sort, setSort] = useState('createdAt');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSortCard = (sortOption) => {
    setSort(sortOption);
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const subjects = await getSubjects({ sort, page, pageSize });
      setSubjectList(subjects.results);
      setTotalPage(Math.ceil(subjects.count / pageSize));
    } catch (error) {
      console.log('Error fetchingdata:', error);
    } finally {
      setIsLoading(false);
    }
  }, [sort, pageSize, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    const debouncedHandleResize = debounce(handleResize, 250);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  const pageChange = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <Container>
      <HeaderContainer>
        <Title>누구에게 질문할까요?</Title>
        <Dropdown onSortCard={handleSortCard} />
      </HeaderContainer>
      <GridContainer>
        {isLoading ? (
          <Loding />
        ) : (
          <UserCardGrid>
            {subjectList?.map((subject) => (
              <UserCard item={subject} key={subject.id} />
            ))}
          </UserCardGrid>
        )}
        <PaginationContainer>
          <Pagination totalPage={totalPage} currentPage={page} pageChange={pageChange} />
        </PaginationContainer>
      </GridContainer>
    </Container>
  );
}

export default AllSubjects;
