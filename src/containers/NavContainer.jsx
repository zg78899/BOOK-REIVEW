import React,{useCallback} from 'react';
import Navs from '../components/Navs';
import { useSelector, useDispatch } from 'react-redux';
import {requestBooksSaga} from '../redux/modules/books';
import {logoutSaga} from '../redux/modules/auth';

const NavContainer = (props) => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  
  const requestBooks = useCallback(()=>{
    dispatch(requestBooksSaga())
  },[dispatch]);

  const logout = useCallback(()=>{
    dispatch(logoutSaga())
  },[dispatch])
  
  return <Navs
    {...props}
    token={token}
    requestBooks={requestBooks}
    logout={logout} />
}

export default NavContainer;