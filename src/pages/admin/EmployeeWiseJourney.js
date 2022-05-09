
import { makeStyles } from '@mui/styles'
import { Paper, Typography } from "@mui/material"
import * as ActionCreatorsAdmin from "../../actions/adminAction";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment";
import ImportExportIcon from "@mui/icons-material/ImportExport";

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
        // minWidth: '350px',
        width: '100%',
        // maxWidth: '400px',
        alignItems: 'center',
        flexDirection: 'row',
        display: "flex",
        flexWrap: "wrap",
    },
    card: {
        padding: '20px',
        borderRadius: '20px !important',
        margin: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardList: {
        display: "flex",
        flexWrap: "wrap",
        minWidth:'320px',
        maxWidth:'400px',
        background: 'white',
        borderRadius: '20px !important',
        margin: '10px',
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

const EmployeeWiseJourney = ({employeeWiseJourney, getEmployeeWiseJourneysData}) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState(location?.state);

    useEffect(() => {
        getEmployeeWiseJourney();
    }, []);

    const getEmployeeWiseJourney = async () => {
        await getEmployeeWiseJourneysData(userData._id);
    };

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                {employeeWiseJourney && employeeWiseJourney.length>0 && employeeWiseJourney.map((item, index)=>{
                    return <Paper key={index} className={classes.cardList} onClick={() => navigate('/admin/request-permission', { state: item})}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',flex:1}}>
                            <div className={classes.upperRow}
                                 style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex:0.8}}>
                                <Typography variant='h6' component='span' style={{textAlign: "center"}}>
                                    {moment(item.startDateTime).format('DD MMM YYYY')}
                                </Typography>
                                <Typography style={{textAlign: "center"}}>
                                    {item.source}
                                </Typography>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: "rotate(90deg)"}}>
                                <ImportExportIcon sx={{fontSize: 40,
                                    color: item?.requestStatus === 'PENDING' ? '#f99935' : item?.requestStatus === 'APPROVED' ? '#09984c' : item?.requestStatus === 'REJECTED' ? '#f93125' : 'gray'}}/>
                            </div>
                            <div className={classes.lowerRow}
                                 style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', flex:0.8}}>
                                <Typography variant='h6' component='span' style={{textAlign: "center"}}>
                                    {moment(item.startDateTime).format('hh:mm a')}
                                </Typography>
                                <Typography style={{textAlign: "center"}}>
                                    {item.destination}
                                </Typography>
                            </div>
                        </div>
                    </Paper>
                })}

            </main>
        </div>
    )
};
const mapStateToProps = state => {
    return {
        employeeWiseJourney: state.admin.employeeWiseJourney,
        loading: state.request.loading,
        error: state.request.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getEmployeeWiseJourneysData: (requestBody) => dispatch(ActionCreatorsAdmin.getEmployeeWiseJourneysData(requestBody)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeWiseJourney)

