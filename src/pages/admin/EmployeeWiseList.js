import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {IconButton, Modal, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as ActionCreatorsAdmin from "../../actions/adminAction";
import {connect} from "react-redux";
import {makeStyles} from "@mui/styles";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";


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

const EmployeeWiseList = ({getEmployeeListData, employeeList, getTravellerUpcomingPreviousCountJourneyData, journeyCount}) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenCount, setIsOpenCount] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [identityNumber, setIdentityNumber] = useState('');
    const [license, setLicense] = useState('');
    const [searched, setSearched] = useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const data = getDriverUserList();
    }, []);

    const getDriverUserList = async () => {
        const data = await getEmployeeListData();
        setData(data)
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const requestSearch = (searchedVal) => {
        setSearched(searchedVal);
        let filteredRows;
        if(searchedVal !== '' && searchedVal !== null && searchedVal !== undefined){
            filteredRows = employeeList.filter((row) => {
                const itemData = `${row.firstName.toUpperCase()}}`;
                const textData = searchedVal.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setData(filteredRows);
        }else{
            setData(employeeList);
        }
    };


    // const handleClickOpen = () => {
    //     setUserId('');
    //     setFirstName('');
    //     setMiddleName('');
    //     setLastName('');
    //     setEmail('');
    //     setContactNo('');
    //     setIdentityNumber('');
    //     setIsOpen(true);
    // };

    // const handleEditClickOpen = (row) => {
    //     setUserId(row._id);
    //     setFirstName(row.firstName);
    //     setMiddleName(row.middleName);
    //     setLastName(row.lastName);
    //     setEmail(row.emailId);
    //     setContactNo(row.contactNo);
    //     setIdentityNumber(row.identityNumber);
    //     setOpenEdit(true);
    // };

    const handleCountClickOpen = (row) => {
        getTravellerUpcomingPreviousCountJourneyData(row._id);
        setIsOpenCount(true);
    };

    // const addDriverDetails = async (e) => {
    //     e.preventDefault();
    //     setIsOpen(false);
    //     // const data = await addDriverListData({
    //     //     firstName: firstName,
    //     //     middleName: middleName,
    //     //     lastName: lastName,
    //     //     emailId: email,
    //     //     contactNo: contactNo,
    //     //     designation: 'Driver',
    //     //     identityNumber: identityNumber,
    //     //     identityType: 'License',
    //     //     userRole: 'Driver',
    //     // });
    //     if(data){
    //         getDriverUserList()
    //     }
    // };
    //
    // const updateDriverDetails = e => {
    //     e.preventDefault();
    //     setIsOpen(false);
    //     updateVehicleListData({
    //         vehicleId: vehicleId,
    //         agencyName: agencyName,
    //         agencyNumber: agencyNumber,
    //         vehicleType: vehicleType,
    //         vehicleName: vehicleName,
    //         capacity: capacity,
    //         vehicleNo: vehicleNo,
    //         updatedBy: adminDetails?.user._id
    //     })
    // };



    return (
        <div className="container">
            <Box sx={{display: 'flex', justifyContent: 'space-between', m: 2, bgcolor: 'background.paper',  '& button': { m: 1 } }}>
                <div><h1>Employees</h1></div>
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
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
                                <TableCell>First Name</TableCell>
                                <TableCell>Email Id</TableCell>
                                <TableCell>Contact No.</TableCell>
                                <TableCell>Total Rides</TableCell>
                                <TableCell>Completed Rides</TableCell>
                                {/*<TableCell>Action</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        <TableCell style={{color:'blue'}} onClick={() => navigate('/admin/employee-wise-journey-list', { state: row})}>{row.firstName+' '+row.middleName+' '+row.lastName}</TableCell>
                                        <TableCell>{row.emailId}</TableCell>
                                        <TableCell>{row.contactNo}</TableCell>
                                        <TableCell>{row.totalRides}</TableCell>
                                        <TableCell>{row.completeRides}</TableCell>
                                        {/*<TableCell>{row.identityNumber}</TableCell>*/}
                                        {/*<Button style={{margin:4, paddingLeft:24, paddingRight:24, width:40}} size="small" onClick={()=>handleCountClickOpen(row)}>Journey Count</Button>*/}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Modal
                className={classes.middlePosition}
                open={isOpen} onClose={e => {
                e.preventDefault();
                setIsOpen(false)
            }}>
                <Paper className={classes.form} sx={{p: 1, m: 1, borderRadius: 1, textAlign: 'center', fontSize: '1rem', fontWeight: '700',}}>
                    <Typography style={{margin:16}}
                                variant='h5'
                                component='div'>
                        Add Driver Details
                    </Typography>
                    <hr className={classes.divider}/>
                    <div className={classes.form}>
                        <TextField style={{margin:16}}
                                   label='First Name'
                                   className={classes.textFields}
                                   value={firstName}
                                   onChange={e => {setFirstName(e.target.value)}}
                        />
                        <TextField style={{margin:16}}
                                   label='Middle Name'
                                   className={classes.textFields}
                                   value={middleName}
                                   onChange={e => {setMiddleName(e.target.value)}}
                        />
                        <TextField style={{margin:16}}
                                   label='Last Name'
                                   className={classes.textFields}
                                   value={lastName}
                                   onChange={e => {setLastName(e.target.value)}}
                        />
                        <TextField style={{margin:16}}
                                   label='Email'
                                   className={classes.textFields}
                                   value={email}
                                   onChange={e => {setEmail(e.target.value)}}
                        />
                        <TextField style={{margin:16}}
                                   label='Contact No'
                                   className={classes.textFields}
                                   value={contactNo}
                                   onChange={e => {setContactNo(e.target.value)}}
                        />
                        <TextField style={{margin:16}}
                                   label='License No'
                                   className={classes.textFields}
                                   value={identityNumber}
                                   onChange={e => {setIdentityNumber(e.target.value)}}
                        />
                    </div>
                    {/*<Button className={classes.button} style={{margin: 16}} onClick={(e)=>{*/}
                    {/*    e.preventDefault();*/}
                    {/*    addDriverDetails(e)*/}
                    {/*}}>*/}
                    {/*    Add Driver Details*/}
                    {/*</Button>*/}
                </Paper>
            </Modal>
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
                    <Typography style={{margin:16}}
                                variant='h5'
                                component='div'>
                        Update Driver Details
                    </Typography>
                    <hr className={classes.divider}/>
                    <TextField style={{margin:16}}
                               label='First Name'
                               className={classes.textFields}
                               value={firstName}
                               onChange={e => {setFirstName(e.target.value)}}
                    />
                    <TextField style={{margin:16}}
                        label='Name'
                        className={classes.textFields}
                        value={middleName}
                        onChange={e => {setMiddleName(e.target.value)}}
                    />
                    <TextField style={{margin:16}}
                               label='Last Name'
                               className={classes.textFields}
                               value={lastName}
                               onChange={e => {setLastName(e.target.value)}}
                    />
                    <TextField style={{margin:16}}
                        label='Email'
                        className={classes.textFields}
                        value={email}
                        onChange={e => {setEmail(e.target.value)}}
                    />
                    <TextField style={{margin:16}}
                        label='License'
                        className={classes.textFields}
                        value={license}
                        onChange={e => {setLicense(e.target.value)}}
                    />
                    <Button className={classes.button} style={{margin: 16}} onClick={(e)=>{
                        e.preventDefault();
                        // updateDriverDetails(e)
                    }}>
                        Update Driver Details
                    </Button>
                </Paper>
            </Modal>
            <Modal
                className={classes.middlePosition}
                open={isOpenCount} onClose={e => {
                e.preventDefault();
                setIsOpenCount(false)
            }}>
                <Paper className={classes.form} sx={{
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                    textAlign: 'center',
                    fontSize: '1rem',
                    fontWeight: '700',
                }} style={{minWidth:320}}>
                    <Stack direction="row" justifyContent="space-between"
                           alignItems="center" spacing={2}>
                        <Stack direction="column">
                            <Typography variant='h6' component='div'> Journey Count Details</Typography>
                        </Stack>
                        <IconButton aria-label="delete" onClick={e => {
                            e.preventDefault();
                            setIsOpen(false)
                        }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <hr className={classes.divider}/>
                    <div className={classes.travellerItem}>
                        <p className={classes.itemRightSection}>Upcoming Journey Count</p>
                        <p className={classes.itemRightSection}>
                            <Typography variant='h6' component='div' style={{textAlign:"center", color: '#0c1572'}}>
                                {journeyCount && journeyCount.upcomingRides}
                            </Typography>

                        </p>
                    </div>
                    <div className={classes.travellerItem}>
                        <p className={classes.itemRightSection}>Previous Journey count</p>
                        <p className={classes.itemRightSection}>
                            <Typography variant='h6' component='div' style={{textAlign:"center", color: '#0c1572'}}>
                                {journeyCount && journeyCount.prevoiusRides}
                            </Typography>

                        </p>
                    </div>
                </Paper>
            </Modal>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        employeeList: state.admin.employeeList,
        journeyCount: state.admin.journeyCount,
        loading: state.request.loading,
        error: state.request.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getEmployeeListData: (requestBody) => dispatch(ActionCreatorsAdmin.getEmployeeListData(requestBody)),
        getTravellerUpcomingPreviousCountJourneyData: (requestBody) => dispatch(ActionCreatorsAdmin.getTravellerUpcomingPreviousCountJourneyData(requestBody)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeWiseList)
