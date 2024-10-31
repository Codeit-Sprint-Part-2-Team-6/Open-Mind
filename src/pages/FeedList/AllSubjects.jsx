import styled from 'styled-components';
import theme from '../../styles/theme';
import { getSubjects } from '../../api/api';
import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import UserCard from '../../components/Card';
import Pagination from './Pagination';
import { debounce } from 'lodash';

const getPageSize = () => {
  const width = window.innerWidth;

  if (width < 768) return 6;
  else if (width < 868) return 6;
  else if (width < 1280) return 8;
  else return 8;
};

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
  font-size: ${theme.typography.h3.fontSize};
  font-weight: ${theme.typography.h3.fontWeight};

  @media ${theme.typography.device.tabletMn} {
    font-size: ${theme.typography.h1.fontSize};
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 1.5rem;
  margin-top: 20px;
`;

const UserCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media ${theme.typography.device.tabletMn} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 950px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${theme.typography.device.laptopMn} {
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
  const [totalPage, setTotalPage] = useState();

  const handleSortCard = (sortOption) => {
    console.log('Selected sort option:', sortOption);
    setSort(sortOption);
  };

  const fetchData = async ({ sort, page, pageSize }) => {
    const subjects = await getSubjects({ sort, page, pageSize });
    setSubjectList(subjects.results);
    setTotalPage(Math.ceil(subjects.count / pageSize));
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    const debouncedHandleResize = debounce(handleResize, 250); // Debounce function

    window.addEventListener('resize', debouncedHandleResize);
    fetchData({ sort, page, pageSize });

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [sort, page, pageSize]);

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
        <UserCardGrid>
          {subjectList?.map((subject) => (
            <UserCard item={subject} key={subject.id} />
          ))}
        </UserCardGrid>
        <PaginationContainer>
          <Pagination totalPage={totalPage} currentPage={page} pageChange={pageChange} />
        </PaginationContainer>
      </GridContainer>
    </Container>
  );
}

export default AllSubjects;
