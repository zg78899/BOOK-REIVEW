import React from 'react';
import { Input, Button, Col, } from 'antd';
import styled from 'styled-components';

const InputTitle = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  margin-left:${(props) => props.left}px;
  margin-top: ${props => props.top || '15'}px;
  text-align: left;
  padding-left: 40px;
`;

const InputArea = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const StyledInput = styled(Input)`
  width: 320px;
  border-radius: 1px;
  border-width: 1px;
  font-family: Roboto;
  margin-left: 40px;
  margin-right: 40px;
`;

const ButtonArea = styled.div`
  text-align: left;
  padding-left: 40px;
  margin-top: 20px;
`;
const StyledButton = styled(Button)`
  border-color: #28546a;
  background-color: #28546a;
  text-transform: uppercase;
  border-radius: 1px;
  border-width: 2px;
  color: white;
  width: 120px;

  &:hover {
    background-color: #28546a;
    color: white;
  }
`;

const StyledSpan = styled.span.attrs(() => ({
  children: '*'
}))`
  color: #971931;
`;

export function EditModal({ editBook, books, bookId, setVisible }) {

  const titleInput = React.createRef();
  const messageInput = React.createRef();
  const authorInput = React.createRef();
  const urlInput = React.createRef();

  const initialValue = () => {
    titleInput.current.state.value = '';
    messageInput.current.state.value = '';
    authorInput.current.state.value = '';
    urlInput.current.state.value = '';
  }
  const clickBtn = () => {
    const bookRef = {
      title: titleInput.current.state.value,
      message: messageInput.current.state.value,
      author: authorInput.current.state.value,
      url: urlInput.current.state.value
    };

    function edit(bookRef){
      editBook( books ,bookId,{
        title:bookRef.title,
        message:bookRef.message,
        author:bookRef.author,
        url:bookRef.url
      });
    }
    console.log(bookId)
    edit(bookRef);
    initialValue();
    setVisible(false);
  }
  return (

    <Col
      span={24}
      style={{
        verticalAlign: 'top'
      }}
    >
      <InputTitle left={40}>
        Title
          <StyledSpan />
      </InputTitle>
      <InputArea>
        <StyledInput placeholder="Title" ref={titleInput} />
      </InputArea>
      <InputTitle left={40} top={10}>
        Comment
          <StyledSpan />
      </InputTitle>
      <InputArea>
        <StyledInput placeholder="Comment" ref={messageInput} />
      </InputArea>
      <InputTitle left={40} top={10}>
        Author
          <StyledSpan />
      </InputTitle>
      <InputArea>
        <StyledInput placeholder="Author" ref={authorInput} />
      </InputArea>
      <InputTitle left={40} top={10}>
        URL
          <StyledSpan />
      </InputTitle>
      <InputArea>
        <StyledInput placeholder="URL" ref={urlInput} />
      </InputArea>
      <ButtonArea>
        <StyledButton left={40} size="large" onClick={clickBtn} >
          추가하기
          </StyledButton>
      </ButtonArea>
    </Col>

  )

}
export default EditModal;