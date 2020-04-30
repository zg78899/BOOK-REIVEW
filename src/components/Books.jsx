import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { Table, Skeleton } from 'antd';
import { MdDelete } from 'react-icons/md';
import EditButtonContainer from '../containers/EditButtonContainer';

const LoadingWrapper = styled.div`
border:1px solid #dddfe5;
 border-radius: 10px;
 height:235.5px;
 margin-top: ${props =>props.top || 0}px;
`;

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
  padding:10px;
   p{
     padding-top:10px;
     padding-left:20px;
     font-weight:700;
   }
`;

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
  background-color:rgba(33,33,33,0.1);
  z-index:15;
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
  z-index:99;
`;


const Books = ({
  books,
  loading,
  error,
  requestBooks,
  removeBook,
}) => {

  useEffect(() => {
    requestBooks();

  }, [requestBooks]);

  return (
    <div>
      {error !== null && <p>{error.message}</p>}
      <Table
        dataSource={books === [] ? [] : books}
        columns={[
          {
            title: 'Book',
            dataIndex: 'book',
            key: 'book',
            render: (text, record) => (
              <div
                key ={uuidv4()}
                style={{
                  border: '1px solid #28546a',
                  borderRadius: 10,
                  padding: 10,
                  margin: 10,
                }}
              >
                <h2 style={{ borderBottom: '1px solid #dddef5', textAlign: 'center' }}>
                  Title
      <StyledSpan /> :&nbsp;{record.title}
                </h2><EditButtonContainer key={uuidv4()} bookId={record.bookId} />
                <StyledContentWrapepr>
                  <p>
                    Author
      <StyledSpan />:&nbsp;{record.author}
                  </p>
                  <p>
                    Comment
      <StyledSpan />:&nbsp;{record.message}
                  </p>
                  <p>
                    <a href={record.url}>
                      Link URL
        <StyledSpan />:&nbsp;&nbsp;&nbsp;{record.url}
                    </a>
                  </p>
                </StyledContentWrapepr>
                <StyledButton onClick={() => removeBook(books, record.bookId)}><MdDelete /></StyledButton>
              </div>
            ),
          },
        ]}
        loading={false}
        showHeader={false}
        locale={{
          emptyText: (
            <div>
              {loading &&
                <LoadingSection>
                  <Spins size="large" tip="로딩 중입니다.">
                  </Spins>
                </LoadingSection>}
              <LoadingWrapper>
                <Skeleton paragraph={{
                  rows:5
                }} active />
              </LoadingWrapper>
              <LoadingWrapper top={40}>
                <Skeleton paragraph={{
                  rows:5
                }} active />
              </LoadingWrapper>
              <LoadingWrapper top={40}>
                <Skeleton paragraph={{
                  rows:5
                }} active />
              </LoadingWrapper>
            </div>
          )
        }}
        pagination={{
          pageSize: 5,
          position:['bottomCenter'],
        }}
        style={{
          marginTop: 10,
        }}
        rowKey="bookId"
      />
    </div>
  )
}
export default Books;



