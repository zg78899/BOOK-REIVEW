import { useSelector, useDispatch } from 'react-redux';
import {requestBooksSaga} from '../redux/modules/books';
import {logoutSaga} from '../redux/modules/auth';
import Navs from '../components/Navs';
import React,{useCallback} from 'react';


const NavContainer = (props) => {
  const token = useSelector(state => state.auth.token);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);

  const dispatch = useDispatch();
  
  const requestBooks = useCallback(()=>{
    dispatch(requestBooksSaga())
  },[dispatch]);
  const logout = useCallback(()=>{
    dispatch(logoutSaga())
  },[dispatch]);
  
  return <Navs
    {...props}
    token={token}
    loading={loading}
    error={error}
    requestBooks={requestBooks}
    logout={logout} />
}

export default NavContainer;