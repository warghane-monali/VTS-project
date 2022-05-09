import { createBrowserHistory } from 'history'
import { AppBar, Box, Button, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import * as ActionCreators from "../../actions/requestAction";
import * as ActionCreatorsAdmin from "../../actions/adminAction";
import {connect} from "react-redux";
import moment from "moment";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        background: theme.palette.secondary.main
    },
    appbar: {
        alignItems: 'center',
        padding: '15px',
        background: '#0c1572 !important',
    },
    appbarBackIcon: {
        color: 'white !important',
        fontSize: '40px !important',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    main: {
        margin: '30px 0',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    card: {
        minWidth: '350px',
        width: '90% !important',
        maxWidth: '600px',
        border: '1px solid black',
        borderRadius: '20px !important'
    },
    centerPosition: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        textAlign: 'center'
    },
    listContainer: {
        margin: '30px 0 !important',
        borderTop: '1px solid black'
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 20px',
        borderBottom: '1px solid black'
    },
    appliedText: {
        position: 'relative',
        color: '#0bae2b',
        bottom: '15px',
        marginLeft: '10px !important'
    },
    acceptButton: {
        background: '#0a9421 !important',
        '&:hover': {
            background: 'white !important',
            color: '#0a9421 !important'
        }
    },
    rejectButton: {
        background: '#fb0909 !important',
        '&:hover': {
            background: 'white !important',
            color: '#fb0909 !important'
        }
    }
}));

const ResponseStatus = ({setRejectCancelStatusData}) => {

    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const [requestStatus, setRequestStatus] = useState(location?.state);
    const history = createBrowserHistory();

    const rejectRequestData = async ()=>{
        const result = await setRejectCancelStatusData({
            journeyId: requestStatus._id,
            requestStatus: 'REJECTED',
        });
        if(result){
            navigate('/admin/request-list',{ state: 'REJECTED'});
        }
    };

    const goToMap = ( sourceLocationLat,sourceLocationLng, destinationLocationLat, destinationLocationLng)=> {
        let url = "https://www.google.com/maps/dir/?api=1";
        let origin = "&origin=" + sourceLocationLat + "," + sourceLocationLng;
        let destinationL = "&destination=" + destinationLocationLat + "," + destinationLocationLng;
        // let openMapUrl = new URL();
        window.open(url+origin+destinationL, '_blank');
    };


    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Paper className={classes.card}>
                    {requestStatus?.requestStatus==='APPROVED'?<Box style={{flex:1, justifyContent:'center',  borderRadius:20}} sx={{ background: '#8ef976' }}>
                        <Typography variant='h4' component='div' style={{padding:10, textAlign:"center"}}>
                            {requestStatus?.requestStatus}
                        </Typography>
                    </Box>:null}
                    {requestStatus?.requestStatus==='PENDING'?<Box style={{flex:1, justifyContent:'center',  borderRadius:20}} sx={{ background: '#f99935' }}>
                        <Typography variant='h4' component='div' style={{padding:10, textAlign:"center"}}>
                            {requestStatus?.requestStatus}
                        </Typography>
                    </Box>:null}
                    {requestStatus?.requestStatus==='ONGOING'?<Box style={{flex:1, justifyContent:'center',  borderRadius:20}} sx={{ background: '#bc9800' }}>
                        <Typography variant='h4' component='div' style={{padding:10, textAlign:"center"}}>
                            {requestStatus?.requestStatus}
                        </Typography>
                    </Box>:null}
                    {requestStatus?.requestStatus==='REJECTED'?<Box style={{flex:1, justifyContent:'center',  borderRadius:20}} sx={{ background: '#f94928' }}>
                        <Typography variant='h4' component='div' style={{padding:10, textAlign:"center"}}>
                            {requestStatus?.requestStatus}
                        </Typography>
                    </Box>:null}
                    {requestStatus?.requestStatus==='CANCEL'?<Box style={{flex:1, justifyContent:'center',  borderRadius:20}} sx={{ background: '#f94928' }}>
                        <Typography variant='h4' component='div' style={{padding:10, textAlign:"center"}}>
                            {requestStatus?.requestStatus}
                        </Typography>
                    </Box>:null}
                    <p className={classes.centerPosition}>
                        <Typography variant='h4' component='span'>
                            {moment(requestStatus.startDateTime).format('DD-MM-YYYY')}
                        </Typography>
                        <Typography variant='h4' component='span'>
                            {moment(requestStatus.startDateTime).format('hh:mm a')}
                        </Typography>
                    </p>
                    <Typography variant='h4' component='p' className={classes.centerPosition}>
                        {requestStatus.source} - {requestStatus.destination}
                    </Typography>

                    <Box className={classes.listContainer}>
                        {requestStatus &&  requestStatus?.travellersDetails.map((item, index) => {
                            return <Box className={classes.listItem} sx={{ background: '#fcfcfc' }} key={index}>
                                <p>
                                    <Typography variant='h6' component='span'>
                                        {item.name}
                                    </Typography>
                                    <Typography>
                                        {item.designation}
                                    </Typography>
                                </p>
                                <p>
                                    <Typography variant='subtitle1' component='span'>
                                        {item.contactNo}
                                    </Typography>
                                    {index===0?<Typography variant='subtitle2' component='span' className={classes.appliedText}>
                                        applied
                                    </Typography>:null}
                                </p>
                            </Box>
                        })}
                    </Box>
                    <Typography variant='h4' component='p' className={classes.centerPosition}>
                        {requestStatus.agencyName}
                    </Typography>
                    <Typography variant='subtitle1' component='p' className={classes.centerPosition}>
                        {requestStatus.vehicleName}
                    </Typography>
                    <Typography variant='subtitle1' component='p' className={classes.centerPosition}>
                        {requestStatus.vehicleNo}
                    </Typography>
                    <Typography variant='h4' component='p' className={classes.centerPosition}>
                        {requestStatus.driverName}
                    </Typography>
                    <Typography variant='subtitle1' component='p' className={classes.centerPosition}>
                        {requestStatus.driverNo}
                    </Typography>
                    <p className={classes.centerPosition} >
                        <Button onClick={() => navigate('/admin/dashboard')}>
                            HOME
                        </Button>
                    </p>
                    <p className={classes.centerPosition}>
                        <Button className={classes.rejectButton} onClick={() => rejectRequestData()}>
                            Reject
                        </Button>
                    </p>
                </Paper>
            </main>
        </div>
    )
};
const mapStateToProps = state => {
    return {
        adminDetails: state.admin.adminDetails,
        loading: state.request.loading,
        userList: state.admin.driverUserList,
        vehicleList: state.request.vehicleList,
        error: state.request.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setRejectCancelStatusData: (requestBody) => dispatch(ActionCreatorsAdmin.setRejectCancelStatusData(requestBody)),
        flushRequestState: () => dispatch(ActionCreators.flushRequestState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponseStatus)

