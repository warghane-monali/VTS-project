import React, {useState} from 'react';
import {Button, IconButton, Modal, Paper, Typography} from "@mui/material";
import moment from "moment";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import {makeStyles} from "@mui/styles";
import {useLocation, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const RideStatus = ({userDetails, sourceLocation, destinationLocation}) => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [requestRideData, setRequestRideData] = useState(location?.state);

    const goToMap = ( sourceLocationLat,sourceLocationLng, destinationLocationLat, destinationLocationLng)=> {
        let url = "https://www.google.com/maps/dir/?api=1";
        let origin = "&origin=" + sourceLocationLat + "," + sourceLocationLng;
        let destinationL = "&destination=" + destinationLocationLat + "," + destinationLocationLng;
        // let openMapUrl = new URL();
        window.open(url+origin+destinationL, '_blank');
    };

    return (
        <div className={classes.root}>
            <main className={classes.main}>
            <div sx={{ display: { xs: 'none', sm: 'block' }}} style={{flex:1, flexDirection:'column'}}>

            </div>
            <div style={{flexDirection:'column', justifyContent:'space-between', maxWidth:400, flex:1}}>
                <Typography variant='h6' component='div' style={{textAlign:'center', margin: 16}} >
                    {requestRideData?.requestStatus ==='PENDING' ? 'Pending Status':null}
                    {requestRideData?.requestStatus ==='APPROVED' ? 'Accepted Status':null}
                    {requestRideData?.requestStatus ==='REJECTED' ? 'Rejected Status':null}
                </Typography>
                <Paper style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width:'100%'}}>
                    <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width:'100%', padding:12}}>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <Box style={{display: 'flex', flexDirection: 'column', textAlign:"center"}}>
                                {requestRideData.journeyNo !== ''?
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Typography variant='subtitle2' component='h4' style={{marginTop: 4}}>
                                            Journey No.
                                        </Typography>
                                        <Typography variant='body-1' component='h4' style={{marginTop: 4}}>
                                            {requestRideData.journeyNo}
                                        </Typography>
                                    </div>:null}
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Typography variant='subtitle2' component='h4' style={{marginTop: 4}}>
                                        Trip Type
                                    </Typography>
                                    <Typography variant='body-1' component='div' style={{marginTop: 4}}>
                                        {requestRideData.oneWayOrRoundTrip==='OneWay'? 'One Way': 'Round Trip'}
                                    </Typography>
                                </div>

                                <Paper style={{padding:8, margin:4, cursor: 'pointer'}} elevation={4}
                                       onClick={()=>goToMap(requestRideData.sourceLat, requestRideData.sourceLong, requestRideData.destinationLat, requestRideData.destinationLong)}>
                                    <Typography variant='body-1' component='h4' style={{margin: 4}}>
                                        From
                                    </Typography>
                                    <Typography variant='subtitle2' component='div' style={{margin: 4, textDecoration: "underline", color:'blue'}}>
                                        {requestRideData.source}
                                    </Typography>
                                </Paper>
                                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', transform: "rotate(180deg)", alignSelf: 'center' }}>
                                    <ImportExportIcon  sx={{fontSize:40, color: requestRideData?.requestStatus ==='PENDING' ? '#f99935':
                                            requestRideData?.requestStatus ==='ONGOING' ? '#bc9800': requestRideData?.requestStatus ==='APPROVED' ? '#09984c':requestRideData?.requestStatus ==='REJECTED' ? '#f93125':'gray'}} />
                                </div>

                                <Paper style={{padding:8, margin:4, cursor: 'pointer'}} elevation={4}
                                       onClick={()=>goToMap(requestRideData.sourceLat, requestRideData.sourceLong, requestRideData.destinationLat, requestRideData.destinationLong)}>
                                    <Typography variant='body-2' component='h4' style={{margin: 4}}>
                                        To
                                    </Typography>
                                    <Typography variant='subtitle2' component='div' style={{margin: 4, textDecoration: "underline", color:'blue'}}>
                                        {requestRideData.destination}
                                    </Typography>
                                </Paper>
                            </Box>
                            <Box style={{display: 'flex', flexDirection: 'column', textAlign:"center", margin: 10}}>
                                <Typography variant='body-2' component='h4' style={{marginTop: 4}}>
                                    Reason
                                </Typography>
                                <Typography variant='subtitle2' component='div' style={{marginTop: 4}}>
                                    {requestRideData.reason}
                                </Typography>
                            </Box>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                                <div style={{display:'flex', flexDirection:'column', marginTop:16, textAlign:'left' }}>
                                    <Typography variant='body-2' component='div'>
                                        Start Date & Time
                                    </Typography>
                                    <Typography variant='subtitle2' component='div' style={{marginTop:8}}>
                                        {moment(requestRideData.startDateTime).format('DD-MMMM-YYYY hh:mm a')}
                                    </Typography>
                                </div>
                                <div style={{display:'flex', flexDirection:'column', marginTop:16, textAlign:'right',marginLeft:10}}>
                                    <Typography variant='body-2' component='div'>
                                        End Date & Time
                                    </Typography>
                                    <Typography variant='subtitle2' component='div' style={{marginTop:8}}>
                                        {moment(requestRideData.endDateTime).format('DD-MMMM-YYYY hh:mm a')}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Paper>
                {requestRideData.requestStatus !== 'PENDING'?<Paper className={classes.displayForm} style={{margin:'24px 0'}}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%', margin:'16px 0'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <img  style={{width:'80px'}}
                                      alt="React"
                                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU'
                                />
                            </div>
                            <div style={{display:'flex', flexDirection:'column', margin:'8px 0'}}>
                                <Typography variant='body-1' component='h4'>
                                    Driver Name
                                </Typography>
                                <Typography variant='body-2' component='div' style={{marginTop:8}}>
                                    {requestRideData.driverName}
                                </Typography>
                            </div>
                            <div style={{display:'flex', flexDirection:'column', margin:'8px 0'}}>
                                <Typography variant='body-1' component='h4'>
                                    Mobile No.
                                </Typography>
                                <Typography variant='body-2' component='div' style={{marginTop:8}}>
                                    {requestRideData.driverNo}
                                </Typography>
                            </div>
                        </div>
                        <div style={{display:'flex', flexDirection:'column',}}>
                            <div style={{display:'flex', flexDirection:'column', margin:'0 0' }}>
                                <Typography variant='body-1' component='h4' style={{margin:'8px 0' }}>
                                    Start OTP : {requestRideData.startOTP}
                                </Typography>
                                <Typography variant='body-1' component='h4' style={{margin:'8px 0' }}>
                                    End OTP : {requestRideData.endOTP}
                                </Typography>
                            </div>
                            <div style={{display:'flex', flexDirection:'column', margin:'12px 0'}}>
                                <Typography variant='body-1' component='h4'>
                                    Vehicle Type Name
                                </Typography>
                                <Typography variant='body-2' component='div' style={{marginTop:8}}>
                                    {requestRideData.vehicleName}
                                </Typography>
                            </div>
                            <div style={{display:'flex', flexDirection:'column', margin:'11px 0'}}>
                                <Typography variant='body-1' component='h4'>
                                    Vehicle NO.
                                </Typography>
                                <Typography variant='body-2' component='div' style={{marginTop:8}}>
                                    {requestRideData.vehicleNo}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Paper>:null}
                <Stack style={{width:'100%', marginTop:24}} direction="column" justifyContent="flex-start" alignItems="flex-start">
                    <div style={{ width:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row">
                                            Self
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {`${userDetails?.user.firstName}` +' '+ `${userDetails?.user.middleName?userDetails?.user.middleName:''}` +' '+ `${  userDetails?.user.lastName}`}
                                        </TableCell>
                                        <TableCell >
                                            <span>{`${userDetails.user.contactNo}`}</span>
                                        </TableCell>

                                    </TableRow>
                                    {requestRideData && requestRideData?.travellersDetails.map((traveller, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">

                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {traveller.name}
                                            </TableCell>
                                            <TableCell  component="th" scope="row" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                {traveller.number}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Stack>
                <Paper className={classes.form} style={{minWidth:'320px', margin: "16px 0"}}>
                    <Typography variant='h6' component='div' style={{textAlign:'center', margin: 5}} >
                        Status Details
                    </Typography>
                    {/*<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>*/}
                    {/*    <div>*/}
                    {/*        <Typography variant='h6' component='div' style={{textAlign:'center', margin: }}>Status Details</Typography>*/}
                    {/*    </div>*/}
                    {/*</Stack>*/}
                    {/*<hr/>*/}
                    <div className={classes.travellerItem}>
                        <p className={classes.itemLeftSection}>Date</p>
                        <p className={classes.itemLeftSection}>Request</p>
                    </div>
                    {requestRideData && requestRideData?.journeyStatus.map((traveller, index) => (
                        <div className={classes.travellerItem} key={index}>
                            <div className={classes.itemRightSection}> {moment(traveller.Date).format('DD-MMMM-YYYY hh:mm a')}</div>
                            <div className={classes.itemRightSection}>
                                {traveller?.Status==='ONGOING' &&
                                <Typography variant='h6' component='div' style={{textAlign:"center", color: '#bc9800'}}>
                                    {traveller?.Status}
                                </Typography>}
                                {traveller?.Status==='APPROVED' &&
                                <Typography variant='h6' component='div' style={{textAlign:"center", color: '#19f928'}}>
                                    {traveller?.Status}
                                </Typography>}
                                {traveller?.Status==='PENDING' &&
                                <Typography variant='h6' component='div' style={{textAlign:"center", color: '#f99935'}}>
                                    {traveller?.Status}
                                </Typography> }
                                {traveller?.Status==='REJECTED' &&
                                <Typography variant='h6' component='div' style={{textAlign:"center", color: '#f94928'}}>
                                    {traveller?.Status}
                                </Typography>}
                                {traveller?.Status==='CANCEL' &&
                                <Typography variant='h6' component='div' style={{textAlign:"center", color: '#f94928'}}>
                                    {traveller?.Status}
                                </Typography>}
                                {traveller?.Status==='STARTJPURNEY' &&
                                <Typography variant='h6' component='div' style={{textAlign:"center", color: '#3681f9'}}>
                                    {traveller?.Status}
                                </Typography>}
                                {traveller?.Status==='ENDJPURNEY' &&
                                <Typography variant='h6' component='div' style={{textAlign:"center", color: '#f95d9f'}}>
                                    {traveller?.Status}
                                </Typography>}
                            </div>
                        </div>))}
                </Paper>
                <Modal
                    className={classes.middlePosition}
                    open={isOpen}
                    onClose={e => {
                        e.preventDefault();
                        setIsOpen(false)
                    }}>
                    <Paper className={classes.form} style={{minWidth:'320px'}}>
                        <Stack direction="row" justifyContent="space-between"
                               alignItems="center" spacing={2}>
                            <Stack direction="column">
                                <Typography variant='h6' component='div'>Status Details</Typography>
                            </Stack>
                            <IconButton aria-label="delete" onClick={e => {
                                e.preventDefault();
                                setIsOpen(false)
                            }}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                        <hr/>
                        <div className={classes.travellerItem}>
                            <p className={classes.itemLeftSection}>Date</p>
                            <p className={classes.itemLeftSection}>Request</p>
                        </div>
                        {requestRideData && requestRideData?.journeyStatus.map((traveller, index) => (
                            <div className={classes.travellerItem} key={index}>
                                <div className={classes.itemRightSection}> {moment(traveller.Date).format('DD-MMMM-YYYY hh:mm a')}</div>
                                <div className={classes.itemRightSection}>  {traveller?.Status==='APPROVED'?
                                    <Typography variant='h6' component='div' style={{textAlign:"center", color: '#8ef976'}}>
                                        {traveller?.Status}
                                    </Typography>:null}
                                    {traveller?.Status==='PENDING'?
                                        <Typography variant='h6' component='div' style={{textAlign:"center", color: '#f99935'}}>
                                            {traveller?.Status}
                                        </Typography>
                                        :null}
                                    {traveller?.Status==='REJECTED'?
                                        <Typography variant='h6' component='div' style={{textAlign:"center", color: '#f94928'}}>
                                            {traveller?.Status}
                                        </Typography>:null}
                                    {traveller?.Status==='CANCEL'?
                                        <Typography variant='h6' component='div' style={{textAlign:"center", color: '#f94928'}}>
                                            {traveller?.Status}
                                        </Typography>:null}
                                    {traveller?.Status==='STARTJPURNEY'?
                                        <Typography variant='h6' component='div' style={{textAlign:"center", color: '#3681f9'}}>
                                            START JOURNEY
                                        </Typography>:null}
                                    {traveller?.Status==='ENDJPURNEY'?
                                        <Typography variant='h6' component='div' style={{textAlign:"center", color: '#f95d9f'}}>
                                            END JOURNEY
                                        </Typography>:null}
                                </div>
                            </div>))}
                    </Paper>
                </Modal>
            </div>
            <div sx={{ display: { xs: 'none', sm: 'block' }}} style={{flex:1, flexDirection:'column'}}>

            </div>
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
        width: '90%%',
        background: 'white',
        borderRadius: '20px !important',
        // margin: '20px',
        padding: '10px',
    },
    button: {
        background: '#A9B228 !important',
        color: 'white !important',
    },
    travellerItem: {
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemLeftSection: {
        fontWeight: 'bolder !important',
        color: 'black',
    },
    itemRightSection: {
        color: 'grey !important',
        display: 'flex',
        alignItems: 'center'
    },
    form: {
        padding: '20px',
        borderRadius: '20px !important',
        display: 'flex',
        flexDirection: 'column'
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
    travellerForm: {
        marginTop:'10px',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}));
const mapStateToProps = state => {
    return {
        userDetails: state.auth.userDetails,
        destinationLocation: state.trackLocation.destinationLocation,
        sourceLocation: state.trackLocation.sourceLocation,
    }
};
export default connect(mapStateToProps, null)(RideStatus)

