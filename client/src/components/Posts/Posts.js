import React from 'react'
import Post from './Post/Post.js'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { Grid,CircularProgress } from '@material-ui/core'

const Posts=({setCurrentId})=>{
    const {posts,isLoading}=useSelector((state)=>state.posts);
    const classes=useStyles();
    if(!isLoading && !posts.length)
        return "No Posts"
    return(
      

        isLoading ? <CircularProgress></CircularProgress> :
        (   
            
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                  
                {
                   
                    posts.map((post)=>(
                        <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}> 
                            <Post key={post._id} post={post} setCurrentId={setCurrentId}></Post>
                        </Grid>
                    ))
                    
                }

            </Grid>
        )
    )
}
export default Posts;