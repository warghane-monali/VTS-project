import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {
    Card, CardActions, CardContent, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, Typography
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import * as ActionCreators from "../../actions/requestAction";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import Alert from "@mui/material/Alert";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import TableContainer from "@mui/material/TableContainer";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListItemButton from '@mui/material/ListItemButton';
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";


const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh', background: '#fcfcfc', display: 'flex', flexDirection: 'column', alignItems: 'center'
    }, appbar: {
        alignItems: 'center', padding: '15px', background: '#0c1572 !important',
    }, appbarBackIcon: {
        fontSize: '40px !important', '&:hover': {
            cursor: 'pointer'
        }
    }, main: {
        padding: '20px', display: 'flex', alignItems: 'center', flexDirection: 'column'
    }, profilePicture: {
        width: '200px !important', height: '200px !important', margin: '20px',
    }, displayForm: {
        width: '350px', background: 'white', borderRadius: '20px !important', margin: '20px', padding: '20px',
    }, form: {
        height: 600, overflow: "scroll !important"
    }, formSpacer: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    }, middlePosition: {
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    }, group: {
        marginTop: '30px',
    }, flexContainer: {
        display: 'flex', flexDirection: 'row',
    }, inputContainer: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
    },
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const VehicleMaintenancepage = ({adminDetails, vehicleList, getVehicleListData, AddMaintenanceData, getVehicleMaintenanceData, vehicleMaintenance,EndMaintenanceData,getallvehicleListData}) => {

    const classes = useStyles();
    const [vehicleId, setVehicleId] = useState("");
    const [maintenanceDescription, setMaintenanceDescription] = useState("");
    const [maintenanceCost, setMaintenanceCost] = useState("");
    const [maintenancePlace, setMaintenancePlace] = useState("");
    const [maintenancePlaceNo, setMaintenancePlaceNo] = useState("");
    const [maintenanceStartDate, setMaintenanceStartDate] = useState("");
    const [maintenanceEndDate, setMaintenanceEndDate] = useState("");
    const [odoMeterReadingStart, setodoMeterReadingStart] = useState("");
    const [odoMeterReadingEnd,setodoMeterReadingEnd] = useState("");
    const [vehicleName, setVehicleName] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");
    const [openMaintenance, setOpenMaintenace] = useState(false);
    const [endMaintainance,setEndMaintainance] = useState(false);
    const [error, setError] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState({});
    const [dataList, setDataList] = useState([]);
    const [data, setData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [count, setCount] = useState(0);
    const [searched, setSearched] = useState("");
    const [endMaintainanceId,setendMaintainanceId] = useState("")

    useEffect(() => {
        getVehicleList();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getVehicleMaintenanceList = async (selectedVehicleId) => {
        const res = await getVehicleMaintenanceData(selectedVehicleId);
        setDataList(res)
    };

    const getVehicleList = async () => {
        const data = await getallvehicleListData()
        setData(data)
    };

    const handleMaintenanceClickOpen = () => {
        setVehicleId(selectedVehicle._id)
        setVehicleName(selectedVehicle.vehicleName)
        setVehicleNo(selectedVehicle.vehicleNo)
        setMaintenanceDescription('');
       // setMaintenanceCost('');
        setMaintenancePlace('');
        setMaintenancePlaceNo('');
        setMaintenanceStartDate('');
      //  setMaintenanceEndDate('');
      setodoMeterReadingStart('');
        setOpenMaintenace(true);
    };

    const handleEndMaintenanceClickOpen = (selectedVehicle,maintenanceId) => {
        setendMaintainanceId(maintenanceId)
        setVehicleId(selectedVehicle._id)
        setVehicleName(selectedVehicle.vehicleName)
        setVehicleNo(selectedVehicle.vehicleNo)
        setMaintenanceCost('');
        setMaintenanceEndDate('');
        setodoMeterReadingEnd('')
        setEndMaintainance(true);
    }

    const AddMaintenanceDetails = async () => {
        if (vehicleName !== '' && vehicleNo !== '' && maintenanceDescription !== '' && maintenancePlace !== '' && maintenancePlaceNo !== '' && maintenanceStartDate !== '' && odoMeterReadingStart !== '' && adminDetails?.user._id !== '') {
            const data = await AddMaintenanceData({
                vehicleId: vehicleId,
                vehicleName: vehicleName,
                vehicleNo: vehicleNo,
                maintenanceDescription: maintenanceDescription,
               // maintenanceCost: maintenanceCost,
                maintenancePlace: maintenancePlace,
                maintenancePlaceNo: maintenancePlaceNo,
                maintenanceStartDate: maintenanceStartDate,
              //  maintenanceEndDate: maintenanceEndDate,
                odoMeterReadingStart: odoMeterReadingStart
            });
            if (data) {
                await getVehicleMaintenanceList(vehicleId)
                setOpenMaintenace(false);
            }
        } else {
            setError(true);
        }
    };

    const EndMaintenanceDetails = async () => {
            console.log("---End Maintenance ID---", endMaintainanceId)
        if(vehicleName !== '' && vehicleNo !== '' && maintenanceCost !== '' && maintenanceEndDate !== '' && odoMeterReadingEnd !== '' && adminDetails?.user._id !== ''){
            const data = await EndMaintenanceData({
                vehicleMaintenanceId : endMaintainanceId,
                odoMeterReading : odoMeterReadingEnd,
                maintenanceEndDate : maintenanceEndDate,
                maintenanceCost : maintenanceCost,
                updatedBy : adminDetails?.user._id
            });
            if (data) {
                await getVehicleMaintenanceList(vehicleId)
                setEndMaintainance(false);
            }
        }
        else {
            setError(true);
        }

    } 

    const onChangeVehicleInfo = async (value) => {
        setSelectedVehicle(value)
        const data = await getVehicleMaintenanceData(value._id)
        setDataList(data)
    }

    const requestSearch = (searchedVal) => {
        setSearched(searchedVal);
        let filteredRows;
        if(searchedVal !== '' && searchedVal !== null && searchedVal !== undefined){
            filteredRows = vehicleList.filter((row) => {
                const itemData = `${row.agencyName.toUpperCase()} ${row.vehicleName.toUpperCase()} ${row.vehicleNo.toUpperCase()}`;
                const textData = searchedVal.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setData(filteredRows);
        }else{
            setData(vehicleList);
        }
    };
        
    return (
        <div className="container">
            <Box sx={{display: 'flex', justifyContent: 'space-between', m: 3, bgcolor: 'background.paper', '& button': {m: 1}}}>
                <div style={{float: 'left'}}><h1>Vehicle Maintenance Details</h1></div>
            </Box>
            <Box sx={{display: 'flex', height:'100vh', justifyContent: 'space-between', m: 3, bgcolor: 'background.paper', '& button': {m: 1}}}>
                <div style={{flex: 1, flexDirection: 'column', maxHeight:'700px', overflow:'auto'}}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            value={searched}
                            onChange={(e) => requestSearch(e.target.value)}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <List sx={{ width: '100%',  maxWidth: 360, bgcolor: 'background.paper' }}>
                        {data && data.map(vehicle => (
                            <ListItem>
                                <ListItemButton onClick={e => onChangeVehicleInfo(vehicle)}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={vehicle.vehicleNo} secondary={
                                        <React.Fragment>
                                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                                {vehicle.vehicleName} - {vehicle.vehicleType} - {vehicle.model} - {vehicle.capacity}
                                            </Typography>
                                            {vehicle.agencyNumber}
                                        </React.Fragment>
                                    } />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </div>
                <Box sx={{display: 'flex', flexDirection: 'column', m: 3, bgcolor: 'background.paper', '& button': {m: 1}}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', m: 2, bgcolor: 'background.paper',  '& button': { m: 1 } }}>
                        <div><h4>Vehicle Maintenance Details</h4></div>
                        <div><Button  variant="contained" size="small" disabled={!selectedVehicle._id}  onClick={() => handleMaintenanceClickOpen(selectedVehicle)}>Add Vehicle Maintenance</Button></div>
                    </Box>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Vehicle No</TableCell>
                                        <TableCell>Vehicle Name</TableCell>
                                        <TableCell>Maintenance Description</TableCell>
                                        <TableCell>Maintenance Start Date</TableCell>
                                        <TableCell>Maintenance End Date</TableCell>
                                        <TableCell>Maintenance Cost</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataList && dataList.length > 0 && dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                <TableCell>{row.vehicleNo}</TableCell>
                                                <TableCell>{row.vehicleName}</TableCell>
                                                <TableCell>{row.maintenanceDescription}</TableCell>
                                                <TableCell>{ moment(row.maintenanceStartDate).format('DD-MMM-YYYY hh:mm:a') }</TableCell>
                                                <TableCell>{ row.maintenanceEndDate ? moment(row.maintenanceEndDate).format('DD-MMM-YYYY hh:mm:a') : '-' }  {row.make}</TableCell>
                                                <TableCell>{row.maintenanceCost ? row.maintenanceCost : '-' }</TableCell>
                                                <TableCell>{ row.maintenanceCost ? 'Done' : <Button variant='contained' disabled={!selectedVehicle._id}  onClick={() => handleEndMaintenanceClickOpen(selectedVehicle,row._id)} >Reapairs done</Button> }</TableCell>
                                                {/*<TableCell>{row.contactNo}</TableCell>*/}
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
                </Box>
            </Box>
            <Modal className={classes.middlePosition}
                   open={openMaintenance} onClose={e => {
                e.preventDefault();
                setOpenMaintenace(false)
            }}>
                <Paper className={classes.form} sx={{
                    p: 1, m: 1, borderRadius: 1, textAlign: 'center', fontSize: '1rem', fontWeight: '700',
                }}>
                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyItems: 'center', justifyContent: 'space-between',
                    }}>
                        <Typography style={{margin: 8}}
                                    variant='h5'
                                    component='div'>
                            Add Vehicle Maintenance Details
                        </Typography>
                        <IconButton aria-label="delete" onClick={e => {
                            e.preventDefault();
                            setOpenMaintenace(false)
                        }}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <hr className={classes.divider}/>
                    <div className={classes.form}>
                        <TextField
                            style={{margin: 8}}
                            disabled={true}
                            label='Vehicle Name'
                            value={vehicleName}
                            onChange={e => {
                                setVehicleName(e.target.value)
                            }}
                        />
                        <TextField
                            style={{margin: 8}}
                            label='Vehicle No'
                            required
                            disabled={true}
                            value={vehicleNo}
                            onChange={e => {
                                setVehicleNo(e.target.value)
                            }}
                        />
                        <TextField
                            style={{margin: 8}}
                            label='Maintenace Description'
                            required
                            value={maintenanceDescription}
                            onChange={e => {
                              setMaintenanceDescription(e.target.value)
                            }}
                        />
                        <TextField
                            style={{margin: 8}}
                            label='Maintenance Place'
                            required
                            error={maintenancePlace.match(/[^A-Za-z0-9]/g) ? 'Please enter valid Place Name' : ''}
                            helperText={maintenancePlace.match(/[^A-Za-z0-9]/g) ? 'Please enter valid Place Name' : ''}
                            value={maintenancePlace}
                            onChange={e => {
                                setMaintenancePlace(e.target.value)
                            }}
                        />
                        <TextField
                            style={{margin: 8}}
                            label='Maintenace Place No '
                            required
                            error={maintenancePlaceNo.match(/[^A-Za-z0-9]/g) ? 'Please enter valid Maintenance Place no' : ''}
                            helperText={maintenancePlaceNo.match(/[^A-Za-z0-9]/g) ? 'Please enter valid Maintenance Place no' : ''}
                            value={maintenancePlaceNo}
                            onChange={e => {
                                setMaintenancePlaceNo(e.target.value)
                            }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={maintenanceStartDate}
                                label="Maintenance Start Date"
                                onChange={(newvalue) => {
                                    setMaintenanceStartDate(newvalue);
                                }}
                                renderInput={(params) => (
                                    <TextField className={classes.textFields} style={{margin: 8}} {...params}
                                               helperText={params?.inputProps?.placeholder}/>)}
                            />
                        </LocalizationProvider>
                        <TextField
                            style={{margin: 8}}
                            label='Odo Meter Reading'
                            required
                            error={odoMeterReadingStart.match(/[^0-9]/g) ? 'Please enter valid odo Meter Reading' : ''}
                            helperText={odoMeterReadingStart.match(/[^0-9]/g) ? 'Please enter valid odo Meter Reading' : ''}
                            value={odoMeterReadingStart}
                            onChange={e => {
                                setodoMeterReadingStart(e.target.value)
                            }}
                        />
                        {error ? <Alert
                            severity="warning"
                            action={<IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setError(false);
                                }}>
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>}
                            sx={{mb: 2}}>
                            Please fill request form properly.
                        </Alert> : null}
                        <Button variant="contained" size="small" className={classes.button} style={{margin: 16}}
                                onClick={(e) => {
                                    AddMaintenanceDetails(e)
                                }}>
                            Add Vehicle Maintenance Details
                        </Button>
                    </div>
                </Paper>
            </Modal>
            <Modal className={classes.middlePosition}
                   open={endMaintainance} onClose={e => {
                e.preventDefault();
                setEndMaintainance(false)
            }}>
                <Paper className={classes.form} sx={{
                    p: 1, m: 1, borderRadius: 1, textAlign: 'center', fontSize: '1rem', fontWeight: '700',
                }}>
                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyItems: 'center', justifyContent: 'space-between',
                    }}>
                        <Typography style={{margin: 8}}
                                    variant='h5'
                                    component='div'>
                            Add Complete Maintenance Details
                        </Typography>
                        <IconButton aria-label="delete" onClick={e => {
                            e.preventDefault();
                            setEndMaintainance(false)
                        }}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <hr className={classes.divider}/>
                    <div className={classes.form}>
                        <TextField
                            style={{margin: 8}}
                            disabled={true}
                            label='Vehicle Name'
                            value={vehicleName}
                            onChange={e => {
                                setVehicleName(e.target.value)
                            }}
                        />
                        <TextField
                            style={{margin: 8}}
                            label='Vehicle No'
                            required
                            disabled={true}
                            value={vehicleNo}
                            onChange={e => {
                                setVehicleNo(e.target.value)
                            }}
                        />
                        <TextField
                            style={{margin: 8}}
                            label='Maintenace Cost'
                            required
                            error={maintenanceCost.match(/^\d+\.\d{0,1}$/) ? 'Please enter valid Cost' : ''}
                            helperText={maintenanceCost.match(/^\d+\.\d{0,1}$/) ? 'Please enter valid Cost' : ''}
                            value={maintenanceCost}
                            onChange={e => {
                                setMaintenanceCost(e.target.value)
                            }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                style={{margin: 8}}
                                value={maintenanceEndDate}
                                label="Maintenance End Date"
                                onChange={(newvalue) => {
                                    setMaintenanceEndDate(newvalue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        className={classes.textFields}
                                        style={{margin: 8}} {...params}
                                       helperText={params?.inputProps?.placeholder}/>
                                )}
                            />
                        </LocalizationProvider>
                        <TextField
                            style={{margin: 8}}
                            label='End Maintenance OdoMeter'
                            required
                            error={odoMeterReadingEnd.match(/[^0-9]/g) ? 'Please enter valid odo Meter Reading' : ''}
                            helperText={odoMeterReadingEnd.match(/[^0-9]/g) ? 'Please enter valid odo Meter Reading' : ''}
                            value={odoMeterReadingEnd}
                            onChange={e => {
                                setodoMeterReadingEnd(e.target.value)
                            }}
                        />
                        {error ? <Alert
                            severity="warning"
                            action={<IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setError(false);
                                }}>
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>}
                            sx={{mb: 2}}>
                            Please fill request form properly.
                        </Alert> : null}
                        <Button variant="contained" size="small" className={classes.button} style={{margin: 16}}
                                onClick={(e) => {
                                    EndMaintenanceDetails(e)
                                }}>
                            Add End Maintenance Details
                        </Button>
                    </div>
                </Paper>
            </Modal>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        adminDetails: state.admin.adminDetails,
        vehicleList: state.request.vehicleList,
        vehicleMaintenance: state.request.vehicleMaintenance,
        error: state.request.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getVehicleListData: () => dispatch(ActionCreators.getVehicleListData()),
        AddMaintenanceData: (requestBody) => dispatch(ActionCreators.AddMaintenanceData(requestBody)),
        EndMaintenanceData : (requestBody) => dispatch(ActionCreators.EndMaintenanceData(requestBody)),
        getVehicleMaintenanceData: (requestBody) => dispatch(ActionCreators.getVehicleMaintenanceData(requestBody)),
        getallvehicleListData :() => dispatch(ActionCreators.getallvehicleListData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMaintenancepage)