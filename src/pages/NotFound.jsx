import React from 'react';
import styled from 'styled-components';
import NavContainer from '../containers/NavContainer';


const StyledWrapper = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-items:center;
transform: translateY(91px);

.not-found{
  width:calc(100% - width);
  position:relative;
}
p{
  align-items:center;
  padding-top:30px;
  font-size:15px;
  font-weight:700;
  span{
    font-size:23px;
  }
}
`;
const StyledButtonWrapper = styled.div`
button{
  border:none;
  padding:10px;
  border-radius:10px;
  margin:0 10px;
  font-weight:700; 
  &:hover{
    cursor:pointer;
  }
}
.back{
    img{
    transform: translateY(-2px);
    margin-right: 5px;
    
    }
  }
  .home{
    img{
      transform: translateY(-2px);
      margin-left:5px;
    }
  }
`;

function NotFound({ history }) {


  const goBack = () => {
    history.goBack();
  }
  const goHome = () => {
    history.push('/');
  }
  return (
    <div>
      <NavContainer />
      <StyledWrapper>
        <img className="not-found" src="/notFound.png" alt="notFound" />
        <div style={{position:'absolute',top:'15%'}}>
          <p>
            <span>OPPS!!</span>
           &nbsp;&nbsp;찾을 수 없는 페이지 입니다.
        </p>
          <StyledButtonWrapper>
            <button className="back" onClick={goBack}>
              <img src="/icon1.png" alt="left" />
            뒤로 가기
            </button>
            <button className="home" onClick={goHome}>
              홈페이지로 이동
            <img src="/icon.png" alt="right" />
            </button>
          </StyledButtonWrapper>
        </div>
        
      </StyledWrapper>
    </div>

  )

}
export default NotFound;