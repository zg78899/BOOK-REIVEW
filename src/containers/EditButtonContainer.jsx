import { useSelector, useDispatch } from 'react-redux';
import {requestBooksSaga} from '../redux/modules/books';
import React,{useCallback} from 'react';
import EditButton from '../components/EditButton';


const EditButtonContainer = (props) => {
  const token = useSelector(state => state.auth.token);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);

  const dispatch = useDispatch();
  
  const requestBooks = useCallback(()=>{
    dispatch(requestBooksSaga())
  },[dispatch]);
  
  return <EditButton
    bookId={props.bookId}
    token={token}
    loading={loading}
    error={error}
    requestBooks={requestBooks}
     />
}

export default EditButtonContainer;