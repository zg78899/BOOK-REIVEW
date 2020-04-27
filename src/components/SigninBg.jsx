import React from 'react';
import {Col} from 'antd';
import styled from 'styled-components';

const StyledCol = styled(Col).attrs(()=>({
  span:12,
}))``;

const StyledImg = styled.img`
width:100%;
`;

function SigninBg() {
  return (
   <StyledCol>
     <StyledImg src="/libary1.jpg" alt="Signin img"/>
   </StyledCol>
  )

}
export default SigninBg;