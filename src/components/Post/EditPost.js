import React from 'react';
import api from "../../services/api";
import { Drawer, Button, Form, Input } from 'antd';

import "./EditPost.css";

export default function EditArticle({post, visible, setVisible, setFeeds, feeds}) {

  const updatePost = async (e) => {
    console.log(e, post.id);
    const updatedPost  = await api.updatePost(post.id, e);
    setFeeds(feeds.map((item)=> post.id === item.id ? updatedPost : item));
    setVisible(false);
  };

  return (
    <Drawer
        title="Edit post"
        width="600"
        placement="right"
        onClose={() => setVisible(false)}
        visible={visible}
    >
        <Form
            name="basic"
            onFinish={updatePost}
            initialValues={{ title: post.title, body: post.body }}
        >
            <Form.Item
                label="Title"
                name="title"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Body"
                name="body"
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" shape="round" htmlType="submit">
                    Edit Post
                </Button>
            </Form.Item>
        </Form>
  </Drawer>
  );
}
