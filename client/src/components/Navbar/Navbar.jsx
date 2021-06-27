import React,{useState,useEffect} from 'react'
import { AppBar, Typography,Toolbar,Avatar,Button } from '@material-ui/core'
import useStyles from './style'
import {Link} from 'react-router-dom'
import decode  from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useHistory,useLocation } from 'react-router'


import memories from '../images/memories.png'

const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch=useDispatch()
    const history=useHistory()
    const location=useLocation()

    const logout=()=>{
        dispatch({type:'LOGOUT'})

        history.push('/')

        setUser(null)
    }

    useEffect(() => {
        const token=user?.token

        if(token){
            const decodedToken=decode(token)
            if(decodedToken.exp *1000 < new Date().getTime()) logout()
        }// to check the the token was expired or not 

        setUser(JSON.parse(localStorage.getItem('profile'))) // its like if statement and it will put all the token and data in the profile named object
    }, [location])
    console.log(user)
    return (
        <AppBar position='static' className={classes.appBar} color='inherit'>
            <div className={classes.brandContainer}>
                <Typography variant='h2' align='center' component={Link} to='/' className={classes.heading}>Memories</Typography>
                <img src={memories} alt="memories" className={classes.image} height='60' />
            </div>
            <Toolbar className={classes.toolbar}>
                {user?(
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.imageUrl}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name} </Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout} >Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to='/auth' variant='contained' color='secondary'>SignIn</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
