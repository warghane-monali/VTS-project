import React, {useEffect, useState} from 'react';
import * as ActionCreatorsAdmin from "../../actions/adminAction";
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
import {Avatar, IconButton, Modal, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputAdornment from "@mui/material/InputAdornment";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";


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
        width: '100px !important',
        height: '100px !important',
        margin: '20px',
    },
    form:{
        height: 600,
        overflow: "scroll !important"
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
        justifyContent: 'center',
        height:700
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


const AllDrivers = ({getDriverUserListData, userList, addDriverListData, updateDriverListData}) => {

    const classes = useStyles();

    const [data, setData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isOpen, setIsOpen] = useState(false);
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
    const [image, setImage] = useState(null);
    const [imageLic, setImageLic] = useState(null);
    const [error, setError] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getDriverUserList();
    }, []);

    const getDriverUserList = async () => {
        const data = await getDriverUserListData();
        setData(data)
    };

    const handleChange = e => {
        if (e.target.files.length) {
            const img = URL.createObjectURL(e.target.files[0]);
            setImage(img);
        }
    };

    const handleChangeLic = e => {
        if (e.target.files.length) {
            const img = URL.createObjectURL(e.target.files[0]);
            setImageLic(img);
        }
    };

    // const cancelSearch = () => {
    //     setSearched("");
    //     requestSearch(searched);
    // };

    const requestSearch = (searchedVal) => {
        setSearched(searchedVal);
        let filteredRows;
        if(searchedVal !== '' && searchedVal !== null && searchedVal !== undefined){
            filteredRows = userList.filter((row) => {
                let firstName = `${row && row.firstName && row.firstName.toUpperCase()}`;
                let middleName = `${row && row.middleName && row.middleName.toUpperCase()}`;
                let lastName = `${row && row.lastName && row.lastName.toUpperCase()}`;
                let itemData = `${firstName} ${middleName} ${lastName}`;
                searchedVal = searchedVal.toUpperCase();
                return itemData.indexOf(searchedVal) > -1;
            });
            setData(filteredRows);
        }else{
            setData(userList);
        }
    };


    const handleClickOpen = () => {
        setUserId('');
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setEmail('');
        setContactNo('');
        setIdentityNumber('');
        setIsOpen(true);
    };

    const handleEditClickOpen = (row) => {
        setUserId(row._id);
        setFirstName(row.firstName);
        setMiddleName(row.middleName);
        setLastName(row.lastName);
        setEmail(row.emailId);
        setContactNo(row.contactNo);
        setIdentityNumber(row.identityNumber);
        setOpenEdit(true);
    };

    const addDriverDetails = async (e) => {
        if (
            firstName !==' ' &&
            middleName !=='' &&
            lastName !=='' &&
            email !=='' &&
            contactNo !=='' &&
            identityNumber !==''
        ) {
            e.preventDefault();
            setIsOpen(false);
            const data = await addDriverListData({
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                emailId: email,
                contactNo: contactNo,
                designation: 'Driver',
                identityNumber: identityNumber,
                identityType: 'License',
                userRole: 'Driver',
            });
            if(data){
                getDriverUserList()
            }
        }else {
            setError(true);
        }
    };

    const updateDriverDetails = async (row) => {
        if (
            firstName !==' ' &&
            lastName !=='' &&
            middleName !=='' &&
            email !==''
        ){
            setOpenEdit(false);
            const data = await updateDriverListData({
                userId: userId,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                emailId: email,
            });
            if (data) {
                getDriverUserList()
            }
        }else {
            setError(true);
        }
    };



    return (
        <div className="container">
            <Box sx={{display: 'flex', justifyContent: 'space-between', m: 2, bgcolor: 'background.paper',  '& button': { m: 1 } }}>
                <div><h1>Driver</h1></div>
                <div><Button  variant="contained" size="small" onClick={handleClickOpen}>Add Driver</Button></div>
            </Box>
            <Paper sx={{ width: '100%' }}>
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
                                <TableCell>Full Name</TableCell>
                                <TableCell>Email Id/Contact No.</TableCell>
                                <TableCell>License</TableCell>
                                <TableCell>Total Rides</TableCell>
                                <TableCell>Completed Rides</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        <TableCell  style={{color:'blue'}} onClick={() => {}}>{`${row.firstName !== null ? `${row.firstName}` : ''} ${row.middleName !== null ? `${row.middleName}` : ''} ${row.lastName !== null ? `${row.lastName}` : ''}`}</TableCell>
                                        <TableCell>
                                            <Typography variant='body-1' component='div'>
                                                {row.emailId}
                                            </Typography>
                                            <Typography variant='body-1' component='div'>
                                                {row.contactNo}
                                            </Typography>

                                        </TableCell>
                                        <TableCell>{row.identityNumber}</TableCell>
                                        <TableCell>{row.totalRides}</TableCell>
                                        <TableCell>{row.completeRides}</TableCell>
                                        <Button style={{margin:4, padding:2, width:40}} variant="contained" size="small" onClick={()=>handleEditClickOpen(row)}>Edit</Button>
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

                <Paper sx={{p: 1, m: 1, borderRadius: 1, textAlign: 'center', fontSize: '1rem', fontWeight: '700'}}>
                    <div className={classes.form}>
                        <div style={{display: 'flex', flexDirection: 'row',  justifyItems: 'center', justifyContent: 'space-between'}}>
                            <Typography style={{margin:16}}
                                        variant='h5'
                                        component='div'>
                                Add Driver Details
                            </Typography>
                            <IconButton aria-label="delete" onClick={e => {
                                e.preventDefault();
                                setIsOpen(false)
                            }}>
                                <CloseIcon />
                            </IconButton>

                        </div>
                        <hr className={classes.divider}/>
                        <div className={classes.form} sx={{
                            p: 1,
                            m: 1,
                            borderRadius: 1,
                            textAlign: 'center',
                            fontSize: '1rem',
                            fontWeight: '700',
                        }}>
                            <div style={{justifyItems: 'center', justifyContent: 'center',  }}>
                                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleChange} style={{ display: "none" }}/>
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <Avatar src={image} className={classes.profilePicture} />
                                    </IconButton>
                                </label>
                            </div>
                            <TextField
                                error={firstName.match(/[^a-zA-Z]/g)}
                                helperText={firstName.match(/[^a-zA-Z]/g) ? 'Invalid entry' : ''}
                                required
                                inputProps={{pattern: "[a-z]"}}
                                style={{margin:16}}
                                       label='First Name'
                                       className={classes.textFields}
                                       value={firstName}
                                       onChange={e => {setFirstName(e.target.value.replace(/[^a-zA-Z]/g, ""))}}
                            />
                            <TextField style={{margin:16}}
                                       label='Middle Name'
                                       className={classes.textFields}
                                       value={middleName}
                                       onChange={e => {setMiddleName(e.target.value.replace(/[^a-zA-Z]/g, ""))}}
                            />
                            <TextField
                                error={lastName.match(/[^a-zA-Z]/g)}
                                helperText={lastName.match(/[^a-zA-Z]/g) ? 'Invalid entry' : ''}
                                required
                                style={{margin:16}}
                                       label='Last Name'
                                       className={classes.textFields}
                                       value={lastName}
                                       onChange={e => {setLastName(e.target.value.replace(/[^a-zA-Z]/g, ""))}}
                            />
                            <TextField
                                error={!email.match( /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)}
                                helperText={!email.match( /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/) ? 'Invalid entry' : ''}
                                required
                                style={{margin:16}}
                                       label='Email'
                                       className={classes.textFields}
                                       value={email}
                                       onChange={e => {setEmail(e.target.value)}}
                            />
                            <TextField
                                error={contactNo.match( /[^0-9]/g)}
                                helperText={contactNo.match( /[^0-9]/g) ? 'Please enter valid mobile No.' : ''}
                                required
                                inputProps={{maxLength: 10 , pattern: "[0-9]{10,11}" }}
                                style={{margin:16}}
                                       label='Contact No'
                                       className={classes.textFields}
                                       value={contactNo}
                                       onChange={e => {setContactNo(e.target.value.replace(/[^0-9]/g, ""))}}
                            />
                            <TextField
                                error={identityNumber && identityNumber.match( /[^a-zA-Z0-9]/g)}
                                helperText={identityNumber && identityNumber.match( /[^a-zA-Z0-9]/g) ? 'Please enter valid License No.' : ''}
                                required
                                style={{margin:16}}
                                       label='License No'
                                       className={classes.textFields}
                                       value={identityNumber}
                                       onChange={e => {setIdentityNumber(e.target.value)}}
                                       InputProps={{
                                           endAdornment:
                                               <InputAdornment position="end">
                                                   <input
                                                       style={{ display: "none" }}
                                                       id="contained-button-file-lic"
                                                       type="file"
                                                       onChange={handleChangeLic}
                                                   />
                                                   <label htmlFor="contained-button-file-lic">
                                                       <Button variant="contained" color="primary" component="span">
                                                           Upload License
                                                       </Button>
                                                   </label>
                                               </InputAdornment>
                                       }}
                            />
                        <div style={{flexDirection:'row' ,justifyItems: 'center', justifyContent: 'center'}}>
                            <img src={imageLic} className={classes.profilePicture} />
                        </div>
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
                        <Button className={classes.button} style={{margin: 16}} variant="contained" onClick={(e)=>{
                            e.preventDefault();
                            addDriverDetails(e)
                        }}>
                            Submit
                        </Button>
                        </div>
                    </div>
                </Paper>
            </Modal>
            <Modal
                className={classes.middlePosition}
                open={openEdit} onClose={e => {
                e.preventDefault();
                setOpenEdit(false)
            }}>
                <Paper sx={{p: 1, m: 1, borderRadius: 1, textAlign: 'center', fontSize: '1rem', fontWeight: '700',}}>
                    <div className={classes.form}>
                        <div style={{display: 'flex', flexDirection: 'row',  justifyItems: 'center', justifyContent: 'space-between' }}>
                            <Typography style={{margin:16}}
                                        variant='h5'
                                        component='div'>
                                Update Driver Details
                            </Typography>
                            <IconButton aria-label="delete" onClick={e => {
                                e.preventDefault();
                                setOpenEdit(false)
                            }}>
                                <CloseIcon />
                            </IconButton>

                        </div>
                        <hr className={classes.divider}/>
                        <div style={{justifyItems: 'center', justifyContent: 'center',  }}>
                            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleChange} style={{ display: "none" }}/>
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <Avatar src={image} className={classes.profilePicture} />
                                </IconButton>
                            </label>
                        </div>
                        <div style={{flexDirection:'column', maxWidth: 400}}>
                            <TextField style={{margin:16}}
                                       error={firstName.match(/[^a-zA-Z]/g)}
                                       helperText={firstName.match(/[^a-zA-Z]/g) ? 'Invalid entry' : ''}
                                       required
                                       label='First Name'
                                       className={classes.textFields}
                                       value={firstName}
                                       onChange={e => {setFirstName(e.target.value.replace(/[^a-zA-Z]/g, ""))}}
                            />
                            <TextField style={{margin:16}}
                                label='Middle Name'
                                className={classes.textFields}
                                value={middleName}
                                onChange={e => {setMiddleName(e.target.value.replace(/[^a-zA-Z]/g, ""))}}
                            />
                            <TextField style={{margin:16}}
                                       error={lastName.match(/[^a-zA-Z]/g)}
                                       helperText={lastName.match(/[^a-zA-Z]/g) ? 'Invalid entry' : ''}
                                       required
                                       label='Last Name'
                                       className={classes.textFields}
                                       value={lastName}
                                       onChange={e => {setLastName(e.target.value.replace(/[^a-zA-Z]/g, ""))}}
                            />
                            <TextField style={{margin:16}}
                               error={!email.match( /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)}
                               helperText={!email.match( /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/) ? 'Invalid entry' : ''}
                               required
                                label='Email'
                                className={classes.textFields}
                                value={email}
                                onChange={e => {setEmail(e.target.value)}}
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
                        </div>
                        <Button className={classes.button} variant="contained" style={{margin: 16}} onClick={(e)=>{
                                e.preventDefault();
                                updateDriverDetails({})
                            }}>
                                Submit
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
        loading: state.request.loading,
        userList: state.admin.driverUserList,
        error: state.request.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getDriverUserListData: (requestBody) => dispatch(ActionCreatorsAdmin.getDriverUserListData(requestBody)),
        addDriverListData: (requestBody) => dispatch(ActionCreatorsAdmin.addDriverListData(requestBody)),
        updateDriverListData: (requestBody) => dispatch(ActionCreatorsAdmin.updateDriverListData(requestBody)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDrivers)
