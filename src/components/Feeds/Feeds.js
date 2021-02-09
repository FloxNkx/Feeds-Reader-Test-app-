import AddPost from '../Post/AddPost';
import { List,  Button } from 'antd';
import EditPost from '../Post/EditPost';
import api from "../../services/api";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import './Feeds.css';

export default function Home({visibleAddForm, setVisibleAddForm}) {
  const [feeds, setFeeds] = useState([]);
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleEditForm, setVisibleEditForm] = useState(false);

  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async (init) => {
    try {
      setLoading(true);
      const feeds = await api.getAllFeeds();
      if (!init) {
        feeds.length = 4;
      }
      setFeeds(feeds);
      setLoading(false)
    }
    catch(e) {
      setLoading(true);
    }
  };

  const deletePost= async (e) => {
    try {
      setLoading(true);
      await api.deletePost(e.id);
      setFeeds(feeds.filter(item => item.id !== e.id));
      setLoading(false);
    } catch (err) {
      setLoading(true);
    }
  };
    
  const showUpdateForm = (e) => {
    setPost(e);
    setVisibleEditForm(!visibleEditForm);
  };

  return (
    <div className="feeds-list">
      <List
        className="demo-loadmore-list"
        grid={{ gutter: [40, 40], column: 2 }}
        loading={loading}
        dataSource={feeds}
        renderItem={item => (
            <List.Item
              className="feed-item"
              actions={[
                <a onClick={() => deletePost(item)}>
                  Delete
                </a>, 
                <a onClick={() => showUpdateForm(item)}>
                  Edit
                </a>
            ]}
            >
            <Link to={`/${item.id}`}>
              <List.Item.Meta
                title={item.title}
                description={item.body}
              />
            </Link>
            </List.Item>
        )}
      />
      <EditPost
        post={post} 
        visible={visibleEditForm} 
        setFeeds={setFeeds} 
        feeds={feeds} 
        setVisible={setVisibleEditForm}
      />

      <AddPost
        visible={visibleAddForm} 
        setFeeds={setFeeds} 
        feeds={feeds} 
        setVisible={setVisibleAddForm}
      />

      <Button 
        className="feeds-more" 
        shape="round" 
        onClick={fetchFeeds}
      >
        Show More
      </Button>
    </div>
      
  );
}