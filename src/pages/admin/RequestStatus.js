import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createBrowserHistory } from 'history'
import { makeStyles } from '@mui/styles'
import { AppBar, Button, Modal, Paper, Typography } from '@mui/material'

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import * as ActionCreators from "../../../actions/requestAction";



const RequestStatus = ({ requestRideData, flushRequestState }) => {

    const classes = useStyles();
    const history = createBrowserHistory();
    const [statusIsOpen, setStatusIsOpen] = useState(false);

    const goToMap = ( sourceLocationLat,sourceLocationLng, destinationLocationLat, destinationLocationLng)=> {
        let url = "https://www.google.com/maps/dir/?api=1";
        let origin = "&origin=" + sourceLocationLat + "," + sourceLocationLng;
        let destinationL = "&destination=" + destinationLocationLat + "," + destinationLocationLng;
        // let openMapUrl = new URL();
        window.open(url+origin+destinationL, '_blank');
    };


    return (
        <div className={classes.root}>
            <AppBar position='static' sx={{ flexDirection: 'row' }} className={classes.appbar}>
                <ArrowBackRoundedIcon
                    className={classes.appbarBackIcon}
                    onClick={() => {
                        flushRequestState();
                        history.back()
                    }}
                />
            </AppBar>
            <main className={classes.main}>
                <Typography variant='h2' component='span'>
                    Request Status
                </Typography>
                <Paper className={classes.displayForm}>
                    <p className={classes.formSpacer}>
                        <Typography variant='h4' component='span'>
                            {new Date(requestRideData.startDateTime).toLocaleDateString()}
                        </Typography>
                        <Typography variant='h4' component='span'>
                            {new Date(requestRideData.startDateTime).toLocaleTimeString()}
                        </Typography>
                    </p>
                    <Typography>
                        {requestRideData.source} To {requestRideData.destination}
                    </Typography>
                    <p className={classes.formSpacer}>
                        <Typography variant='h4' component='span'>
                            {requestRideData.vehicleName}
                        </Typography>
                        <Typography variant='h4' component='span'>
                            {requestRideData.driverName}
                        </Typography>
                    </p>
                    <p className={classes.formSpacer}>
                        <Typography component='span'>
                            {requestRideData.vehicleNo}
                        </Typography>
                        <Typography component='span' className={classes.formSpacer}>
                            <PhoneRoundedIcon />
                            {requestRideData.driverNo}
                        </Typography>
                    </p>
                    <hr />
                    <Modal
                        className={classes.middlePosition}
                        open={statusIsOpen}
                        onClose={e => {
                            e.preventDefault();
                            setStatusIsOpen(false)
                        }}>
                        <Paper className={classes.modal}>
                            <Typography variant='h4' component='div' className={classes.middlePosition}>
                                Status
                                <CancelRoundedIcon
                                    className={classes.closeIcon}
                                    onClick={e => {
                                        e.preventDefault();
                                        setStatusIsOpen(false)
                                    }}
                                />
                            </Typography>
                            <p className={classes.formSpacer}>
                                <Typography component='span'>
                                    Request
                                </Typography>
                                <Typography component='span'>
                                    {new Date(requestRideData.createdAt).toLocaleDateString()}
                                </Typography>
                            </p>
                            <p className={classes.formSpacer}>
                                <Typography component='span'>
                                    Approved
                                </Typography>
                                <Typography component='span'>
                                    {new Date(requestRideData.updatedAt).toLocaleDateString()}
                                </Typography>
                            </p>
                            <p className={classes.formSpacer}>
                                <Typography component='span'>
                                    Started Journey
                                </Typography>
                                <Typography component='span'>
                                    {new Date(requestRideData.startDateTime).toLocaleDateString()}
                                </Typography>
                            </p>
                            <p className={classes.formSpacer}>
                                <Typography component='span'>
                                    End Journey
                                </Typography>
                                <Typography component='span'>
                                    {new Date(requestRideData.endDateTime).toLocaleDateString()}
                                </Typography>
                            </p>
                        </Paper>
                    </Modal>
                    <div className={classes.middlePosition}>
                        <Button
                            className={classes.button}
                            onClick={e => {
                                e.preventDefault();
                                setStatusIsOpen(true)
                            }}
                            sx={{ background: '#0b7a2c !important' }}>
                            Status
                        </Button>
                    </div>
                    <hr />
                    <p className={classes.formSpacer}>
                        <Typography variant='h4' component='span'>
                            Reason
                        </Typography>
                        <Typography component='span'>
                            {requestRideData.reason}
                        </Typography>
                    </p>
                    <hr />
                    {
                        requestRideData?.travellerList?.length > 0 && (
                            <>
                                <Typography variant='h4' component='div' className={classes.middlePosition}>
                                    Traveller
                                </Typography>
                                <hr />
                                {
                                    requestRideData?.travellerList.map(traveller => (
                                        <>
                                            <p className={classes.formSpacer}>
                                                <Typography component='span'>
                                                    {traveller.name}
                                                </Typography>
                                                <Typography component='span'>
                                                    {traveller.number}
                                                </Typography>
                                            </p>
                                            <hr />
                                        </>
                                    ))
                                }
                            </>
                        )
                    }
                    <Typography variant='h4' component='div' className={classes.middlePosition}>
                        Start Journey OTP
                    </Typography>
                    <Typography variant='h6' component='div' className={classes.middlePosition}>
                        {requestRideData.startOTP}
                    </Typography>
                    <Typography variant='h4' component='div' className={classes.middlePosition}>
                        End Journey OTP
                    </Typography>
                    <Typography variant='h6' component='div' className={classes.middlePosition}>
                        {requestRideData.endOTP}
                    </Typography>
                    <hr />
                    <Typography variant='h4' component='div' className={classes.middlePosition}>
                        Feedback
                    </Typography>
                    <div className={classes.formSpacer}>
                        <Paper className={classes.rateContainer}>
                            <Typography variant='h5' className={classes.middlePosition}>
                                Driver
                            </Typography>
                            <p>
                                <StarRateRoundedIcon />
                                <StarRateRoundedIcon />
                                <StarRateRoundedIcon />
                                <StarRateRoundedIcon />
                                <StarRateRoundedIcon />
                            </p>
                        </Paper>
                        <Paper className={classes.rateContainer}>
                            <Typography variant='h5' className={classes.middlePosition}>
                                Traveller
                            </Typography>
                            <p>
                                <StarRateRoundedIcon />
                                <StarRateRoundedIcon />
                                <StarRateRoundedIcon />
                                <StarRateRoundedIcon />
                                <StarRateRoundedIcon />
                            </p>
                        </Paper>
                    </div>
                </Paper>
            </main>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        requestRideData: state.request.requestRideData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        flushRequestState: () => dispatch(ActionCreators.flushRequestState())
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
        flexDirection: 'column',
    },
    displayForm: {
        minWidth: '350px',
        width: '100%',
        maxWidth: '600px',
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
    }
}));

export default connect(mapStateToProps, mapDispatchToProps)(RequestStatus)
