import "./App.css";
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import React, { useState } from 'react';
import { Route, Router } from "react-router-dom";
import Login from '../src/components/Login/Login';
import FeedsPage from "./components/Feeds/Feeds";
import PostPage from "../src/components/Post/Post";
import Header from "../src/components/Layouts/Header";
import Footer from "../src/components/Layouts/Footer";
import { createBrowserHistory as createHistory } from "history";

const {  Content } = Layout;
const history = createHistory();

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [visibleAddForm, setVisibleAddForm] = useState(false);

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Layout className="main-layout">
      <Header setToken={setToken} setVisibleAddForm={setVisibleAddForm}/>
        <Content className="main-content">
          <Router history={history}>
            <Route path="/" exact>
              <FeedsPage visibleAddForm={visibleAddForm} setVisibleAddForm={setVisibleAddForm}/>
            </Route>
          </Router>
          <Router history={history}>
            <Route path="/:id" exact>
              <PostPage />
            </Route>
          </Router>
        </Content>
      <Footer />
    </Layout>
  );
  
}


export default App;
