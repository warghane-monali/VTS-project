import React, {useEffect, useState} from "react";
import { makeStyles } from '@mui/styles'
import {Box, IconButton, Modal, Paper, Typography} from "@mui/material"
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import {useLocation, useNavigate} from "react-router-dom";
import * as ActionCreators from "../../actions/adminAction";
import {connect} from "react-redux";
import moment from "moment";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth:'320px',
        minHeight: '100vh',
        background: theme.palette.secondary.main,
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
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    timeline: {
        minWidth: '350px',
        width: '100%',
        margin: '20px 0',
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
        height: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5px',
        padding: '0px 15px',
        border: '1px solid white',
        '&:hover': {
            cursor: 'pointer'
        },
    },
    calendarIcon: {
        color: 'white',
        fontSize: '40px !important'
    },
    card: {
        // minWidth:'320px',
        background: 'white',
        borderRadius: '20px !important',
        margin: '10px 0',
        padding: '20px',
        alignItems: 'center',
        justifyContent: 'space-evenly',
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
}));

const RequestList = ({adminDetails, setRequestStatusAdminData, setAllRequestStatusData, requestStatusList}) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(1);
    const location = useLocation();
    const [status, setStatus] = useState(location?.state);
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [tabValue, setTabValue] = useState(1);
    const [filter, setFilter] = useState(false);
    const [selectedTab, setSelectedTab] = useState(null);

    const handleChange = (event, newValue) => {
        getChangeDate(newValue)
    };


    useEffect(() => {
        setAllRequestStatusData({requestStatus:status});
    }, []);

    const getChangeDate = (selection)=> {
        setSelected(selection);
        setTabValue(selection);
        if(selection==="1"){
            setAllRequestStatusData({requestStatus:status})
        }else if(selection==="2"){
            setRequestStatusAdminData({requestStatus:status, startDateTime: moment().add(0,'days').format('YYYY-MM-DD')})
        }else if (selection==="3"){
            setRequestStatusAdminData({requestStatus:status, startDateTime: moment().add(1,'days').format('YYYY-MM-DD')})
        }
    };

    const getRequestDataByDate = (date)=> {
        setFilter(true);
        setTabValue(4);
        setRequestStatusAdminData({requestStatus:status, startDateTime: moment(date).format('YYYY-MM-DD')})
    };

    const renderList = (item, index) => {
       return <Paper key={index} className={classes.card} onClick={() => {
           // if(item.requestStatus==='PENDING'){
           navigate('/admin/request-permission', { state: item})
       // } else if(item.requestStatus==='APPROVED') {
       //     navigate('/admin/status',{state:item});
       // }else if(item.requestStatus==='REJECTED') {
       //     navigate('/admin/status',{state:item});
       // }
       }}>
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
                           item?.requestStatus ==='CANCEL'?'#f93125': item?.requestStatus ==='STARTJPURNEY'?'#3681f9' :item?.requestStatus ==='ENDJPURNEY'?'#f95d9f':''}} />
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

    return (
        <div className={classes.root}>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between',}}>
                <div sx={{ display: { xs: 'none', sm: 'block' }}} style={{flexDirection:'column'}}>

                </div>
                <div style={{flexDirection:'column', justifyContent:'space-between', maxWidth:400, flex:1}}>
                        <div>
                            <TabContext value={tabValue.toString()}>
                                <TabList onChange={handleChange}>
                                    <Tab style={{minWidth:filter?75:115, padding: '12px 8px'}} label={'All Rides'} value="1"/>
                                    <Tab style={{minWidth:filter?75:115}} label={ moment().add(0, 'days').format('DD-MMM')} value="2"/>
                                    <Tab style={{minWidth:filter?75:115}} label={ moment().add(1, 'days').format('DD-MMM')} value="3"/>
                                    { filter?<Tab style={{minWidth: 105, padding: '12px 8px'}} label={moment(value && value.toString()).format('DD-MMM-YYYY')} value="4"/>:null}
                                    <IconButton  onClick={e => {
                                        e.preventDefault();
                                        setIsOpen(pState => !pState)
                                    }}>
                                        <DateRangeRoundedIcon color="primary" className={classes.calendarIcon} style={{width:24, height:24}} />
                                    </IconButton>
                                </TabList>
                                <TabPanel value="1">
                                    {requestStatusList && requestStatusList.length > 0 ? requestStatusList.map((item, index)=>{
                                       return renderList(item, index)
                                    }):null}
                                </TabPanel>
                                <TabPanel value="2">
                                    {requestStatusList && requestStatusList.length > 0 ? requestStatusList.map((item, index)=>{
                                        return renderList(item, index)
                                    }):null}
                                </TabPanel>
                                <TabPanel value="3">
                                    {requestStatusList && requestStatusList.length > 0 ? requestStatusList.map((item, index)=>{
                                        return renderList(item, index)
                                    }):null}
                                </TabPanel>
                                { filter?<TabPanel style={{width: '95%',  padding:12}} value="3">
                                    {requestStatusList && requestStatusList.length > 0 ? requestStatusList.map((item, index) => {
                                        return renderList(item, index)
                                    }) : null}
                                </TabPanel>:null}
                            </TabContext>
                        </div>
                        <Modal
                            className={classes.middlePosition}
                            open={isOpen} onClose={e => {
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
                                            renderInput={(props) => <TextField  className={classes.textFields} {...props} />}
                                            label="Select Date"
                                            mask="__/__/____"
                                            format="dd-MM-yyyy"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            minDate={new Date(moment().add(2, 'days').format('DD-MMM-YYYY'))}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div style={{margin:10, display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'}}>
                                    <Button variant="contained" onClick={e => {
                                        e.preventDefault();
                                        setIsOpen(pState => !pState);
                                        getRequestDataByDate(value)
                                    }}>Submit</Button>
                                </div>
                            </Paper>
                        </Modal>
                </div>
                <div sx={{ display: { xs: 'none', sm: 'block' }}} style={{ flexDirection:'column'}}>

                </div>
            </Box>
        </div>
    )
};
const mapStateToProps = state => {
    return {
        adminDetails: state.admin.adminDetails,
        requestStatusList: state.admin.requestStatusAdmin,
        loading: state.request.loading,
        error: state.request.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setRequestStatusAdminData: (requestBody) => dispatch(ActionCreators.setRequestStatusAdminData(requestBody)),
        setAllRequestStatusData: (requestBody) => dispatch(ActionCreators.setAllRequestStatusData(requestBody)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestList)

