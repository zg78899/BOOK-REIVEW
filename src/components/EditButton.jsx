import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import EditModalContainer from '../containers/EditModalContainer';

const EditModalButton = styled.button`
border-radius:10px;
width:30px;
height:30px;
display:inline-block;
text-align:right;
`;


const PopupContent = styled.div`
text-align:center;
`;

function EditButton({ requestBooks, bookId }) {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = (e) => {
    setVisible(false);
  }
  console.log(bookId);
  return (
    <div>
      <EditModalButton onClick={showModal} >
        <img src="/edit.png" alt="eidt" />
      </EditModalButton>
      <Modal
        title="내용 수정"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <PopupContent>
          <EditModalContainer
            bookId={bookId}
            requestBooks={requestBooks}
            visible={visible}
            setVisible={setVisible}
          />
        </PopupContent>
      </Modal>
    </div>
  )

}
export default EditButton;