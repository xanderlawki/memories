import axios from 'axios';

const url ="https://xander-memories-app.herokuapp.com/posts";

export const fetchPost = ()=> axios.get(url);
export const createPost = (newPost)=> axios.post(url, newPost);
export const updatePost = (id, updatePost)=> axios.patch(`${url}/${id}`, updatePost);
export const deletePost = (id)=> axios.delete(`${url}/${id}`);
export const likePost = (id)=> axios.patch(`${url}/${id}/likepost`)