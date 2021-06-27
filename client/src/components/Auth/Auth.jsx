import React,{useState} from 'react'
import {GoogleLogin} from 'react-google-login'
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router'
import {Avatar,Button,Paper,Grid,Typography,Container} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Input from './input'
import Icon from './Icon'
import useStyles from './styles'
import {signin,signup} from '../../action/auth'

const intialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

const Auth = () => {
    const classes=useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [form, setForm] = useState(intialState)

    const dispatch=useDispatch()
    const history=useHistory()


    const handleSubmit=(e)=>{
        e.preventDefault()

        if(isSignup){
            dispatch(signup(form,history))
        }else{
            dispatch(signin(form,history))
        }

    }
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handelShowPassword=()=> setShowPassword(!showPassword)
    const switchMode=()=>{
        setForm(intialState)
        setIsSignup((previsSignup)=>!previsSignup)
        setShowPassword(false)
    }
    const googleSuccess=async(res)=>{
        const result=res?.profileObj 
        const token=res?.tokenId 
        try {
            dispatch({type:'AUTH',data:{result,token}})
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure=()=>{
        console.log("Sign In Failed")
    }
    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'> {isSignup ? 'SignUp': 'SignIn'} </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                            <Input name='firstName' label='First name' handleChange={handleChange}  half />
                            <Input name='lastName' label='last name' handleChange={handleChange}  half />

                            </>
                        )
                    }
                    <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" :"password"} handelShowPassword={handelShowPassword} />
                    {isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />}
                </Grid>
                <Button type='submit' fullWidth  variant='contained' color='primary' className={classes.submit}>
                    {isSignup ? 'SignUp' :'SignIn'}
                </Button>
                <GoogleLogin 
                    clientId="291655623767-ujjo6a6avh2uujsntjosvvrgfegu6c0k.apps.googleusercontent.com"
                    render={(renderProps)=>(
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}variant="contained"
                        >Google SignIn
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justify='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an accaount Sign In': 'Dont Have an Account Sign Up'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            </Paper>
        </Container>
    )
}

export default Auth
