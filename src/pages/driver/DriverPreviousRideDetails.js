import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createBrowserHistory } from 'history'
import { makeStyles } from '@mui/styles'
import {  Button, Modal, Paper, Typography } from '@mui/material'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import {useLocation} from "react-router-dom";
import moment from "moment";
import Box from "@mui/material/Box";




const DriverPreviousRideDetails = ({ requestRideData, changeLang }) => {

    const classes = useStyles();
    const history = createBrowserHistory();
    const [statusIsOpen, setStatusIsOpen] = useState(false);
    const location = useLocation();
    const [rideDetails, setRideDetails] = useState(location?.state);

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Typography variant='h2' component='span'>
                    Ride
                </Typography>
                {rideDetails && rideDetails?
                    <Paper className={classes.displayForm}>
                        <p className={classes.formSpacer}>
                            <Typography variant='h4' component='span'>
                                {moment(rideDetails.startDateTime).format('DD MMM YYYY')}
                            </Typography>
                            <Typography variant='h4' component='span'>
                                {moment(rideDetails.startDateTime).format('hh:mm a')}
                            </Typography>
                        </p>
                        <Typography variant='h6' component='div' className={classes.middlePosition} style={{textAlign:'center'}}>
                            {rideDetails.source} To {rideDetails.destination}
                        </Typography>
                        <Box style={{textAlign:'center'}}>
                            <Typography variant='h4' component='p'>
                                {rideDetails.vehicleName}
                            </Typography>
                            <Typography variant='h4' component='p'>
                                {rideDetails.driverName}
                            </Typography>
                        </Box>
                        <p className={classes.formSpacer}>
                            <Typography component='div'>
                                {rideDetails.vehicleNo}
                            </Typography>
                            <Typography component='div' className={classes.formSpacer}>
                                <PhoneRoundedIcon />
                                {rideDetails.driverNo}
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
                                        1 Sep 2021
                                    </Typography>
                                </p>
                                <p className={classes.formSpacer}>
                                    <Typography component='span'>
                                        Approved
                                    </Typography>
                                    <Typography component='span'>
                                        2 Sep 2021
                                    </Typography>
                                </p>
                                <p className={classes.formSpacer}>
                                    <Typography component='span'>
                                        Started Journey
                                    </Typography>
                                    <Typography component='span'>
                                        3 Sep 2021
                                    </Typography>
                                </p>
                                <p className={classes.formSpacer}>
                                    <Typography component='span'>
                                        End Journey
                                    </Typography>
                                    <Typography component='span'>
                                        3 Sep 2021
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
                                sx={{ background: '#0b7a2c !important' }}
                            >
                                {changeLang?'स्थिती':"Status"}
                            </Button>
                        </div>
                        <hr />
                        <Typography variant='h4' component='div' className={classes.middlePosition}>
                            {changeLang?'प्रवासी':"Traveller"}
                        </Typography>
                        <hr />
                        {
                            rideDetails && rideDetails?.travellersDetails.map((traveller, index) => (
                                <div className={classes.travellerItem} style={{background: '#fcfcfc',}} key={index}>
                                    <Typography variant='subtitle1' component='span'>
                                        {traveller.name}
                                    </Typography>
                                    <p>
                                        <Typography component='span'>
                                            {traveller.contactNo}
                                        </Typography>
                                    </p>
                                </div>
                            ))
                        }
                        <hr />
                        <Typography variant='h4' component='div' className={classes.middlePosition}>
                            {changeLang?'मीटर रीडिंग सुरू करा':" Start Meter Reading"}
                        </Typography>
                        <Typography variant='h6' component='div' className={classes.middlePosition}>
                            {rideDetails.startOdoMeter}
                        </Typography>
                        <Typography variant='h4' component='div' className={classes.middlePosition}>
                          {changeLang?'मीटर रीडिंग समाप्त करा':"End Meter Reading"}
                        </Typography>
                        <Typography variant='h6' component='div' className={classes.middlePosition}>
                            {rideDetails.endOdoMeter}
                        </Typography>
                        <hr />
                        <Typography variant='h4' component='div' className={classes.middlePosition}>
                            {changeLang?'अभिप्राय':"Feedback"}
                        </Typography>
                        <div className={classes.formSpacer}>
                            <Paper className={classes.rateContainer}>
                                <Typography variant='h5' className={classes.middlePosition}>
                                    {changeLang?'चालक':"Driver"}
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
                                    {changeLang?'प्रवासी':"Traveller"}
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

export default connect(mapStateToProps)(DriverPreviousRideDetails)
