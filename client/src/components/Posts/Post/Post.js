import React,{useState} from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography,ButtonBase } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch } from 'react-redux'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { deletePost, likePost } from '../../../actions/posts'
import {useHistory} from 'react-router-dom'

const Post = (props) => {
    const { post, setCurrentId } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const history=useHistory();
    const user = JSON.parse(localStorage.getItem('profile'))
    const [likes,setLikes]=useState(post?.likes)
    const hasLikedPost=post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
    const userId=user?.result?.googleId || user?.result?._id
    const handleLike=()=>{
       dispatch(likePost(post._id))
       if(hasLikedPost){
        setLikes(post.likes.filter((id)=> id !==userId ))
       }else{
           setLikes([...post.likes,userId]);
       }

       
    }
    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like ===userId)
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };
    const openPost=()=>{
         history.push(`/posts/${post._id}`)
    }
    return (

        <Card className={classes.card} raised elavation={6}>
            <ButtonBase
                className={classes.cardAction}
                onClick={openPost}
            >
            
            
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}>
            </CardMedia>
            <div className={classes.overlay}>
                <Typography variant="h6">
                    {post.name}
                </Typography>
                <Typography variant="body2">
                    {moment(post.createAt).fromNow()}
                </Typography>
            </div>
            { (user?.result?.googleId === post?.creator || user?.result?._id === post.creator) && (
                <div className={classes.overlay2}>
                 <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
            </Button>
            </div>

            )} 
            
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag) => `#${tag}`)}
                </Typography>
            </div>
            <Typography className={classes.title} variant="h5" >
                {post.title}
            </Typography>
            <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>
            </ButtonBase> 
            <CardActions className={classes.cardActions}>
                <Button size="small" disabled={!user?.result} color="primary" onClick={handleLike}>
                    <Likes></Likes>
                </Button>
                {
                    (user?.result?.googleId === post?.creator || user?.result?._id === post.creator) && (
                        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                            <DeleteIcon fontSize="small"></DeleteIcon >
                            Delte
                        </Button>
                    )
                }

            </CardActions>

        </Card>

    )
}
export default Post;