import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Button, IconButton, Modal, Paper, Typography} from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import moment from "moment";
import Stack from "@mui/material/Stack";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CloseIcon from "@mui/icons-material/Close";
import {makeStyles} from "@mui/styles";
import {connect} from "react-redux";

const DriverRideStatus = ({changeLang, sourceLocation, destinationLocation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [requestDetails, setRequestDetails] = useState(location?.state);


    const goToMap = ( sourceLocationLat,sourceLocationLng, destinationLocationLat, destinationLocationLng)=> {
        let url = "https://www.google.com/maps/dir/?api=1";
        let origin = "&origin=" + sourceLocationLat + "," + sourceLocationLng;
        let destinationL = "&destination=" + destinationLocationLat + "," + destinationLocationLng;
        // let openMapUrl = new URL();
        window.open(url+origin+destinationL, '_blank');
    };

    return (
        <Box className={classes.root}>
            <main className={classes.main}>
                <Box sx={{display: 'flex', flexDirection: 'row'}} style={{width:'100%'}}>

                </Box>
                <div style={{flexDirection:'column', justifyContent:'space-between', maxWidth:400, flex:1}}>
                    <Typography variant='h6' component='div' style={{textAlign:'center', margin: 16}} >
                        {requestDetails?.requestStatus ==='PENDING' ? changeLang?'प्रलंबित':"Pending Status":null}
                        {requestDetails?.requestStatus ==='APPROVED' ? changeLang?'स्वीकृत':"Accepted Status":null}
                        {requestDetails?.requestStatus ==='ONGOING' ? changeLang?'चालू आहे':"Ongoing Status":null}
                        {requestDetails?.requestStatus ==='REJECTED' ? changeLang?'नाकारले':"Rejected Status":null}
                    </Typography>
                    <Paper className={classes.form} style={{minWidth:'320px', margin: "16px 0"}}>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                <Box style={{display: 'flex', flexDirection: 'column', textAlign:"center"}}>
                                    {requestDetails.journeyNo !== ''?
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Typography variant='subtitle2' component='h4' style={{marginTop: 4}}>
                                                {changeLang?'प्रवास क्र.':"Journey No."}
                                            </Typography>
                                            <Typography variant='body-1' component='h4' style={{marginTop: 4}}>
                                                {requestDetails.journeyNo}
                                            </Typography>
                                        </div>:null}
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Typography variant='subtitle2' component='h4' style={{marginTop: 4}}>
                                            {changeLang?'सहलीचा प्रकार':"  Trip Type"}
                                        </Typography>
                                        <Typography variant='body-1' component='div' style={{marginTop: 4}}>
                                            {requestDetails.oneWayOrRoundTrip==='OneWay'? 'One Way': 'Round Trip'}
                                        </Typography>
                                    </div>
                                    <Paper style={{padding:8, margin:4, cursor: 'pointer'}} elevation={4}
                                           onClick={()=>goToMap(requestDetails.sourceLat, requestDetails.sourceLong, requestDetails.destinationLat, requestDetails.destinationLong)}>
                                        <Typography variant='body-1' component='h4' style={{margin: 4}}>
                                            {changeLang?'सहलीचा पासून':"  From"}
                                        </Typography>
                                        <Typography variant='subtitle2' component='div' style={{margin: 4, textDecoration: "underline", color:'blue'}}>
                                            {requestDetails.source}
                                        </Typography>
                                    </Paper>

                                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', transform: "rotate(180deg)", alignSelf: 'center' }}>
                                        <ImportExportIcon  sx={{fontSize:40, color: requestDetails?.requestStatus ==='PENDING' ? '#f99935': requestDetails?.requestStatus ==='APPROVED' ? '#09984c':requestDetails?.requestStatus ==='ONGOING' ? '#bc9800':requestDetails?.requestStatus ==='REJECTED' ? '#f93125':'gray'}} />
                                    </div>
                                    <Paper style={{padding:8, margin:4, cursor: 'pointer'}} elevation={4}
                                           onClick={()=>goToMap(requestDetails.sourceLat, requestDetails.sourceLong, requestDetails.destinationLat, requestDetails.destinationLong)}>
                                        <Typography variant='body-2' component='h4' style={{margin: 4}}>
                                            {changeLang?'सहलीचा ला':"To"}
                                        </Typography>
                                        <Typography variant='subtitle2' component='div' style={{margin: 4, textDecoration: "underline", color:'blue'}}>
                                            {requestDetails.destination}
                                        </Typography>
                                    </Paper>
                                </Box>
                                <Box style={{display: 'flex', flexDirection: 'column', textAlign:"center", margin: 10}}>
                                    <Typography variant='body-2' component='h4' style={{marginTop: 4}}>
                                        {changeLang?'सहलीचा कारण':"   Reason"}
                                    </Typography>
                                    <Typography variant='subtitle2'  component='h4' style={{marginTop: 4, textAlign:"center", wordBreak: 'break-word'}}>
                                        {requestDetails.reason}
                                    </Typography>
                                </Box>
                                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                                    <div style={{display:'flex', flexDirection:'column', marginTop:16, textAlign:'left' }}>
                                        <Typography variant='body-2' component='div'>
                                            {changeLang?'प्रारंभ तारीख आणि वेळ':"Start Date & Time"}
                                        </Typography>
                                        <Typography variant='subtitle2' component='div' style={{marginTop:8}}>
                                            {moment(requestDetails.startDateTime).format('DD-MMM-YYYY hh:mm a')}
                                        </Typography>
                                    </div>
                                    <div style={{display:'flex', flexDirection:'column', marginTop:16, textAlign:'right'}}>
                                        <Typography variant='body-2' component='div'>
                                            {changeLang?'समाप्तीची तारीख आणि वेळ':"End Date & Time"}
                                        </Typography>
                                        <Typography variant='subtitle2' component='div' style={{marginTop:8}}>
                                            {moment(requestDetails.endDateTime).format('DD-MMM-YYYY hh:mm a')}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                    </Paper>
                <Stack style={{width:'100%', marginTop:24}} direction="column" justifyContent="flex-start" alignItems="flex-start">
                    <div style={{ width:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableBody>
                                    {requestDetails && requestDetails?.travellersDetails.map((traveller, index) => (
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
                            {changeLang?'स्थिती तपशील':"Status Details"}
                        </Typography>
                        {/*<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>*/}
                        {/*    <div>*/}
                        {/*        <Typography variant='h6' component='div' style={{textAlign:'center', margin: }}>Status Details</Typography>*/}
                        {/*    </div>*/}
                        {/*</Stack>*/}
                        {/*<hr/>*/}
                        <div className={classes.travellerItem}>
                            <p className={classes.itemLeftSection}> {changeLang?'तारीख':"Date & Time"}</p>
                            <p className={classes.itemLeftSection}> {changeLang?'विनंती':"Request"}</p>
                        </div>
                        {requestDetails && requestDetails?.journeyStatus.map((traveller, index) => (
                            <div className={classes.travellerItem} key={index}>
                                <div className={classes.itemRightSection}> {moment(traveller.Date).format('DD-MMM-YYYY hh:mm a')}</div>
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
                                    {traveller?.Status==='STARTJOURNEY' &&
                                    <Typography variant='h6' component='div' style={{textAlign:"center", color: '#3681f9'}}>
                                        {traveller?.Status}
                                    </Typography>}
                                    {traveller?.Status==='ENDJOURNEY' &&
                                    <Typography variant='h6' component='div' style={{textAlign:"center", color: '#f95d9f'}}>
                                        {traveller?.Status}
                                    </Typography>}
                                    {traveller?.Status==='EXTENDREQUEST' &&
                                    <Typography variant='h6' component='div' style={{textAlign:"center", color: '#f95d9f'}}>
                                        {traveller?.Status}
                                    </Typography>}
                                    {traveller?.Status==='FEEDBACKCOMPLETE' &&
                                    <Typography variant='h6' component='div' style={{textAlign:"center", color: '#f95s9f'}}>
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
                        {requestDetails && requestDetails?.journeyStatus.map((traveller, index) => {
                            return <div className={classes.travellerItem} key={index}>
                                {   traveller?.status ==='' ?
                                    null
                                : <>
                                <p className={classes.itemRightSection}> {moment(traveller.Date).format('DD-MMM-YYYY hh:mm a')}</p>
                         <p className={classes.itemRightSection}>
                             {traveller?.Status==='ONGOING' &&
                                 <Typography variant='h6' component='div' style={{textAlign:"center", color: '#f9ed1b'}}>
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
                             {traveller?.Status==='STARTJOURNEY' &&
                                 <Typography variant='h6' component='div' style={{textAlign:"center", color: '#3681f9'}}>
                                     {traveller?.Status}
                                 </Typography>}
                             {traveller?.Status==='ENDJOURNEY' &&
                                 <Typography variant='h6' component='div' style={{textAlign:"center", color: '#f95d9f'}}>
                                     {traveller?.Status}
                                 </Typography>}
                         </p>
                         </>}
                            </div>})}
                    </Paper>
                </Modal>
                </div>
                <Box sx={{ display: { xs: 'none', sm: 'block' }}} style={{flex:1, flexDirection:'column'}}>

                </Box>
            </main>
        </Box>
    )
};

const mapStateToProps = state => {
    return {
        changeLang: state.trackLocation.changeLang,
        destinationLocation: state.trackLocation.destinationLocation,
        sourceLocation: state.trackLocation.sourceLocation,
    }
};
const useStyles = makeStyles(theme => ({
    root: {
        background: '#fcfcfc'
    },
    appbar: {
        alignItems: 'center',
        padding: '15px',
        background: '#fcfcfc !important',
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
        width: '90%',
        background: 'white',
        borderRadius: '20px !important',
        margin: '20px 0',
        padding: '20px',
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

export default connect(mapStateToProps)(DriverRideStatus);
