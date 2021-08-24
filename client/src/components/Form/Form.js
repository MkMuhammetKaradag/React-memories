import React,{useState,useEffect}from 'react'
import useStyles from './styles'
import { TextField,Button,Typography,Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux';
import { createPost,updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
const Form=({currentId,setCurrentId})=>{
    const post=useSelector((state)=>currentId? state.posts.posts.find((p)=>p._id===currentId):null);
    const classes=useStyles();
    const user=JSON.parse(localStorage.getItem('profile'))
    const history=useHistory()
    const [postData,setPostData]=useState({
       
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    })
    const dispatch=useDispatch();
    useEffect(()=>{
        if(post){
            setPostData(post)
        }
    },[post])
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId,{...postData,name:user?.result?.name}))
            history.push('/')
        }else{
            dispatch(createPost({...postData,name:user?.result?.name},history))
            
        }
        clear();
    }
    const clear=()=>{
        setCurrentId(null);
        setPostData({
            title:'',
            message:'',
            tags:'',
            selectedFile:''
        })
    }
   if(!user?.result?.name){
       return (
           <Paper className={classes.paper}>
               <Typography variant="h6" align="center">
                   Please Sign In to create your  own  memories and  like other's memories
               </Typography>
           </Paper>
       )
   }
   const onchange=(e)=>{
       if(e.target.name === 'tags'){
        setPostData({ ...postData,[e.target.name]:e.target.value.split(',')})
       }else{
            setPostData({ ...postData,[e.target.name]:e.target.value})
       }
   
   }
    return(
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Editing":"Creating a Memory"}</Typography>
                
                <TextField name="title" required variant="outlined" label="Title" fullWidth value={postData.title} onChange={onchange}>  </TextField>
                
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={onchange} />
       
                <TextField name="tags" required  variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e)=>setPostData({ ...postData,tags:e.target.value.split(',')})}>  </TextField>
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile:base64})}>  

                    </FileBase>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="ubmit" fullWidth>submit</Button>
                <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>

    )
}
export default Form;