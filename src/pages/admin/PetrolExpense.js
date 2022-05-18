import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {
    Card,
    CardActions,
    CardContent,
    FormControl,
    IconButton,
    InputLabel, MenuItem,
    Modal,
    Select,
    Typography
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import * as ActionCreators from "../../actions/requestAction";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import Alert from "@mui/material/Alert";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {getPetrolExpenseListData} from "../../actions/requestAction";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import ListItemText from "@mui/material/ListItemText";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";


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
    form: {
        height: 600,
        overflow: "scroll !important"
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
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
    }
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
}))
;
const VehicleMaintenancepage = ({adminDetails, vehicleList, getVehicleListData, AddPetrolExpenseData, getPetrolExpenseListData, vehiclePetrolExpenseList}) => {

    const classes = useStyles();
    const [vehicleId, setVehicleId] = useState("");
    const [petrolLiter, setpetrolLiter] = useState("");
    const [petrolCost, setpetrolCost] = useState("");
    const [petrolFIllingPlace, setpetrolFIllingPlace] = useState("");
    const [Date, setDate] = useState("");
    const [odoMeterReading, setodoMeterReading] = useState("");
    const [homeLocation, setHomeLocation] = useState("");
    const [vehicleName, setVehicleName] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");
    const [openPetrolExpense, setopenPetrolExpense] = useState(false);
    const [error, setError] = useState(false);
    const [filledBy, setFilledBy] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState({});
    const [dataList, setDataList] = useState([]);
    const [data, setData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [count, setCount] = useState(0);
    const [searched, setSearched] = useState("");

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

    const handlePetrolExpenseClickOpen = (selectedVehicleData) => {
        setVehicleId(selectedVehicleData._id)
        setVehicleName(selectedVehicleData.vehicleName)
        setVehicleNo(selectedVehicleData.vehicleNo)
        setpetrolLiter('')
        setpetrolCost('')
        setpetrolFIllingPlace('')
        setDate('')
        setodoMeterReading('');
        setopenPetrolExpense(true);
    };

    const AddPetrolExpenseDetails = async () => {
        if (
            vehicleId !== '' &&
            vehicleName !== '' &&
            vehicleNo !== '' &&
            petrolLiter !== '' &&
            petrolCost !== '' &&
            petrolFIllingPlace !== '' &&
            Date !== '' &&
            odoMeterReading !== '' &&
            filledBy !== '' &&
            adminDetails?.user._id !== ''

        ) {
            const data = await AddPetrolExpenseData({
                vehicleId: vehicleId,
                vehicleName: vehicleName,
                vehicleNo: vehicleNo,
                petrolLiter: petrolLiter,
                petrolCost: petrolCost,
                petrolFIllingPlace: petrolFIllingPlace,
                Date: Date,
                odoMeterReading: odoMeterReading,
                filledBy: filledBy,
                createdBy: adminDetails?.user._id
            });
            if (data) {
                const data = await getPetrolExpenseListData(vehicleId)
                setDataList(data)
                setopenPetrolExpense(false);
            }
        } else {
            setError(true);
        }

    };

    const onChangeVehicleInfo = async (value) => {
        setSelectedVehicle(value)
        const data = await getPetrolExpenseListData(value._id)
        setDataList(data)
    }

    const getVehicleList = async () => {
        const data = await getVehicleListData()
        setData(data)
    };

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
                <div style={{float: 'left'}}><h1>Petrol Expense Details</h1></div>
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
                        <div><h4>Petrol Expense Details</h4></div>
                        <div><Button  variant="contained" size="small" disabled={!selectedVehicle._id}  onClick={() => handlePetrolExpenseClickOpen(selectedVehicle)}>Add Petrol Expense</Button></div>
                    </Box>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Vehicle No</TableCell>
                                        <TableCell>Vehicle Name</TableCell>
                                        <TableCell>Petrol Cost</TableCell>
                                        <TableCell>Petrol Liter</TableCell>
                                        <TableCell>Petrol Filling Place</TableCell>
                                        <TableCell style={{textAlign:'center'}}>Date</TableCell>
                                        <TableCell>Filled By</TableCell>
                                        <TableCell>Odo Meter Reading</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataList && dataList.length > 0 && dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                <TableCell>{row.vehicleNo}</TableCell>
                                                <TableCell>{row.vehicleName}</TableCell>
                                                <TableCell>{row.petrolCost}</TableCell>
                                                <TableCell>{row.petrolLiter}</TableCell>
                                                <TableCell>{row.petrolFIllingPlace}</TableCell>
                                                <TableCell>{ moment(row.Date).format('DD-MMM-YYYY hh:mm:a') }</TableCell>
                                                <TableCell>{row.filledBy}</TableCell>
                                                <TableCell>{row.odoMeterReading}</TableCell>
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
            <Modal
                className={classes.middlePosition}
                open={openPetrolExpense} onClose={e => {
                e.preventDefault();
                setopenPetrolExpense(false)
            }}>
                <Paper className={classes.form} sx={{
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                    textAlign: 'center',
                    fontSize: '1rem',
                    fontWeight: '700',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Typography style={{margin: 8}}
                                    variant='h5'
                                    component='div'>
                            Add Petrol Expense Details
                        </Typography>
                        <IconButton aria-label="delete" onClick={e => {
                            e.preventDefault();
                            setopenPetrolExpense(false)
                        }}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <hr className={classes.divider}/>
                    <div className={classes.form}>
                        <TextField
                            style={{margin: 8}}
                            required
                            label='Vehicle Name'
                            className={classes.textFields}
                            value={vehicleName}
                            onChange={e => {
                                setVehicleName(e.target.value)
                            }}
                        />
                        <TextField
                            style={{margin: 8}}
                            label='Vehicle No'
                            required
                            className={classes.textFields}
                            value={vehicleNo}
                            onChange={e => {
                                setVehicleNo(e.target.value)
                            }}
                        />
                        <TextField
                            style={{margin: 8}}
                            label='Petrol in Ltrs'
                            required
                            className={classes.textFields}
                            value={petrolLiter}
                            onChange={e => {
                                setpetrolLiter(e.target.value)
                            }}
                        />
                        <TextField
                            style={{margin: 8}}
                            label='Petrol Cost'
                            required
                            error={petrolCost.match(/^\d+\.\d{0,1}$/) ? 'Please enter valid Cost' : ''}
                            helperText={petrolCost.match(/^\d+\.\d{0,1}$/) ? 'Please enter valid Cost' : ''}
                            className={classes.textFields}
                            value={petrolCost}
                            onChange={e => {
                                setpetrolCost(e.target.value)
                            }}
                        />
                        <TextField
                            style={{margin: 8}}
                            label='Petrol Filling Place'
                            required
                            error={petrolFIllingPlace.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            helperText={petrolFIllingPlace.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            className={classes.textFields}
                            value={petrolFIllingPlace}
                            onChange={e => {
                                setpetrolFIllingPlace(e.target.value)
                            }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={Date}
                                label="Petrol filled Date"
                                onChange={(newvalue) => {
                                    setDate(newvalue);
                                }}
                                renderInput={(params) => (
                                    <TextField className={classes.textFields} style={{margin: 8}} {...params}
                                               helperText={params?.inputProps?.placeholder}/>
                                )}
                            />
                        </LocalizationProvider>
                        <TextField
                            style={{margin: 8}}
                            label='Odo Meter Reading'
                            required
                            error={odoMeterReading.match(/[^0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            helperText={odoMeterReading.match(/[^0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            className={classes.textFields}
                            value={odoMeterReading}
                            onChange={e => {
                                setodoMeterReading(e.target.value)
                            }}
                        />
                        <TextField
                            style={{margin: 8}}
                            label='Filled By'
                            required
                            error={filledBy.match(/[^0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            helperText={filledBy.match(/[^0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            className={classes.textFields}
                            value={filledBy}
                            onChange={e => {
                                setFilledBy(e.target.value)
                            }}
                        />
                        {error ? <Alert
                            severity="warning"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setError(false);
                                    }}>
                                    <CloseIcon fontSize="inherit"/>
                                </IconButton>
                            }
                            sx={{mb: 2}}>
                            Please fill request form properly.
                        </Alert> : null}
                        <Button variant="contained" size="small" className={classes.button} style={{margin: 16}}
                                onClick={(e) => {
                                    e.preventDefault();
                                    AddPetrolExpenseDetails(e)
                                }}>
                            Add Petrol Expense Details
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
        vehiclePetrolExpense: state.request.vehiclePetrolExpense,
        vehiclePetrolExpenseList: state.request.vehiclePetrolExpenseList,
        error: state.request.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getVehicleListData: () => dispatch(ActionCreators.getVehicleListData()),
        AddPetrolExpenseData: (requestBody) => dispatch(ActionCreators.AddPetrolExpenseData(requestBody)),
        getPetrolExpenseListData: (requestBody) => dispatch(ActionCreators.getPetrolExpenseListData(requestBody)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMaintenancepage)
