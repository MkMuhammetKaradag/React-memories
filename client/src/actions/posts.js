import * as api  from '../api'
import * as actionTypes from '../constans/actionTypes'

export const getPosts=(page)=>     async (dispatch) =>{
    try {
        dispatch({type:actionTypes.START_LOADING})
        const {data}=await api.fetchPosts(page);
        
        dispatch({type:actionTypes.FETCH_ALL,payload:data}); 
        dispatch({type:actionTypes.END_LOADING})
    } catch (error) {
        console.log(error.message);
    }   
}
export const createPost=(post,history)=>async(dispatch)=>{
    try {
        dispatch({type:actionTypes.START_LOADING})
    
        const {data}=await api.createPost(post);
        history.push(`/posts/${data._id}`)
        dispatch({type:actionTypes.CREATE,payload:data});
    } catch (error) {
        console.log(error.message);
    }
}
export const updatePost=(id,post)=>async(dispatch)=>{
    try {
        
         const {data} =await api.updatePost(id,post);
         dispatch({type:actionTypes.UPDATE,payload:data})
    } catch (error) {
        console.log(error.message);
    }
}
export const deletePost=(id)=>async(dispatch)=>{
    try {
        await api.deletePost(id);
        dispatch({type:actionTypes.DELETE,payload:id})
    } catch (error) {
        console.log(error);
    }
}
export const likePost=(id)=>async(dispatch)=>{
    try {
        const {data} =await api.likePost(id);
        dispatch({type:actionTypes.LIKE,payload:data})
    } catch (error) {
        console.log(error);
    }
}
export const getPostBySearch=(searchQuery)=>async(dispatch)=>{
    try {
        dispatch({type:actionTypes.START_LOADING})
        const {data:{data}} = await api.fetchPostBySearch(searchQuery);
        dispatch({type:actionTypes.FETCH_BY_SEARCH,payload:data});
        dispatch({type:actionTypes.END_LOADING}) 
    } catch (error) {
        console.log(error);
    }
}
export const getPost=(id)=> async (dispatch) =>{
    try {
    
        dispatch({type:actionTypes.START_LOADING})
        const {data}=await api.fetchPost(id);
        
        dispatch({type:actionTypes.FETCH_POST,payload:data}); 
        dispatch({type:actionTypes.END_LOADING})
    } catch (error) {
        console.log(error.message);
    }   
}

export const commentPost=(value,id)=>async(dispatch)=>{
    try {
        const {data} =await api.commentPost(value,id);
        dispatch({type:actionTypes.COMMENT,payload:data})
        return data.comments
    } catch (error) {
        console.log(error);
    }
}