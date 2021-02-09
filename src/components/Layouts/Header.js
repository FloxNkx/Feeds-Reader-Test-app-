import React from "react";
import { Button, PageHeader } from 'antd';

import "./Header.css";

export default function Header({ setToken, setVisibleAddForm }) {
  const logout = () => {
      setToken(null);
      localStorage.removeItem('token');
  }

  return (
    <div>
      <PageHeader
          className="page-header"
          title={<a href="/">Feed Reader App</a>}
          extra={[
              <Button type="primary" shape="round" onClick={() => setVisibleAddForm(true)}>
                Create Article
              </Button>,
              <Button type="primary" danger shape="round" onClick={logout}>
                Logout
              </Button>
          ]}
      />
    </div>
  );
}
