import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Home.css';
import BooksContainer from '../containers/BooksContainer';
import NavContainer from '../containers/NavContainer';
import styled from 'styled-components';

const StyledMenu = styled(Menu).attrs(() => ({
  mode: 'inline',
  defaultSelectedKeys: ['1'],
  theme: 'dark'
}))`
  height: 100%;
`;

function Home({
  token
}) {
  const { Header, Content, Footer, Sider } = Layout;

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" >
          <div className="profile-wrapper">
            <a href="https://github.com/zg78899/BOOK-REIVEW"
              target="_blank"
              rel="noopener noreferrer">
              <img className="profile" src="/profile.gif" alt="profile" />
            </a>
          </div>
          <div className="user-detail">
            <p className="dev">개발자 : 김재헌</p>
            <p className="email">이메일 : zg788990@gmail.com</p>
          </div>
        </div>

        <StyledMenu >
          <Menu.Item key="1">
            <UserOutlined />
            <span className="nav-text" >
              메인 책 리뷰
              </span>
          </Menu.Item>
          <Menu.Item key="2" >
            <UserOutlined />
            <span className="nav-text">나의 책 목록</span>
          </Menu.Item>

        </StyledMenu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
          <NavContainer token={token} />
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ position: "relative", padding: 24, minHeight: '100vh', }}>
            <BooksContainer/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Book Review &copy; Book reivew</Footer>
      </Layout>
    </Layout>

  )
}
export default Home;





