import React from 'react'
import {Container} from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter,Switch,Route, Redirect} from 'react-router-dom'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails.jsx'
const App=()=>{
    return(
        <BrowserRouter>
         <Container maxWidth='xl'>
           
            <Navbar></Navbar>
            <Switch>
                <Route path="/" exact component={()=><Redirect to='/posts'></Redirect>}></Route>
                <Route path="/auth" exact component={()=>(!(JSON.parse(localStorage.getItem('profile'))) ? <Auth></Auth> : <Redirect to='/posts'></Redirect>)}></Route>
                <Route path="/posts" exact component={Home}></Route>
                <Route path="/posts/search" exact component={Home}></Route>
                <Route path="/posts/:id" exact component={PostDetails}></Route>
                
            </Switch>
          
        </Container>
        
        </BrowserRouter>
       
    )
}
export default  App;