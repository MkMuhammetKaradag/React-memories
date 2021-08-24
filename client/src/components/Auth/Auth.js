import React,{useState}from 'react'
import {Avatar,Button,Grid,Typography,Container,Paper} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input' 
import {GoogleLogin} from 'react-google-login'
import Icon from './Icon'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {signin,signup} from '../../actions/auth'
const initialState={
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:''

}
const Auth = () => {
    localStorage.clear();
    const classes=useStyles();
    const [showPassword,setShowPassword] =useState(false);
    const [isSignup,setIsSignup]=useState(false);
    const [formData,setFormData]=useState(initialState);
    const dispatch=useDispatch();
    const history=useHistory();
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))
        }
    }
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleShowPassword=()=>setShowPassword((prevShowPassword)=> !prevShowPassword)
    const switchMode =()=>{
        setIsSignup((prevIsSignup)=>!prevIsSignup)
        setShowPassword(false)
    }
    const googleSuccess= async(res)=>{
        const result=res?.profileObj;
        const token=res?.tokenId;
        try {
            dispatch({type:'AUTH',payload:{result,token}});
            history.push('/')
        } catch (error) {
            console.log(error);
        }
        console.log(res);
    }
    const googleFailure=()=>{
        console.log("Google Sign In unsuccessful.Try Again Later");
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon></LockOutlinedIcon>
                </Avatar>
                <Typography variant="h5" >
                    {isSignup ? 'Sig up' :'Sig In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup &&(
                                <>
                    
                                    <Input name="firstName" label="First Name" handlechange={handleChange} autoFocus half></Input>
                        
                                    <Input name="lastname" label="Last Name" handlechange={handleChange} half></Input>
                                
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handlechange={handleChange} type="email"></Input>
                        <Input name="password" label="Password" handlechange={handleChange} type={showPassword ? "text":"password"} handleShowPassword={handleShowPassword}></Input>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handlechange={handleChange} type="password"></Input>}
                    </Grid>
                    
                    <Button type="sumbit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign up" : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="444574215544-5bs4qh05f7l00odmukts4sgjpoe1i77i.apps.googleusercontent.com"
                        render={(renderProps)=>(
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon></Icon>} variant="contained"> Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    >



                    </GoogleLogin>
                    <Grid container justifyContent="flex-end">
                        <Grid item >
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already  have  an account  Sig In' : "don't have an account Sig up "}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
