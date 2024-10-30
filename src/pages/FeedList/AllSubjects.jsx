import styled from 'styled-components';
import theme from '../../styles/theme';
import { getSubjects } from '../../api/api';
import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import UserCard from '../../components/Card';
import Pagination from './Pagination';

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
  justify-content: space-evenly;
  gap: 1.5rem;
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
  const [orderBy, setOrderBy] = useState('createdAt');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const handleSortCard = (sortOption) => {
    setOrderBy(sortOption);
  };

  const fetchData = async ({ orderBy, page, pageSize }) => {
    const subjects = await getSubjects({ orderBy, page, pageSize });
    setSubjectList(subjects.results);
    setTotalPage(Math.ceil(subjects.count / pageSize));
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

  const pageChange = (pageNum) => {
    setPage(pageNum);
    fetchData({ orderBy, page: pageNum, pageSize });
  };

  return (
    <Container>
      <HeaderContainer>
        <Title>누구에게 질문할까요?</Title>
        <Dropdown onSorCard={handleSortCard} />
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
