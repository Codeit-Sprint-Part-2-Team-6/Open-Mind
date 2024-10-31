import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardLink = styled(Link)`
  display: block;
  height: 168px;
  max-width: 155.5px;
  min-width: 155.5px;
  background-color: var(--Grayscale-10);
  border: 2px solid var(--Grayscale-40);
  border-radius: 1rem;
  padding: 1.25rem;
  position: relative;
  transition: border-color 0.3s;

  &:hover {
    border-color: var(--Blue-50);
  }

  @media (min-width: 640px) {
    height: 187px;
    max-width: 220px;
    min-width: 220px;
  }

  @media (min-width: 768px) {
    max-width: 220px;
    min-width: 186px;
  }

  @media (min-width: 1024px) {
    width: 220px;
  }
`;

const UserImage = styled.img`
  border-radius: 50%;
  width: 56px; // w-14
  height: 56px; // h-14

  @media (min-width: 640px) {
    width: 64px; // w-16
    height: 64px; // h-16
  }
`;

const UserName = styled.p`
  font-size: 1rem; // text-lg
  color: var(--Grayscale-60);
  padding-top: 0.75rem; // pt-3
  font-weight: normal;

  @media (min-width: 640px) {
    font-size: 1.25rem; // tablet-1:text-xl
  }
`;

const QuestionCountContainer = styled.div`
  margin-top: 0.75rem; // mt-3
  display: flex;
  justify-content: space-between;
  font-size: 1rem; // text-base
  color: var(--Grayscale-40);
  font-weight: normal;

  @media (min-width: 640px) {
    margin-top: 1.5rem; // tablet-1:mt-6
  }
`;

const MessageIcon = styled.img`
  width: 16px; // w-4
  height: 16px; // h-4

  @media (min-width: 640px) {
    width: 20px; // w-5
    height: 20px; // h-5
  }
`;

function UserCard({ item }) {
  return (
    <CardLink to={`/post/${item.id}`}>
      <UserImage alt={item.name} />
      <UserName>{item.name}</UserName>
      <QuestionCountContainer>
        <div className='flex items-center justify-center gap-1'>
          <MessageIcon alt='메세지 아이콘' />
          <p>받은 질문</p>
        </div>
        <p>{item.questionCount}개</p>
      </QuestionCountContainer>
    </CardLink>
  );
}

export default UserCard;
