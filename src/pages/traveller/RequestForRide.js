import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import {makeStyles} from '@mui/styles'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import {connect, useDispatch} from "react-redux";
import * as ActionCreators from "../../actions/requestAction";
import {AppBar, Box, Card, IconButton, Modal, Rating} from "@mui/material";
import moment from "moment";
import DashboardIcon from '@mui/icons-material/Dashboard';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import TabPanel from "@mui/lab/TabPanel";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import * as ActionCreatorsDriver from "../../actions/driverAction";
import * as ActionCreatorsAdmin from "../../actions/adminAction";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {trackLocationSuccess} from "../../actions/trackLocationAction";
import CloseIcon from "@mui/icons-material/Close";
import Switch from "@mui/material/Switch";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from "@mui/material/Alert";
import {getFeedBackQue} from "../../actions/adminAction";

const labels = {
    1: 'Not Good',

    2: 'Ok',

    3: 'Average',

    4: 'Good',

    5: 'Excellent',

};

const RequestForRide = ({
                            tabIndexData,
                            getTabIndex,
                            getTravellerAllPreviousJourneyData,
                            getTravellerAllUpcomingJourneyData,
                            travellersAllPreviousJourney,
                            travellersAllUpcomingJourney,
                            getTravellerLatestJourneyData,
                            getTravellerUpcomingPreviousRidesData,
                            travellerUpcomingPreviousRides,
                            setStartJourneyData,
                            setEndJourneyData,
                            setPasswordData,
                            userDetails,
                            travellersLatestJourney,
                            getFeedBackQueData,
                            feedBackQueList,
                            setFeedBackQueData
                        }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const [selected, setSelected] = useState(tabIndexData ? (tabIndexData) : 0);
    const [selectedUpDate, setSelectedUpDate] = useState(0);
    const [selectedDate, setSelectedDate] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [filter, setFilter] = useState(false);
    const [selectedTab, setSelectedTab] = useState(null);
    const [password, setpassword] = useState(null);
    const [confirmpassword, setconfirmpassword] = useState(null);
    const [isvisible1, setisvisible1] = useState(false);
    const [isvisible2, setisvisible2] = useState(false);
    const [error, seterror] = useState(false);
    const [openFeedBackList, setOpenFeedBackList] = useState(false);
    const [checked, setChecked] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [hover1, setHover1] = React.useState(-1);
    const [textValue, setTextValue] = React.useState('');
    const [popup,setpopup] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            dispatch(trackLocationSuccess({latitude: position.coords.latitude, longitude: position.coords.longitude}));
        });
    }, []);

    useEffect(() => {
        const data = getTravellerLatestJourney();
        if(userDetails.user.status === 'NewLogin')
            setpopup(true)
    }, []);

    const getTravellerLatestJourney = async () => {
        const data = await getTravellerLatestJourneyData(userDetails && userDetails.user && userDetails.user._id);
        await getTravellerAllPreviousJourneyData(userDetails && userDetails.user && userDetails.user._id);
        await getTravellerAllUpcomingJourneyData(userDetails && userDetails.user && userDetails.user._id);
    };

    const getUserPreviousRides = async () => {
        await getTravellerAllPreviousJourneyData(userDetails && userDetails.user && userDetails.user._id);

    };

    const getUserUpcomingRides = async () => {
        await getTravellerAllUpcomingJourneyData(userDetails && userDetails.user && userDetails.user._id);
    };

    const getRequestDataByDate = (date) => {
        setFilter(true);
        setTabValue(3);
        getTravellerUpcomingPreviousRidesData(userDetails && userDetails.user && userDetails.user._id, moment(date).format('YYYY-MM-DD'))
    };

    const getChangeDateUpcomingRides = (selection) => {
        setSelectedUpDate(selection);
        setTabValue(selection);
        if (selection === 0) {
            getTravellerAllUpcomingJourneyData(userDetails && userDetails.user && userDetails.user._id)
        } else if (selection === 1) {
            getTravellerUpcomingPreviousRidesData(userDetails && userDetails.user && userDetails.user._id, moment().add(0, 'days').format('YYYY-MM-DD'))
        } else if (selection === 2) {
            getTravellerUpcomingPreviousRidesData(userDetails && userDetails.user && userDetails.user._id, moment().add(1, 'days').format('YYYY-MM-DD'))
        }
    };

    const getChangeDatePreviousRides = (selection) => {
        setTabValue(selection);
        setSelectedDate(selection);
        if (selection === 0) {
            getTravellerAllPreviousJourneyData(userDetails && userDetails.user && userDetails.user._id)
        } else if (selection === 1) {
            getTravellerUpcomingPreviousRidesData(userDetails && userDetails.user && userDetails.user._id, moment().subtract(1, 'days').format('YYYY-MM-DD'))
        } else if (selection === 2) {
            getTravellerUpcomingPreviousRidesData(userDetails && userDetails.user && userDetails.user._id, moment().subtract(2, 'days').format('YYYY-MM-DD'))
        }
    };

    const renderUpcomingList = (item, index) => {
        return <Paper className={classes.displayForm} key={index}
                      onClick={() => navigate('/dashboard/ride-status', {state: item})}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
                <div className={classes.upperRow}
                     style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
                    <Typography variant='h6' style={{textAlign: "center"}}>
                        {item.source}
                    </Typography>
                    <Typography variant='body-1' component='span' style={{padding: 10, textAlign: "center"}}>
                        Start Date :{moment(item.startDateTime).format('DD MMM YYYY')}
                    </Typography>

                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transform: "rotate(1800deg)",
                    alignSelf: 'center'
                }}>
                    <ImportExportIcon sx={{
                        fontSize: 40,
                        color: item?.requestStatus === 'CANCEL' ? '#dc0404' : item?.requestStatus === 'UNSERVICE' ? '#cb7373' : item?.requestStatus === 'PENDING' ? '#f99935' : item?.requestStatus === 'ONGOING' ? '#bc9800' : item?.requestStatus === 'APPROVED' ? '#09984c' : item?.requestStatus === 'REJECTED' ? '#f93125' : 'gray'
                    }}/>
                </div>
                <div className={classes.lowerRow}
                     style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
                    {/*<DirectionsCarRoundedIcon className={classes.carColor} />*/}
                    <Typography variant='h6' style={{textAlign: "center"}}>
                        {item.destination}
                    </Typography>

                    <Typography variant='body-1' component='span' style={{padding: 10, textAlign: "center"}}>
                        Start Time :{moment(item.startDateTime).format('hh:mm a')}
                    </Typography>
                </div>
            </div>
        </Paper>
    };

    const goToMap = (sourceLocationLat, sourceLocationLng, destinationLocationLat, destinationLocationLng) => {
        let url = "https://www.google.com/maps/dir/?api=1";
        let origin = "&origin=" + sourceLocationLat + "," + sourceLocationLng;
        let destinationL = "&destination=" + destinationLocationLat + "," + destinationLocationLng;
        // let openMapUrl = new URL();
        window.open(url + origin + destinationL, '_blank');
    };

    const openFeedBackQue = async () => {
        setOpenFeedBackList(true)
        const rse = await getFeedBackQueData()
        setSelectedProduct(rse)
    }

    const updateFeedBackAns = async (data) => {
        const res = await setFeedBackQueData(data)
        setOpenFeedBackList(false)
    }

    const handelAns = async () => {
        setChecked(!checked);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const updatePassword = async () => {
        if (password === null && confirmpassword === null) {
            seterror(true)
        } else if (password === confirmpassword) {
            await setPasswordData({password: password, userId: userDetails && userDetails.user && userDetails.user._id})
            setpopup(false)
        }
    }

    const handleEditItem = (editedItem, id, fname, seletedIndex) => {
        const newData = selectedProduct[0].questions.map((item, index) => {
            if (index === seletedIndex) {
                const newItem = {...item, [fname]: editedItem};
                return newItem;
            }
            return item
        });
        const newArray = [{
            "journeyId": travellersLatestJourney._id,
            "feedbackEntityNo": selectedProduct[0].feedbackEntityNo,
            "entityName": selectedProduct[0].entityName,
            "entityType": selectedProduct[0].entityType,
            "questions": newData
        }]

        setSelectedProduct(newArray)
        dispatch(getFeedBackQue(newArray));
    };


    return (
        <div className={classes.root}>
            {userDetails && userDetails.user && userDetails.user.status === 'NewLogin' && popup &&
                <div className={classes.popupbox}>
                    <div className={classes.box}>
                        {/* <span className={classes.closeicon} onClick={ () => togglepopup()}>x</span> */}
                        <h2>Create Password</h2>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={isvisible1 ? 'text' : 'password'}
                                value={password}
                                onChange={e => setpassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setisvisible1(!isvisible1)}
                                            onMouseDown={() => handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {isvisible1 ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <br/>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={isvisible2 ? 'text' : 'password'}
                                value={confirmpassword}
                                onChange={e => setconfirmpassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setisvisible2(!isvisible2)}
                                            onMouseDown={() => handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {isvisible2 ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <br/>
                        {error ? <Alert
                            severity="warning"
                            action={<IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    seterror(false);
                                }}>
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>}
                            sx={{mb: 2}}>
                            Password does not match
                        </Alert> : null}
                        <br/>
                        <Button className={classes.button} onClick={() => updatePassword()}>Set Password</Button>
                    </div>
                </div>
            }
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',}}>
                <div sx={{display: {xs: 'none', sm: 'block'}}} style={{flexDirection: 'column'}}>

                </div>
                {selected === 0 &&
                    <div style={{flexDirection: 'column', justifyContent: 'space-between', maxWidth: 420, flex: 1,width:'100%'}}>
                        <Paper className={classes.leftSection} elevation={3}
                               onClick={() => navigate('/dashboard/request')}>
                            <Typography variant='body-1' component='div' style={{width: '100%', textAlign: "center"}}>
                                Request for Ride
                            </Typography>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                margin: '1rem',
                                marginBottom: '0'
                            }}>
                                <img style={{width: '100%', marginBottom: 36}}
                                     alt="React"
                                     src="/static/img/sakal_booking.png"/>
                            </div>
                        </Paper>

                        {(travellersLatestJourney && (travellersLatestJourney.requestStatus === 'PENDING' || travellersLatestJourney.requestStatus === 'APPROVED' || travellersLatestJourney.requestStatus === 'APPROVED' ||
                                travellersLatestJourney.requestStatus === 'STARTJPURNEY' || travellersLatestJourney.requestStatus === 'ONGOING' || travellersLatestJourney.requestStatus === 'ENDJPURNEY' || travellersLatestJourney.requestStatus === 'EXTENDREQUEST')) &&
                            <Paper className={classes.rightSection} elevation={4}>
                                {(travellersLatestJourney && (travellersLatestJourney.requestStatus === 'PENDING' || travellersLatestJourney.requestStatus === 'ONGOING' || travellersLatestJourney.requestStatus === 'ENDJPURNEY')) ?
                                    <div className={classes.topicRow}>
                                        <div>
                                            <Typography variant='h6' component='div'
                                                        style={{textAlign: 'center', margin: 16}}>
                                                {travellersLatestJourney?.requestStatus === 'PENDING' ? 'Pending Status' : null}
                                                {travellersLatestJourney?.requestStatus === 'APPROVED' ? 'Accepted Status' : null}
                                                {travellersLatestJourney?.requestStatus === 'REJECTED' ? 'Rejected Status' : null}
                                                {travellersLatestJourney?.requestStatus === 'CANCEL' ? 'Canceled Status' : null}
                                            </Typography>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Box>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <Box style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        textAlign: "center",
                                                        width: '100%'
                                                    }}>
                                                        {travellersLatestJourney.journeyNo !== '' ?
                                                            <div style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between'
                                                            }}>
                                                                <Typography variant='subtitle2' component='h4'
                                                                            style={{marginTop: 4}}>
                                                                    Journey No.
                                                                </Typography>
                                                                <Typography variant='body-1' component='h4'
                                                                            style={{marginTop: 4}}>
                                                                    {travellersLatestJourney.journeyNo}
                                                                </Typography>
                                                            </div> : null}
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between'
                                                        }}>
                                                            <Typography variant='subtitle2' component='h4'
                                                                        style={{marginTop: 4}}>
                                                                Trip Type
                                                            </Typography>
                                                            <Typography variant='body-1' component='div'
                                                                        style={{marginTop: 4}}>
                                                                {travellersLatestJourney.oneWayOrRoundTrip === 'OneWay' ? 'One Way' : 'Round Trip'}
                                                            </Typography>
                                                        </div>

                                                        <Paper style={{padding: 8, margin: 4, cursor: 'pointer'}}
                                                               elevation={4}
                                                               onClick={() => goToMap(travellersLatestJourney.sourceLat, travellersLatestJourney.sourceLong, travellersLatestJourney.destinationLat, travellersLatestJourney.destinationLong)}>
                                                            <Typography variant='body-1' component='h4'
                                                                        style={{margin: 4}}>
                                                                From
                                                            </Typography>
                                                            <Typography variant='subtitle2' component='div' style={{
                                                                margin: 4,
                                                                textDecoration: "underline",
                                                                color: 'blue'
                                                            }}>
                                                                {travellersLatestJourney.source}
                                                            </Typography>
                                                        </Paper>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'center',
                                                            transform: "rotate(180deg)",
                                                            alignSelf: 'center'
                                                        }}>
                                                            <ImportExportIcon sx={{
                                                                fontSize: 40,
                                                                color: travellersLatestJourney?.requestStatus === 'PENDING' ? '#f99935' : travellersLatestJourney?.requestStatus === 'APPROVED' ? '#09984c' : travellersLatestJourney?.requestStatus === 'ONGOING' ? '#bc9800' : travellersLatestJourney?.requestStatus === 'REJECTED' ? '#f93125' : 'gray'
                                                            }}/>
                                                        </div>
                                                        <Paper style={{padding: 8, margin: 4, cursor: 'pointer'}}
                                                               elevation={4}
                                                               onClick={() => goToMap(travellersLatestJourney.sourceLat, travellersLatestJourney.sourceLong, travellersLatestJourney.destinationLat, travellersLatestJourney.destinationLong)}>
                                                            <Typography variant='body-2' component='h4'
                                                                        style={{margin: 4}}>
                                                                To
                                                            </Typography>
                                                            <Typography variant='subtitle2' component='div' style={{
                                                                margin: 4,
                                                                textDecoration: "underline",
                                                                color: 'blue'
                                                            }}>
                                                                {travellersLatestJourney.destination}
                                                            </Typography>
                                                        </Paper>
                                                    </Box>
                                                    <Box style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        textAlign: "center",
                                                        margin: 10
                                                    }}>
                                                        <Typography variant='body-2' component='h4'
                                                                    style={{marginTop: 4}}>
                                                            Reason
                                                        </Typography>
                                                        <p variant='subtitle2' component='h4' style={{
                                                            marginTop: 4,
                                                            textAlign: "center",
                                                            width: '100%',
                                                            wordWrap: 'break-word'
                                                        }}>
                                                            {travellersLatestJourney.reason}
                                                        </p>
                                                    </Box>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        width: '100%'
                                                    }}>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            marginTop: 16,
                                                            textAlign: 'left'
                                                        }}>
                                                            <Typography variant='body-2' component='div'>
                                                                Start Date & Time
                                                            </Typography>
                                                            <Typography variant='subtitle2' component='div'
                                                                        style={{marginTop: 8}}>
                                                                {moment(travellersLatestJourney.startDateTime).format('DD/MMMM/YYYY hh:mm a')}
                                                            </Typography>
                                                        </div>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            marginTop: 16,
                                                            textAlign: 'right'
                                                        }}>
                                                            <Typography variant='body-2' component='div'>
                                                                End Date & Time
                                                            </Typography>
                                                            <Typography variant='subtitle2' component='div'
                                                                        style={{marginTop: 8}}>
                                                                {moment(travellersLatestJourney.endDateTime).format('DD/MMMM/YYYY hh:mm a')}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Box>
                                        </div>
                                    </div> : null}
                                {(travellersLatestJourney && (travellersLatestJourney.requestStatus === 'APPROVED' || travellersLatestJourney.requestStatus === 'STARTJPURNEY' || travellersLatestJourney.requestStatus === 'ONGOING' || travellersLatestJourney.requestStatus === 'ENDJPURNEY' || travellersLatestJourney.requestStatus === 'EXTENDREQUEST')) &&
                                    <>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            margin: '16px 0'
                                        }}>
                                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                                    <img style={{width: '80px'}}
                                                         alt="React"
                                                         src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU'
                                                    />
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    margin: '12px 0'
                                                }}>
                                                    <Typography variant='body-1' component='h4'>
                                                        Driver Name
                                                    </Typography>
                                                    <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                        {travellersLatestJourney.driverName}
                                                    </Typography>
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    margin: '12px 0'
                                                }}>
                                                    <Typography variant='body-1' component='h4'>
                                                        Mobile No.
                                                    </Typography>
                                                    <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                        {travellersLatestJourney.driverNo}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'column',}}>
                                                <div
                                                    style={{display: 'flex', flexDirection: 'column', margin: '6px 0'}}>
                                                    <Typography variant='body-1' component='h4'
                                                                style={{margin: '6px 0'}}>
                                                        Start OTP : {travellersLatestJourney.startOTP}
                                                    </Typography>
                                                    {travellersLatestJourney.requestStatus === 'STARTJPURNEY' || travellersLatestJourney.requestStatus === 'ONGOING' &&
                                                        <Typography variant='body-1' component='h4'
                                                                    style={{margin: '6px 0'}}>
                                                            End OTP : {travellersLatestJourney.endOTP}
                                                        </Typography>}
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    margin: '16px 0'
                                                }}>
                                                    <Typography variant='body-1' component='h4'>
                                                        Vehicle Type Name
                                                    </Typography>
                                                    <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                        {travellersLatestJourney.vehicleName}
                                                    </Typography>
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    margin: '16px 0'
                                                }}>
                                                    <Typography variant='body-1' component='h4'>
                                                        Vehicle NO.
                                                    </Typography>
                                                    <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                        {travellersLatestJourney.vehicleNo}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            margin: '16px 0'
                                        }}>
                                            {travellersLatestJourney.requestStatus === 'STARTJPURNEY' &&
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    width: '100%'
                                                }}>
                                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                                        <Typography variant='body-1' component='h4'>
                                                            Start Meter Reading
                                                        </Typography>
                                                        <Typography variant='body-2' component='div'
                                                                    style={{marginTop: 8}}>
                                                            {travellersLatestJourney.startOdoMeter}
                                                        </Typography>
                                                    </div>
                                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                                        <Typography variant='body-1' component='h4'>
                                                            End Meter Reading
                                                        </Typography>
                                                        <Typography variant='body-2' component='div'
                                                                    style={{marginTop: 8}}>
                                                            {travellersLatestJourney.endOdoMeter}
                                                        </Typography>
                                                    </div>
                                                </div>}
                                        </div>
                                    </>
                                }

                            </Paper>
                        }
                        {travellersLatestJourney && (travellersLatestJourney.requestStatus === 'ENDJPURNEY') &&
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => openFeedBackQue()}>
                                    Feedback
                                </Button>
                            </div>
                        }
                    </div>}
                {selected === 2 ?
                    <div style={{flexDirection: 'column', justifyContent: 'space-between', maxWidth: 420, flex: 1,width:'100%'}}>
                        <TabContext value={tabValue.toString()}>
                            <TabList
                                onChange={(e, value) => {
                                    setSelectedTab(Number(value));
                                    getChangeDatePreviousRides(Number(value));
                                    setFilter(false);
                                }}>
                                <Tab style={{minWidth: filter ? 75 : 115, padding: '12px 8px'}} label={'All Rides'}
                                     value="0"/>
                                <Tab style={{minWidth: filter ? 75 : 115, padding: '12px 8px'}}
                                     label={moment().subtract(1, 'days').format('DD-MMM')} value="1"/>
                                <Tab style={{minWidth: filter ? 75 : 115, padding: '12px 8px'}}
                                     label={moment().subtract(2, 'days').format('DD-MMM')} value="2"/>
                                {filter && value ? <Tab style={{minWidth: 115, padding: '12px 8px'}}
                                                        label={moment(value && value.toString()).format('DD-MMM-YYYY')}
                                                        value="3"/> : null}
                                <IconButton onClick={e => {
                                    e.preventDefault();
                                    setIsOpen(pState => !pState)
                                }}>
                                    <DateRangeRoundedIcon color="primary" className={classes.calendarIcon}
                                                          style={{width: 24, height: 24}}/>
                                </IconButton>
                            </TabList>
                            <TabPanel value="0" style={{width: '95%', padding: 12}}>
                                {travellersAllPreviousJourney && travellersAllPreviousJourney.length > 0 && travellersAllPreviousJourney.map((item, index) => {
                                    return renderUpcomingList(item, index)
                                })}
                            </TabPanel>
                            <TabPanel style={{width: '95%', padding: 12}} value="1">
                                {travellerUpcomingPreviousRides && travellerUpcomingPreviousRides.length > 0 ? travellerUpcomingPreviousRides.map((item, index) => {
                                    return renderUpcomingList(item, index)
                                }) : null}
                            </TabPanel>
                            <TabPanel style={{width: '95%', padding: 12}} value="2">
                                {travellerUpcomingPreviousRides && travellerUpcomingPreviousRides.length > 0 ? travellerUpcomingPreviousRides.map((item, index) => {
                                    return renderUpcomingList(item, index)
                                }) : null}
                            </TabPanel>
                            {filter ? <TabPanel style={{width: '95%', padding: 12}} value="3">
                                {travellerUpcomingPreviousRides && travellerUpcomingPreviousRides.length > 0 ? travellerUpcomingPreviousRides.map((item, index) => {
                                    return renderUpcomingList(item, index)
                                }) : null}
                            </TabPanel> : null}
                        </TabContext>
                        <Modal
                            className={classes.middlePosition}
                            open={isOpen}
                            onClose={e => {
                                e.preventDefault();
                                setIsOpen(false)
                            }}>
                            <Paper className={classes.form}>
                                <Typography
                                    variant='h4'
                                    component='div' align='center'>
                                    Select Date
                                </Typography>
                                <div style={{margin: 10}}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            renderInput={(props) => <TextField
                                                className={classes.textFields} {...props} />}
                                            label="Select Date"
                                            mask="__/__/____"
                                            format="dd-MM-yyyy"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            maxDate={new Date(moment().subtract(3, 'days').format('DD-MMM-YYYY'))}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div style={{
                                    margin: 10, display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Button variant="contained" onClick={e => {
                                        e.preventDefault();
                                        setIsOpen(pState => !pState);
                                        if (value) {
                                            getRequestDataByDate(value)
                                        }
                                    }}>Submit</Button>
                                </div>

                            </Paper>
                        </Modal>
                    </div> : null}
                {selected === 1 ?
                    <div style={{flexDirection: 'column', justifyContent: 'space-between', maxWidth: 420, flex: 1,width:'100%'}}>
                        <TabContext value={tabValue.toString()}>
                            <TabList onChange={(e, value) => {
                                setSelectedTab(Number(value));
                                getChangeDateUpcomingRides(Number(value));
                                setFilter(false);
                            }}>
                                <Tab style={{minWidth: filter ? 75 : 115}} label={'All Rides'} value="0"/>
                                <Tab style={{minWidth: filter ? 75 : 115}}
                                     label={moment().add(0, 'days').format('DD-MMM')} value="1"/>
                                <Tab style={{minWidth: filter ? 75 : 115}}
                                     label={moment().add(1, 'days').format('DD-MMM')} value="2"/>
                                {filter && value ? <Tab style={{minWidth: 115, padding: '12px 8px'}}
                                                        label={moment(value && value.toString()).format('DD-MMM-YYYY')}
                                                        value="3"/> : null}
                                <IconButton onClick={e => {
                                    e.preventDefault();
                                    setIsOpen(pState => !pState)
                                }}>
                                    <DateRangeRoundedIcon color="primary" className={classes.calendarIcon}
                                                          style={{width: 24, height: 24}}/>
                                </IconButton>
                            </TabList>
                            <TabPanel value="0">
                                {travellersAllUpcomingJourney && travellersAllUpcomingJourney.length > 0 && travellersAllUpcomingJourney.map((item, index) => {
                                    return renderUpcomingList(item, index)
                                })}
                            </TabPanel>
                            <TabPanel value="1">
                                {travellerUpcomingPreviousRides && travellerUpcomingPreviousRides.length > 0 ? travellerUpcomingPreviousRides.map((item, index) => {
                                    return renderUpcomingList(item, index)
                                }) : null}
                            </TabPanel>
                            <TabPanel value="2">
                                {travellerUpcomingPreviousRides && travellerUpcomingPreviousRides.length > 0 ? travellerUpcomingPreviousRides.map((item, index) => {
                                    return renderUpcomingList(item, index)
                                }) : null}
                            </TabPanel>
                            {filter ? <TabPanel value="3">
                                {travellerUpcomingPreviousRides && travellerUpcomingPreviousRides.length > 0 ? travellerUpcomingPreviousRides.map((item, index) => {
                                    return renderUpcomingList(item, index)
                                }) : null}
                            </TabPanel> : null}
                        </TabContext>
                        <Modal
                            className={classes.middlePosition}
                            open={isOpen}
                            onClose={e => {
                                e.preventDefault();
                                setIsOpen(false)
                            }}>
                            <Paper className={classes.form}>
                                <Typography
                                    variant='h4'
                                    component='div' align='center'>
                                    Select Date
                                </Typography>
                                <div style={{margin: 10}}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            renderInput={(props) => <TextField
                                                className={classes.textFields} {...props} />}
                                            mask="__/__/____"
                                            format="dd-MM-yyyy"
                                            label="Select Date"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            minDate={new Date(moment().add(3, 'days').format('DD-MMM-YYYY'))}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div style={{
                                    margin: 10, display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Button variant="contained" onClick={e => {
                                        e.preventDefault();
                                        setIsOpen(pState => !pState);
                                        getRequestDataByDate(value)
                                    }}>Submit</Button>
                                </div>

                            </Paper>
                        </Modal>
                    </div> : null}
                <div sx={{display: {xs: 'none', sm: 'block'}}} style={{flexDirection: 'column'}}>

                </div>
                <Modal className={classes.middlePosition} open={openFeedBackList} onClose={e => {
                    e.preventDefault();
                    setOpenFeedBackList(false)
                }}>
                    {openFeedBackList && <Paper className={classes.form}
                           sx={{p: 1, m: 1, borderRadius: 1, textAlign: 'center', fontSize: '1rem', fontWeight: '700'}}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Typography style={{margin: 8}} variant='h5' component='div'>
                                Feedback
                            </Typography>
                            <IconButton aria-label="delete" onClick={e => {
                                e.preventDefault();
                                setOpenFeedBackList(false)
                            }}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                        <hr className={classes.divider}/>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            justifyItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Box className={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    maxWidth: 400,
                                    flex: 1
                                }}>
                                    {feedBackQueList && feedBackQueList[0].questions.map((item, index) => {
                                        return <Card style={{margin: 16}} elevation={3} key={index}>
                                            <Typography component="legend">{item.question} ?</Typography>
                                            {item.questionType === 'STARS' &&
                                                <>
                                                    <Rating name="hover-feedback"
                                                            value={item.ans}
                                                            onChange={(event, newValue1) =>
                                                                handleEditItem(newValue1, item._id, 'ans', index)}
                                                            onChangeActive={(event, newHover) => {
                                                                setHover1(newHover);
                                                            }}
                                                            defaultValue={item.ans}
                                                            size="large"
                                                    />
                                                </>
                                            }
                                            {item.questionType === 'TEXTBOX' &&
                                                <TextField
                                                    style={{margin: 16}}
                                                    value={textValue}
                                                    defaultValue={item.ans}
                                                    id="outlined-password-input"
                                                    onChange={(e) => setTextValue(e.target.value)}
                                                    onBlur={(event) => {
                                                        handleEditItem(textValue, item._id, 'ans', index)
                                                    }}
                                                    type="text"
                                                />
                                            }
                                            {item.questionType === 'YESNO' &&
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignContent: 'center'
                                                }}>
                                                    <Typography>No</Typography>
                                                    <Switch
                                                        checked={item.ans}
                                                        onChange={async () => {
                                                            await handelAns()
                                                            handleEditItem(!checked, item._id, 'ans', index)
                                                        }}
                                                        inputProps={{'aria-label': 'controlled'}}
                                                    />
                                                    <Typography>Yes</Typography>
                                                </div>
                                            }
                                        </Card>
                                    })}
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => updateFeedBackAns(selectedProduct)}>
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </Box>
                        </div>
                    </Paper>}
                </Modal>
            </Box>
            <AppBar className={classes.footer}>
                <Box sx={{width: {xs: 500, sm: 786, md: 1080, xl: '100%'}}}>
                    <BottomNavigation
                        showLabels
                        value={selected}
                        onChange={(event, newValue) => {
                            setFilter(false);
                            getTabIndex(newValue);
                            setSelected(newValue);
                            setTabValue(0)
                            if (newValue === 1) {
                                getUserUpcomingRides()
                            } else if (newValue === 2) {
                                getUserPreviousRides()
                            }
                        }}>
                        <BottomNavigationAction label="Dashboard" icon={<DashboardIcon/>}/>
                        <BottomNavigationAction label="Upcoming Ride" icon={<DirectionsCarIcon/>}/>
                        <BottomNavigationAction label="Previous Ride" icon={<DirectionsCarIcon/>}/>
                        {/*<BottomNavigationAction label="Feedback" icon={<FeedbackIcon/>}/>*/}
                    </BottomNavigation>
                    <div>
                        <Typography variant='body-2' component='div'
                                    style={{color: 'white', textAlign: "center", marginTop: 8, marginBottom: 8}}>
                            Powered By <a style={{color: 'white', textAlign: "center", marginTop: 8, marginBottom: 8}}
                                          href="https://www.foxberry.in/" target="_blank"> Foxberry
                            Technologies </a> &copy; {new Date().getFullYear()}
                        </Typography>
                    </div>
                </Box>

            </AppBar>
        </div>
    )
};

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100%',
        background: '#fcfcfc',
        paddingBottom: '130px'
    },
    tabRoot: {
        maxWidth: '130px !important',
        padding: "12px 12px",
    },
    tabs: {
        '& button': {
            maxWidth: '130px !important',
            padding: "12px 12px",
        }
    },
    tab: {
        maxWidth: '130px !important',
        padding: "12px 12px",
    },
    appbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px',
        background: '#0c1572 !important',
    },
    appbarBackIcon: {
        fontSize: '40px !important'
    },
    main: {
        display: 'flex',
        width: '100%',
        height: 'calc(100% - 70px)',
        alignItems: 'center',
        [theme.breakpoints.down(600)]: {
            flexWrap: 'wrap',
        },
    },
    leftSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        height: 'max-content',
        padding: '20px',
        margin: '20px',
        borderRadius: '10px !important',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    lowerRow: {
        marginTop: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 0.5
    },
    carIcon: {
        fontSize: '40px !important',
        color: '#257aaf'
    },
    playIcon: {
        fontSize: '40px !important',
        color: '#1fa85b',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '80%',
        padding: '10px 20px',
        margin: '10px 20px',
        paddingBottom: 40,
        borderRadius: '10px !important',
        [theme.breakpoints.down(600)]: {
            // width: '100%'
        },
    },
    topicRow: {
        width: '100%'
    },
    topicDoubleHeading: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 'bold !important',
        marginBottom: '10px'
    },
    topicDoubleBody: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    divider: {
        width: '100%',
        margin: '20px 0',
    },
    button: {
        background: '#0c1572 !important',
        color: 'white !important',
    },
    lowerContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    lowerForm: {
        width: '25%',
        background: 'white',
        borderRadius: '20px !important',
        margin: '30px',
        padding: '20px',
    },
    icon: {
        margin: '5px',
        fontSize: '30px !important',
        color: 'black'
    },
    footer: {
        position: 'sticky',
        bottom: '0',
        top: 'auto !important',
        display: 'flex',
        flexDirection: 'row !important',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    tabButton: {
        margin: '0 10px !important',
        display: 'flex',
        justifyContent: 'center',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    timeline: {
        minWidth: '350px',
        width: '100%',
        background: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white'
    },
    form: {
        padding: '20px',
        borderRadius: '20px !important',
        display: 'flex',
        flexDirection: 'column'
    },
    middlePosition: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateBox: {
        flex: 0.33,
        height: '43px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 4,
        border: '1px solid white',
        '&:hover': {
            cursor: 'pointer'
        },
    },
    calendarIcon: {
        color: 'white',
        fontSize: '40px !important'
    },
    cards: {
        minWidth: '350px',
        width: '90% !important',
        maxWidth: '500px',
        padding: '10px',
        margin: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        border: '1px solid black'
    },
    designationContainer: {
        margin: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        marginTop: '30px',
        minWidth: '350px',
        width: '100%',
        maxWidth: '500px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    displayForm: {
        background: 'white',
        borderRadius: '20px !important',
        margin: '10px 0',
        padding: '20px',
    },
    upperRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 0.5
    },
    formSpacer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    popupbox: {
        position: 'fixed',
        background: '#00000050',
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
    },
    box: {
        position: 'relative',
        width: '30%',
        margin: '0 auto',
        height: 'auto',
        maxHeight: '70vh',
        marginTop: 'calc(100vh - 85vh - 20px)',
        background: 'white',
        borderRadius: '4px',
        padding: '20px',
        border: '1px solid #999',
        overflow: 'auto',
        textAlign: 'center',
    },
    closeicon: {
        content: 'x',
        cursor: 'pointer',
        position: 'fixed',
        right: 'calc(35% - 30px)',
        top: 'calc(100vh - 85vh - 33px)',
        background: '#ededed',
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        lineHeight: '20px',
        textAlign: 'center',
        border: '1px solid #999',
        fontSize: '20px',
    }
}));
const mapStateToProps = state => {
    return {
        userDetails: state.auth.userDetails,
        tabIndexData: state.driver.tabIndexData,
        travellersLatestJourney: state.request.travellersLatestJourney,
        travellerUpcomingPreviousRides: state.request.travellerUpcomingPreviousRides,
        travellersAllPreviousJourney: state.request.travellersAllPreviousJourney,
        travellersAllUpcomingJourney: state.request.travellersAllUpcomingJourney,
        feedBackQueList: state.admin.feedBackQueList,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getTabIndex: (requestBody) => dispatch(ActionCreatorsDriver.getTabIndex(requestBody)),
        getTravellerUpcomingPreviousRidesData: (requestBody, date) => dispatch(ActionCreators.getTravellerUpcomingPreviousRidesData(requestBody, date)),
        getTravellerLatestJourneyData: (requestBody) => dispatch(ActionCreators.getTravellerLatestJourneyData(requestBody)),
        getTravellerAllPreviousJourneyData: (requestBody) => dispatch(ActionCreators.getTravellerAllPreviousJourneyData(requestBody)),
        getTravellerAllUpcomingJourneyData: (requestBody) => dispatch(ActionCreators.getTravellerAllUpcomingJourneyData(requestBody)),
        setStartJourneyData: (requestBody) => dispatch(ActionCreators.setStartJourneyData(requestBody)),
        setEndJourneyData: (requestBody) => dispatch(ActionCreators.setEndJourneyData(requestBody)),
        getFeedBackQueData: (requestBody) => dispatch(ActionCreatorsAdmin.getFeedBackQueData(requestBody)),
        setFeedBackQueData: (requestBody) => dispatch(ActionCreatorsAdmin.setFeedBackQueData(requestBody)),
        setPasswordData: (requestBody) => dispatch(ActionCreatorsAdmin.setPasswordData(requestBody)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestForRide)
