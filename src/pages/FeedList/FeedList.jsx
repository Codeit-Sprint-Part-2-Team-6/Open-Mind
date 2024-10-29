import React from 'react';
import CardList from './CardList';
import Header from './Header';
import Pagination from './Pagination';

function FeedList() {
  return (
    <>
      <Header />
      <CardList />
      <Pagination />
    </>
  );
}

export default FeedList;
