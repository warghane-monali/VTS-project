import { Paper, Typography} from '@mui/material'
import { makeStyles } from '@mui/styles'
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import React, {useEffect} from "react";
import * as ActionCreatorsDriver from "../../actions/requestAction";
import {connect} from "react-redux";
import moment from "moment";
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

const UpcomingRides = ({getTravellerUpcomingRidesData, userDetails, travellerUpcomingRides}) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const history = createBrowserHistory();

    useEffect(() => {
        getTravellerUpcomingRides();
    }, []);

    const getTravellerUpcomingRides = async () => {
        const data = await getTravellerUpcomingRidesData(userDetails.user._id);
    };

    return (
        <div className={classes.root}>
            <Typography
                variant='h2'
                component='div'
                className={classes.heading}>
                Upcoming Rides
            </Typography>
            {travellerUpcomingRides && travellerUpcomingRides.length>0 ?travellerUpcomingRides.map((item, index)=> {
                return <Paper className={classes.displayForm} key={index} >
                    <div onClick={e=>{e.preventDefault();navigate('/driver/upcoming-ride-details', {state:item})}}>
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
        travellerUpcomingRides: state.request.travellerUpcomingRides,
        loading: state.request.loading,
        error: state.request.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTravellerUpcomingRidesData: (requestBody) => dispatch(ActionCreatorsDriver.getTravellerUpcomingRidesData(requestBody)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingRides)
