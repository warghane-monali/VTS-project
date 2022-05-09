import React, {useEffect, useState} from 'react';
import * as ActionCreatorsDriver from "../../actions/driverAction";
import * as ActionCreators from "../../actions/adminAction";
import {connect} from "react-redux";
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import {makeStyles} from "@mui/styles";
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

const Reports = ({setRequestStatusAdminDataReports, reports}) => {
    const [value, setValue] = React.useState([null, null]);
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [count, setCount] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getAdminReports(moment().format('2022-01-01'), moment().format('2022-04-01'))
    }, []);

    const getAdminReports = async (startDate, endDate) => {
        const reportsData = await setRequestStatusAdminDataReports(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
        setData(reportsData)
    };

    const handleClickOpen = () => {

    };

    const downloadExcel = () => {
        let dataSet = [];
        const removeKey = (k, { [k]:_, ...o }) => o;
        const removeKeys = (keys = [], o = {}) =>
            keys.reduce((r, k) =>
                removeKey(k, r), o);
        dataSet = data.map(v => removeKeys(["startOTP","endOTP"], v));
        const worksheet = XLSX.utils.json_to_sheet(dataSet);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "Reports.xlsx");
    };

    const handleClickGetData = () => {
        if (value[0] && value[1]){
            getAdminReports(value[0], value[1]);
        }
    };

    return (
        <div>

            <div className="container">
                <Box sx={{display: 'flex', justifyContent: 'space-between', m: 2, bgcolor: 'background.paper',  '& button': { m: 1 } }}>
                    <div><h1>Reports</h1></div>
                    <div><Button  variant="contained" size="small" onClick={downloadExcel}>Export data</Button></div>
                </Box>
                <Box sx={{flexDirection:'row', display: 'flex',  m: 2, bgcolor: 'background.paper',  '& button': { m: 1 } }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            startText="Check-in"
                            endText="Check-out"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue)
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                    <div  style={{margin:4, padding:2}}>
                        <Button variant="contained" onClick={()=>handleClickGetData()}>Get Data</Button>
                    </div>

                </Box>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Traveller Name</TableCell>
                                    <TableCell>Traveller No</TableCell>
                                    {/*<TableCell>Travellers Id</TableCell>*/}
                                    {/*<TableCell>Travellers Details</TableCell>*/}
                                    <TableCell>Source</TableCell>
                                    <TableCell>Source Lat</TableCell>
                                    <TableCell>Source Long</TableCell>
                                    <TableCell>Destination</TableCell>
                                    <TableCell>Destination Lat</TableCell>
                                    <TableCell>Destination Long</TableCell>
                                    <TableCell>End Date Time</TableCell>
                                    <TableCell>Request Status</TableCell>
                                    <TableCell>One Way Or RoundTrip</TableCell>
                                    <TableCell>Journey Status</TableCell>
                                    <TableCell>Requested Vehicle Type</TableCell>
                                    <TableCell>Reason</TableCell>
                                    <TableCell>Reject Reason Option</TableCell>
                                    <TableCell>Reject Reason</TableCell>
                                    <TableCell>Capacity</TableCell>
                                    <TableCell>Vehicle Id</TableCell>
                                    <TableCell>Agency Name</TableCell>
                                    <TableCell>Vehicle Name</TableCell>
                                    <TableCell>Vehicle No</TableCell>
                                    <TableCell>Driver Id</TableCell>
                                    <TableCell>Driver Name</TableCell>
                                    <TableCell>Driver No</TableCell>
                                    <TableCell>Start OTP</TableCell>
                                    <TableCell>End OTP</TableCell>
                                    <TableCell>Start Odo Meter</TableCell>
                                    <TableCell>Start Odo Meter Img</TableCell>
                                    <TableCell>End Odo Meter</TableCell>
                                    <TableCell>End Odo Meter Img</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Created By</TableCell>
                                    <TableCell>Updated By</TableCell>
                                    <TableCell>_id</TableCell>
                                    <TableCell>Journey No</TableCell>
                                    <TableCell>Self Traveller Id</TableCell>
                                    <TableCell>Start Date Time</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Updated At</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data && data.length > 0 && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                            <TableCell>{row && row.selfTravellerName}</TableCell>
                                            <TableCell>{row && row.selfTravellerNo}</TableCell>
                                            {/*<TableCell>{row && row.travellersId}</TableCell>*/}
                                            {/*<TableCell>{row && row.travellersDetails}</TableCell>*/}
                                            <TableCell>{row && row.source}</TableCell>
                                            <TableCell>{row && row.sourceLat}</TableCell>
                                            <TableCell>{row && row.sourceLong}</TableCell>
                                            <TableCell>{row && row.destination}</TableCell>
                                            <TableCell>{row && row.destinationLat}</TableCell>
                                            <TableCell>{row && row.destinationLong}</TableCell>
                                            <TableCell>{row && row.endDateTime}</TableCell>
                                            <TableCell>{row && row.requestStatus}</TableCell>
                                            <TableCell>{row && row.oneWayOrRoundTrip}</TableCell>
                                            {/*<TableCell>{row && row.journeyStatus}</TableCell>*/}
                                            <TableCell>{row && row.requestedVehicleType}</TableCell>
                                            <TableCell>{row && row.reason}</TableCell>
                                            <TableCell>{row && row.rejectReasonOption}</TableCell>
                                            <TableCell>{row && row.rejectReason}</TableCell>
                                            <TableCell>{row && row.capacity}</TableCell>
                                            <TableCell>{row && row.vehicleId}</TableCell>
                                            <TableCell>{row && row.agencyName}</TableCell>
                                            <TableCell>{row && row.vehicleName}</TableCell>
                                            <TableCell>{row && row.vehicleNo}</TableCell>
                                            <TableCell>{row && row.driverId}</TableCell>
                                            <TableCell>{row && row.driverName}</TableCell>
                                            <TableCell>{row && row.driverNo}</TableCell>
                                            <TableCell>{row && row.startOTP}</TableCell>
                                            <TableCell>{row && row.endOTP}</TableCell>
                                            <TableCell>{row && row.startOdoMeter}</TableCell>
                                            <TableCell>{row && row.startOdoMeterImg}</TableCell>
                                            <TableCell>{row && row.endOdoMeter}</TableCell>
                                            <TableCell>{row && row.endOdoMeterImg}</TableCell>
                                            <TableCell>{row && row.status}</TableCell>
                                            <TableCell>{row && row.createdBy}</TableCell>
                                            <TableCell>{row && row.updatedBy}</TableCell>
                                            <TableCell>{row && row._id}</TableCell>
                                            <TableCell>{row && row.journeyNo}</TableCell>
                                            <TableCell>{row && row.selfTravellerId}</TableCell>
                                            <TableCell>{row && row.startDateTime}</TableCell>
                                            <TableCell>{row && row.createdAt}</TableCell>
                                            <TableCell>{row && row.updatedAt}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={count?count:0}
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
        reports: state.admin.reports,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setRequestStatusAdminDataReports: (startDate, endDate) => dispatch(ActionCreators.setRequestStatusAdminDataReports(startDate, endDate)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Reports)

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
