import {
    Box,
    Button,
    FormControl,
    InputLabel, MenuItem,
    Paper,
    Select,
    Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import moment from "moment";
import * as ActionCreatorsAdmin from "../../actions/adminAction";
import {connect} from "react-redux";

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
        margin: '15px 0 !important',
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
    input: {
        width: '70%',
        margin: '',
        background: 'white',
        padding: '10px 20px',
        border: '1px solid black',
        borderRadius: '30px'
    },
    button: {
        background: '#0a9421 !important',
        '&:hover': {
            background: 'white !important',
            color: '#0a9421 !important'
        }
    }
}));

const AssignDriverRequestAccepted = ({getDriverUserListData, userList}) => {

    const classes = useStyles();
    const location = useLocation();
    const [rideData, setRideData] = useState(location?.state);
    const [driverInfo, setDriverInfo] = useState( {firstName:  '' , contactNo: '', _id: ''} );

    useEffect(() => {
        getDriverUserListData();
    }, []);

    const onChangeDriverInfo =(value)=>{
        setDriverInfo(value);
    };

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
                    <div className={classes.centerPosition} style={{margin:20}}>
                        <Typography variant='h4' component='span'>
                            {moment(rideData?.startDateTime).format('DD/MM/YYYY')}
                        </Typography>
                        <Typography variant='h4' component='span'>
                            {moment(rideData?.startDateTime).format('hh:mm a')}
                        </Typography>
                    </div>
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
                    <FormControl style={{width:'90%', marginLeft:"5%",  marginRight:"5%"}}>
                        <InputLabel id="selected-cars">Select driver</InputLabel>
                        <Select
                            labelId="selected-driver"
                            label="Select Driver"
                            className={classes.textFields}
                            value={driverInfo}
                            onChange={e => onChangeDriverInfo(e.target.value)}>
                            {
                                userList && userList?.map(driver => (
                                    <MenuItem key={driver._id} value={driver}>{driver.firstName +' '+ driver.middleName +' '+ driver.lastName}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <div className={classes.centerPosition} style={{margin:20}}>
                        <Button className={classes.button}>
                            Accepted
                        </Button>
                    </div>
                </Paper>
            </main>
        </div>
    )
};
const mapStateToProps = state => {
    return {
        adminDetails: state.admin.adminDetails,
        userList: state.admin.driverUserList,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getDriverUserListData: (requestBody) => dispatch(ActionCreatorsAdmin.getDriverUserListData(requestBody)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignDriverRequestAccepted)

