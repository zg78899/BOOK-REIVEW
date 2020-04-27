import React, { useEffect } from 'react';
import styled from 'styled-components';
import Book from './Book';
import { Spin } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const LoadingSection = styled.div`
  position:absolute;
  align-items:center;
  top:0;
  left:0;
  text-align:center;
  color:#fff;
  text-shadow: 0 0 10px #000;
  width:100%;
  height:100%;
  background-color:rgba(33,33,33,0.2);
`;
const Spins = styled(Spin)`
position:absolute;
text-align:center;
  top: 50%;;
  left: 50%;
  transform: translateX(-50%);
  color:#fff;
  text-shadow: 0 0 10px #000;
  font-weight:700;
  font-size:20px;
  size:'large';
`;

const Books = ({
  books,
  loading,
  error,
  requestBooks,
  removeBook
}) => {

  useEffect(() => {
    requestBooks();
  }, [requestBooks]);

  // const RemoveBook = bookId => {
  //   // console.log(bookId);
  //   requestBooks(books.filter(book => book.bookId !== bookId));
  // };
  return (
    <div>
      {loading &&
        <LoadingSection>
          <Spins size="large" tip="로딩중입니다...">
          </Spins>
        </LoadingSection>}
      {error !== null && <p>{error.message}</p>}
      {books.map(book => (
        <Book
        key={uuidv4()}
          // key={book.bookId}
          {...book}
          // RemoveBook={RemoveBook}
          removeBook={removeBook}
          books={books}
        />
      ))}
    </div>
  )
}
export default Books;

