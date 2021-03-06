import axios from 'axios'

const API=axios.create({baseURL:'https://react-node-memories-project.herokuapp.com'})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})
export const fetchPosts=(page)=>API.get(`/posts?page=${page}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost=(id,updatePost)=>API.patch(`/posts/${id}`,updatePost);
export const deletePost=(id)=>API.delete(`/posts/${id}`)
export const likePost=(id)=>API.patch(`/posts/${id}/likePost`)
export const signIn=(formData)=>API.post('/user/signin',formData)
export const signUp=(formData)=>API.post('/user/signup',formData)
export const fetchPostBySearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const fetchPost=(id)=>API.get(`/posts/${id}`);
export const commentPost=(value,id)=>API.post(`/posts/${id}/commentPost`,{value})
