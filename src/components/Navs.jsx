import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Modal } from 'antd';
import { useState } from 'react';
import AddBookContainer from '../containers/AddBookContainer';
import { v4 as uuidv4 } from 'uuid';

const NavWrapper = styled.div`
display:flex;
`;
const StyledButton = styled.button`
  border-radius: 3px;
  border:none;
  line-height:14px;
  &:hover{
    cursor:pointer;
  }
`;
const LogoImg = styled.img`
width:50px;
height:50px;
margin-left:30px;
`;
const NavList = styled.ul`
display:flex;
list-style:none;
align-items:center;
margin:0;
text-align:right;

   li:nth-child(2n+1){
     margin-left:10px;
     text-align:right;
     font-size:auto;
   }
`;

const PopupContent = styled.div`
text-align:center;
`;

function Navs({ token, requestBooks, logout }) {
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = e => {
    setVisible(false);
  };
  const signOut=()=> {
    logout();
  }

  return (
    <NavWrapper>
      <Link to="/">
        <LogoImg src="/books.png" alt="bokks_review" />
        <b style={{ paddingLeft: 10, color: 'inherit' }}>BOOK REVIEW</b>
      </Link>

      <NavList key={uuidv4()}>
        <li>
          <StyledButton onClick={showModal}>
            책 추가하기
          </StyledButton>
        </li>
        <li>
          <StyledButton onClick={() => history.push('/signin')}>
            로그인
          </StyledButton>
        </li>
        <li>
          <StyledButton onClick={signOut}>
            로그아웃
            </StyledButton>
        </li>
      </NavList>
      <Modal
        title="책 추가하기 "
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <PopupContent>
          <AddBookContainer
            token={token}
            requestBooks={requestBooks}
            visible={visible}
            setVisible={setVisible}
          />
        </PopupContent>
      </Modal>

    </NavWrapper>
  )

}
export default Navs;
