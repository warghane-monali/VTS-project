import React, { useEffect, useState } from 'react';
import * as ActionCreatorsDriver from "../../actions/driverAction";
import { connect, useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";
import * as XLSX from 'xlsx';

const Attedance = ({ userDetails, setDriverAttendanceData,setDriverAttendance,driverattendance,getdriverattendanceData,changeLang }) => {
    const [value, setValue] = React.useState([null, null]);
    const classes = useStyles();
    const [startDateTime, setstartDatetime] = useState('');
    const [endDateTime, setendDatetime] = useState('');
    const [data, setData] = useState([]);
    const [Adata, setAData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [count, setCount] = useState(0);
    const driver = useSelector(state => state.driver)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
      //  handlegetattendanceData();
        getdriverattendanceData(userDetails.user);
        // setData(data)
      }, []);

    return (
        <div>

            <div className="container">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2, bgcolor: 'background.paper', '& button': { m: 1 } }}>
                    <div><h1>{changeLang ? "सुट्टी व्यवस्थापन " :'Driver Attendance'}</h1></div>
                    {/* <div><Button  variant="contained" size="small" >Leave</Button></div> */}
                </Box>
                <Box sx={{ flexDirection: 'row', display: 'flex', m: 2, bgcolor: 'background.paper', '& button': { m: 1 } }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            startText={changeLang ? "प्रारंभ तारीख" :'Start Date'}
                            endText={changeLang ? "समाप्तीची तारीख" :"End Date"}
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue)
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} onChange={(newValue) => {
                                        setstartDatetime(newValue)
                                    }} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} onChange={(newValue) => {
                                        setendDatetime(newValue)
                                    }} />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                    <div style={{ margin: 4, marginTop: -4.5, padding: 2 }}>
                        <Button variant="contained" onClick={() => setDriverAttendanceData(userDetails, value[0], value[1])}>Leave</Button>
                    </div>

                </Box>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>{changeLang ? "प्रारंभ तारीख" :'Start Date'}</strong></TableCell>
                                    <TableCell><strong>{changeLang ? "समाप्तीची तारीख" :"End Date"}</strong></TableCell>
                                    <TableCell><strong>{changeLang ? "स्थिती" : "Status"}</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { driver.driverattendance && driver.driverattendance.length > 0 && driver.driverattendance.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    return (
                                        <TableRow key={Math.random() * index} hover role="checkbox" tabIndex={-1}>
                                            <TableCell>{row && moment(row.startDateTime).format('DD MMM YYYY hh:mm:a') }</TableCell>
                                            <TableCell>{row && moment(row.endDateTime).format('DD MMM YYYY hh:mm:a') }</TableCell>
                                            <TableCell>{row && row.status}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={count ? count : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userDetails: state.auth.userDetails,
        setDriverAttendance: state.driver.setDriverAttendance,
        driverattendance : state.driver.driverattendance,
        changeLang: state.trackLocation.changeLang,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setDriverAttendanceData: (userDetails, startDateTime, endDateTime) => dispatch(ActionCreatorsDriver.setDriverAttendanceData(userDetails, startDateTime, endDateTime)),
        // setRequestStatusAdminDataReports: (startDate, endDate) => dispatch(ActionCreators.setRequestStatusAdminDataReports(startDate, endDate)),
        getdriverattendanceData : (driverattendance) => dispatch(ActionCreatorsDriver.getdriverattendanceData(driverattendance))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Attedance)

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        background: '#fcfcfc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
    profilePicture: {
        width: '200px !important',
        height: '200px !important',
        margin: '20px',
    },
    displayForm: {
        width: '350px',
        background: 'white',
        borderRadius: '20px !important',
        margin: '20px',
        padding: '20px',
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
    group: {
        marginTop: '30px',
    }
}));
