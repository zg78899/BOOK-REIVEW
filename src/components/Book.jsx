import React, { useEffect, useState } from 'react';
import * as axios from 'axios';
import styled, { css } from 'styled-components';
import { MdDelete } from 'react-icons/md';
import books from '../redux/modules/books';
import { useSelector } from 'react-redux';
import EditButtonContainer from '../containers/EditButtonContainer';
import { v4 as uuidv4 } from 'uuid';

const StyledButton = styled.div`
  background: #99ccff;
  text-align: center;
  color: white;
  font-size:20px;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin-top:10px;

  &:hover{
    color:white;
    background-color:#28546a;
  }
`;
const StyledSpan = styled.span.attrs(() => ({
  children: '*'
}))`
  color: #971931;
  font-weight:700;
`;

const StyledContentWrapepr = styled.div`
 border:1px solid #dddef5;
  border-radius: 10px;
   padding: 10px;
   p{
     padding-left:20px;
     font-weight:700;
   }
`;

function Book({books, bookId, title, message, author, url,removeBook}) {
  const token = useSelector(state => state.auth.token)
  const click = async () => {
    // console.log(bookId);
    // try {
    //   await axios.delete(`https://api.marktube.tv/v1/book/${bookId}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    //   RemoveBook(bookId);
    // } catch (error) {
    //   console.log(error);
    // }
    removeBook(books,bookId);
  };
  return (
    <div
      style={{
        border: '1px solid #28546a',
        borderRadius: 10,
        padding: 10,
        margin: 10,
      }}
    >
      <h2 style={{ borderBottom: '1px solid #dddef5', textAlign: 'center' }}>
        Title
      <StyledSpan /> :&nbsp;{title}
      </h2><EditButtonContainer key ={uuidv4()} bookId={bookId}/>
      <StyledContentWrapepr>
        <p>
          Comment
      <StyledSpan />:&nbsp;{message}
        </p>
        <p>
          Author
      <StyledSpan />:&nbsp;{author}
        </p>
        <p>
          <a href={url}>
            Link URL
        <StyledSpan />:&nbsp;&nbsp;&nbsp;{url}
          </a>
        </p>
      </StyledContentWrapepr>
      <StyledButton onClick={click}><MdDelete /></StyledButton>
    </div>
  )

}

export default Book;