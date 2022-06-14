import React, {useEffect, useState} from "react";
import {AppBar, Box, IconButton, Modal, Paper, Typography} from "@mui/material"
import { makeStyles } from "@mui/styles"
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import CircleIcon from '@mui/icons-material/Circle'
import {useNavigate} from "react-router-dom";
import * as ActionCreators from "../../actions/adminAction";
import {connect} from "react-redux";
import moment from "moment";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import * as ActionCreatorsDriver from "../../actions/driverAction";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { Badge } from "@mui/material";
import { Grid } from "@mui/material";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
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
        minWidth: '350px',
        width: '100%',
        maxWidth: '400px',
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
}));

const AdminDashboard = ({getTabIndex, tabIndexData, adminDetails, getUpcomingPreviousRidesAdminData, getUserUpcomingRidesData,
                            getUserPreviousRidesData, previousRides, upcomingRides,
                            upcomingPreviousRides, getJourneyAllCountData, getjourneyallcount}) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(tabIndexData?(tabIndexData):0);
    const [selectedUpDate, setSelectedUpDate] = useState(0);
    const [selectedDate, setSelectedDate] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [filter, setFilter] = useState(false);
    const [selectedTab, setSelectedTab] = useState(null);
    const [countData, setCountData] = useState([]);


    // const handleChange = (event, newValue) => {
    //     if(selected===2){
    //         getChangeDateUpcomingRides(Number(newValue))
    //     } else if (selected===1){
    //         getChangeDatePreviousRides(Number(newValue))
    //     }
    // };


    useEffect(() => {
        // getUserPreviousRides();
        // getUserUpcomingRides();
        // if(tabIndexData===1){
        //     getRequestDataByDate(moment().format('YYYY-MM-DD'))
        // } else if(tabIndexData===2){
        //     getRequestDataByDate(moment().subtract(1,'days').format('YYYY-MM-DD'))
        // }
        getallcountlist()
    }, []);

    const getUserPreviousRidesDataList = async () => {
        await getUserPreviousRidesData();

    };

    const getUserUpcomingRidesDataList = async () => {
        await getUserUpcomingRidesData();
    };

    const getUserPreviousRides = async () => {
       await getUpcomingPreviousRidesAdminData(moment().subtract(1,'days').format('YYYY-MM-DD'));

    };

    const getUserUpcomingRides = async () => {
       await getUpcomingPreviousRidesAdminData(moment().format('YYYY-MM-DD'));
    };

    const getRequestDataByDate = (date, newValue)=> {
        if (newValue==='filter'){
            setFilter(true);
            setTabValue(3);
        }
        if(selected===2){
            getUpcomingPreviousRidesAdminData(moment(date).format('YYYY-MM-DD'))
        } else if (selected===1){
            getUpcomingPreviousRidesAdminData(moment(date).format('YYYY-MM-DD'))
        }
    };

    const getallcountlist = async () => {
        const count = await getJourneyAllCountData()
        console.log("Count Data",count)
        setCountData(count)
    }

    const getChangeDateUpcomingRides = (selection)=> {
        setSelectedUpDate(selection);
        setTabValue(selection);
        if(selection===0){
            getUpcomingPreviousRidesAdminData(moment().format('YYYY-MM-DD'))
        }else if(selection===1){
            getUpcomingPreviousRidesAdminData(moment().add(1,'days').format('YYYY-MM-DD'))
        }else if (selection===2){
            getUpcomingPreviousRidesAdminData(moment().add(2,'days').format('YYYY-MM-DD'))
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

    const renderList = (item, index) => {
        return <Paper key={index} className={classes.cardList} onClick={() => navigate('/admin/request-permission', { state: item})}>
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
                            item?.requestStatus ==='ONGOING'?'#bc9800':item?.requestStatus ==='CANCEL'?'#f93125': item?.requestStatus ==='STARTJPURNEY'?'#3681f9' :item?.requestStatus ==='ENDJPURNEY'?'#f95d9f':''}} />
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

    console.log("Count data",getjourneyallcount)
    return (
        
        <>
            {selected===0?<div className={classes.root}>
                <main className={classes.main}>

                <Box className={classes.smallCardContainer}>
                        <Paper className={classes.card} sx={{ marginRight: '20px' }} onClick={e=>{e.preventDefault();navigate('/admin/request-list', {state:'ONGOING'})}}>
                            <Box style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',cursor: 'pointer'}}>
                                <Grid  justify="flex-end" style={ { marginLeft:120 } }  >
                                <Badge badgeContent={countData['ONGOING']=== 0 ? '0' : countData['ONGOING'] } color="primary" style={ { justifyContent:'right',alignItems:'right' } } />
                                </Grid>
                                <img style={{width: '50%'}}
                                     alt="React"
                                     src="/static/img/cab_ongoing.png"/>
                                <Typography variant='body-1' component='div' style={{width: '100%', textAlign: 'center'}}>
                                    Ongoing Request
                                </Typography>
                            </Box>
                        </Paper>
                        <Paper className={classes.card} onClick={e=>{e.preventDefault();navigate('/admin/request-list', {state:'UNSERVICE'})}}>
                            <Box style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',cursor: 'pointer'}}>
                                <Grid  justify="flex-end" style={ { marginLeft:120 } }>
                                <Badge badgeContent={countData['UNSERVICE']=== 0 ? '0' : countData['UNSERVICE']} color="primary" style={ { justifyContent:'right',alignItems:'right' } } />
                                </Grid>
                                <img style={{width: '50%'}}
                                     alt="React"
                                     src="/static/img/cab_unserviced.png"/>
                                <Typography variant='body-1' component='div' style={{width: '100%', textAlign: 'center'}}>
                                    Unserviced Request
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                    <Paper className={classes.card} onClick={e=>{e.preventDefault();navigate('/admin/request-list', {state:'PENDING'})}}>
                        <Box style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',cursor: 'pointer'}}>
                            <Grid  justify="flex-end" style={ { marginLeft:320 } }>
                            <Badge badgeContent={countData['PENDING']=== 0 ? '0' : countData['PENDING']} color="primary" style={ { justifyContent:'right',alignItems:'right' } } />
                            </Grid>
                            <img style={{width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                                 alt="React"
                                 src="/static/img/cab_pending.png"/>
                            <Typography variant='body-1' component='div' style={{width: '100%', textAlign: 'center'}}>
                                Pending Request
                            </Typography>
                        </Box>
                    </Paper>
                    <Box className={classes.smallCardContainer}>
                        <Paper className={classes.card} sx={{ marginRight: '20px' }} onClick={e=>{e.preventDefault();navigate('/admin/request-list', {state:'APPROVED'})}}>
                            <Box style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',cursor: 'pointer'}}>
                                <Grid  justify="flex-end" style={ { marginLeft:120 } } >
                                <Badge badgeContent={countData['APPROVED']=== 0 ? '0' : countData['APPROVED'] } color="primary" style={ { justifyContent:'right',alignItems:'right' } } />
                                </Grid>
                                <img style={{width: '50%'}}
                                     alt="React"
                                     src="/static/img/cab_accepted.png"/>
                                <Typography variant='body-1' component='div' style={{width: '100%', textAlign: 'center'}}>
                                    Accepted Request
                                </Typography>
                            </Box>
                        </Paper>
                        <Paper className={classes.card} onClick={e=>{e.preventDefault();navigate('/admin/request-list', {state:'REJECTED'})}}>
                            <Box style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',cursor: 'pointer'}}>
                                <Grid  justify="flex-end" style={ { marginLeft:120 } }>
                                <Badge badgeContent={countData['REJECTED']=== 0 ? '0' : countData['REJECTED']} color="primary" style={ { justifyContent:'right',alignItems:'right' } } />
                                </Grid>
                                <img style={{width: '50%'}}
                                     alt="React"
                                     src="/static/img/cab_rejected.png"/>
                                <Typography variant='body-1' component='div' style={{width: '100%', textAlign: 'center'}}>
                                    Rejected Request
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                </main>
            </div>:null}
            {selected===2?<div className={classes.root}>
                <main className={classes.main}>
                    <TabContext value={tabValue.toString()}>
                        <TabList onChange={(e, value) => {
                                     setSelectedTab(Number(value));
                                     getChangeDatePreviousRides(Number(value));
                                     setFilter(false);
                                 }}>
                            <Tab style={{minWidth:filter?75:115, padding: '12px 8px'}} label={'All Rides'} value="0"/>
                            <Tab style={{minWidth:filter?75:115, padding: '12px 8px'}} label={moment().subtract(1, 'days').format('DD-MMM')} value="1"/>
                            <Tab style={{minWidth:filter?75:115, padding: '12px 8px'}} label={moment().subtract(2, 'days').format('DD-MMM')} value="2"/>
                            { filter && value?<Tab style={{minWidth: 115, padding: '12px 8px'}} label={moment(value && value.toString()).format('DD-MMM-YYYY')} value="3"/>:null}
                            <IconButton  onClick={e => {
                                e.preventDefault();
                                setIsOpen(pState => !pState)
                            }}>
                                <DateRangeRoundedIcon color="primary" className={classes.calendarIcon} style={{width:24, height:24}} />
                            </IconButton>
                        </TabList>
                        <TabPanel value="0">
                            {previousRides && previousRides.length > 0 ? previousRides.map((item, index)=>{
                                return renderList(item, index)
                            }):null}
                        </TabPanel>
                        <TabPanel value="1">
                            {upcomingPreviousRides && upcomingPreviousRides.length > 0 ? upcomingPreviousRides.map((item, index)=>{
                                return renderList(item, index)
                            }):null}
                        </TabPanel>
                        <TabPanel value="2">
                            {upcomingPreviousRides && upcomingPreviousRides.length > 0 ? upcomingPreviousRides.map((item, index)=>{
                                return renderList(item, index)
                            }):null}
                        </TabPanel>
                        {filter?<TabPanel style={{width: '95%',  padding:12}} value="3">
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
                                variant='h4' component='div' align='center'>
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
                        <TabList onChange={(e, value) => {
                            setSelectedTab(Number(value));
                            getChangeDateUpcomingRides(Number(value));
                            setFilter(false);
                        }}>
                            <Tab style={{minWidth: filter?75:115}} label={ 'All Rides'} value="0"/>
                            <Tab style={{minWidth: filter?75:115}} label={ moment().add(1, 'days').format('DD-MMM')} value="1"/>
                            <Tab style={{minWidth: filter?75:115}} label={ moment().add(2, 'days').format('DD-MMM')} value="2"/>
                            {filter && value?<Tab style={{minWidth: 115, padding: '12px 8px'}} label={moment(value && value.toString()).format('DD-MMM-YYYY')} value="3"/>:null}
                            <IconButton  onClick={e => {
                                e.preventDefault();
                                setIsOpen(pState => !pState)
                            }}>
                                <DateRangeRoundedIcon color="primary" className={classes.calendarIcon} style={{width:24, height:24}} />
                            </IconButton>
                        </TabList>
                        <TabPanel value="0">
                            {upcomingRides && upcomingRides.length > 0 ? upcomingRides.map((item, index)=>{
                                return renderList(item, index)
                            }):null}
                        </TabPanel>
                        <TabPanel value="1">
                            {upcomingPreviousRides && upcomingPreviousRides.length > 0 ? upcomingPreviousRides.map((item, index)=>{
                                return renderList(item, index)
                            }):null}
                        </TabPanel>
                        <TabPanel value="2">
                            {upcomingPreviousRides && upcomingPreviousRides.length > 0 ? upcomingPreviousRides.map((item, index)=>{
                                return renderList(item, index)
                            }):null}
                        </TabPanel>
                        { filter && value?<TabPanel style={{width: '95%',  padding:12}} value="3">
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
                            setSelected(newValue);
                            getTabIndex(newValue);
                            setTabValue(0)
                            if(newValue===1){
                                getUserUpcomingRidesDataList()
                                // getRequestDataByDate(moment().format('YYYY-MM-DD'))
                            } else if(newValue===2){
                                // getRequestDataByDate(moment().subtract(1,'days').format('YYYY-MM-DD')
                                getUserPreviousRidesDataList()
                            }
                        }}>
                        <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
                        <BottomNavigationAction label="Upcoming Ride" icon={<DirectionsCarIcon />} />
                        {/* <BottomNavigationAction label="Previous Ride" icon={<DirectionsCarIcon />} /> */}
                    </BottomNavigation>
                    <div>
                        <Typography variant='body-2' component='div' style={{color:'white', textAlign: "center", marginTop: 8, marginBottom: 8}}>
                            Powered By <a style={{color:'white', textAlign: "center", marginTop: 8, marginBottom: 8}} href="https://www.foxberry.in/" target='_blank'> Foxberry Technologies </a> &copy; {new Date().getFullYear()}
                        </Typography>
                    </div>
                </Box>
            </AppBar>
        </>

    )
};
const mapStateToProps = state => {
    return {
        previousRides: state.admin.previousRides,
        upcomingRides: state.admin.upcomingRides,
        tabIndexData: state.driver.tabIndexData,
        upcomingPreviousRides: state.admin.upcomingPreviousRides,
        adminDetails: state.admin.adminDetails,
        getjourneyallcount: state.admin.getjourneyallcount,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getTabIndex: (requestBody) => dispatch(ActionCreatorsDriver.getTabIndex(requestBody)),
        getUpcomingPreviousRidesAdminData: (requestBody) => dispatch(ActionCreators.getUpcomingPreviousRidesAdminData(requestBody)),
        getUserPreviousRidesData: (requestBody) => dispatch(ActionCreators.getUserPreviousRidesData(requestBody)),
        getUserUpcomingRidesData: (requestBody) => dispatch(ActionCreators.getUserUpcomingRidesData(requestBody)),
        getJourneyAllCountData: () => dispatch(ActionCreators.getJourneyAllCountData())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
