import React, {useState} from "react";
import { connect } from 'react-redux'
import { AppBar, Box, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { createBrowserHistory } from 'history'
import {useLocation} from "react-router-dom";
import moment from "moment";




const DriverUpcomingRideDetails = ({ requestRideData }) => {

    const classes = useStyles();
    const history = createBrowserHistory();
    const location = useLocation();
    const [rideDetails, setRideDetails] = useState(location?.state);

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Typography variant='h2' component='div'>
                    Ride
                </Typography>

                {rideDetails && rideDetails?<Paper className={classes.displayForm}>
                    <p className={classes.formSpacer}>
                        <Typography variant='h4' component='span' >
                            {moment(rideDetails.startDateTime).format('DD MMM YYYY')}
                        </Typography>
                        <Typography variant='h4' component='span'>
                            {moment(rideDetails.startDateTime).format('hh:mm a')}
                        </Typography>
                    </p>
                    <Typography variant='h6' component='div' style={{textAlign:'center'}}>
                        {rideDetails.source} To {rideDetails.destination}
                    </Typography>
                    <Typography variant='h6' component='div' style={{textAlign:'center'}}>
                        {rideDetails.vehicleName}
                    </Typography>
                    <Typography variant='h6' component='div' style={{marginTop: 4, textAlign:"center", wordBreak: 'break-word'}}>
                        {rideDetails.reason}
                    </Typography>
                    <hr />
                    <Typography variant='h4' component='div' className={classes.middlePosition}>
                        Traveller
                    </Typography>
                    {
                        rideDetails &&  rideDetails?.travellersDetails.map((traveller, index) => (
                            <div className={classes.travellerItem} style={{background: '#fcfcfc',}} key={index}>
                                <Typography variant='subtitle1' component='span'>
                                    {traveller.name}
                                </Typography>

                                <Typography variant='subtitle1' component='div' >
                                    {traveller.number}
                                </Typography>

                            </div>
                        ))
                    }
                </Paper>:null}
            </main>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        changeLang: state.trackLocation.changeLang,
        requestRideData: state.request.requestRideData
    }
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

export default connect(mapStateToProps)(DriverUpcomingRideDetails)
