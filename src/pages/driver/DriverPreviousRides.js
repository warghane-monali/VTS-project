import {AppBar, Paper, Typography} from '@mui/material'
import { makeStyles } from '@mui/styles'
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import React, {useEffect} from "react";
import * as ActionCreatorsDriver from "../../actions/driverAction";
import {connect} from "react-redux";
import moment from "moment";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {createBrowserHistory} from "history";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        background: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    appbar: {
        alignItems: 'center',
        padding: '15px',
        background: '#0c1572 !important',
    },
    appbarBackIcon: {
        fontSize: '40px !important'
    },
    heading: {
        padding: '20px'
    },
    displayForm: {
        position: 'relative',
        width: '350px',
        background: 'white',
        borderRadius: '20px !important',
        margin: '20px',
        padding: '20px',
    },
    upperRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    lowerRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    carColor: {
        color: '#257aaf'
    },
    main: {
        minWidth: '350px',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
}));

const DriverPreviousRides = ({getDriverPreviousRidesData, userDetails, driverPreviousRides}) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const history = createBrowserHistory();

    useEffect(() => {
        getDriverPreviousRides();
    }, []);

    const getDriverPreviousRides = async () => {
        const data = await getDriverPreviousRidesData(userDetails.user._id);
    };

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Typography variant='h3' component='div' className={classes.heading} style={{textAlign:'center'}}>
                    Previous Rides
                </Typography>
                {driverPreviousRides && driverPreviousRides.length>0 ?driverPreviousRides.map((item, index)=> {
                    return  <Paper className={classes.displayForm} key={index} onClick={e=>{e.preventDefault();navigate('/driver/previous-ride-details', {state:item})}}>
                        <p className={classes.upperRow}>
                            <Typography variant='h4' component='span'>
                                {moment(item.startDateTime).format('DD MMM YYYY')}
                            </Typography>
                            <Typography variant='h4' component='span'>
                                {moment(item.startDateTime).format('hh:mm a')}
                            </Typography>
                        </p>
                        <p className={classes.lowerRow}>
                            <DirectionsCarRoundedIcon className={classes.carColor} />
                            <Typography>
                                {item.source} - {item.destination}
                            </Typography>
                            {item.requestStatus==='ENDJPURNEY'?<CircleRoundedIcon sx={{ color: '#ec4510'}} />:null}
                            {item.requestStatus==='PENDING'?<CircleRoundedIcon sx={{ color: '#fbfb0b'}} />:null}
                            {item.requestStatus==='APPROVED'?<CircleRoundedIcon sx={{ color: '#09984c'}} />:null}
                            {item.requestStatus==='REJECTED'?<CircleRoundedIcon sx={{ color: '#fb0909'}} />:null}
                        </p>
                    </Paper>
                }):null}
            </main>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        userDetails: state.auth.userDetails,
        driverPreviousRides: state.driver.driverPreviousRides,
        loading: state.request.loading,
        changeLang: state.trackLocation.changeLang,
        error: state.request.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getDriverPreviousRidesData: (requestBody) => dispatch(ActionCreatorsDriver.getDriverPreviousRidesData(requestBody)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DriverPreviousRides)

