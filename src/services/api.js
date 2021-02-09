
import axios from "axios";

const API_URL="https://jsonplaceholder.typicode.com/posts"

async function createPost(task) {
  const { data: newPost } = await axios.post(API_URL, { task });
  return newPost;
}

async function deletePost(id) {
  const message = await axios.delete(`${API_URL}/${id}`);
  return message;
}

async function updatePost(id, payload) {
  const {data: newPost} = await axios.put(`${API_URL}/${id}`, payload);
  return newPost;
}

async function getAllFeeds() {
  const { data: feeds } = await axios.get(API_URL);
  return feeds;
}


async function getPostById(id) {
  const { data: post } = await axios.get(`${API_URL}/${id}`);
  return post;
}

export default { createPost, deletePost, updatePost, getAllFeeds, getPostById };