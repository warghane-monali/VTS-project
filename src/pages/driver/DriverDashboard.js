import React, {useEffect, useState} from 'react'
import {AppBar, Box, Button, IconButton, InputBase, Modal, Paper, Typography} from '@mui/material'
import { makeStyles } from '@mui/styles'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import * as ActionCreatorsDriver from "../../actions/driverAction";
import {connect} from "react-redux";
import moment from "moment";
import {useLocation, useNavigate} from "react-router-dom";
import S3 from "react-aws-s3";
import Compressor from 'compressorjs';
import CircularProgress from "@mui/material/CircularProgress";
import * as ActionCreators from "../../actions/authActions";
import * as ActionCreator from "../../actions/adminAction";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import TabPanel from "@mui/lab/TabPanel";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100%',
        background: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    appbar: {
        alignItems: 'center',
        padding: '5px',
        background: '#0c1572 !important',
    },
    appbarMenuIcon: {
        color: 'white !important',
        fontSize: '40px !important',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    main: {
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    card: {
        padding: '20px',
        borderRadius: '20px !important',
        margin: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardList: {
        minWidth:'320px',
        background: 'white',
        borderRadius: '20px !important',
        margin: '10px 0',
        padding: '20px',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    smallCardContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    bigIcon: {
        fontSize: '4rem !important',
        marginLeft: '15px'
    },
    smallIcon: {
        fontSize: '2rem !important'
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
        flex:0.33,
        height: '43px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
        margin:4,
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
        width: '85%',
        background: 'white',
        borderRadius: '20px !important',
        margin: '30px',
        padding: '20px',
    },
    formSpacer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        left: '20%',
        bottom: '10px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    input: {
        width: '70%',
        background: 'white',
        marginTop: '20px',
        border: '1px solid black',
        borderRadius: '10px',
        padding: '5px 15px'
    },
    button: {
        marginTop: '20px !important',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '80% !important',
        padding: '10px 20px',
        margin: '10px 20px',
        borderRadius: '10px !important',
        [theme.breakpoints.down(600)]: {
            width: '100%'
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
    absentButton: {
        margin: '30px 0 !important',
        background: '#af330c !important',
        borderRadius: '30px !important',
        '&:hover': {
            background: 'white !important',
            color: '#af330c !important'
        },
    },
}));

const DriverDashboard = ({getTabIndex, tabIndexData, changeLang, getDriverAllUpcomingRidesData, driverAllUpcomingRides,
                             getDriverLatestJourneyData, userDetails, upcomingPreviousRides, driversLatestJourney,
                             setEndJourneyData, setStartJourneyData, getUpcomingPreviousRidesAdminData, userLogout}) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isEndOpen, setIsEndOpen] = useState(false);
    const [isAbsentOpen, setIsAbsentOpen] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [otp, setOtp] = useState('');
    const [odoMeter, setOdoMeter] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [selectedFileUrl, setSelectedFileUrl] = useState();
    const [selected, setSelected] = useState(tabIndexData?(tabIndexData):0);
    const [selectedUpDate, setSelectedUpDate] = useState(0);
    const [selectedDate, setSelectedDate] = useState(0);
    const [value, setValue] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [filter, setFilter] = useState(false);
    const [selectedTab, setSelectedTab] = useState(null);

    useEffect(() => {
        getDriverLatestRides();
        getUserPreviousRides();
        getUserUpcomingRides();
        if(tabIndexData===1){
            getRequestDataByDate(moment().format('YYYY-MM-DD'))
        } else if(tabIndexData===2){
            getRequestDataByDate(moment().subtract(1,'days').format('YYYY-MM-DD'))
        }
    }, []);

    const getUserPreviousRides = async () => {
        await getUpcomingPreviousRidesAdminData(moment().subtract(1,'days').format('YYYY-MM-DD'));
    };

    const getUserUpcomingRides = async () => {
        await getDriverAllUpcomingRidesData(userDetails && userDetails.user && userDetails.user._id);
    };

    const getRequestDataByDate = (date, newValue)=> {
        if (newValue==='filter'){
            setFilter(true);
            setTabValue(3);
        }
        if(selected===2 || newValue===2){
            getUpcomingPreviousRidesAdminData(moment(date).format('YYYY-MM-DD'))
        } else if (selected===1 || newValue===1){
            getUpcomingPreviousRidesAdminData(moment(date).format('YYYY-MM-DD'))
        }
    };

    const getChangeDateUpcomingRides = (selection)=> {
        setSelectedUpDate(selection);
        setTabValue(selection);
        if(selection===0){
            getDriverAllUpcomingRidesData(userDetails && userDetails.user && userDetails.user._id)
        }else if(selection===1){
            getUpcomingPreviousRidesAdminData(moment().add(0,'days').format('YYYY-MM-DD'))
        }else if (selection===2){
            getUpcomingPreviousRidesAdminData(moment().add(1,'days').format('YYYY-MM-DD'))
        }
    };

    const getChangeDatePreviousRides = (selection)=> {
        setTabValue(selection);
        setSelectedDate(selection);
        if(selection===0){
            getUpcomingPreviousRidesAdminData( moment().subtract(1,'days').format('YYYY-MM-DD'))
        }else if(selection===1){
            getUpcomingPreviousRidesAdminData( moment().subtract(2,'days').format('YYYY-MM-DD'))
        }else if (selection===2){
            getUpcomingPreviousRidesAdminData( moment().subtract(3,'days').format('YYYY-MM-DD'))
        }
    };


    const getDriverLatestRides = async () => {
        const data = await getDriverLatestJourneyData(userDetails.user._id);
    };

    const changeHandler = (event, type) => {
        setSelectedFile(event.target.files[0]);
        uploadImageToS3(event, type)
    };

    const setStartJourney = () => {
        setIsOpen(false);
        setStartJourneyData({
            userId:userDetails && userDetails.user && userDetails.user._id,
            journeyId: driversLatestJourney._id,
            startOTP:otp,
            startOdoMeter:odoMeter,
            startOdoMeterImg:selectedFileUrl
        });
        setOtp('');
        setOdoMeter('');
        setSelectedFileUrl(null);
    };

    const setEndJourney = () => {
        setIsEndOpen(false);
        setEndJourneyData({
            journeyId: driversLatestJourney._id,
            endOTP:otp,
            endOdoMeter:odoMeter,
            endOdoMeterImg:selectedFileUrl
        });
        setOtp('');
        setOdoMeter('');
        setSelectedFileUrl(null);
    };

    const uploadImageToS3 = (event, type) => {
        setSpinner(true);
        const config = {
            bucketName: process.env.REACT_APP_BUCKET_NAME,
            dirName: process.env.REACT_APP_DIR_NAME+"/odoMeter/"+type+'_'+driversLatestJourney._id,
            region: process.env.REACT_APP_REGION,
            accessKeyId: process.env.REACT_APP_ACCESS_ID,
            secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
            s3Url:"https://foxberry-images.s3.amazonaws.com"
        };

        let fileInput = false;
        const image=event.target.files[0];
        console.log("image data before compression-------------- ",image);
        if (event.target.files[0]) {
            fileInput = true;
        }
        if (fileInput) {
            new Compressor(image, {
                quality: 0.9,
                success: (compressedResult) => {
                    let getTimeStamp = new Date().getTime();
                    let newFileName = getTimeStamp+"_"+driversLatestJourney._id;
                    console.log("------- filename image upload --------",newFileName);

                    const ReactS3Client = new S3(config);

                    ReactS3Client.uploadFile(compressedResult, newFileName).then((res) => {
                        setSpinner(false);
                        setSelectedFileUrl(res.location);
                        console.log(res);
                        console.log("image uploaded successfully!!!!");
                    }).catch(err =>{
                        setSpinner(false);
                        console.error(err);
                    });
                },
            });
            console.log("--------------- Upload image -----------");
        }
    };

    const renderList = (item, index) => {
        return <Paper key={index} className={classes.cardList} onClick={() => navigate('/driver/ride-status', { state: item})}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between',}}>
                <div className={classes.upperRow}
                     style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography  variant='subtitle2' style={{textAlign: "center"}}>
                        {item.source}
                    </Typography>
                    <Typography variant='body-2' component='span' style={{textAlign: "center", marginTop: 10}}>
                        {moment(item.startDateTime).format('DD MMM YYYY hh:mm:a')}
                    </Typography>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: "rotate(180deg)", alignSelf: 'center' }}>
                    <ImportExportIcon  sx={{fontSize:40, color: item?.requestStatus ==='PENDING' ? '#f99935': item?.requestStatus ==='APPROVED' ? '#09984c':item?.requestStatus ==='REJECTED' ? '#f93125':
                            item?.requestStatus ==='CANCEL'?'#f93125': item?.requestStatus ==='ONGOING'?'#bc9800': item?.requestStatus ==='STARTJPURNEY'?'#3681f9' :item?.requestStatus ==='ENDJPURNEY'?'#f95d9f':''}} />
                </div>
                <div className={classes.lowerRow}
                     style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
                    <Typography variant='subtitle2' style={{textAlign: "center"}}>
                        {item.destination}
                    </Typography>
                    <Typography variant='body-2' component='span' style={{textAlign: "center", marginTop: 10}}>
                        {moment(item.endDateTime).format('DD MMM YYYY hh:mm:a')}
                    </Typography>

                </div>
            </div>
        </Paper>
    };

    const goToMap = ( sourceLocationLat,sourceLocationLng, destinationLocationLat, destinationLocationLng)=> {
        let url = "https://www.google.com/maps/dir/?api=1";
        let origin = "&origin=" + sourceLocationLat + "," + sourceLocationLng;
        let destinationL = "&destination=" + destinationLocationLat + "," + destinationLocationLng;
        // let openMapUrl = new URL();
        window.open(url+origin+destinationL, '_blank');
    };

    return (
        <>
        {selected===0?<div className={classes.root}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <Typography variant='h5' component='div' style={{textAlign:"center", margin:"5%"}}>
                  {changeLang?'आगामी सवारी':"Upcoming Rides"}
                </Typography>
            </div>
            {driversLatestJourney? <main className={classes.main}>
                <Box sx={{ display: { xs: 'none', sm: 'block' }}} style={{flex:1, flexDirection:'column'}}>

                </Box>
                <div style={{flexDirection:'column', justifyContent:'space-between', minWidth:320, flex:1}}>
                    {(driversLatestJourney.message) ? <>
                            <Typography variant='h6' component='div' style={{textAlign:'center', margin: 16}} >
                                {driversLatestJourney?.message}
                            </Typography>
                        </>:
                        <>
                        <Box sx={{display: 'flex', justifyContent: 'space-around'}} style={{margin:'20px 0', width:'100%'}}>
                            {/*<div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>*/}
                            {/*    <Typography variant='body-1' component='div' style={{textAlign:"center", color: driversLatestJourney?.requestStatus ==='PENDING' ? '#f99935':'gray'}}>*/}
                            {/*        <CircleRoundedIcon  sx={{fontSize:12, color: driversLatestJourney?.requestStatus ==='PENDING' ? '#f99935':'gray'}} /> Pending*/}
                            {/*    </Typography>*/}
                            {/*</div>*/}
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Typography variant='body-1' component='div' style={{textAlign:"center", color: driversLatestJourney?.requestStatus ==='APPROVED' ? '#09984c':'gray'}}>
                                    <CircleRoundedIcon sx={{fontSize:12, color: driversLatestJourney?.requestStatus ==='APPROVED' ? '#09984c':'gray'}} />
                                    {changeLang?'स्वीकृत':"Accepted"}
                                </Typography>
                            </div>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Typography variant='body-1' component='div' style={{textAlign:"center", color: driversLatestJourney?.requestStatus ==='ONGOING' ? '#bc9800':'gray'}}>
                                    <CircleRoundedIcon sx={{fontSize:12, color: driversLatestJourney?.requestStatus ==='ONGOING' ? '#bc9800':'gray'}} />
                                    {changeLang?'चालू आहे':"Ongoing"}
                                </Typography>
                            </div>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Typography variant='body-1' component='div' style={{textAlign:"center", color: driversLatestJourney?.requestStatus ==='ENDJPURNEY' ? '#f95d9f':'gray'}}>
                                    <CircleRoundedIcon sx={{fontSize:12, color: driversLatestJourney?.requestStatus ==='ENDJPURNEY' ? '#f95d9f':'gray'}} />
                                    {changeLang?'प्रवास समाप्त करा':" End Journey"}
                                </Typography>
                            </div>
                            {/*<div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>*/}
                            {/*    <Typography variant='body-1' component='div' style={{textAlign:"center", color: driversLatestJourney?.requestStatus ==='REJECTED' ? '#f93125':'gray'}}>*/}
                            {/*        <CircleRoundedIcon sx={{fontSize:12, color: driversLatestJourney?.requestStatus ==='REJECTED' ? '#f93125':'gray'}} /> Rejected*/}
                            {/*    </Typography>*/}
                            {/*</div>*/}
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-around'}} style={{margin:'20px 0', width:'100%'}}>
                            {/*<div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>*/}
                            {/*    <Typography variant='body-1' component='div' style={{textAlign:"center", color: driversLatestJourney?.requestStatus ==='STARTJPURNEY' ? '#3681F9':'gray'}}>*/}
                            {/*        <CircleRoundedIcon  sx={{fontSize:12, color: driversLatestJourney?.requestStatus ==='STARTJPURNEY' ? '#3681F9':'gray'}} />*/}
                            {/*        {changeLang?'प्रवासाला सुरुवात करा':" Start Journey"}*/}
                            {/*    </Typography>*/}
                            {/*</div>*/}

                            {/*<div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>*/}
                            {/*    <Typography variant='body-1' component='div' style={{textAlign:"center", color: driversLatestJourney?.requestStatus ==='CANCEL' ? '#f93125':'gray'}}>*/}
                            {/*        <CircleRoundedIcon sx={{fontSize:12, color: driversLatestJourney?.requestStatus ==='CANCEL' ? '#f93125':'gray'}} /> Cancel*/}
                            {/*    </Typography>*/}
                            {/*</div>*/}
                        </Box>
                        <Typography variant='h6' component='div' style={{textAlign:'center', margin: 16}} >
                            {driversLatestJourney?.requestStatus ==='PENDING' ? changeLang?'प्रलंबित':"Pending Status":null}
                            {driversLatestJourney?.requestStatus ==='APPROVED' ? changeLang?'स्वीकृत':"Accepted Status":null}
                            {driversLatestJourney?.requestStatus ==='REJECTED' ? changeLang?'नाकारले':"Rejected Status":null}
                        </Typography>
                        <Paper style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin:12}}>
                            <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', padding:12}}>
                                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                        <Box style={{display: 'flex', flexDirection: 'column', textAlign:"center"}}>
                                            {driversLatestJourney.journeyNo !== ''?
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Typography variant='subtitle2' component='h4' style={{marginTop: 4}}>
                                                    {changeLang?'प्रवास क्र.':"Journey No."}
                                                </Typography>
                                                <Typography variant='body-1' component='h4' style={{marginTop: 4}}>
                                                    {driversLatestJourney.journeyNo}
                                                </Typography>
                                            </div>:null}
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Typography variant='subtitle2' component='h4' style={{marginTop: 4}}>
                                                {changeLang?'सहलीचा प्रकार':"  Trip Type"}
                                            </Typography>
                                            <Typography variant='body-1' component='div' style={{marginTop: 4}}>
                                                {driversLatestJourney.oneWayOrRoundTrip==='OneWay'? 'One Way': 'Round Trip'}
                                            </Typography>
                                        </div>
                                            <Paper style={{padding:8, margin:4, cursor: 'pointer'}} elevation={4}
                                                   onClick={()=>goToMap(driversLatestJourney.sourceLat, driversLatestJourney.sourceLong, driversLatestJourney.destinationLat, driversLatestJourney.destinationLong)}>
                                                <Typography variant='body-1' component='h4' style={{margin: 4}}>
                                                    {changeLang?'सहलीचा पासून':"  From"}
                                                </Typography>
                                                <Typography variant='subtitle2' component='div' style={{margin: 4, textDecoration: "underline", color:'blue'}}>
                                                    {driversLatestJourney.source}
                                                </Typography>
                                            </Paper>
                                            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', transform: "rotate(180deg)", alignSelf: 'center' }}>
                                                <ImportExportIcon  sx={{fontSize:40, color: driversLatestJourney?.requestStatus ==='PENDING' ? '#f99935': driversLatestJourney?.requestStatus ==='APPROVED' ? '#09984c':driversLatestJourney?.requestStatus ==='ONGOING' ? '#bc9800':driversLatestJourney?.requestStatus ==='REJECTED' ? '#f93125':'gray'}} />
                                            </div>

                                            <Paper style={{padding:8, margin:4, cursor: 'pointer'}} elevation={4}
                                                   onClick={()=>goToMap(driversLatestJourney.sourceLat, driversLatestJourney.sourceLong, driversLatestJourney.destinationLat, driversLatestJourney.destinationLong)}>
                                                <Typography variant='body-2' component='h4' style={{margin: 4}}>
                                                    {changeLang?'सहलीचा ला':"To"}
                                                </Typography>
                                                <Typography variant='subtitle2' component='div' style={{margin: 4, textDecoration: "underline", color:'blue'}}>
                                                    {driversLatestJourney.destination}
                                                </Typography>
                                            </Paper>
                                        </Box>
                                        <Box style={{display: 'flex', flexDirection: 'column', textAlign:"center", margin: 10}}>
                                            <Typography variant='body-2' component='h4' style={{marginTop: 4}}>
                                                {changeLang?'कारण':"   Reason"}
                                            </Typography>
                                            <Typography variant='subtitle2' component='div'  style={{marginTop: 4, textAlign:"center", wordBreak: 'break-word'}}>
                                                {driversLatestJourney.reason}
                                            </Typography>
                                        </Box>
                                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                                            <div style={{display:'flex', flexDirection:'column', marginTop:16, textAlign:'left' }}>
                                                <Typography variant='body-2' component='div'>
                                                    {changeLang?'प्रारंभ तारीख आणि वेळ':"Start Date & Time"}
                                                </Typography>
                                                <Typography variant='subtitle2' component='div' style={{marginTop:8}}>
                                                    {moment(driversLatestJourney.startDateTime).format('DD/MM/YYYY hh:mm a')}
                                                </Typography>
                                            </div>
                                            <div style={{display:'flex', flexDirection:'column', marginTop:16, textAlign:'right'}}>
                                                <Typography variant='body-2' component='div'>
                                                    {changeLang?'समाप्तीची तारीख आणि वेळ':"End Date & Time"}
                                                </Typography>
                                                <Typography variant='subtitle2' component='div' style={{marginTop:8}}>
                                                    {moment(driversLatestJourney.endDateTime).format('DD/MM/YYYY hh:mm a')}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                        </Paper>
                    </>}
                    {(driversLatestJourney.requestStatus==='APPROVED') ?
                        <>
                            <Box className={classes.middlePosition}>
                                <Button variant="contained"
                                        className={classes.button}
                                        onClick={e => {
                                            e.preventDefault();
                                            setIsOpen(true)
                                        }}>

                                    {changeLang?'प्रवास सुरू करा':"  Start Journey"}
                                </Button>
                            </Box>
                        </>
                        :null}
                    {(driversLatestJourney.requestStatus==='ONGOING')?
                        <>
                            <Box className={classes.middlePosition}>
                                <Button variant="contained" className={classes.button} onClick={e => {e.preventDefault();setIsEndOpen(true)}}>

                                    {changeLang?'प्रवास समाप्त करा':" End Journey"}
                                </Button>
                            </Box>
                        </>
                        :null}
                        <div style={{height:100}}></div>
                    <Paper>
                        <Modal
                            className={classes.middlePosition}
                            open={isOpen}
                            onClose={e => {
                                e.preventDefault();
                                setIsOpen(false)
                            }}>
                            <Paper className={classes.modal}>
                                <Stack direction="row" justifyContent="space-between"
                                       alignItems="center" spacing={2}>
                                    <Stack direction="column">
                                        <Typography variant='h6' component='div'> {changeLang?'प्रवास सुरू करा':"  Start Journey"}</Typography>
                                    </Stack>
                                    <IconButton aria-label="delete" onClick={e => {
                                        e.preventDefault();
                                        setIsOpen(false)
                                    }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                                <Box className={classes.middlePosition}>
                                    <InputBase
                                        type='text'
                                        placeholder='OTP'
                                        className={classes.input}
                                        value={otp}
                                        onChange={e => setOtp(e.target.value)}
                                    />
                                </Box><Box className={classes.middlePosition}>
                                <InputBase
                                    type='text'
                                    placeholder='Meter Reading / मीटर रीडिंग'
                                    className={classes.input}
                                    value={odoMeter}
                                    onChange={e => setOdoMeter(e.target.value)}
                                />
                            </Box>
                                <Box className={classes.middlePosition}>
                                    <Typography variant='h6' component='div'>{changeLang?'पमीटर प्रतिमा अपलोड करा':"Upload meter image"}</Typography>
                                    <InputBase capture
                                               type='file'
                                               placeholder='ODO Image'
                                               className={classes.input}
                                               onChange={(event)=>changeHandler(event, "SJ")}
                                    />
                                </Box>

                                <Box className={classes.middlePosition}>
                                    {spinner?<CircularProgress color="success" />:
                                        <Button variant="contained" className={classes.button} onClick={e => {
                                            e.preventDefault();
                                            setStartJourney()
                                        }}>
                                            {changeLang?'प्रवास सुरू करा':"  Start Journey"}
                                        </Button>}
                                </Box>
                            </Paper>
                        </Modal>
                        <Modal
                            className={classes.middlePosition}
                            open={isEndOpen}
                            onClose={e => {
                                e.preventDefault();
                                setIsEndOpen(false)
                            }}>
                            <Paper className={classes.modal}>
                                <Stack direction="row" justifyContent="space-between"
                                       alignItems="center" spacing={2}>
                                    <Stack direction="column">
                                        <Typography variant='h6' component='div'> {changeLang?'प्रवास समाप्त करा':" End Journey"}</Typography>
                                    </Stack>
                                    <IconButton aria-label="delete" onClick={e => {
                                        e.preventDefault();
                                        setIsEndOpen(false)
                                    }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                                <Box className={classes.middlePosition}>
                                    <InputBase
                                        type='text'
                                        placeholder='OTP'
                                        className={classes.input}
                                        value={otp}
                                        onChange={e => setOtp(e.target.value)}
                                    />
                                </Box><Box className={classes.middlePosition}>
                                <InputBase
                                    type='text'
                                    placeholder='Meter Reading / मीटर रीडिंग'
                                    className={classes.input}
                                    value={odoMeter}
                                    onChange={e => setOdoMeter(e.target.value)}
                                />
                            </Box>
                                <Box className={classes.middlePosition}>
                                    <Typography variant='h6' component='div'>{changeLang?'पमीटर प्रतिमा अपलोड करा':"Upload meter image"}</Typography>
                                    <InputBase capture
                                               type='file'
                                               placeholder='ODO Image'
                                               className={classes.input}
                                               onChange={(event)=>changeHandler(event, "EJ")}
                                    />
                                </Box>
                                <Box className={classes.middlePosition}>
                                    {spinner?<CircularProgress color="success" />:
                                        <Button variant="contained" className={classes.button} onClick={e => {
                                            e.preventDefault();
                                            setEndJourney()
                                        }}>
                                            {changeLang?'प्रवास समाप्त करा':" End Journey"}
                                        </Button>}
                                </Box>
                            </Paper>
                        </Modal>
                        <Modal
                            className={classes.middlePosition}
                            open={isAbsentOpen}
                            onClose={e => {
                                e.preventDefault();
                                setIsAbsentOpen(false)
                            }}>
                            <Paper className={classes.modal}>
                                <Typography variant='h4' component='div' className={classes.middlePosition}>
                                    Absent
                                    <CancelRoundedIcon
                                        className={classes.closeIcon}
                                        onClick={e => {
                                            e.preventDefault();
                                            setIsAbsentOpen(false)
                                        }}
                                    />
                                </Typography>
                                <Box className={classes.middlePosition}>
                                    <InputBase
                                        type='text'
                                        placeholder='Reason'
                                        className={classes.input}
                                    />
                                </Box>
                                <Box className={classes.middlePosition}>
                                    <Button className={classes.button}>
                                        Submit
                                        {changeLang?'समाप्तीची तारीख आणि वेळ':"Submit"}
                                    </Button>
                                </Box>
                            </Paper>
                        </Modal>
                    </Paper>
                </div>
                <Box sx={{ display: { xs: 'none', sm: 'block' }}} style={{flex:1, flexDirection:'column'}}>

                </Box>
            </main>:null}
        </div>:null}
        {selected===2?<div className={classes.root}>
            <main className={classes.main}>
                <TabContext value={tabValue.toString()} >
                    <TabList onChange={(e, value) => {
                                 setSelectedTab(Number(value));
                                 getChangeDatePreviousRides(Number(value));
                                 setFilter(false);
                             }}>
                        <Tab style={{minWidth:filter?75:115, padding: '12px 8px'}} label={moment().subtract(1, 'days').format('DD-MMM')} value="0"/>
                        <Tab style={{minWidth:filter?75:115, padding: '12px 8px'}} label={moment().subtract(2, 'days').format('DD-MMM')} value="1"/>
                        <Tab style={{minWidth:filter?75:115, padding: '12px 8px'}} label={moment().subtract(3, 'days').format('DD-MMM')} value="2"/>
                        { filter && value?<Tab style={{minWidth: 115, padding: '12px 8px'}} label={moment(value && value.toString()).format('DD-MMM-YYYY')} value="3"/>:null}
                        <IconButton onClick={e => {
                            e.preventDefault();
                            setIsOpen(pState => !pState)
                        }}>
                            <DateRangeRoundedIcon color="primary" className={classes.calendarIcon} style={{width: 24, height: 24}}/>
                        </IconButton>
                    </TabList>
                    <TabPanel value="0">
                        {upcomingPreviousRides && upcomingPreviousRides.length > 0 ?<div style={{width: "100%",  height:"100vh"}}>
                            {upcomingPreviousRides.map((item, index)=>{
                                return renderList(item, index)
                            })}
                        </div>:null}
                    </TabPanel>
                    <TabPanel value="1">
                        {upcomingPreviousRides && upcomingPreviousRides.length > 0 ?<div style={{width: "100%",  height:"100vh"}}>
                            {upcomingPreviousRides.map((item, index)=>{
                                return renderList(item, index)
                            })}
                        </div>:null}
                    </TabPanel>
                    <TabPanel value="2">
                            {upcomingPreviousRides && upcomingPreviousRides.length > 0 ?<div style={{width: "100%",  height:"100vh"}}>
                                { upcomingPreviousRides.map((item, index)=>{
                                    return renderList(item, index)
                                })}
                            </div>:null}
                    </TabPanel>
                    {filter?<TabPanel style={{width: '95%',  padding:12}} value="3">
                        {upcomingPreviousRides && upcomingPreviousRides.length > 0 ? upcomingPreviousRides.map((item, index) => {
                            return renderList(item, index)
                        }):null}
                    </TabPanel>:null}
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
                            variant='h4' component='div' align='center'>
                            Select Date
                        </Typography>
                        <div style={{margin:10}}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    renderInput={(props) => <TextField  className={classes.textFields} {...props} />}
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
                        <div style={{margin:10, display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'}}>
                            <Button variant="contained" onClick={e => {
                                e.preventDefault();
                                setIsOpen(pState => !pState);
                                getRequestDataByDate(value, 'filter')
                            }}>Submit</Button>
                        </div>

                    </Paper>
                </Modal>
            </main>
        </div>:null}
        {selected===1?<div className={classes.root}>
            <main className={classes.main}>
                <TabContext value={tabValue.toString()}>
                    <TabList
                        onChange={(e, value) => {
                            setSelectedTab(Number(value));
                            getChangeDateUpcomingRides(Number(value));
                            setFilter(false);
                        }}>
                        <Tab style={{minWidth: filter?75:115}} label={changeLang?'सर्व सवारी':"All Rides"} value="0"/>
                        <Tab style={{minWidth: filter?75:115}} label={ moment().add(0, 'days').format('DD-MMM')} value="1"/>
                        <Tab style={{minWidth: filter?75:115}} label={ moment().add(1, 'days').format('DD-MMM')} value="2"/>
                        {filter && value?<Tab style={{minWidth: 115, padding: '12px 8px'}} label={moment(value && value.toString()).format('DD-MMM-YYYY')} value="3"/>:null}
                        <IconButton onClick={e => {
                            e.preventDefault();
                            setIsOpen(pState => !pState)
                        }}>
                            <DateRangeRoundedIcon color="primary" className={classes.calendarIcon}
                                                  style={{width: 24, height: 24}}/>
                        </IconButton>
                    </TabList>
                    <TabPanel value="0">
                        {driverAllUpcomingRides && driverAllUpcomingRides.length > 0  ?<div style={{width: "100%",  height:"100vh"}}>
                            {driverAllUpcomingRides.map((item, index)=>{
                                return renderList(item, index)
                            })}
                        </div>:null}
                    </TabPanel>
                    <TabPanel value="1">
                        {upcomingPreviousRides && upcomingPreviousRides.length > 0 ? <div style={{width: "100%",  height:"100vh"}}>
                            {upcomingPreviousRides.map((item, index)=>{
                                return renderList(item, index)
                            })}
                        </div>:null}
                    </TabPanel>
                    <TabPanel value="2">
                        {upcomingPreviousRides && upcomingPreviousRides.length > 0 ? <div style={{width: "100%",  height:"100vh"}}>
                            { upcomingPreviousRides.map((item, index)=>{
                                return renderList(item, index)
                            })}
                        </div>:null}
                    </TabPanel>
                    { filter?<TabPanel style={{width: '95%',  padding:12}} value="3">
                        {upcomingPreviousRides && upcomingPreviousRides.length > 0 ? upcomingPreviousRides.map((item, index) => {
                            return renderList(item, index)
                        }) : null}
                    </TabPanel>:null}
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
                        <div style={{margin:10}}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    renderInput={(props) => <TextField  className={classes.textFields} {...props} />}
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
                        <div style={{margin:10, display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'}}>
                            <Button variant="contained" onClick={e => {
                                e.preventDefault();
                                setIsOpen(pState => !pState);
                                getRequestDataByDate(value, 'filter')
                            }}>Submit</Button>
                        </div>
                    </Paper>
                </Modal>
            </main>
        </div>:null}
            <AppBar className={classes.footer}>
            <Box sx={{width: {xs:500, sm:786,md:1080, xl:'100%'}}}>
                <BottomNavigation
                    showLabels
                    value={selected}
                    onChange={(event, newValue) => {
                        setFilter(false);
                        setSelected(newValue);
                        getTabIndex(newValue);
                        if(newValue===1){
                            getRequestDataByDate(moment().format('YYYY-MM-DD'), newValue)
                        } else if(newValue===2){
                            getRequestDataByDate(moment().subtract(1,'days').format('YYYY-MM-DD'), newValue)
                        }
                    }}>
                    <BottomNavigationAction label={changeLang?'आगामी सवारी':"Upcoming Ride"} icon={<DashboardIcon />} />
                    <BottomNavigationAction label={changeLang?'भविष्यातील राइड':"Future Ride"} icon={<DirectionsCarIcon />} />
                    {/*<BottomNavigationAction label="Previous Ride" icon={<DirectionsCarIcon />} />*/}
                </BottomNavigation>
                <div>
                    <Typography variant='body-2' component='div' style={{color:'white', textAlign: "center", marginTop: 8, marginBottom: 8}}>
                        Powered By <a style={{color:'white', textAlign: "center", marginTop: 8, marginBottom: 8}} href="https://www.foxberry.in/" target="_blank"> Foxberry Technologies </a> &copy; {new Date().getFullYear()}
                    </Typography>
                </div>
            </Box>
        </AppBar>
        </>
    )
};
const mapStateToProps = state => {
    return {
        userDetails: state.auth.userDetails,
        driversLatestJourney: state.driver.driversLatestJourney,
        tabIndexData: state.driver.tabIndexData,
        driverAllUpcomingRides: state.driver.driverAllUpcomingRides,
        upcomingPreviousRides: state.admin.upcomingPreviousRides,
        loading: state.request.loading,
        changeLang: state.trackLocation.changeLang,
        error: state.request.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUpcomingPreviousRidesAdminData: (requestBody) => dispatch(ActionCreator.getUpcomingPreviousRidesAdminData(requestBody)),
        getDriverLatestJourneyData: (requestBody) => dispatch(ActionCreatorsDriver.getDriverLatestJourneyData(requestBody)),
        getDriverAllUpcomingRidesData: (requestBody) => dispatch(ActionCreatorsDriver.getDriverAllUpcomingRidesData(requestBody)),
        getTabIndex: (requestBody) => dispatch(ActionCreatorsDriver.getTabIndex(requestBody)),
        setStartJourneyData: (requestBody) => dispatch(ActionCreatorsDriver.setStartJourneyData(requestBody)),
        setEndJourneyData: (requestBody) => dispatch(ActionCreatorsDriver.setEndJourneyData(requestBody)),
        userLogout: () => dispatch(ActionCreators.userLogout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DriverDashboard)
