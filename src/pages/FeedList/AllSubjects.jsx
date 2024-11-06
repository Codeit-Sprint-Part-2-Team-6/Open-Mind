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
  white-space: nowrap;

  @media ${theme.typography.device.tabletMn} {
    font-size: 40px;
  }
`;

const GridContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 30px;
  margin-top: 20px;
  padding: 0 24px;

  @media (min-width: 768px) {
    gap: 46px;
    padding: 0 32px;
  }
`;

const UserCardGrid = styled.div`
  width: 100%;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  overflow: hidden;
  padding: 8px 0;
  margin: 0 auto;
  max-height: 552px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    max-height: 406px;
  }
  @media (min-width: 868px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    width: fit-content;
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

        <Pagination totalPage={totalPage} currentPage={page} pageChange={pageChange} />
      </GridContainer>
    </Container>
  );
}

export default AllSubjects;
