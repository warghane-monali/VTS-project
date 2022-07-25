import React, {useEffect, useState} from 'react'
import {
    Box,
    Button, Card,
    FormControl, IconButton,
    InputLabel,
    MenuItem, Modal,
    Paper, Rating,
    Select, TextField,
    Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import moment from "moment";
import {useNavigate, useLocation} from "react-router-dom";
import * as ActionCreators from "../../actions/requestAction";
import * as ActionCreatorsAdmin from "../../actions/adminAction";
import {connect} from "react-redux";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import {trackLocationSuccess} from "../../actions/trackLocationAction";
import {useDispatch, useSelector} from "react-redux";
import Alert from "@mui/material/Alert";
import EditIcon from '@mui/icons-material/Edit';
import {editDriverJourney, editVehicleJourney, getFeedBackQue} from "../../actions/adminAction";
import Switch from "@mui/material/Switch";


const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100%',
        background: '#fcfcfc'
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
        flexDirection: 'column',
        width: '100%',
        maxWidth:'400px',
        justifyContent: 'center',
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
        [theme.breakpoints.down(600)]: {
            width: '100%'
        },
    },
    lowerRow: {
        marginTop: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
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
        borderRadius: '10px !important',
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
        justifyContent: 'space-between'
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
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    acceptButton: {
        padding: '0.5rem 2rem !important',
        borderRadius: '10px !important',
        margin: '10px !important',
        color:'white !important',
        background: '#0a9421 !important',
        '&:hover': {
            background: 'white !important',
            color: '#0a9421 !important'
        }
    },
    rejectButton: {
        padding: '0.5rem 2rem !important',
        borderRadius: '10px !important',
        margin: '10px !important',
        color:'white !important',
        background: '#d12f0d !important',
        '&:hover': {
            background: 'white !important',
            color: '#d12f0d !important'
        }
    },
    centerPosition: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-around'
    },
}));

const RequestPermission = ({adminDetails, vehicleList, userList, getVehicleListData, getDriverUserListData, setAcceptStatusData,
                               getCarListData,  getDriverListData, setRejectCancelStatusData, setRejectStatusData,
                               editDriverJourney,
                               editVehicleJourney,  getFeedBackAnsData,
                               getFeedBackQueData,
                               feedBackQueList,
                               setFeedBackQueData,extendrequestallocatedriverlistData,DriverExtendList,requestStatusAdmin,DealocationdriverListData,extendrequestallocatevehiclelistData,VehicleExtendList,
                               DealocationvelicleListData,extendRequestApproveData}) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    let dispatch = useDispatch();
    const [requestDetails, setRequestDetails] = useState(location?.state);
    const [vehicle, setVehicle] = useState({});
    const [driverInfo, setDriverInfo] = useState( {firstName:  '' , contactNo: '', _id: ''} );
    const [carList, setCarList] = useState([]);
    const [driverList, setDriverList] = useState([]);
    const [driverNumber, setDriverNumber] = useState(driverInfo?.contactNo);
    const [isRejectPopUp, setIsRejectPopUp] = useState(false);
    const [rejectReasonOption, setRejectReasonOption] = useState('');
    const [rejectReason, setRejectReason] = useState('');
    const routeLocation = useLocation();
    const [locationData, setLocationData] = useState(routeLocation?.state);
    const [error, setError] = useState(false);
    const [openDriverChange, setOpenDriverChange] = useState(false);
    const [openVehicleType, setOpenVehicleType] = useState(false);
    const [openFeedBackList, setOpenFeedBackList] = useState(false);
    const [checked, setChecked] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [hover1, setHover1] = React.useState(-1);
    const [textValue, setTextValue] = React.useState('');
    const [feedBackAnsData, setFeedBackAnsData] = React.useState([]);
    const [driverRes,setdriverRes] = useState('');
    const [vehicleRes,setvehicleRes] = useState('');
    const [showData,setshowData]= useState(false)

    useEffect(() => {
        
        getvehicles();
        getdriverlist();
       
        // getRideInfo(requestDetails );
        getLocationInfo();
        console.log("status",requestDetails.requestStatus);
        console.log("status",requestDetails);
        getFeedBack();
        if(requestDetails.requestStatus === "EXTENDREQUEST")
        {
            
            allocatedriversdata();
            allocatevehicledata();
            setshowData(true)
        }
    }, []);

    console.log('------Request Details ------',requestDetails)

    // useEffect(() => {
    //     console.log("IN Use Effect")
    //      getFeedBack();
    //     // if(requestDetails.requestStatus === 'EXTENDREQUEST')
    //     // {
    //     //     allocatedriversdata();
    //     //     allocatevehicledata();
    //     // }
   // }, []);

   const getvehicles = async () => {
    const data = await getVehicleListData({
        startDateTime:requestDetails.startDateTime,
        sourceLat:requestDetails.sourceLat,
        sourceLong:requestDetails.sourceLong,
        endDateTime:requestDetails.endDateTime,
    });
    setCarList(data)
   }

   const getdriverlist = async () => {
    const data = await getDriverUserListData({
        startDateTime:requestDetails.startDateTime,
        sourceLat:requestDetails.sourceLat,
        sourceLong:requestDetails.sourceLong,
        endDateTime:requestDetails.endDateTime,
    })
    setDriverList(data)
   }

    const allocatedriversdata = async () => {
        console.log("In driver allocation")
        const res = await extendrequestallocatedriverlistData({
            driverId:requestDetails.driverId,
           extendRequestDate:requestDetails.extendRequestDate,
           endDateTime:requestDetails.endDateTime,
           journeyId:requestDetails._id,
        })
        console.log('End Time',requestDetails.endDateTime)
        setdriverRes(res)
    }
    console.log('Driver response',driverRes)

    const allocatevehicledata = async () => {
        console.log("In vehicle allocation")
        const res = await extendrequestallocatevehiclelistData({
            vehicleId:requestDetails.vehicleId,
           extendRequestDate:requestDetails.extendRequestDate,
           endDateTime:requestDetails.endDateTime,
           journeyId:requestDetails._id,
        })
        setvehicleRes(res)
    }
    console.log('vehicle response',vehicleRes)

    const handelAns = async () => {
        setChecked(!checked);
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
            "journeyId": requestDetails._id,
            "feedbackEntityNo": selectedProduct[0].feedbackEntityNo,
            "entityName": selectedProduct[0].entityName,
            "entityType": selectedProduct[0].entityType,
            "questions": newData
        }]

        setSelectedProduct(newArray)
        dispatch(getFeedBackQue(newArray));
    };


    const getFeedBack = async ()=>{
        const result = await getFeedBackAnsData(requestDetails._id);
        setFeedBackAnsData(result)
        // history.back()
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

    const getLocationInfo = ()=>{
        navigator.geolocation.getCurrentPosition(async function(position) {
            dispatch(trackLocationSuccess({lat: position.coords.latitude, lng: position.coords.longitude}));
        });
    };

    // const getRideInfo = async (requestDetail)=>{
    //         setDriverList(driverListData);
    //         setCarList(carListData);
    // };

    const onChangeDriverInfo =(value)=>{
        setDriverInfo(value);
        setDriverNumber(value.contactNo)
    };

    const onChangeVehicleInfo =(value)=>{
        setVehicle(value);
    };

    const acceptRequestData = async ()=>{
        if (
            driverInfo && driverInfo.firstName !==' ' && driverInfo && driverInfo.contactNo !=='' &&
            vehicle && vehicle?.vehicleId
        ) {


        const firstName = driverInfo?.firstName !== null ? driverInfo?.firstName : '';
        const middleName = driverInfo?.middleName !== null ? driverInfo?.middleName : '';
        const lastName = driverInfo?.lastName !== null ? driverInfo?.lastName : '';
        const fullName = firstName +' '+ middleName +' '+ lastName;
        const result = await setAcceptStatusData({
            journeyId: requestDetails._id,
            vehicleId: vehicle?.vehicleId,
            agencyName: vehicle?.agencyName,
            vehicleName: vehicle?.vehicleName,
            vehicleNo: vehicle?.vehicleNo,
            driverId: driverInfo._id,
            driverName: fullName,
            driverNo: driverInfo.contactNo,
            updatedBy: adminDetails?.user._id,
        });
        if(result){
            navigate('/admin/request-list',{state:'APPROVED'});
        }
        } else {
            setError(true);
        }
    };

    const reallocateRequestData = async () => {
        if( requestDetails.driverId !== null && vehicle && vehicle?.vehicleId ){
            const result = await setAcceptStatusData({
                journeyId: requestDetails._id,
                vehicleId: vehicle?.vehicleId,
                agencyName: vehicle?.agencyName,
                vehicleName: vehicle?.vehicleName,
                vehicleNo: vehicle?.vehicleNo,
                driverId: requestDetails.driverId,
                driverName: requestDetails.driverName,
                driverNo: requestDetails.contactNo,
                updatedBy: adminDetails?.user._id,
            });
            if(result){
                navigate('/admin/request-list',{state:'APPROVED'});
            }else {
                setError(true);
            }
        }
        else if( requestDetails.vehicleId !== null &&  driverInfo && driverInfo.firstName !==' ' && driverInfo && driverInfo.contactNo !==''  ){
            const firstName = driverInfo?.firstName !== null ? driverInfo?.firstName : '';
            const middleName = driverInfo?.middleName !== null ? driverInfo?.middleName : '';
            const lastName = driverInfo?.lastName !== null ? driverInfo?.lastName : '';
            const fullName = firstName +' '+ middleName +' '+ lastName;
            const result = await setAcceptStatusData({
                journeyId: requestDetails._id,
                vehicleId: requestDetails.vehicleId,
                agencyName: requestDetails.agencyName,
                vehicleName: requestDetails.vehicleName,
                vehicleNo: requestDetails.vehicleNo,
                driverId: driverInfo._id,
                driverName: fullName,
                driverNo: driverInfo.contactNo,
                updatedBy: adminDetails?.user._id,
            });
            if(result){
                navigate('/admin/request-list',{state:'APPROVED'});
            }else {
                setError(true);
            }
        }
        else {
            const firstName = driverInfo?.firstName !== null ? driverInfo?.firstName : '';
            const middleName = driverInfo?.middleName !== null ? driverInfo?.middleName : '';
            const lastName = driverInfo?.lastName !== null ? driverInfo?.lastName : '';
            const fullName = firstName +' '+ middleName +' '+ lastName;
            const result = await setAcceptStatusData({
                journeyId: requestDetails._id,
                vehicleId: vehicle?.vehicleId,
                agencyName: vehicle?.agencyName,
                vehicleName: vehicle?.vehicleName,
                vehicleNo: vehicle?.vehicleNo,
                driverId: driverInfo._id,
                driverName: fullName,
                driverNo: driverInfo.contactNo,
                updatedBy: adminDetails?.user._id,
            });
            if(result){
                navigate('/admin/request-list',{state:'APPROVED'});
            }else {
                setError(true);
            }
        }
    } 

    const extendAprroveRide = async () => {
        console.log("-------IN Extend Aprrove Ride-------",requestDetails.journeyStatus[1].Status)
        if(requestDetails.journeyStatus[2].Status !== 'ONGOING')
            {
                const result = await extendRequestApproveData({
                    requestStatus:requestDetails.journeyStatus[1].Status,
                    journeyId:requestDetails._id
                })
                if(result){
                    navigate('/admin/request-list',{state:requestDetails.journeyStatus[1].Status});
                }else{
                    setError(true);
                }
            }
        else 
            {
                const result = await extendRequestApproveData({
                    requestStatus:requestDetails.journeyStatus[2].Status,
                    journeyId:requestDetails._id
                })
                if(result){
                    navigate('/admin/request-list',{state:requestDetails.journeyStatus[2].Status});
                }else{
                    setError(true);
                }
            }
    }

    const rejectRequestDataPopUp = async ()=>{
        setIsRejectPopUp(true)
    };

    const rejectRequestData = async ()=>{
        const result = await setRejectStatusData({
            rejectReasonOption: rejectReasonOption,
            rejectReason: rejectReason,
            journeyId: requestDetails._id,
            requestStatus: 'REJECTED',
        });
        if(result){
            navigate('/admin/request-list',{state: 'REJECTED'});
        }
    };

    const changeDriverName = async ()=>{
        const firstName = driverInfo?.firstName !== null ? driverInfo?.firstName : '';
        const middleName = driverInfo?.middleName !== null ? driverInfo?.middleName : '';
        const lastName = driverInfo?.lastName !== null ? driverInfo?.lastName : '';
        const fullName = firstName +' '+ middleName +' '+ lastName;
        const result = await editDriverJourney({
            journeyId: requestDetails._id,
            driverId: driverInfo._id,
            driverName: fullName,
            driverNo: driverInfo.contactNo,
            updatedBy: adminDetails?.user._id,
        });
        setRequestDetails(result)
        setOpenDriverChange(false)
        console.log("----Driver chnaged details------",result)

    };

    const changeVehicleType = async ()=>{
        const result = await editVehicleJourney({
            journeyId: requestDetails._id,
            vehicleId: vehicle?.vehicleId,
            agencyName: vehicle?.agencyName,
            vehicleName: vehicle?.vehicleName,
            vehicleNo: vehicle?.vehicleNo,
            updatedBy: adminDetails?.user._id,
        });
        setRequestDetails(result)
        setOpenVehicleType(false)
        console.log(result)

    };

  

    const goToMap = ( sourceLocationLat,sourceLocationLng, destinationLocationLat, destinationLocationLng)=> {
        let url = "https://www.google.com/maps/dir/?api=1";
        let origin = "&origin=" + sourceLocationLat + "," + sourceLocationLng;
        let destinationL = "&destination=" + destinationLocationLat + "," + destinationLocationLng;
        // let openMapUrl = new URL();
        window.open(url+origin+destinationL, '_blank');
    };

    const openDriverNameChange =()=> {
        setOpenDriverChange(true)
    }

    const openVehicleTypeChange =()=> {
        setOpenVehicleType(true)
    }
    
    console.log('----Driver Extend List data------',DriverExtendList)
    console.log('----Driver List---',driverList)
    console.log('----car List----',carList)

    return (
        <div className={classes.root}>
            {/*<main className={classes.main}>*/}
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <Box sx={{ display: { xs: 'none', md: 'block' }}} style={{flex:1, flexDirection:'column'}}>{' '}</Box>
                    <div style={{flexDirection:'column', justifyContent:'space-between', flex:1, width:'100%'}}>
                        <Box sx={{display: 'flex', justifyContent: 'space-around'}} style={{margin:'20px 0', width:'100%'}}>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Typography variant='body-1' component='div' style={{textAlign:"center", color: requestDetails?.requestStatus ==='PENDING' ? '#f99935':'gray'}}>
                                    <CircleRoundedIcon  sx={{fontSize:12, color: requestDetails?.requestStatus ==='PENDING' ? '#f99935':'gray'}} /> Pending
                                </Typography>
                            </div>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Typography variant='body-1' component='div' style={{textAlign:"center", color: requestDetails?.requestStatus ==='APPROVED' ? '#09984c':'gray'}}>
                                    <CircleRoundedIcon sx={{fontSize:12, color: requestDetails?.requestStatus ==='APPROVED' ? '#09984c':'gray'}} /> Accepted
                                </Typography>
                            </div>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Typography variant='body-1' component='div' style={{textAlign:"center", color: requestDetails?.requestStatus ==='REJECTED' ? '#f93125':'gray'}}>
                                    <CircleRoundedIcon sx={{fontSize:12, color: requestDetails?.requestStatus ==='REJECTED' ? '#f93125':'gray'}} /> Rejected
                                </Typography>
                            </div>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-around'}} style={{margin:'20px 0', width:'100%'}}>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Typography variant='body-1' component='div' style={{textAlign:"center", color: requestDetails?.requestStatus ==='ONGOING' ? '#bc9800':'gray'}}>
                                    <CircleRoundedIcon  sx={{fontSize:12, color: requestDetails?.requestStatus ==='ONGOING' ? '#bc9800':'gray'}} /> On going
                                </Typography>
                            </div>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Typography variant='body-1' component='div' style={{textAlign:"center", color: requestDetails?.requestStatus ==='ENDJPURNEY' ? '#f95d9f':'gray'}}>
                                    <CircleRoundedIcon sx={{fontSize:12, color: requestDetails?.requestStatus ==='ENDJPURNEY' ? '#f95d9f':'gray'}} /> End Journey
                                </Typography>
                            </div>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Typography variant='body-1' component='div' style={{textAlign:"center", color: requestDetails?.requestStatus ==='CANCEL' ? '#f93125':'gray'}}>
                                    <CircleRoundedIcon sx={{fontSize:12, color: requestDetails?.requestStatus ==='CANCEL' ? '#f93125':'gray'}} /> Canceled
                                </Typography>
                            </div>
                        </Box>
                        {(requestDetails && (requestDetails.requestStatus !== '' || requestDetails.requestStatus !== null || true)) ?
                            <Paper className={classes.rightSection} elevation={4}>
                                <div className={classes.topicRow}>
                                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width:'100%',margin:8}} >
                                <Typography variant='body-1'  style={{marginRight:8,fontSize:14}} >
                                     Approved By :-
                                </Typography>
                                <Typography variant='subtitle-2' component='h4' style={{ fontSize:14 }}  >
                                    {requestDetails.headName}
                                </Typography>
                                </Box>
                                    <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width:'100%'}}>
                                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                            <Box style={{display: 'flex', flexDirection: 'column', textAlign:"center"}}>
                                                {requestDetails.journeyNo !== ''?
                                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                        <Typography variant='subtitle2' component='h4' style={{marginTop: 4}}>
                                                            Journey No.
                                                        </Typography>
                                                        <Typography variant='body-1' component='h4' style={{marginTop: 4}}>
                                                            {requestDetails.journeyNo}
                                                        </Typography>
                                                    </div>:null}
                                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                    <Typography variant='subtitle2' component='h4' style={{marginTop: 4}}>
                                                        Trip Type
                                                    </Typography>
                                                    <Typography variant='body-1' component='div' style={{marginTop: 4}}>
                                                        {requestDetails.oneWayOrRoundTrip==='OneWay'? 'One Way': 'Round Trip'}
                                                    </Typography>
                                                </div>

                                                <Paper style={{padding:8, margin:4, cursor: 'pointer'}} elevation={4}
                                                       onClick={()=>goToMap(requestDetails.sourceLat, requestDetails.sourceLong, requestDetails.destinationLat, requestDetails.destinationLong)}>
                                                    <Typography variant='body-1' component='h4' style={{margin: 4}}>
                                                        From
                                                    </Typography>
                                                    <Typography variant='subtitle2' component='div' style={{margin: 4, textDecoration: "underline", color:'blue'}}>
                                                        {requestDetails.source}
                                                    </Typography>
                                                </Paper>
                                                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', transform: "rotate(180deg)", alignSelf: 'center' }}>
                                                    <ImportExportIcon  sx={{fontSize:40, color: requestDetails?.requestStatus ==='PENDING' ? '#f99935': requestDetails?.requestStatus ==='ONGOING' ? '#bc9800':requestDetails?.requestStatus ==='APPROVED' ? '#09984c':requestDetails?.requestStatus ==='REJECTED' ? '#f93125':'gray'}} />
                                                </div>

                                                <Paper style={{padding:8, margin:4, cursor: 'pointer'}} elevation={4}
                                                       onClick={()=>goToMap(requestDetails.sourceLat, requestDetails.sourceLong, requestDetails.destinationLat, requestDetails.destinationLong)}>
                                                    <Typography variant='body-2' component='h4' style={{margin: 4}}>
                                                        To
                                                    </Typography>
                                                    <Typography variant='subtitle2' component='div' style={{margin: 4, textDecoration: "underline", color:'blue'}}>
                                                        {requestDetails.destination}
                                                    </Typography>
                                                </Paper>
                                            </Box>
                                            <Box style={{display: 'flex', flexDirection: 'column', textAlign:"center", margin: 10}}>
                                                <Typography variant='body-2' component='h4' style={{marginTop: 4}}>
                                                    Reason
                                                </Typography>
                                                <Typography variant='subtitle2' component='div'  style={{marginTop: 4, textAlign:"center", wordBreak: 'break-word'}}>
                                                    {requestDetails.reason}
                                                </Typography>
                                            </Box>
                                            <Box style={ { display:'flex',flexDirection:'row' } }>
                                                <Box style={ { display:'flex', flexDirection:'column',marginTop:10,marginRight:120 ,textAlign:"left", } }>
                                                <Typography variant='body-2' component='h4' style={{marginTop: 4}}>
                                                    Start Date and Time
                                                </Typography>
                                                <Typography variant='subtitle2' component='div'  style={{marginTop: 4, textAlign:"left", wordBreak: 'break-word'}}>
                                                    { moment(requestDetails.startDateTime).format('DD MMM YYYY hh:mm:a') }
                                                </Typography>
                                                </Box>
                                                <Box style={ { display:'flex', flexDirection:'column',margin:10,textAlign:"right" } }>
                                                <Typography variant='body-2' component='h4' style={{marginTop: 4}}>
                                                    End Date and Time
                                                </Typography>
                                                <Typography variant='subtitle2' component='div'  style={{marginTop: 4, textAlign:"right", wordBreak: 'break-word'}}>
                                                    {moment(requestDetails.endDateTime).format('DD MMM YYYY hh:mm:a')}
                                                </Typography>
                                                </Box>
                                            </Box>
                                        </div>
                                    </Box>
                                </div>

                                {(requestDetails && (requestDetails.requestStatus==='APPROVED'))?
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', margin: '16px 0'}}>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <div style={{display: 'flex', flexDirection: 'column', margin: '12px 0'}}>
                                                <Typography variant='body-1' component='h4'>
                                                    Driver Name <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        openDriverNameChange()
                                                    }}>
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>
                                                </Typography>
                                                <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                    {requestDetails.driverName}
                                                </Typography>
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'column', margin: '12px 0'}}>
                                                <Typography variant='body-1' component='h4'>
                                                    Mobile No.
                                                </Typography>
                                                <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                    {requestDetails.driverNo}
                                                </Typography>
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'column', margin: '12px 0'}}>
                                                <Typography variant='body-1' component='h4'>
                                                    Company Name
                                                </Typography>
                                                <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                    {requestDetails.agencyName}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column',}}>
                                            <div style={{display: 'flex', flexDirection: 'column', margin: '16px 0'}}>
                                                <Typography variant='body-1' component='h4'>
                                                    Vehicle Type Name <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                       openVehicleTypeChange()
                                                    }}>
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>
                                                </Typography>
                                                <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                    {requestDetails.vehicleName}
                                                </Typography>
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'column', margin: '16px 0'}}>
                                                <Typography variant='body-1' component='h4'>
                                                    Vehicle NO.
                                                </Typography>
                                                <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                    {requestDetails.vehicleNo}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                    :null}
                                {(requestDetails && (requestDetails.requestStatus==='ENDJPURNEY'))?
                                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', margin: '16px 0'}}>
                                        <div style={{display: 'flex', flexDirection: 'row', margin: '16px 0'}}>
                                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                                <img style={{width: '100%'}}
                                                     alt="React"
                                                     src={requestDetails.startOdoMeterImg}
                                                />
                                            </div>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'row', margin: '16px 0'}}>
                                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                                <img style={{width: '100%'}}
                                                     alt="React"
                                                     src={requestDetails.endOdoMeterImg}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    :null}
                            </Paper>
                            : null}
                        {(requestDetails && (requestDetails.requestStatus==='STARTJPURNEY'))?
                            <Paper className={classes.rightSection} elevation={4}>
                                <div className={classes.topicRow}>
                                    <div>
                                        <Typography variant='body-1' component='div'
                                                    style={{textAlign: "center", marginTop: 16, marginBottom: 24}}>
                                            Journey Status
                                        </Typography>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <Typography variant='body-1' component='h4'>
                                                Start Meter Reading
                                            </Typography>
                                            {requestDetails.startOdoMeterImg!==''?<img style={{width: '180px'}}
                                                                                       alt="React"
                                                                                       src={requestDetails.startOdoMeterImg}
                                            />:null}
                                            <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                {requestDetails.startOdoMeter}
                                            </Typography>
                                            <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                {requestDetails.startDateTime}
                                            </Typography>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <Typography variant='body-1' component='h4'>
                                                End Meter Reading
                                            </Typography>
                                            {requestDetails.endOdoMeterImg!==''?<img style={{width: '180px'}}
                                                 alt="React"
                                                 src={requestDetails.endOdoMeterImg}
                                            />:null}
                                            <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                {requestDetails.endOdoMeter}
                                            </Typography>
                                            <Typography variant='body-2' component='div' style={{marginTop: 8}}>
                                                {requestDetails.endDateTime}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>

                            </Paper>
                            :null}
                        {requestDetails && requestDetails.travellersDetails.length>0?
                            <Paper className={classes.rightSection} elevation={4}>
                            <TableContainer>
                                <Table size="small" aria-label="a dense table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {requestDetails.selfTravellerName}
                                            </TableCell>
                                            <TableCell  component="th" scope="row" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                {requestDetails.selfTravellerNo}
                                            </TableCell>
                                            <TableCell  component="th" scope="row" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                               Booked By
                                            </TableCell>
                                        </TableRow>
                                        {requestDetails && requestDetails.travellersDetails.map((traveller, index) => (
                                            <TableRow key={index}>
                                               { requestDetails.selfTravellerName != traveller.name ?
                                                    <>
                                                        <TableCell component="th" scope="row">
                                                            {traveller.name}
                                                        </TableCell>
                                                         <TableCell  component="th" scope="row" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                             {traveller.number}
                                                        </TableCell>
                                                        <TableCell  component="th" scope="row" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                            {' '}
                                                        </TableCell> 
                                                    </>
                                                    : null
                                               }
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>:null}
                        {(requestDetails && (requestDetails.requestStatus==='EXTENDREQUEST'))?
                            <Paper className={classes.rightSection} elevation={4}>
                            <TableContainer>
                                <Table size="small" aria-label="a dense table">
                                    <TableBody>
                                        {/* <TableRow>
                                            <TableCell component="th" scope="row">
                                           {requestDetails.driverName}
                                            </TableCell>
                                            <TableCell  component="th" scope="row" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                              
                                            </TableCell>
                                            <TableCell  component="th" scope="row" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                              
                                            </TableCell>
                                        </TableRow> */}
                                         <div><h4>Allocate Driver List:</h4></div>
                                        { showData || driverRes.msg === 'Not allocated any journey' ?
                                        DriverExtendList?.length > 0 && DriverExtendList.map((traveller, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {traveller.selfTravellerName}
                                                </TableCell>
                                                <TableCell  component="th" scope="row">
                                                    {moment(traveller.startDateTime).format('YYYY-MMM-DD')}
                                                </TableCell>
                                                <TableCell  component="th" scope="row" >
                                                {moment(traveller.endDateTime).format('YYYY-MMM-DD')}
                                                </TableCell>
                                                <TableCell  component="th" scope="row" >
                                                <div style={{ margin: 4, marginTop: -4.5, padding: 2 }}>
                                                 <Button variant="contained" onClick={() => { DealocationdriverListData(traveller._id);console.log("IN driver Deallocation"); allocatedriversdata(); } } >Deallocate Driver</Button>
                                                 </div>

                                                </TableCell>
                                            </TableRow>
                                        ))
                                         : 'No Journey Allocated to driver'
                                        }
                                        {
                                            driverRes.msg === 'Not allocated any journey' ? 'No Journey Allocated to driver' : ''
                                        }
                                    <div><h4>Allocate Vehicle List:</h4></div>
                                    {   showData || vehicleRes.msg === 'Not allocated any journey' ?
                                     VehicleExtendList?.length > 0 && VehicleExtendList.map((traveller, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {traveller.vehicleName}
                                                </TableCell>
                                                <TableCell  component="th" scope="row">
                                                    {moment(traveller.startDateTime).format('YYYY-MMM-DD')}
                                                </TableCell>
                                                <TableCell  component="th" scope="row" >
                                                {moment(traveller.endDateTime).format('YYYY-MMM-DD')}
                                                </TableCell>
                                                <TableCell  component="th" scope="row" >
                                                <div style={{ margin: 4, marginTop: -4.5, padding: 2 }}>
                                                <Button variant="contained" onClick={ () => { DealocationvelicleListData(traveller._id);
                                                    console.log("IN Vehicle Deallocation");allocatevehicledata(); } } >Deallocate Vehicle</Button>
                                                 </div>

                                                </TableCell>
                                            </TableRow>
                                        ))
                                        :  'Not Allocated any journey to vehicle'
                                    }
                                        {
                                            vehicleRes.msg === 'Not allocated any journey' ? 'No Journey Allocated to driver' : ''
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {
                                        requestDetails.requestStatus === 'EXTENDREQUEST' &&  vehicleRes.msg === 'Not allocated any journey' && driverRes.msg === 'Not allocated any journey' ?
                                        <Button variant='contained' style={ { marginTop:20 } } onClick={ () => extendAprroveRide() } >
                                            Confirm Extention
                                        </Button>
                            : null }
                        </Paper>:null}


                        {(requestDetails && (requestDetails.requestStatus === 'PENDING') &&  (moment().diff(requestDetails.startDateTime, 'days') <= 1) ) ?
                        <Paper className={classes.rightSection} style={{width:'80%'}} elevation={4}>
                            <Typography variant='body-1' component='div' style={{textAlign: "center", marginTop: 16, marginBottom: 24}}>
                                Accept Ride
                            </Typography>
                            <div className={classes.inputContainer}>
                                {  carList && carList.length>0 &&<FormControl style={{width:'80%', margin:16}}>
                                    <InputLabel id="selected-cars">Select Cars</InputLabel>
                                    <Select
                                        labelId="selected-cars"
                                        label="Select Vehicle"
                                        className={classes.textFields}
                                        value={vehicle}
                                        defaultValue={vehicle}
                                        onChange={e => onChangeVehicleInfo(e.target.value)}>
                                        {
                                            carList && carList.map(vehicle => (
                                                <MenuItem key={vehicle._id} value={vehicle}>{vehicle.vehicleName} / {vehicle.vehicleNo} / {vehicle.capacity}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>}
                                <FormControl style={{width:'80%', margin:16}}>
                                    <InputLabel id="selected-cars">Select driver</InputLabel>
                                    <Select
                                        labelId="selected-driver"
                                        label="Select Driver"
                                        className={classes.textFields}
                                        value={driverInfo}
                                        defaultValue={driverInfo}
                                        onChange={e => onChangeDriverInfo(e.target.value)}>
                                        {
                                            driverList.length > 0 && driverList?.map(driver => (
                                                <MenuItem key={driver._id} value={driver}>{driver.firstName +' '+ driver.middleName +' '+ driver.lastName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <TextField
                                    error={driverNumber && driverNumber.length<=9 }
                                    inputProps={{maxLength: 10 , pattern: "[0-9]{10,11}" }}
                                    helperText={driverNumber && (driverNumber.length<=9 || driverNumber.match(/[^0-9]/g) ? 'Please enter valid mobile No.' : '')}
                                    style={{width:'80%', margin:16}}
                                           placeholder="Driver Mobile no."
                                           className={classes.textFields}
                                           value={driverNumber}
                                />
                            </div>
                            {error? <Alert
                                severity="warning"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setError(false);
                                        }}>
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                Please fill request form properly.
                            </Alert>:null}
                            <Box className={classes.centerPosition}>
                                <Button className={classes.acceptButton} onClick={() => acceptRequestData()}>
                                    Accept
                                </Button>
                                <Button className={classes.rejectButton} onClick={() => rejectRequestDataPopUp()}>
                                    Reject
                                </Button>
                            </Box>
                        </Paper>
                            : null}
                        {(requestDetails && (requestDetails.requestStatus === 'EXTENDREQUESTDEALLOCATE') &&  (moment().diff(requestDetails.startDateTime, 'days') <= 1) ) ?
                        <Paper className={classes.rightSection} style={{width:'80%'}} elevation={4}>
                            <Typography variant='body-1' component='div' style={{textAlign: "center", marginTop: 16, marginBottom: 24}}>
                                Accept Ride
                            </Typography>
                            <div className={classes.inputContainer}>
                                { requestDetails.vehicleId === null ?
                                 carList && carList.length>0 &&
                                 <FormControl style={{width:'80%', margin:16}}>
                                    <InputLabel id="selected-cars">Select Cars</InputLabel>
                                    <Select
                                        labelId="selected-cars"
                                        label="Select Vehicle"
                                        className={classes.textFields}
                                        value={vehicle}
                                        defaultValue={vehicle}
                                        onChange={e => onChangeVehicleInfo(e.target.value)}>
                                        {
                                            carList && carList.map(vehicle => (
                                                <MenuItem key={vehicle._id} value={vehicle}>{vehicle.vehicleName} / {vehicle.vehicleNo} / {vehicle.capacity}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                : ''
                                }
                                { requestDetails.driverId === null ? 
                                <>
                                     <FormControl style={{width:'80%', margin:16}}>
                                <InputLabel id="selected-cars">Select driver</InputLabel>
                                <Select
                                    labelId="selected-driver"
                                    label="Select Driver"
                                    className={classes.textFields}
                                    value={driverInfo}
                                    defaultValue={driverInfo}
                                    onChange={e => onChangeDriverInfo(e.target.value)}>
                                    {
                                        driverList && driverList?.map(driver => (
                                            <MenuItem key={driver._id} value={driver}>{driver.firstName +' '+ driver.middleName +' '+ driver.lastName}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <TextField
                                error={driverNumber && driverNumber.length<=9 }
                                inputProps={{maxLength: 10 , pattern: "[0-9]{10,11}" }}
                                helperText={driverNumber && (driverNumber.length<=9 || driverNumber.match(/[^0-9]/g) ? 'Please enter valid mobile No.' : '')}
                                style={{width:'80%', margin:16}}
                                       placeholder="Driver Mobile no."
                                       className={classes.textFields}
                                       value={driverNumber}
                            />
                                </>
                                : ''
                                }
                            </div>
                            {error? <Alert
                                severity="warning"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setError(false);
                                        }}>
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                Please fill request form properly.
                            </Alert>:null}
                            <Box className={classes.centerPosition}>
                                <Button className={classes.acceptButton} onClick={() => reallocateRequestData()}>
                                    Accept
                                </Button>
                                <Button className={classes.rejectButton} onClick={() => rejectRequestDataPopUp()}>
                                    Reject
                                </Button>
                            </Box>
                        </Paper>
                            : null}
                        {requestDetails && (requestDetails.requestStatus === 'APPROVED') &&
                            <Box style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',cursor: 'pointer'}}>
                                <Button className={classes.rejectButton} onClick={() => rejectRequestDataPopUp()}>
                                    Reject
                                </Button>
                            </Box>
                        }
                        {requestDetails.requestStatus === 'FEEDBACKCOMPLETE'&&<Stack style={{width:'100%', marginTop:24}} direction="column" justifyContent="flex-start" alignItems="flex-start">
                            <div style={{ width:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                <TableContainer component={Paper}>
                                    <Table size="small" aria-label="a dense table">
                                        <TableBody>
                                            {feedBackAnsData && feedBackAnsData[0]?.questions.map((questions, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {questions.question}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {questions.questionType}
                                                    </TableCell>
                                                    <TableCell  component="th" scope="row" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                        {questions.answere}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Stack>}
                        {requestDetails && (requestDetails.requestStatus === 'ENDJPURNEY') &&
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => openFeedBackQue()}>
                                    Feedback
                                </Button>
                            </div>
                        }
                    </div>

                    <Box sx={{ display: { xs: 'none', md: 'block' }}} style={{flex:1, flexDirection:'column'}}>
                        {' '}
                    </Box>
                </Box>
            {/*</main>*/}
            <Modal
                className={classes.middlePosition}
                style={{minWidth:'320px', padding:'12px'}}
                open={isRejectPopUp}
                onClose={e => {
                    e.preventDefault();
                    setIsRejectPopUp(false)
                }}>
                <Paper className={classes.form} style={{minWidth:'320px', padding:'12px'}}>
                    <Stack direction="row" justifyContent="space-between"
                           alignItems="center" spacing={2}>
                        <Stack direction="column">
                            <Typography variant='h6' component='div'>Reason For Reject</Typography>
                        </Stack>
                        <IconButton aria-label="delete" onClick={e => {
                            e.preventDefault();
                            setIsRejectPopUp(false)
                        }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <hr/>
                    <div style={{flex:1, flexDirection:'column'}}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Reason</FormLabel>
                            <RadioGroup value={rejectReasonOption}
                                        onChange={(e)=>setRejectReasonOption(e.target.value)}
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female" name="radio-buttons-group">
                                <FormControlLabel value="Vehicle Not available" control={<Radio />} label="Vehicle not available" />
                                <FormControlLabel value="Driver Not available" control={<Radio />} label="Driver not available" />
                                <FormControlLabel value="Service issue" control={<Radio />} label="Service issue" />
                            </RadioGroup>
                        </FormControl>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={5}
                            placeholder="Reason"
                            style={{ width: '100%' }}
                            value={rejectReason}
                            onChange={(e)=>setRejectReason(e.target.value)}
                        />

                        <Button className={classes.rejectButton} onClick={() => rejectRequestData()}>
                            Reject
                        </Button>
                    </div>
                </Paper>
            </Modal>
            <Modal
                className={classes.middlePosition}
                style={{minWidth:'320px', padding:'12px'}}
                open={openDriverChange}
                onClose={e => {
                    e.preventDefault();
                    setOpenDriverChange(false)
                }}>
                <Paper className={classes.form} style={{minWidth:'320px', padding:'12px'}}>
                    <Stack direction="row" justifyContent="space-between"
                           alignItems="center" spacing={2}>
                        <Stack direction="column">
                            <Typography variant='h6' component='div'>Change driver</Typography>
                        </Stack>
                        <IconButton aria-label="delete" onClick={e => {
                            e.preventDefault();
                            setOpenDriverChange(false)
                        }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <hr/>
                    <div style={{flex:1, flexDirection:'column'}}>
                        <div className={classes.inputContainer}>
                            <FormControl style={{width:'80%', margin:16}}>
                                <InputLabel id="selected-cars">Select driver</InputLabel>
                                <Select
                                    labelId="selected-driver"
                                    label="Select Driver"
                                    className={classes.textFields}
                                    value={driverInfo}
                                    defaultValue={driverInfo}
                                    onChange={e => onChangeDriverInfo(e.target.value)}>
                                    {
                                        driverList.length > 0 && driverList?.map(driver => (
                                            <MenuItem key={driver._id} value={driver}>{driver.firstName +' '+ driver.middleName +' '+ driver.lastName}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <TextField
                                error={driverNumber && driverNumber.length<=9 }
                                inputProps={{maxLength: 10 , pattern: "[0-9]{10,11}" }}
                                helperText={driverNumber && (driverNumber.length<=9 || driverNumber.match(/[^0-9]/g) ? 'Please enter valid mobile No.' : '')}
                                style={{width:'80%', margin:16}}
                                placeholder="Driver Mobile no."
                                className={classes.textFields}
                                value={driverNumber}
                            />
                        </div>
                        <Box style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',cursor: 'pointer'}}>
                            <Button variant="contained" onClick={() => changeDriverName()}>
                                Submit
                            </Button>
                        </Box>
                    </div>
                </Paper>
            </Modal>
            <Modal
                className={classes.middlePosition}
                open={openVehicleType}
                onClose={e => {
                    e.preventDefault();
                    setOpenVehicleType(false)
                }}>
                <Paper className={classes.form} style={{minWidth:'320px'}}>
                    <Stack direction="row" justifyContent="space-between"
                           alignItems="center" spacing={2}>
                        <Stack direction="column">
                            <Typography variant='h6' component='div'>Change Vehicle</Typography>
                        </Stack>
                        <IconButton aria-label="delete" onClick={e => {
                            e.preventDefault();
                            setOpenVehicleType(false)
                        }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <hr/>
                    <div style={{flex:1, flexDirection:'column'}}>
                        <div className={classes.inputContainer}>
                            {  carList && carList.length>0 &&<FormControl style={{width:'80%', margin:16}}>
                                <InputLabel id="selected-cars">Select Cars</InputLabel>
                                <Select
                                    labelId="selected-cars"
                                    label="Select Vehicle"
                                    className={classes.textFields}
                                    value={vehicle}
                                    defaultValue={vehicle}
                                    onChange={e => onChangeVehicleInfo(e.target.value)}>
                                    {
                                        carList && carList.map(vehicle => (
                                            <MenuItem key={vehicle._id} value={vehicle}>{vehicle.vehicleName} / {vehicle.vehicleNo} / {vehicle.capacity}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>}

                        </div>
                        <Box style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',cursor: 'pointer'}}>
                            <Button variant="contained" onClick={() => changeVehicleType()}>
                                submit
                            </Button>
                        </Box>
                    </div>
                </Paper>
            </Modal>
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
        </div>
    )
};

const mapStateToProps = state => {
    return {
        adminDetails: state.admin.adminDetails,
        loading: state.request.loading,
        userList: state.admin.driverUserList,
        driverList: state.admin.driverList,
        carList: state.admin.carList,
        vehicleList: state.request.vehicleList,
        error: state.request.error,
        feedBackQueList: state.admin.feedBackQueList,
        requestStatusAdmin:state.admin.requestStatusAdmin,
        DriverExtendList:state.request.DriverExtendList,
        VehicleExtendList:state.request.VehicleExtendList,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getVehicleListData: (data) => dispatch(ActionCreators.getVehicleListData(data)),
        getDriverUserListData: (requestBody) => dispatch(ActionCreatorsAdmin.getDriverUserListData(requestBody)),
        setAcceptStatusData: (requestBody) => dispatch(ActionCreatorsAdmin.setAcceptStatusData(requestBody)),
        setRejectCancelStatusData: (requestBody) => dispatch(ActionCreatorsAdmin.setRejectCancelStatusData(requestBody)),
        setRejectStatusData: (requestBody) => dispatch(ActionCreatorsAdmin.setRejectStatusData(requestBody)),
        getDriverListData: (requestBody) => dispatch(ActionCreatorsAdmin.getDriverListData(requestBody)),
        getCarListData: (requestBody) => dispatch(ActionCreatorsAdmin.getCarListData(requestBody)),
        editDriverJourney: (requestBody) => dispatch(ActionCreatorsAdmin.editDriverJourney(requestBody)),
        editVehicleJourney: (requestBody) => dispatch(ActionCreatorsAdmin.editVehicleJourney(requestBody)),
        getFeedBackAnsData: (requestBody) => dispatch(ActionCreatorsAdmin.getFeedBackAnsData(requestBody)),
        getFeedBackQueData: (requestBody) => dispatch(ActionCreatorsAdmin.getFeedBackQueData(requestBody)),
        setFeedBackQueData: (requestBody) => dispatch(ActionCreatorsAdmin.setFeedBackQueData(requestBody)),
        flushRequestState: () => dispatch(ActionCreators.flushRequestState()),
        extendrequestallocatedriverlistData: (requestBody) => dispatch(ActionCreators.extendrequestallocatedriverlistData(requestBody)),
        DealocationdriverListData: (data) => dispatch(ActionCreators.DealocationdriverListData(data)),
        DealocationvelicleListData : (data) => dispatch(ActionCreators.DealocationvelicleListData(data)),
        extendrequestallocatevehiclelistData: (requestBody) => dispatch(ActionCreators.extendrequestallocatevehiclelistData(requestBody)),
        extendRequestApproveData: (requestBody) => dispatch(ActionCreators.extendRequestApproveData(requestBody))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestPermission)
