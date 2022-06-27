import React, { useState,useEffect } from 'react';
import { useNavigate, useSearchParams,useParams} from 'react-router-dom';
import { makeStyles } from '@mui/styles'
import {AppBar, IconButton,Box,Paper,Modal} from "@mui/material";
import {connect} from "react-redux";
import * as ActionCreators from "../actions/requestAction";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import moment from "moment";
import ImportExportIcon from "@mui/icons-material/ImportExport";

const useStyles = makeStyles( theme => ({
    root: {
        minHeight: '100vh',
        height: '100%',
        background: '#fcfcfc',
    },
    footer: {
        position: 'sticky',
        bottom: '0',
        top: 'auto !important',
        display: 'flex',
        flexDirection: 'row !important',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    appbar: {

        height:'52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        background: '#0c1572 !important',
    },
    appbarBackIcon: {
        fontSize: '24px !important'
    },
    appbarMenuIcon: {
        color: 'white !important',
        fontSize: '24px !important',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    main: {
        marginTop:'60px',
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
        flexDirection:'column',
        justifyContent: 'space-between',
        width: '50%',
        padding: '20px',
        margin: '20px',
        marginLeft:'auto',
        marginRight:'auto',
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
    },
    acceptButton: {
        padding: '0.5rem 2rem !important',
        borderRadius: '10px !important',
        margin: '10px !important',
        color:'white !important',
        background: '#0a9421 !important',
        '&:hover': {
            background: 'white !important',
            color: '#0a9421 !important'
        }
    },
    rejectButton: {
        padding: '0.5rem 2rem !important',
        borderRadius: '10px !important',
        margin: '10px !important',
        color:'white !important',
        background: '#d12f0d !important',
        '&:hover': {
            background: 'white !important',
            color: '#d12f0d !important'
        }
    },
    centerPosition: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-around'
    },
    middlePosition: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        padding: '20px',
        borderRadius: '20px !important',
        textAlign:'center',
        flexDirection: 'column'
    },
}));

export const ProjectMangerApproval = ({getJourneyfetchdata,getProjectheaddata,setheadApproveRejectdata}) => {

    const classes = useStyles()
    const navigate = useNavigate();
    const [requestDetails,setrequestDetails] = useState('');
    const [userDetails,setuserDetails] = useState('');
    const [journeyPermit,setjourneyPermit] = useState('');
    const [isPermission,setisPermission] = useState(false);
    const [Permission,setPermission] = useState('')
   const param = useParams();
    
    

    useEffect( () => {
        getJourney();
        getprojecthead();
        console.log("JourneyID",param.journeyId)
        console.log("userTD",param.userId)
    }, [] );

    const getJourney = async () => {
        console.log("---Getting the ride----")
        const result = await getJourneyfetchdata(param.journeyId)
        if(result){
            setrequestDetails(result)
            console.log("Ride details",requestDetails)
        }
    }

    const getprojecthead = async () => {
        const result = await getProjectheaddata(param.userId)
        if(result){
            setuserDetails(result)
            console.log("Project head details",userDetails)
        }
    }

    const headApproveReject = async (Permission) => {
        console.log("Permission",Permission)
        const firstName = userDetails?.firstName !== null ? userDetails?.firstName : '';
        const middleName = userDetails?.middleName !== null ? userDetails?.middleName : '';
        const lastName = userDetails?.lastName !== null ? userDetails?.lastName : '';
        const fullName = firstName +' '+ middleName +' '+ lastName;
        console.log("---Head Name----",fullName)
        const result = await setheadApproveRejectdata({
            headContactNo : userDetails.contactNo,
            headName : fullName,
            isApproveByHead : Permission ,
            journeyId : requestDetails._id
        })
        if(result){
            console.log("---Journey Approved----",result)
            if(result.isApproveByHead)
                setPermission("Approved")
            else
                setPermission("Rejected")
            setisPermission(true)
        }
    }
  
  return (
    <div className={classes.root}>
        <AppBar position='fixed' sx={{flexDirection: 'row'}} className={classes.appbar}>
                <IconButton>
                    {<ArrowBackRoundedIcon className={classes.appbarMenuIcon} onClick={() => navigate('/')}/> }
                </IconButton>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', cursor: 'pointer',marginRight:'auto',marginLeft:'auto'}}>
                    <div style={{margin:12}} >
                        <Typography variant="h6" component="div" style={{color:'white', textAlign:'center'}}>
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
        </AppBar>

        {/* Content is here */}
        {/* <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Box sx={{ display: { xs: 'none', md: 'block' }}} style={{flex:1, flexDirection:'column'}}>{' '}</Box> */}
                <div style={{ justifyContent:'space-between', width:'100%',marginTop:100,marginBottom:100,marginLeft:'auto',marginRight:'auto',flexDirection:'column',maxWidth:800}}>
                    <Paper className={classes.rightSection} elevation={4}>
                        <div className={classes.topicRow}>
                            <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width:'100%',margin:8}} >
                                <Typography variant='body-1' component='h4' style={{marginRight:10}} >
                                     Requested By :-
                                </Typography>
                                <Typography variant='subtitle-2' component='h4' >
                                    {requestDetails.selfTravellerName}
                                </Typography>
                            </Box>
                            <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width:'100%'}}>
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                     <Box style={{display: 'flex', flexDirection: 'column', textAlign:"center"}}>
                                                {requestDetails.journeyNo !== ''?
                                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                        <Typography variant='subtitle2' component='h4' style={{marginTop: 4}}>
                                                            Journey No.
                                                        </Typography>
                                                        <Typography variant='body-1' component='h4' style={{marginTop: 4}}>
                                                            {requestDetails.journeyNo}
                                                        </Typography>
                                                    </div>:null}
                                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                    <Typography variant='subtitle2' component='h4' style={{marginTop: 4}}>
                                                        Trip Type
                                                    </Typography>
                                                    <Typography variant='body-1' component='div' style={{marginTop: 4}}>
                                                        {requestDetails.oneWayOrRoundTrip==='OneWay'? 'One Way': 'Round Trip'}
                                                    </Typography>
                                                </div>

                                                <Paper style={{padding:8, margin:4, cursor: 'pointer'}} elevation={4}>
                                                    <Typography variant='body-1' component='h4' style={{margin: 4}}>
                                                        From
                                                    </Typography>
                                                    <Typography variant='subtitle2' component='div' style={{margin: 4, textDecoration: "underline", color:'blue'}}>
                                                        {requestDetails.source}
                                                    </Typography>
                                                </Paper>
                                                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', transform: "rotate(180deg)", alignSelf: 'center' }}>
                                                    <ImportExportIcon  sx={{fontSize:40, color: requestDetails?.requestStatus ==='PENDING' ? '#f99935': requestDetails?.requestStatus ==='ONGOING' ? '#bc9800':requestDetails?.requestStatus ==='APPROVED' ? '#09984c':requestDetails?.requestStatus ==='REJECTED' ? '#f93125':'gray'}} />
                                                </div>

                                                <Paper style={{padding:8, margin:4, cursor: 'pointer'}} elevation={4}>
                                                    <Typography variant='body-2' component='h4' style={{margin: 4}}>
                                                        To
                                                    </Typography>
                                                    <Typography variant='subtitle2' component='div' style={{margin: 4, textDecoration: "underline", color:'blue'}}>
                                                        {requestDetails.destination}
                                                    </Typography>
                                                </Paper>
                                            </Box>
                        <Box style={{display: 'flex', flexDirection: 'column', textAlign:"center", margin: 10}}>
                                                <Typography variant='body-2' component='h4' style={{marginTop: 4}}>
                                                    Reason
                                                </Typography>
                                                <Typography variant='subtitle2' component='div'  style={{marginTop: 4, textAlign:"center", wordBreak: 'break-word'}}>
                                                    {requestDetails.reason}
                                                </Typography>
                        </Box>
                        <Box style={ { display:'flex',flexDirection:'row' } }>
                                                <Box style={ { display:'flex', flexDirection:'column',marginTop:10,marginRight:120 ,textAlign:"left", } }>
                                                <Typography variant='body-2' component='h4' style={{marginTop: 4}}>
                                                    Start Date and Time
                                                </Typography>
                                                <Typography variant='subtitle2' component='div'  style={{marginTop: 4, textAlign:"left", wordBreak: 'break-word'}}>
                                                    { moment(requestDetails.startDateTime).format('DD MMM YYYY hh:mm:a') }
                                                </Typography>
                                                </Box>
                                                <Box style={ { display:'flex', flexDirection:'column',margin:10,textAlign:"right" } }>
                                                <Typography variant='body-2' component='h4' style={{marginTop: 4}}>
                                                    End Date and Time
                                                </Typography>
                                                <Typography variant='subtitle2' component='div'  style={{marginTop: 4, textAlign:"right", wordBreak: 'break-word'}}>
                                                    {moment(requestDetails.endDateTime).format('DD MMM YYYY hh:mm:a')}
                                                </Typography>
                                                </Box>
                        </Box>
                                </div>
                             </Box>
                         </div>
                         {/* <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',flex:1, width: '100%', margin: '16px 0'}}>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <div style={{display: 'flex', flexDirection: 'column', margin: '12px 0'}}>
                                                <Typography variant='body-1' component='h4'>
                                                    Driver Name 
                                                </Typography>
                                                <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                    {requestDetails.driverName}
                                                </Typography>
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'column', margin: '12px 0'}}>
                                                <Typography variant='body-1' component='h4'>
                                                    Mobile No.
                                                </Typography>
                                                <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                    {requestDetails.driverNo}
                                                </Typography>
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'column', margin: '12px 0'}}>
                                                <Typography variant='body-1' component='h4'>
                                                    Company Name
                                                </Typography>
                                                <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                    {requestDetails.agencyName}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column',}}>
                                            <div style={{display: 'flex', flexDirection: 'column', margin: '16px 0'}}>
                                                <Typography variant='body-1' component='h4'>
                                                    Vehicle Type Name
                                                </Typography>
                                                <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                    {requestDetails.vehicleName}
                                                </Typography>
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'column', margin: '16px 0'}}>
                                                <Typography variant='body-1' component='h4'>
                                                    Vehicle NO.
                                                </Typography>
                                                <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                    {requestDetails.vehicleNo}
                                                </Typography>
                                            </div>
                                        </div>
                        </div> */}
                           {
                                requestDetails?.headName ? '' :
                                <Box className={classes.centerPosition}>
                                <Button className={classes.acceptButton} onClick={ () => {headApproveReject('true')} } >
                                    Accept
                                </Button>
                                <Button className={classes.rejectButton} onClick={ () => {headApproveReject('false')} } >
                                    Reject
                                </Button>
                            </Box> 
                           }
                    </Paper>
                </div>
                <Modal
                className={classes.middlePosition}
                style={{minWidth:'320px', padding:'12px'}}
                open={isPermission}
                onClose={e => {
                    e.preventDefault();
                    setisPermission(false)
                }}>
                    
                    <Paper className={classes.form} style={{minWidth:'320px', padding:'12px'}}>
                        <Typography style={ { margin:10 } }>
                            The Requested Journey is {Permission} <br />
                        </Typography>
                        <Button variant='contained' onClick={() => navigate('/')} >
                                Okay
                        </Button>
                    </Paper>
                
            </Modal>
        {/* </Box> */}
        <AppBar className={classes.footer}>
                    <div>
                        <Typography variant='body-2' component='div' style={{color:'white', textAlign: "center", marginTop: 8, marginBottom: 8}}>
                            Powered By <a style={{color:'white', textAlign: "center", marginTop: 8, marginBottom: 8}} href="https://www.foxberry.in/" target='_blank'> Foxberry Technologies </a> &copy; {new Date().getFullYear()}
                        </Typography>
                    </div>
        </AppBar>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => {
    return{
        getJourneyfetchdata : (requestbody) => dispatch(ActionCreators.getJourneyfetchdata(requestbody)),
        getProjectheaddata : (requestbody) => dispatch(ActionCreators.getProjectheaddata(requestbody)),
        setheadApproveRejectdata : (requestbody) => dispatch(ActionCreators.setheadApproveRejectdata(requestbody)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMangerApproval)