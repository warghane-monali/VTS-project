import { createBrowserHistory } from 'history'
import { AppBar, Box, Button, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded'
import React, {useState} from "react";
import {useLocation} from "react-router-dom";
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
        width: '100%',
        maxWidth: '600px',
        border: '1px solid black',
        borderRadius: '20px !important'
    },
    centerPosition: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
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
    button: {
        margin: '20px !important',
        background: '#0a9421 !important',
        '&:hover': {
            background: 'white !important',
            color: '#0a9421 !important'
        }
    },
}));

const PreviousRideStatusCheck = () => {

    const classes = useStyles();
    const history = createBrowserHistory();
    const location = useLocation();
    const [rideData, setRideData] = useState(location?.state);

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Paper className={classes.card}>
                    {rideData?.requestStatus==='APPROVED'?<Box style={{flex:1, justifyContent:'center',  borderRadius:20}} sx={{ background: '#8ef976' }}>
                        <Typography variant='h4' component='div' style={{padding:10, textAlign:"center"}}>
                            {rideData?.requestStatus}
                        </Typography>
                    </Box>:null}
                    {rideData?.requestStatus==='PENDING'?<Box style={{flex:1, justifyContent:'center',  borderRadius:20}} sx={{ background: '#f99935' }}>
                        <Typography variant='h4' component='div' style={{padding:10, textAlign:"center"}}>
                            {rideData?.requestStatus}
                        </Typography>
                    </Box>:null}
                    {rideData?.requestStatus==='REJECTED'?<Box style={{flex:1, justifyContent:'center',  borderRadius:20}} sx={{ background: '#f94928' }}>
                        <Typography variant='h4' component='div' style={{padding:10, textAlign:"center"}}>
                            {rideData?.requestStatus}
                        </Typography>
                    </Box>:null}
                    {rideData?.requestStatus==='CANCEL'?<Box style={{flex:1, justifyContent:'center',  borderRadius:20}} sx={{ background: '#f94928' }}>
                        <Typography variant='h4' component='div' style={{padding:10, textAlign:"center"}}>
                            {rideData?.requestStatus}
                        </Typography>
                    </Box>:null}
                    <p className={classes.centerPosition}>
                        <Typography variant='h4' component='span'>
                            {moment(rideData?.startDateTime).format('DD/MM/YYYY')}
                        </Typography>
                        <Typography variant='h4' component='span'>
                            {moment(rideData?.startDateTime).format('hh:mm a')}
                        </Typography>
                    </p>
                    <Typography variant='h4' component='p' className={classes.centerPosition}>
                        {rideData?.source} To {rideData?.destination}
                    </Typography>
                    {rideData && rideData?.travellersDetails.map((traveller, index) => (
                        <Box className={classes.listContainer}>
                            <Box key={index} className={classes.listItem} style={{margin:8}}>
                                <Typography variant='h6' component='span'>
                                    {traveller.name}
                                </Typography>
                                <div>
                                    <Typography variant='subtitle1' component='span'>
                                        {traveller.number}
                                    </Typography>
                                    {index===0?<Typography variant='subtitle2' component='span' className={classes.appliedText}>
                                        applied
                                    </Typography>:null}
                                </div>
                            </Box>
                        </Box>
                    ))}
                    <Typography variant='h4' component='p' className={classes.centerPosition} style={{margin:5}}>
                        {rideData.agencyName}
                    </Typography>
                    <Typography variant='subtitle1' component='p' className={classes.centerPosition} style={{margin:5}}>
                        {rideData.vehicleName}
                    </Typography>
                    <Typography variant='subtitle1' component='p' className={classes.centerPosition} style={{margin:5}}>
                        {rideData.vehicleNo}
                    </Typography>
                    <Typography
                        variant='h4'
                        component='p'
                        className={classes.centerPosition}
                    >
                        {rideData.driverName}
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        component='p'
                        className={classes.centerPosition}
                    >
                        {rideData.driverNo}
                    </Typography>
                    <p className={classes.centerPosition}>
                        <Button
                            className={classes.button}
                        >
                            Status
                        </Button>
                    </p>
                </Paper>
            </main>
        </div>
    )
}

export default PreviousRideStatusCheck
