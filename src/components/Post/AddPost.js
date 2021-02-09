import React from 'react';
import { Drawer, Button, Form, Input } from 'antd';
import api from "../../services/api";

export default function AddArticle({setFeeds, feeds, visible, setVisible}) {

  const createPost = async e => {
    const newTodo = await api.createPost(e);
    setFeeds([...feeds, newTodo.task]);
    setVisible(false);
  };

  return (
    <Drawer
        title="Add post"
        width="600"
        placement="right"
        onClose={() => setVisible(false)}
        visible={visible}
    >
        <Form
            name="basic"
            onFinish={createPost}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input title!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Body"
                name="body"
                rules={[{ required: true, message: 'Please input body!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Post
                </Button>
            </Form.Item>
        </Form>
  </Drawer>
  );
}
