import styled from 'styled-components';
import theme from '../../styles/theme';
import { getSubjects } from '../../api/api';
import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import UserCard from '../../components/Card';

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
  background-color: var(--Grayscale-20);

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
  font-size: 1.5rem;
  font-weight: normal;

  @media ${theme.typography.device.tabletMn} {
    font-size: 2.5rem;
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: even;
  gap: 1.5rem;
`;

const UserCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

function AllSubjects() {
  const [pageSize, setPageSize] = useState(getPageSize());
  const [subjectList, setSubjectList] = useState([]);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [page, setPage] = useState(1);

  const handleSortCard = (sortOption) => {
    setOrderBy(sortOption);
  };

  const fetchData = async ({ orderBy, page, pageSize }) => {
    const subjects = await getSubjects({ orderBy, page, pageSize });
    setSubjectList(subjects.results);
    // 페이지네이션자리
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener('resize', handleResize);
    fetchData({ orderBy, page, pageSize });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [orderBy, page, pageSize]);

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
      </GridContainer>
    </Container>
  );
}

export default AllSubjects;
