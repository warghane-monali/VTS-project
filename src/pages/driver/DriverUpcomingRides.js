import {AppBar, Button, Paper, Typography} from '@mui/material'
import { makeStyles } from '@mui/styles'
import theme from '../../theme'
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import CancelledTicket from '../../components/CancelledTicket'
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
    absentButton: {
        margin:'25%',
        width: 'fit-content',
        background: '#af330c !important',
        borderRadius: '30px !important',
        '&:hover': {
            background: 'white !important',
            color: '#af330c !important'
        }
    }
}));

const DriverUpcomingRides = ({getDriverUpcomingRidesData, userDetails, driverUpcomingRides}) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const history = createBrowserHistory();

    useEffect(() => {
        getDriverUpcomingRides();
    }, []);

    const getDriverUpcomingRides = async () => {
        const data = await getDriverUpcomingRidesData(userDetails.user._id);
    };

    return (
        <div className={classes.root}>
            <Typography variant='h3' component='div' className={classes.heading} style={{textAlign:'center'}}>
                Upcoming Rides
            </Typography>
            {driverUpcomingRides && driverUpcomingRides.length>0 ?driverUpcomingRides.map((item, index)=> {
                return <Paper className={classes.displayForm} key={index} >
                    <div onClick={e=>{e.preventDefault();navigate('/driver/upcoming-ride-details', {state:item})}}>
                        <div className={classes.upperRow}>
                            <Typography variant='h4' component='span'>
                                {moment(item.startDateTime).format('DD MMM YYYY')}
                            </Typography>
                            <Typography variant='h4' component='span'>
                                {moment(item.startDateTime).format('hh:mm a')}
                            </Typography>
                        </div>
                        <div className={classes.lowerRow}>
                            <DirectionsCarRoundedIcon className={classes.carColor} />
                            <Typography>
                                {item.source} - {item.destination}
                            </Typography>
                            {item.requestStatus==='ENDJPURNEY'?<CircleRoundedIcon sx={{ color: '#ec4510'}} />:null}
                            {item.requestStatus==='PENDING'?<CircleRoundedIcon sx={{ color: '#fbfb0b'}} />:null}
                            {item.requestStatus==='APPROVED'?<CircleRoundedIcon sx={{ color: '#09984c'}} />:null}
                            {item.requestStatus==='REJECTED'?<CircleRoundedIcon sx={{ color: '#fb0909'}} />:null}
                        </div>
                    </div>
                    <div style={{flex:1, justifyContent:'center', display: 'flex'}}>
                        <Button className={classes.absentButton}>
                            Absent
                        </Button>
                    </div>

                    {/*<CancelledTicket />*/}
                </Paper>
            }):null}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        userDetails: state.auth.userDetails,
        driverUpcomingRides: state.driver.driverUpcomingRides,
        loading: state.request.loading,
        changeLang: state.trackLocation.changeLang,
        error: state.request.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getDriverUpcomingRidesData: (requestBody) => dispatch(ActionCreatorsDriver.getDriverUpcomingRidesData(requestBody)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DriverUpcomingRides)

