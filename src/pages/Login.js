import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Button, IconButton, TextField, Typography} from '@mui/material'
import { makeStyles } from '@mui/styles'
import * as actions from "./../actions/authActions";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = ({ userDetails, adminDetails, login, sendOtp, verifyOtp }) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [loginWithEmail, setLoginWithEmail] = useState(false);
    const [sendOtpForSignUp, setSendOtpForSignUp] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState();
    const [success, setSuccess] = React.useState(false);
    const [otpSuccess, setOtpSuccess] = React.useState(false);
    const [otpVSuccess, setOtpVSuccess] = React.useState(false);

    useEffect(() => {
        if (adminDetails && adminDetails?.user.userRole==='Admin'){
            navigate('/admin/dashboard')
        }else if(userDetails && userDetails?.user.userRole==='Traveller'){
            navigate('/dashboard/request-for-ride')
        }else if(userDetails && userDetails?.user.userRole==='Driver'){
            navigate('/driver/dashboard')
        }else {
            navigate('/')
        }
    }, [userDetails, adminDetails]);

    const handleClick = async (e) => {
        e.preventDefault();
        if(contact.length===10 && password.length > 2 && !loginWithEmail){
            const result = await login({
                contact: contact,
                password: password
            });
            if(result && result.errors){
                setOpen(true);
                setError(result.errors);
            }else{
                setSuccess(true)
            }
            console.log(result)
        }else if(contact.length===10 && loginWithEmail){
            setSendOtpForSignUp(true);
            const result = await sendOtp(contact);
            if(result && result.errors){
                setOpen(true);
                setError(result.errors);
            }else{
                setOtpSuccess(true)
            }
        }
    };

    const verifyOtoForSignUp = async e => {
        e.preventDefault();
        if(contact.length===10 && otp.length === 4){
            const result = await verifyOtp({
                contactNo: contact,
                newLoginOtp: otp
            });
            if(result && result.errors){
                setOpen(true);
                setError(result.errors);
            }else{
                setOtpVSuccess(true)
            }
        }
    };

    const changeToLogin = e => {
        e.preventDefault();
        setLoginWithEmail(!loginWithEmail)
    };

    const handleClose = (event, reason) => {
        setOpen(false);
        setOtpSuccess(false);
        setSuccess(false);
        setOtpVSuccess(false)
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    return (
        <div className={classes.root}>
            <Stack sx={{display: 'flex', flexDirection: 'row'}}>
                <Stack sx={{ display: { xs: 'none', sm: 'block' }}} style={{flex:1, flexDirection:'column'}}>

                </Stack>
                <div style={{flexDirection:'column', justifyContent:'space-between', maxWidth:400, flex:1}}>
                    <form >
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', cursor: 'pointer', marginTop:100}}>
                            <div onClick={() =>navigate('/')} style={{margin:12}}>
                                <Typography variant="h4" component="div" style={{color:'white', textAlign:'center'}}>
                                    Vehicle Tracking
                                </Typography>
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent:'center',cursor: 'pointer'}}>
                                    <img  style={{width:'32px' }}
                                          alt="React"
                                          src="/static/img/sakal_logo.png"
                                    />
                                </div>
                            </div>
                        </div>
                        {loginWithEmail?<div style={{width:'90%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin:'5%', marginBottom:'1rem'}} >
                            <TextField
                                required
                                error={contact.length<=10 }
                                helperText={contact.length<=9 || contact.match(/[^0-9]/g) ? 'Please enter valid mobile No.' : ''}
                                variant="outlined"
                                placeholder='Mobile No.'
                                inputProps={{maxLength: 10 , pattern: "[0-9]{0,10}" }}
                                className={classes.input}
                                value={contact}
                                onChange={e => setContact(e.target.value.replace(/[^0-9]/g, ""))}
                            />
                            {sendOtpForSignUp?<TextField
                                required
                                error={otp.length<=4}
                                helperText={otp.length<=3 || contact.match(/[^0-9]/g) ? 'Please enter valid One Time Password' : ''}
                                variant="outlined"
                                type={showPassword?'password':'text'}
                                name="otp" autoComplete="off"
                                placeholder='One Time Password'
                                className={classes.input}
                                inputProps={{ maxLength: 4 }}
                                value={otp}
                                onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton onClick={e => {
                                                setShowPassword(!showPassword)
                                            }}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />:null}
                        </div>:null}
                        {!loginWithEmail?<div style={{width:'90%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin:'5%', marginBottom:'1rem'}} >
                            <TextField
                                required
                                error={contact.length<=10}
                                inputProps={{maxLength: 10 , pattern: "[0-9]{10,11}" }}
                                helperText={contact.length<=9 || contact.match(/[^0-9]/g) ? 'Please enter valid mobile No.' : ''}
                                variant="outlined"
                                placeholder='Mobile no.'
                                className={classes.input}
                                value={contact}
                                onChange={e => setContact(e.target.value.replace(/[^0-9]/g, ""))}
                            />
                            <TextField
                                required
                                error={password.length<=2}
                                helperText={password.length<=2 ? 'Password should be grater than 2 character' : ''}
                                variant="outlined"
                                type={showPassword?'password':'text'}
                                name="password" autoComplete="on"
                                placeholder='Password'
                                className={classes.input}
                                value={password}
                                onChange={e => setPassword(e.target.value.replace(/[^0-9]/g, ""))}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton onClick={e => {
                                                setShowPassword(!showPassword)
                                            }}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />
                        </div>:null}
                        <div style={{width:'90%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginLeft:'5%'}}>
                            {loginWithEmail && !sendOtpForSignUp?<Button className={classes.button} onClick={handleClick}>
                                Send OTP
                            </Button>:null}
                            {!loginWithEmail?<Button className={classes.button} onClick={handleClick}>
                                Login
                            </Button>:null}
                            {loginWithEmail && sendOtpForSignUp?<Button className={classes.button} onClick={verifyOtoForSignUp}>
                                Verify OTP
                            </Button>:null}
                        </div>
                        <div style={{width:'90%', display: 'flex', flexDirection: 'row', alignItems: 'center', margin:'5%', marginTop:'3rem', marginBottom:'3rem'}}>
                            <Typography variant='body-1' component='p' className={classes.heading}>
                                <span style={{color:'white',}}>{!loginWithEmail?'Need an account?':'Already signed up?'} </span><a style={{color:'#f98c2a'}} onClick={(e)=>changeToLogin(e)}>{loginWithEmail?'Login':'Sign up'}</a>
                            </Typography>
                        </div>

                    </form>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            Something went wrong !
                        </Alert>
                    </Snackbar>
                    <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Login successfully.
                        </Alert>
                    </Snackbar>
                    <Snackbar open={otpSuccess} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            OTP will send to register mobile number
                        </Alert>
                    </Snackbar>
                    <Snackbar open={otpVSuccess} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Sign up successfully.
                        </Alert>
                    </Snackbar>
                </div>
                <Stack sx={{ display: { xs: 'none', sm: 'block' }}} style={{flex:1, flexDirection:'column'}}>

                </Stack>
            </Stack>
            <div>
                <Typography variant='body-2' component='div' style={{color:'white',
                    position: "absolute", left:0, right:0, bottom:0,  textAlign: "center", marginTop: 8, marginBottom: 8}}>
                    Powered By <a style={{color:'white', textAlign: "center", marginTop: 8, marginBottom: 8}} href="https://www.foxberry.in/" target='_blank'> Foxberry Technologies </a> &copy; {new Date().getFullYear()}
                </Typography>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        adminDetails: state.admin.adminDetails,
        userDetails: state.auth.userDetails,
    }
};

const mapStateToDispatch = dispatch => {
    return {
        login: requestBody => dispatch(actions.login(requestBody)),
        sendOtp: requestBody => dispatch(actions.sendOtp(requestBody)),
        verifyOtp: requestBody => dispatch(actions.verifyOtp(requestBody))
    }
};

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        width: '100%',
        background: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column'
    },
    form: {
        height: '100%',
        margin: '0 auto',
        padding: '20px',
        marginTop: '10vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255,255,255,0)',
        borderRadius: '20px'
    },
    heading: {
        width:'100%',
        textAlign:'center'
    },
    input: {
        width: '100%',
        padding: '10px 20px',
        margin: '16px !important',
        background: 'white',
        borderWidth:'1px',
        borderRadius: '10px !important',
    },
    button: {
        background: '#fcfcfc !important',
        fontWeight: 'bold !important',
        height: '40px',
        width: '40%',
        borderRadius: '10px !important',
        marginTop: '0.5rem !important'
    }
}));

export default connect(mapStateToProps, mapStateToDispatch)(Login)
