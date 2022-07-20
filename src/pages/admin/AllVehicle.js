import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import {IconButton, Modal, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import * as ActionCreators from "../../actions/requestAction";
import SearchIcon from "@mui/icons-material/Search";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import Alert from "@mui/material/Alert";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


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
    form:{
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
}));

    const fuel = [
        {
            value:'Petrol',
            label:'Petrol',
        },
        {
            value:'Disel',
            label:'Disel',
        },
        {
            value:'CNG',
            label:'CNG',
        },
        {
            value:'Petrol/CNG',
            label:'Petrol/CNG',
        },
    ]

const AllVehicle = ({adminDetails, vehicleList, getVehicleListData, addVehicleListData, updateVehicleListData,AddMaintenanceData}) => {

    const classes = useStyles();
    const [data, setData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isOpen, setIsOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openMaintenance, setOpenMaintenace] = useState(false);
    const [vehicleId, setVehicleId] = useState('');
    const [agencyName, setAgencyName] = useState();
    const [agencyNumber, setAgencyNumber] = useState();
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');
    const [manufactureYear, setManufactureYear] = useState("");
    const [model, setModel] = useState("");
    const [making, setMaking] = useState("");
    const [homeLocation, setHomeLocation] = useState("");
    const [searched, setSearched] = useState("");
    const [count, setCount] = useState(0);
    const [error, setError] = useState(false);
    const [maintenaceDescription,setmaintenaceDescription] = useState("");
    const [maintenaceCost,setmaintenaceCost] = useState("");
    const [maintenacePlace,setmaintenacePlace] = useState("");
    const [maintenacePlaceNo,setmaintenacePlaceNo] = useState("");
    const [maintenaceStartDate,setmaintenaceStartDate] = useState("");
    const [maintenaceEndDate,setmaintenaceEndDate] = useState("");
    const [odoMeterReading,setodoMeterReading] = useState('');
    const [fuelType,setfuelType] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getVehicleList();
    }, []);

    const getVehicleList = async () => {
        const data = await getVehicleListData();
        setData(data);
        setCount(data.length)
    };


    const handleClickOpen = () => {
        setVehicleId('');
        setVehicleType('');
        setVehicleName('');
        setCapacity('');
        setVehicleNo('');
        setManufactureYear('');
        setModel('');
        setMaking('');
        setHomeLocation('');
        setfuelType('')

        setIsOpen(true);
    };

    const handleEditClickOpen = (row) => {
        setVehicleId(row._id);
        setVehicleType(row.vehicleType);
        setVehicleName(row.vehicleName);
        setCapacity(row.capacity);
        setVehicleNo(row.vehicleNo);
        setManufactureYear(row.manufactureYear);
        setModel(row.model);
        setMaking(row.make);
        setHomeLocation(row.homeLocation);
        setfuelType(row.fuelType)
        setOpenEdit(true);
    };

    const handleMaintenanceClickOpen = (row) => {
        console.log('In handle click maintainence',row)
        setVehicleId(row._id);
        setVehicleName(row.vehicleName);
        setVehicleNo(row.vehicleNo);
        setmaintenaceDescription('');
        setmaintenaceCost('');
        setmaintenacePlace('');
        setmaintenacePlaceNo('');
        setmaintenaceStartDate('');
        setmaintenaceEndDate('');
        setodoMeterReading('');

        setOpenMaintenace(true);
    };

    const addVehicleDetails = async (e) => {
        if (
            vehicleType !==' ' &&
            vehicleName !=='' &&
            capacity !=='' &&
            vehicleNo !=='' &&
            manufactureYear !=='' &&
            model !=='' &&
            making !=='' &&
            homeLocation !=='' &&
            fuelType !== '' &&
            adminDetails?.user._id !==''
        ) {
            e.preventDefault();
            setIsOpen(false);
            const data = await addVehicleListData({
                vehicleType: vehicleType,
                vehicleName: vehicleName,
                capacity: capacity,
                vehicleNo: vehicleNo,
                manufactureYear: manufactureYear,
                model: model,
                make: making,
                homeLocation: homeLocation,
                fuelType: fuelType,
                createdBy: adminDetails?.user._id
            });
            if(data){
                await getVehicleList()
            }
        }else {
            setError(true);
        }
    };

    const updateVehicleDetails = async (e) => {
        if (
            vehicleId !==' ' &&
            agencyName !=='' &&
            agencyNumber !=='' &&
            vehicleType !=='' &&
            vehicleName !=='' &&
            capacity !=='' &&
            vehicleNo !=='' &&
            manufactureYear !=='' &&
            model !=='' &&
            making !=='' &&
            homeLocation !=='' &&
            fuelType !== '' &&
            adminDetails?.user._id !==''
        ) {
            e.preventDefault();
            setOpenEdit(false)
            const data = await updateVehicleListData({
                vehicleId: vehicleId,
                agencyName: agencyName,
                agencyNumber: agencyNumber,
                vehicleType: vehicleType,
                vehicleName: vehicleName,
                capacity: capacity,
                vehicleNo: vehicleNo,
                manufactureYear: manufactureYear,
                model: model,
                make: making,
                homeLocation: homeLocation,
                fuelType: fuelType,
                updatedBy: adminDetails?.user._id
            });
            if(data){
                await getVehicleList()
            }
        }else {
            setError(true);
        }

    };

    const AddMaintenanceDetails = async (e) => {
        if (

            console.log('ID checked') &&
            vehicleName !=='' &&
            console.log('Name checked') &&
            vehicleNo !=='' &&
            console.log('NO checked') &&
            maintenaceDescription !=='' &&
            console.log('desc checked') &&
            maintenaceCost !=='' &&
            console.log('cost checked') &&
            maintenacePlace !=='' &&
            console.log('place checked') &&
            maintenacePlaceNo !=='' &&
            console.log('maintainplace checked') &&
            maintenaceStartDate !=='' &&
            console.log('start checked') &&
            maintenaceEndDate !=='' &&
            console.log('end checked') &&
            odoMeterReading !=='' &&
            console.log('odometer checked') &&

            adminDetails?.user._id !==''
        ) {
            e.preventDefault();
            const data = await AddMaintenanceData({

                vehicleName: vehicleName,
                vehicleNo: vehicleNo,
                maintenaceDescription : maintenaceDescription ,
                maintenaceCost: maintenaceCost,
                maintenacePlace : maintenacePlace ,
                maintenacePlaceNo : maintenacePlaceNo ,
                maintenaceStartDate : maintenaceStartDate ,
                maintenaceEndDate : maintenaceEndDate ,
                odoMeterReading : odoMeterReading ,


                createdBy: adminDetails?.user._id
            });
            if(data){
                await getVehicleList()
            }
        }else {
            setError(true);
            console.log('something went wrong')
        }

    };

    const requestSearch = (searchedVal) => {
        setSearched(searchedVal);
        let filteredRows;
        if(searchedVal !== '' && searchedVal !== null && searchedVal !== undefined){
            filteredRows = vehicleList.filter((row) => {
                const itemData = `${row.agencyName.toUpperCase()} ${row.vehicleName.toUpperCase()} ${row.vehicleNo.toUpperCase()} ${row.model.toUpperCase()}  ${row.capacity.toUpperCase()}`;
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
            <Box sx={{display: 'flex', justifyContent: 'space-between', m: 2, bgcolor: 'background.paper',  '& button': { m: 1 } }}>
                <div><h1>Vehicles</h1></div>
                <div><Button  variant="contained" size="small" onClick={handleClickOpen}>Add Vehicle</Button></div>
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
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
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Company Name</TableCell>
                                <TableCell>Vehicle Type</TableCell>
                                <TableCell>Vehicle Name</TableCell>
                                <TableCell>Capacity</TableCell>
                                <TableCell>Vehicle No</TableCell>
                                {/*<TableCell>License</TableCell>*/}
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.length > 0 && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        <TableCell>{row.agencyName}</TableCell>
                                        <TableCell>{row.vehicleType}</TableCell>
                                        <TableCell>{row.model} - {row.make}</TableCell>
                                        <TableCell>{row.capacity}</TableCell>
                                        <TableCell>{row.vehicleNo}</TableCell>
                                        {/*<TableCell>{row.contactNo}</TableCell>*/}
                                        <TableCell>
                                        <Button style={{margin:4, padding:2, width:40}} variant="contained" size="small" onClick={()=>handleEditClickOpen(row)}>Edit</Button>
                                        {/* <Button style={{margin:4, padding:2}} variant="contained" size="large" onClick={()=>handleMaintenanceClickOpen(row)}>Maintenance</Button> */}
                                        </TableCell>
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
            {/* Add vehicle */}
            <Modal
                className={classes.middlePosition}
                open={isOpen} onClose={e => {
                e.preventDefault();
                setIsOpen(false)}}>
                <Paper className={classes.form} sx={{
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                    textAlign: 'center',
                    fontSize: '1rem',
                    fontWeight: '700',
                }}>
                    <div style={{display: 'flex', flexDirection: 'row',  justifyItems: 'center', justifyContent: 'space-between',  }}>
                        <Typography style={{margin:8}}
                                    variant='h5'
                                    component='div'>
                            Add Vehicle
                        </Typography>
                        <IconButton aria-label="delete" onClick={e => {
                            e.preventDefault();
                            setIsOpen(false)
                        }}>
                            <CloseIcon />
                        </IconButton>

                    </div>
                    <hr className={classes.divider}/>
                    <div className={classes.form}>
                        <TextField style={{margin:8}}
                               label='Vehicle Type'
                               className={classes.textFields}
                               value={vehicleType}
                               onChange={e => {setVehicleType(e.target.value)}}
                        />
                        <TextField style={{margin:8}}
                               // required
                               // error={vehicleName.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle name' : ''}
                               // helperText={vehicleName.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle name' : ''}
                               label='Vehicle Name'
                               className={classes.textFields}
                               value={vehicleName}
                               onChange={e => {setVehicleName(e.target.value)}}
                         />
                        <TextField style={{margin:8}}
                               required
                               error= { capacity.match(/[^0-9]/g) ? 'Please enter valid capacity' : ''}
                               helperText={capacity.match(/[^0-9]/g) ? 'Please enter valid capacity' : ''}
                               label='Capacity'
                               className={classes.textFields}
                               value={capacity}
                               onChange={e => {setCapacity(e.target.value)}}
                        />
                        <TextField style={{margin:8}}
                               required
                               error={vehicleNo.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle no' : ''}
                               helperText={vehicleNo.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle no' : ''}
                               label='Vehicle No'
                               className={classes.textFields}
                               value={vehicleNo}
                               onChange={e => {setVehicleNo(e.target.value)}}
                        />
                        <TextField style={{margin:8}}
                               required
                               error={manufactureYear.match(/[^0-9]/g) ? 'Please enter valid manufacture year' : ''}
                               helperText={manufactureYear.match(/[^0-9]/g) ? 'Please enter valid manufacture year' : ''}
                               label='Manufacture Year'
                               className={classes.textFields}
                               value={manufactureYear}
                               onChange={e => {setManufactureYear(e.target.value)}}
                        />
                        <TextField style={{margin:8}}
                               label='Modal'
                               className={classes.textFields}
                               value={model}
                               onChange={e => {setModel(e.target.value)}}
                        />
                         <TextField style={{margin:8}}
                               label='make'
                               className={classes.textFields}
                               value={making}
                               onChange={e => {setMaking(e.target.value)}}
                        />
                        <TextField style={{margin:8}}
                               label='Home Location'
                               className={classes.textFields}
                               value={homeLocation}
                               onChange={e => {setHomeLocation(e.target.value)}}
                        />
                        <TextField
                            style={{margin:8}}
                            id="outlined-select-currency"
                            select
                            label="Select"
                            helperText="Please select Vehicle fuel Type"
                            value={fuelType}
                            className={classes.textFields}
                            onChange={ e => { setfuelType(e.target.value) } }
                        >
                            {fuel.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                            ))}
                        </TextField>
                        {/* <FormControl >
                        <InputLabel id="demo-simple-select-label">License</InputLabel>
                        <Select style={{minWidth:210,margin:8}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="License">
                            <MenuItem value={10}>Junior License </MenuItem>
                            <MenuItem value={20}>Commercial Driver's License  </MenuItem>
                            <MenuItem value={30}>Taxi and Livery </MenuItem>
                            <MenuItem value={30}>Motorcycles </MenuItem>
                        </Select>
                        </FormControl> */}
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
                        sx={{ mb: 2 }}>
                        Please fill request form properly.
                        </Alert>:null}
                        <Button  variant="contained" size="small" className={classes.button} style={{margin: 16}} onClick={(e)=>{
                        e.preventDefault();
                        addVehicleDetails(e)
                        }}>
                            Add vehicle Details
                        </Button>
                    </div>
                </Paper>
            </Modal>
            {/* Edit vehicle */}
            <Modal
                className={classes.middlePosition}
                open={openEdit} onClose={e => {
                e.preventDefault();
                setOpenEdit(false)
            }}>
                <Paper className={classes.form} sx={{
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                    textAlign: 'center',
                    fontSize: '1rem',
                    fontWeight: '700',
                }}>
                    <div style={{display: 'flex', flexDirection: 'row',  justifyItems: 'center', justifyContent: 'space-between',  }}>
                        <Typography style={{margin:8}}
                                    variant='h5'
                                    component='div'>
                            Update Vehicle Details
                        </Typography>
                        <IconButton aria-label="delete" onClick={e => {e.preventDefault(); setOpenEdit(false)}}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <hr className={classes.divider}/>
                    <div className={classes.form}>
                        <TextField style={{margin:8}}
                                   label='Vehicle Type'
                                   className={classes.textFields}
                                   value={vehicleType}
                                   onChange={e => {setVehicleType(e.target.value)}}
                        />
                        <TextField
                            style={{margin:8}}
                            // required
                            // error={vehicleName.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle name' : ''}
                            // helperText={vehicleName.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle name' : ''}
                            label='Vehicle Name'
                            className={classes.textFields}
                            value={vehicleName}
                            onChange={e => {setVehicleName(e.target.value)}}
                        />
                        <TextField
                            style={{margin:8}}
                            required
                            error={capacity.match(/[^0-9]/g) ? 'Please enter valid capacity' : ''}
                            helperText={capacity.match(/[^0-9]/g) ? 'Please enter valid capacity' : ''}
                            label='Capacity'
                            className={classes.textFields}
                            value={capacity}
                            onChange={e => {setCapacity(e.target.value)}}
                        />
                        <TextField
                            style={{margin:8}}
                            label='vehicleNo'
                            required
                            error={vehicleNo.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            helperText={vehicleNo.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            className={classes.textFields}
                            value={vehicleNo}
                            onChange={e => {setVehicleNo(e.target.value)}}
                        />
                        <TextField style={{margin:8}}
                                   required
                                   error={manufactureYear.match(/[^0-9]/g) ? 'Please enter valid manufacture year' : ''}
                                   helperText={manufactureYear.match(/[^0-9]/g) ? 'Please enter valid manufacture year' : ''}
                                   label='Manufacture Year'
                                   className={classes.textFields}
                                   value={manufactureYear}
                                   onChange={e => {setManufactureYear(e.target.value)}}
                        />
                        <TextField style={{margin:8}}
                                   label='Modal'
                                   className={classes.textFields}
                                   value={model}
                                   onChange={e => {setModel(e.target.value)}}
                        />
                        <TextField style={{margin:8}}
                                   label='make'
                                   className={classes.textFields}
                                   value={making}
                                   onChange={e => {setMaking(e.target.value)}}
                        />
                        <TextField style={{margin:8}}
                                   label='Home Location'
                                   className={classes.textFields}
                                   value={homeLocation}
                                   onChange={e => {setHomeLocation(e.target.value)}}
                        />
                        <TextField
                            style={{margin:8}}  
                            id="outlined-select-currency"
                            select
                            label="Select"
                            helperText="Please select Vehicle fuel Type"
                            value={fuelType}
                            className={classes.textFields}
                            onChange={ e => { setfuelType(e.target.value) } }
                        >
                            {fuel.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                            ))}
                        </TextField>
                        {/* <FormControl >
                            <InputLabel id="demo-simple-select-label">License</InputLabel>
                        <Select style={{minWidth:200,margin:8}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="License">
                            <MenuItem value={10}>Junior License </MenuItem>
                            <MenuItem value={20}>Commercial Driver's License  </MenuItem>
                            <MenuItem value={30}>Taxi and Livery </MenuItem>
                            <MenuItem value={30}>Motorcycles </MenuItem>
                        </Select>
                        </FormControl> */}
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
                        sx={{ mb: 2 }}>
                        Please fill request form properly.
                    </Alert>:null}
                    <Button variant="contained" size="small" className={classes.button} style={{margin: 16}} onClick={(e)=>{
                        e.preventDefault();
                        updateVehicleDetails(e)
                    }}>
                        Update Vehicle Details
                    </Button>
                    </div>
                </Paper>
            </Modal>
            {/* Add vehicle Maintenance */}
            <Modal
                className={classes.middlePosition}
                open={openMaintenance} onClose={e => {
                e.preventDefault();
                setOpenMaintenace(false)
            }}>
                <Paper className={classes.form} sx={{
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                    textAlign: 'center',
                    fontSize: '1rem',
                    fontWeight: '700',
                }}>
                    <div style={{display: 'flex', flexDirection: 'row',  justifyItems: 'center', justifyContent: 'space-between',  }}>
                        <Typography style={{margin:8}}
                                    variant='h5'
                                    component='div'>
                            Add Vehicle Maintenance Details
                        </Typography>
                        <IconButton aria-label="delete" onClick={e => {e.preventDefault(); setOpenMaintenace(false)}}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <hr className={classes.divider}/>
                    <div className={classes.form}>
                        <TextField
                            style={{margin:8}}
                            required
                        //    error={vehicleName.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle name' : ''}
                        //    helperText={vehicleName.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle name' : ''}
                            label='Vehicle Name'
                            className={classes.textFields}
                            value={vehicleName}
                            onChange={e => {setVehicleName(e.target.value)}}
                        />
                        <TextField
                            style={{margin:8}}
                            label='Vehicle No'
                            required
                        //    error={vehicleNo.match(/[^0-9]/g) ? 'Please enter valid vehicle no' : ''}
                        //    helperText={vehicleNo.match(/[^0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            className={classes.textFields}
                            value={vehicleNo}
                            onChange={e => {setVehicleNo(e.target.value)}}
                        />
                        <TextField
                            style={{margin:8}}
                            label='Maintenace Description'
                            required
                            error={maintenaceDescription.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            helperText={maintenaceDescription.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            className={classes.textFields}
                            value={maintenaceDescription}
                            onChange={e => {setmaintenaceDescription(e.target.value)}}
                        />
                        <TextField
                            style={{margin:8}}
                            label='Maintenace Cost'
                            required
                            error={maintenaceCost.match(/^\d+\.\d{0,1}$/) ? 'Please enter valid Cost' : ''}
                            helperText={maintenaceCost.match(/^\d+\.\d{0,1}$/) ? 'Please enter valid Cost' : ''}
                            className={classes.textFields}
                            value={maintenaceCost}
                            onChange={e => {setmaintenaceCost(e.target.value)}}
                        />
                         <TextField
                            style={{margin:8}}
                            label='Maintenace Place'
                            required
                            error={maintenacePlace.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            helperText={maintenacePlace.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            className={classes.textFields}
                            value={maintenacePlace}
                            onChange={e => {setmaintenacePlace(e.target.value)}}
                        />
                        <TextField
                            style={{margin:8}}
                            label='Maintenace Place No '
                            required
                            error={maintenacePlaceNo.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            helperText={maintenacePlaceNo.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            className={classes.textFields}
                            value={maintenacePlaceNo}
                            onChange={e => {setmaintenacePlaceNo(e.target.value)}}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={maintenaceStartDate}
                            label="Maintenance Start Date"
                            onChange = { (newvalue) => {
                                setmaintenaceStartDate(newvalue);
                            } }
                            renderInput={(params) => (
                                <TextField  className={classes.textFields} style={{ margin:8 }} {...params} helperText={params?.inputProps?.placeholder} />
                              )}
                        />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker
                            style={{margin:8}}
                            value={maintenaceEndDate}
                            label="Maintenance End Date"
                            onChange = { (newvalue) => {
                                setmaintenaceEndDate(newvalue);
                            } }
                            renderInput={(params) => (
                                <TextField  className={classes.textFields} style={{ margin:8 }} {...params} helperText={params?.inputProps?.placeholder} />
                              )}
                        />
                        </LocalizationProvider>
                         <TextField
                            style={{margin:8}}
                            label='Odo Meter Reading'
                            required
                            error={ odoMeterReading.match(/[^0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            helperText={ odoMeterReading.match(/[^0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            className={classes.textFields}
                            value={odoMeterReading}
                            onChange={e => {setodoMeterReading(e.target.value)}}
                        />
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
                        sx={{ mb: 2 }}>
                        Please fill request form properly.
                    </Alert>:null}
                    <Button variant="contained" size="small" className={classes.button} style={{margin: 16}} onClick={(e)=>{
                        e.preventDefault();
                        AddMaintenanceDetails(e)
                    }}>
                        Add Vehicle Maintenance Details
                    </Button>
                    </div>
                </Paper>
            </Modal>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        adminDetails: state.admin.adminDetails,
        vehicleList: state.request.vehicleList,
        error: state.request.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getVehicleListData: () => dispatch(ActionCreators.getVehicleListData()),
        addVehicleListData: (requestBody) => dispatch(ActionCreators.addVehicleListData(requestBody)),
        updateVehicleListData: (requestBody) => dispatch(ActionCreators.updateVehicleListData(requestBody)),
        AddMaintenanceData: (requestBody) => dispatch(ActionCreators.AddMaintenanceData(requestBody)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllVehicle)
