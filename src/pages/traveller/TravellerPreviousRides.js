import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { createBrowserHistory } from 'history'
import { makeStyles } from '@mui/styles'
import { AppBar, Button, Modal, Paper, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import {useLocation} from "react-router-dom";
import moment from "moment";
import Box from "@mui/material/Box";
import * as ActionCreators from "../../actions/requestAction";



const TravellerPreviousRides = ({ getTravellerPreviousRidesData, travellerPreviousRides, userDetails}) => {

    const classes = useStyles();
    const history = createBrowserHistory();
    const [statusIsOpen, setStatusIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const data = getTravellerPreviousRides();
    }, []);

    const getTravellerPreviousRides = async () => {
        const data = await getTravellerPreviousRidesData(userDetails && userDetails.user && userDetails.user._id);
    };

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Typography variant='h2' component='span'>
                    Previous Ride
                </Typography>

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
    button: {
        color: 'white !important',
        margin: '15px auto !important',
        padding: '0.5rem 2.5rem !important',
        borderRadius: '1rem !important',
        fontSize: '1.5rem !important',
        background: 'black !important'
    },
    modal: {
        width: '350px',
        background: 'white',
        borderRadius: '20px !important',
        margin: '20px',
        padding: '20px',
    },
    closeIcon: {
        position: 'relative',
        left: '100px',
        bottom: '10px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    rateContainer: {
        marginTop: '15px',
        padding: '20px',
        border: '1px solid black',
        borderRadius: '20px !important'
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
        travellerPreviousRides: state.request.travellerPreviousRides,
        userDetails: state.auth.userDetails,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTravellerPreviousRidesData: (requestBody) => dispatch(ActionCreators.getTravellerPreviousRidesData(requestBody)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TravellerPreviousRides)
