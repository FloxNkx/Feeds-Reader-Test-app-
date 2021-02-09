import { Layout } from 'antd';
import React, { useState } from "react";
import { Form, Input, Button, notification } from 'antd';

import './Login.css';

const {  Content } = Layout;

export default function Login({ setToken }) {
  const [items, setItems] = useState([]);

  const handleSubmit = async (e) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          let token = items.find(item => item.email === e.email);
          if (token) {
            setToken(token.id);
            localStorage.setItem("token", token.id);
            openNotificationWithIcon('success', "Success");
          } else {
            openNotificationWithIcon('error', "You entered incorrect e-mail");
          }
        },
      );
  };

  const openNotificationWithIcon = (type, title) => {
    notification[type]({
      message: title,
      duration: 1,
    });
  };

  return (
    <Layout className="login-layout">
      <Content className="login-main">
        <h1 className="login-title">Login</h1>
        <Form
          className="login-form"
          onFinish={e => handleSubmit(e)}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="button-submit">
            <Button shape="round" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
