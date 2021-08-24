import React,{useState,useEffect} from 'react'
import {Grow,Grid,Container,Paper,AppBar,TextField,Button} from '@material-ui/core'
import { useHistory,useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import Posts from '../Posts/Posts.js'
import Form from '../Form/Form.js'
import { useDispatch } from 'react-redux'

import Pagination from '../Pagination'
import useStyles from './styles'
import {getPosts,getPostBySearch} from '../../actions/posts'
function useQuery() {   
    return  new  URLSearchParams(useLocation().search);
}
const Home = () => {
    const[currentId,setCurrentId]=useState(null)
    const query=useQuery();
    const history=useHistory();
    const page=query.get('page') || 1 
    const searchQuery=query.get('searchQuery')
    const dispatch = useDispatch();
    const classes=useStyles();
    const  [search,setSearch]=useState('');
    const  [tags,setTags]=useState([]);
    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch])

    const handleKeyPress=(e)=>{
        if(e.keyCode === 13 ){
            searchPost();
        }
    }
    const handleAdd=(tag)=>{
        setTags([...tags,tag])

    }
    const handleDelete=(tagtoDelete)=>{
        setTags(tags.filter((tag)=>tag !== tagtoDelete))
        
    }
    const searchPost=()=>{
        if(search.trim() || tags.length !== 0){
            dispatch(getPostBySearch({search,tags:tags.join(',')}))
            history.push(`/posts/search?seachQuery=${search || 'none'}$tags=${tags.join(',')}`)
        }else{
            history.push('/');
        }
    }
    return (
        <Grow in>
                <Container maxWidth="xl">
                    <Grid container justifyContent ="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}> 
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId}></Posts>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField onKeyPress={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e)=>{setSearch(e.target.value)}} >  </TextField>
                                <ChipInput
                                    style={{margin:"10px 0"}}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label="Search Tags"
                                    variant="outlined"
                                ></ChipInput>
                                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                            </AppBar>
                            <Form currentId={currentId}  setCurrentId={setCurrentId}></Form>
                            {(!searchQuery && !tags.length)&&(
                                <Paper  elevation={6} className={classes.pagination}>
                                <Pagination page={page}></Pagination>
          
                            </Paper>
                            )}
                            
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home
