import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import {connect, useDispatch} from "react-redux";
import {Outlet} from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LogoutIcon from '@mui/icons-material/Logout';
import {createBrowserHistory} from "history";
import * as ActionCreators from "../actions/authActions";
import * as ActionCreatorsTrack from "../actions/trackLocationAction";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import {useLocation} from "react-router-dom";
import {Box, IconButton} from "@mui/material";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import {trackLocationSuccess} from "../actions/trackLocationAction";


const Dashboard = ({userDetails, adminDetails, changeLang,  userLogout}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const history = createBrowserHistory();
    const location = useLocation();
    let dispatch = useDispatch();

    const [checked, setChecked] = React.useState(false);

    useEffect(() => {
        if (adminDetails && adminDetails?.user.userRole==='Admin'){
            navigate('/admin/dashboard')
        }else if(userDetails && userDetails?.user.userRole==='Traveller'){
            navigate('/dashboard/request-for-ride')
            // navigate('/dashboard/feedback')

        }else if(userDetails && userDetails?.user.userRole==='Driver'){
            navigate('/driver/dashboard')
        }
    }, [userDetails, adminDetails]);

    const logout =()=> {
        userLogout();
        navigate('/')
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        event.preventDefault();
        setAnchorEl(null);
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
        changeLang(event.target.checked);
    };


    return (
        <div  className={classes.root}>
            <AppBar position='fixed' sx={{ flexDirection: 'row' }} className={classes.appbar}>
                {location && location.pathname !=='/dashboard/request-for-ride' ?<ArrowBackRoundedIcon className={classes.appbarBackIcon} onClick={() => history.back()}/>:<div>{' '}</div>}
                    <div onClick={() =>navigate('/')} style={{margin:12}}>
                        <Typography variant="h6" component="div" style={{color:'white', textAlign:'center',  cursor: 'pointer'}}>
                            Vehicle Tracking
                        </Typography>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent:'center',cursor: 'pointer'}}>
                            <img  style={{width:'32px' }}
                                  alt="React"
                                  src="/static/img/sakal_logo.png"
                            />
                        </div>
                    </div>
                <Stack direction="row" spacing={1} alignItems="center">
                    {/*<IconButton onClick={() =>navigate('/')} >*/}
                    {/*    <HomeIcon style={{margin:'0 15px'}} className={classes.appbarBackIcon}/>*/}
                    {/*</IconButton>*/}
                    <IconButton onClick={handleClick}>
                        <SettingsIcon style={{marginRight:8}}  className={classes.appbarBackIcon}/>
                    </IconButton>
                </Stack>
                <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'basic-button',}}>
                    {userDetails && userDetails?.user.userRole!=='Admin' ?
                        <MenuItem onClick={()=> navigate('/dashboard/profile')}>
                        <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU' style={{width:24, height:24, marginRight:8}}  />
                        &nbsp;Profile</MenuItem>:
                    null}
                    {userDetails && userDetails?.user.userRole==='Driver'&& <Stack direction="row" spacing={1} alignItems="center">
                        {/*<Typography>English</Typography>*/}
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Typography>मराठी</Typography>
                    </Stack>}
                    <MenuItem onClick={logout}> <LogoutIcon style={{marginRight:8}} /> Logout</MenuItem>
                </Menu>
            </AppBar>

            <div style={{marginTop:'52px', marginBottom:'130px'}}>
                <Outlet/>
            </div>
        </div>
    );
};
const useStyles = makeStyles( theme => ({
    root: {
        minHeight: '100vh',
        height: '100%',
        background: '#fcfcfc',
    },
    appbar: {
        height:'52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        background: theme.palette.primary.main,
    },
    appbarBackIcon: {
        color: 'white !important',
        fontSize: '24px !important'
    },
    main: {
        display: 'flex',
        width: '100%',
        height: 'calc(100% - 70px)',
        alignItems: 'center',
        [theme.breakpoints.down(600)]: {
            flexWrap: 'wrap',
        },
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '50%',
        height: 'max-content',
        padding: '20px',
        margin: '20px',
        borderRadius: '20px !important',
        '&:hover': {
            cursor: 'pointer',
        },
        [theme.breakpoints.down(600)]: {
            width: '100%'
        },
    },
    carIcon: {
        fontSize: '50px !important',
        color: '#257aaf'
    },
    playIcon: {
        fontSize: '40px !important',
        color: '#1fa85b',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '50%',
        padding: '20px',
        margin: '20px',
        borderRadius: '20px !important',
        [theme.breakpoints.down(600)]: {
            width: '100%'
        },
    },
    topicRow: {
        width: '100%'
    },
    topicDoubleHeading: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 'bold !important',
        marginBottom: '10px'
    },
    topicDoubleBody: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    divider: {
        width: '100%',
        margin: '20px 0',
    },
    button: {
        background: '#0c1572 !important',
        color: 'white !important',
    }
}));
const mapStateToProps = state => {
    return {
        userDetails: state.auth.userDetails,
        adminDetails: state.admin.adminDetails
    }
};
const mapDispatchToProps = dispatch => {
    return {
        userLogout: () => dispatch(ActionCreators.userLogout()),
        changeLang: (check) => dispatch(ActionCreatorsTrack.changeLang(check)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
