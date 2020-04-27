import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


function withAuth(Component) {
  function WrapperComponent(props){
    // const token = localStorage.getItem('token');
    const token = useSelector(state => state.auth.token);
  
    if(token === null){
      return <Redirect to="/signin"/>
    }
    return <Component {...props} token ={token} />

  }
  WrapperComponent.displayName = `withAuth(${Component.name})`
 return WrapperComponent;

}
export default withAuth;

