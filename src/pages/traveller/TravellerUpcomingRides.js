import React, {useEffect, useState} from "react";
import { connect } from 'react-redux'
import {AppBar, Box, Button, Paper, Typography} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { createBrowserHistory } from 'history'

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import {useLocation} from "react-router-dom";
import moment from "moment";
import * as ActionCreators from "../../actions/requestAction";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";




const TravellerUpcomingRides = ({ getTravellerUpcomingRidesData, userDetails, travellerUpcomingRides}) => {

    const classes = useStyles();
    const history = createBrowserHistory();
    const location = useLocation();

    useEffect(() => {
        const data = getTravellerUpcomingRides();
    }, []);

    const getTravellerUpcomingRides = async () => {
        const data = await getTravellerUpcomingRidesData(userDetails && userDetails.user && userDetails.user._id);
    };

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Typography variant='h2' component='div'>
                    Upcoming Ride
                </Typography>
                {travellerUpcomingRides && travellerUpcomingRides.length>0 ?travellerUpcomingRides.map((item, index)=> {
                    return <Paper className={classes.displayForm} key={index} >
                        <div>
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
                        {/*<CancelledTicket />*/}
                    </Paper>
                }):null}
            </main>
        </div>
    )
};

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        background: '#fcfcfc'
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
    displayForm: {
        width: '350px',
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
    travellerItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        borderRadius: '10px',
        border: '1px solid black',
        marginBottom: '10px'
    },
}));

const mapStateToProps = state => {
    return {
        travellerUpcomingRides: state.request.travellerUpcomingRides,
        userDetails: state.auth.userDetails,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTravellerUpcomingRidesData: (requestBody) => dispatch(ActionCreators.getTravellerUpcomingRidesData(requestBody)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TravellerUpcomingRides)

