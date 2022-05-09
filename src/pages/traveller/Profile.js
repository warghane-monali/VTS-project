import React, {useState} from "react";
import { connect } from 'react-redux'
import { createBrowserHistory } from 'history'
import {AppBar, Avatar, Button, Modal, Paper, TextField, Typography, IconButton} from "@mui/material"
import { makeStyles } from "@mui/styles"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ListRoundedIcon from '@mui/icons-material/ListRounded'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import * as ActionCreators from "../../actions/profileAction";
import {useNavigate} from "react-router-dom";



const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        background: '#fcfcfc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    appbar: {
        alignItems: 'center',
        padding: '15px',
        background: '#0c1572 !important',
    },
    appbarBackIcon: {
        fontSize: '40px !important',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    main: {
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    profilePicture: {
        width: '200px !important',
        height: '200px !important',
        margin: '20px',
    },
    displayForm: {
        background: 'white',
        borderRadius: '20px !important',
        margin: '20px',
        padding: '20px',
    },
    formSpacer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    middlePosition: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    group: {
        textAlign:'center',
        marginTop: '30px',
    }
}));

const Profile = ({ userDetails, setProfileUpdateData, setChangePasswordData }) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const history = createBrowserHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const [firstName, setFirstName] = useState(userDetails?.user.firstName);
    const [middleName, setMiddleName] = useState(userDetails?.user.middleName);
    const [lastName, setLastName] = useState(userDetails?.user.lastName);
    const [email, setEmail] = useState(userDetails?.user.emailId);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userProfileImg, setUserProfileImg] = useState('');
    const [image, setImage] = useState(null);


    const updateUserDetails = async (e) => {
        e.preventDefault();
        setIsOpen(false);
        const result = await setProfileUpdateData({userId: userDetails?.user._id, firstName: firstName, lastName: lastName, emailId:email});
        if(result){
            setFirstName(result.firstName);
            setMiddleName(result.middleName);
            setLastName(result.lastName);
            setEmail(result.emailId)
        }
    };

    const changePassword = async (e) => {
        e.preventDefault();
        setIsOpen(false);
        const result = await setChangePasswordData({userId: userDetails?.user._id, oldPassword: oldPassword, newPassword: confirmPassword})
    };

    const photoUpload = e =>{
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setUserProfileImg({
                file: file,
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file);
    };

    const handleChange = e => {
        if (e.target.files.length) {
            const img = URL.createObjectURL(e.target.files[0]);
            setImage(img);
        }
    };

    return (
        <div className={classes.root}>
            <div style={{width:250, height:250}}>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleChange} style={{ display: "none" }}/>
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <img src={'/static/img/upload.png'} style={{
                            position: "absolute",
                            top: 75,
                            bottom: 75,
                            left: 75,
                            right: 75,
                            height: 100,
                            width: 100,
                            opacity: 0.6,
                            borderRadius:20,
                            backgroundColor: 'red',
                            zIndex:1000
                        }}/>
                        <Avatar src={image} className={classes.profilePicture} />
                    </IconButton>
                </label>
            </div>
            <Paper className={classes.displayForm}>
                {/*<div style={{ display: 'flex', justifyContent: 'flex-end' }}>*/}
                {/*    <ModeEditIcon    onClick={e => {*/}
                {/*        e.preventDefault();*/}
                {/*        setIsOpen(pState => !pState)*/}
                {/*    }}*/}
                {/*                     sx={{display: 'flex', justifyContent: 'flex-end', p: 1, m: 1, bgcolor: 'background.paper',}}*/}
                {/*    />*/}
                {/*</div>*/}
                <Modal
                    className={classes.middlePosition}
                    open={isOpen}
                    onClose={e => {
                        e.preventDefault();
                        setIsOpen(false)
                    }}>
                    <Paper sx={{
                        p: 1,
                        m: 1,
                        borderRadius: 1,
                        textAlign: 'center',
                        fontSize: '1rem',
                        fontWeight: '700',
                    }}>
                        <Typography style={{margin:8}}
                                    variant='h5'
                                    component='div'>
                            Update Profile Details
                        </Typography>
                        <hr className={classes.divider}/>
                        <div className={classes.form}>
                            <TextField style={{margin:8}}
                                       label='First Name'
                                       className={classes.textFields}
                                       value={firstName}
                                       onChange={e => {setFirstName(e.target.value)}}
                            />
                            {middleName !== null && middleName!==''?<TextField
                                label='Middle Name'
                                className={classes.textFields}
                                value={middleName}
                                onChange={e => {setMiddleName(e.target.value)}}
                            />:null}
                            <TextField style={{margin:8}}
                                       label='Last Name'
                                       className={classes.textFields}
                                       value={lastName}
                                       onChange={e => {setLastName(e.target.value)}}
                            />
                            <TextField
                                label='Email'
                                className={classes.textFields}
                                value={email}
                                onChange={e => {setEmail(e.target.value)}}
                            />
                        </div>
                        <Button className={classes.button} style={{margin: 16}} onClick={(e)=>{
                            e.preventDefault();
                            updateUserDetails(e)
                        }}>
                            Update Details
                        </Button>
                    </Paper>
                </Modal>
                <Modal
                    className={classes.middlePosition}
                    open={openPassword}
                    onClose={e => {
                        e.preventDefault();
                        setOpenPassword(false)
                    }}>
                    <Paper className={classes.form} sx={{
                        p: 1,
                        m: 1,
                        borderRadius: 1,
                        textAlign: 'center',
                        fontSize: '1rem',
                        fontWeight: '700',
                    }}>
                        <Typography style={{margin:8}}
                                    variant='h5'
                                    component='div'>
                            Update Password Details
                        </Typography>
                        <hr className={classes.divider}/>
                        <TextField style={{margin:8}}
                                   type='password'
                                   label='Old password'
                                   autoComplete="off"
                                   className={classes.textFields}
                                   value={oldPassword}
                                   onChange={e => {setOldPassword(e.target.value)}}
                        />

                        <TextField style={{margin:8}}
                                   type='password'
                                   label='New password'
                                   autoComplete="off"
                                   className={classes.textFields}
                                   value={password}
                                   onChange={e => {setPassword(e.target.value)}}
                        />
                        <TextField style={{margin:8}}
                            type='password'
                            label='New confirm Password'
                            autoComplete="off"
                            className={classes.textFields}
                            value={confirmPassword}
                            onChange={e => {setConfirmPassword(e.target.value)}}
                        />
                        {password !== confirmPassword? <Typography style={{margin:8, color: 'red'}} variant='body1' component='div'>
                            Password and confirm password not matched.
                        </Typography>:null}
                        {((password === confirmPassword) && (password.length === confirmPassword.length))?<Button className={classes.button} style={{margin: 16}} onClick={(e)=>{
                            e.preventDefault();
                            changePassword(e)
                        }}>
                            Update Password
                        </Button>:null}
                    </Paper>
                </Modal>
                <div className={classes.group}>
                    <Typography variant='h4' component='p' className={classes.middlePosition}>
                        Name
                    </Typography>
                    <Typography variant='h6' component='p' className={classes.middlePosition}>
                        {`${userDetails.user.firstName !== null ? `${userDetails.user.firstName}` : ''}
                        ${userDetails.user.middleName !== null ? `${userDetails.user.middleName}` : ''}
                        ${userDetails.user.lastName !== null ? `${userDetails.user.lastName}` : ''}`}
                    </Typography>
                    <Typography variant='h6' component='p' className={classes.middlePosition}>
                        {userDetails.user.contactNo}
                    </Typography>
                </div>
                <div className={classes.group}>
                    <Typography variant='h4' component='p' className={classes.middlePosition}>
                        Designation
                    </Typography>
                    <Typography variant='h6' component='p' className={classes.middlePosition}>
                        {userDetails.user.designation}
                    </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button className={classes.button} style={{margin: 16}} onClick={e => {
                        e.preventDefault();
                        setOpenPassword(pState => !pState)}}>
                        Change password
                    </Button>
                </div>
            </Paper>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        userDetails: state.auth.userDetails
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setProfileUpdateData: (requestBody) => dispatch(ActionCreators.setProfileUpdateData(requestBody)),
        setChangePasswordData: (requestBody) => dispatch(ActionCreators.setChangePasswordData(requestBody)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
