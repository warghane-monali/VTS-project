import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {makeStyles} from '@mui/styles'
import {Button, IconButton, Modal, Paper, TextField, Typography} from '@mui/material'
import {connect, useDispatch} from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import * as ActionCreators from "../../actions/requestAction";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from "moment";
import Stack from "@mui/material/Stack";
import CloseIcon from '@mui/icons-material/Close';
import Alert from "@mui/material/Alert";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import {usePlacesWidget} from "react-google-autocomplete";
import {trackDestinationLocation, trackLocationSuccess, trackSourceLocation} from "../../actions/trackLocationAction";
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import Geocode from "react-geocode";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import { Label } from '@mui/icons-material'

Geocode.setApiKey("AIzaSyC1JGc-xX3lFEzCId2g3HQcKv1gpE7Oejo");


const filter = createFilterOptions();

const Request = ({sourceLocation, destinationLocation, allUserList, vehicleList, travellerListData, requestRideData, getVehicleListData, setTravellerListData, setTravellerRequestData, flushRequestState, getAllUserListData,adminDetails}) => {

    const classes = useStyles();
    const history = createBrowserHistory();
    const navigate = useNavigate();
    const routeLocation = useLocation();
    const [locationData, setLocationData] = useState(routeLocation?.state);
    let dispatch = useDispatch();
    const currentDateTime = new Date();
    const currentAddDateTime = currentDateTime.setMinutes(15);
    const [travellerList, setTravellerList] = useState(travellerListData&&travellerListData.length>0?travellerListData:[]);
    const [isOpen, setIsOpen] = useState(false);
    const [travellerCounter, setTravellerCounter] = useState(0);
    const [travellerName, setTravellerName] = useState('');
    const [travellerNumber, setTravellerNumber] = useState('');
    const [designation, setDesignation] = useState('');
    const [travellerId, setTravellerId] = useState('');
    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);
    const [startDate, setStartDate] = useState(new Date(currentDateTime && currentDateTime.getTime() + 1440*60*1000));
    const [endDate, setEndDate] = useState(new Date(currentDateTime && currentDateTime.getTime() + 1440*60*1000));
    const [vehicle, setVehicle] = useState('');
    const [reason, setReason] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [tripStatus, setTripStatus] = useState('');
    const [country, setCountry] = useState("IN");
    const [requestBy,setRequestBy] = useState({id:''});

    console.log('-----Admin Details------',adminDetails.user)

    const { ref: sourceRef } = usePlacesWidget({
        apiKey: 'AIzaSyC1JGc-xX3lFEzCId2g3HQcKv1gpE7Oejo',
        onPlaceSelected: (place) => {
            console.log(place);
            setSource(place && place.formatted_address);
            const latitude=place.geometry.location.lat();
            const longitude=place.geometry.location.lng();
            dispatch(trackSourceLocation({lat: latitude, lng: longitude, place:place}));
        },
        inputAutocompleteValue: "IN",
        options: {
            types: ["geocode", "establishment"],
            componentRestrictions: { country },
        },
    });

    const { ref: destinationRef } = usePlacesWidget({
        apiKey: 'AIzaSyC1JGc-xX3lFEzCId2g3HQcKv1gpE7Oejo',
        onPlaceSelected: (place) => {
            console.log(place);
            setDestination(place && place.formatted_address);
            const latitude=place.geometry.location.lat();
            const longitude=place.geometry.location.lng();
            dispatch(trackDestinationLocation({lat:latitude, lng: longitude, place: place}));
        },
        inputAutocompleteValue: "IN",
        options: {
            types: ["geocode", "establishment"],
            componentRestrictions: { country },
        },
    });
    // const [vehicles, setVehicles] = useState(vehicleList);
    // const [userList, setUserList] = useState(allUserList);


    useEffect(() => {
        getVehicleListData();
        getAllUserListData({userRole: adminDetails && adminDetails?.user.userRole});
    }, []);

    useEffect(() => {
        getLocationDataList()
        // if (requestRideData === null) return;
        // if (requestRideData && requestRideData?.selfTravellerNo){
        //     navigate('/dashboard/request-status')
        // }
    }, []);

    const getLocationDataList = async ()=> {
        await getLocation()
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            dispatch(trackLocationSuccess({lat: position.coords.latitude, lng: position.coords.longitude}));
            getCurrentAddress(position.coords.latitude, position.coords.longitude)
        });
    };

    const getLocation =async ()=> {
        if (navigator.geolocation) {
           const res = await navigator.geolocation.getCurrentPosition(success, showError);
           console.log(res)
        } else {
            setErrorMsg("Geolocation is not supported by this browser.")
        }
    }

    const success =(pos)=> {
        let crd = pos.coords;
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    }

    const showError = (error)=> {
        if (error && error.code && error.PERMISSION_DENIED) {
            setErrorMsg("User denied the request for Geolocation.");
        } else if (error && error.code && error.POSITION_UNAVAILABLE) {
            setErrorMsg("Location information is unavailable.");
        } else if (error && error.code && error.TIMEOUT) {
            setErrorMsg("The request to get user location timed out.");
        } else if (error && error.code && error.UNKNOWN_ERROR) {
            setErrorMsg("An unknown error occurred.");
        }else {
            setErrorMsg("User denied the request for Geolocation.");
        }
    };


    const getCurrentAddress = (latitude, longitude) =>{
        if(locationData && locationData.name ==='source'){
            setSource(sourceLocation.place);
            setDestination(destinationLocation.place);
        } else if (locationData && locationData.name ==='destination' ) {
            setSource(sourceLocation.place);
            setDestination(destinationLocation.place);
        } else {
            Geocode.fromLatLng(latitude, longitude).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    // setSource(address);
                    // setSourceLocation({lat: latitude, lng: longitude, place: address})
                },
                (error) => {
                    console.error(error);
                }
            );
        }

    };

    const addTraveller = e => {
        e.preventDefault();
        setTravellerName(travellerName.trim());
        setTravellerNumber(travellerNumber.trim());
        if (travellerName !== '' && travellerNumber !== '') {
            setTravellerList([
                ...travellerList,
                {
                    id: travellerId?travellerId:0,
                    name: travellerName,
                    number: travellerNumber,
                    designation:''
                }
            ]);
            setTravellerCounter(pState => pState + 1);
            setTravellerName('');
            setTravellerNumber('');
            setIsOpen(false);
            setTravellerListData(travellerList)
        }

    };

    const handleRequest = async (e) => {
        setError(false);
        e.preventDefault();
        if (
            tripStatus !==' ' && tripStatus !=='' &&
            source !=='' && source !== null && source !== undefined &&
            destination !=='' && destination !==null && destination !==undefined &&
            startDate !=='' &&
            endDate !=='' &&
            reason !==''
        ) {
            flushRequestState();

            // const selectedVehicle = vehicles.filter(v => vehicle === v._id)[0];
            // const requestedVehicleType = vehicles && vehicles.length > 0 ? 'vehicle' : 'traveller';
            const firstName = adminDetails && adminDetails?.user?.firstName !== null ? adminDetails && adminDetails?.user?.firstName : '';
            const middleName = adminDetails && adminDetails?.user?.middleName !== null ? adminDetails && adminDetails?.user?.middleName : '';
            const lastName = adminDetails && adminDetails?.user?.lastName !== null ? adminDetails && adminDetails?.user?.lastName : '';
            const fullName = firstName +' '+ middleName +' '+ lastName;
            let travellerIdArray = [];

            travellerList.map((item, index)=>{
                travellerIdArray.push(item.id)
            });
            const data = await setTravellerRequestData(
                {
                    selfTravellerId : requestBy.id,
                    selfTravellerName : requestBy.name,
                    selfTravellerNo : requestBy.number,
                    travellersId: travellerIdArray,
                    travellersDetails: travellerList,
                    source: source,
                    oneWayOrRoundTrip:tripStatus,
                    destination: destination,
                    startDateTime : moment(startDate).subtract({hours:5, minute:30}).format('YYYY-MM-DD hh:mm a'),
                    endDateTime : moment(endDate).subtract({hours:5, minute:30}).format('YYYY-MM-DD hh:mm a'),
                    // requestedVehicleType : selectedVehicle.vehicleType,
                    sourceLat: sourceLocation && sourceLocation.lat,
                    sourceLong: sourceLocation && sourceLocation.lng,
                    destinationLat: destinationLocation && destinationLocation.lat,
                    destinationLong: destinationLocation && destinationLocation.lng,
                    reason: reason,
                    capacity: travellerList && travellerList?.length > 0 ? travellerList?.length + 1: 1,
                    createdBy: adminDetails.user._id
                }
            );
            if(data){
                navigate('/admin/requeststatusadmin')
            }
        }
        else{
            setError(true);
        }
    };

    const onInputChange =(event,value) => {
        const xyz = value.replace(/^\s+/g, '')
        setTravellerName(xyz)
    };

    const selectedNumberOnChange = (event, value)=>{
        event.preventDefault();
        if(value !== null && value!==undefined && value !== ''){
            const firstName = value.firstName !== null ? value.firstName : '';
            const middleName = value.middleName !== null ? value.middleName : '';
            const lastName = value.lastName !== null ? value.lastName : '';
            const fullName = firstName.replace(/^\s+/g, '') +' '+ middleName.replace(/^\s+/g, '') +' '+ lastName.replace(/^\s+/g, '');
            setTravellerName(fullName);
            setTravellerNumber(value.contactNo);
            setTravellerId(value._id);
            setDesignation(value.designation)
        }
    };

    const handleself = (traveller) => {
         console.log(traveller) 
         setRequestBy(traveller)
    }

        console.log("----Requested By--------",requestBy)
    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Typography variant='h6' component='div' className={classes.heading} >
                   Request
                </Typography>
                <FormControl style={{ margin:15}}>
                    <RadioGroup value={tripStatus}
                                onChange={(e)=>setTripStatus(e.target.value)} row name="row-radio-buttons-group">
                        <FormControlLabel value="OneWay" control={<Radio />} label="One way" />
                        <FormControlLabel value="RoundTrip" control={<Radio />} label="Round Trip" />
                    </RadioGroup>
                </FormControl>
                {errorMsg && <Alert style={{maxWidth:340}} severity="info">{errorMsg}</Alert>}
                <TextField
                    inputRef={sourceRef}
                    error={source === ""}
                    helperText={source === "" ? 'Please enter source of your journey' : ' '}
                    required
                    label='Start Location'
                    className={classes.textFields}
                    value={source}
                    onChange={e => setSource(e.target.value.replace(/^\s+/g, ''))}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton onClick={(e )=> {
                                    navigate('/dashboard/map-view', {state: 'source'})
                                }}>
                                    <AddLocationIcon/>
                                </IconButton>
                            </InputAdornment>
                    }}
                />
                <TextField
                    inputRef={destinationRef}
                    error={destination === ""}
                    helperText={destination === "" ? 'Please enter destination of your journey' : ' '}
                    required
                    inputProps={{pattern: "[a-z]"}}
                    label='End Location'
                    className={classes.textFields}
                    value={destination}
                    onChange={e => setDestination(e.target.value.replace(/^\s+/g, ''))}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton onClick={e => {
                                    navigate('/dashboard/map-view', {state: 'destination'});
                                }}>
                                    <AddLocationIcon/>
                                </IconButton>
                            </InputAdornment>
                    }}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDateTimePicker
                        renderInput={(props) => <TextField  className={classes.textFields} {...props} />}
                        label="Start Date and Time"
                        value={startDate}
                        minDateTime={new Date(currentDateTime && currentDateTime.getTime() + 1440*60*1000)}
                        onChange={(newValue) => {
                            setStartDate(newValue);
                        }}
                        inputFormat="dd/MM/yyy hh:mm a"
                        mask="___/__/__ __:__ _M"
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDateTimePicker
                        renderInput={(props) => <TextField  className={classes.textFields} {...props} />}
                        label="End Date and Time"
                        value={endDate}
                        minDateTime={new Date(startDate && startDate.getTime() + 15*60*1000)}
                        onChange={(newValue) => {
                            setEndDate(newValue);
                        }}
                        inputFormat="dd/MM/yyy hh:mm a"
                        mask="___/__/__ __:__ _M"
                    />
                </LocalizationProvider>
                <TextField
                    error={reason && reason.length < 20}
                    helperText={reason && reason.length < 20 ? 'Reason should be  grater than 20': ' '}
                    required
                    inputProps={{pattern: "[a-z]"}}
                    label='Reason For Travel'
                    placeholder="Reason should be minimum 20 character....."
                    className={classes.textFields}
                    multiline
                    rows={2}
                    value={reason}
                    onChange={e => setReason(e.target.value.replace(/^\s+/g, ''))}
                />
                <Stack style={{width:'100%', marginTop:16}} direction="column" justifyContent="flex-start" alignItems="flex-start">
                    <div style={{ width:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableBody>
                                    {/* <TableRow >
                                        <TableCell component="th" scope="row">
                                            {`${adminDetails?.user.firstName}` +' '+ `${adminDetails?.user.middleName?adminDetails?.user.middleName:''}` +' '+ `${  adminDetails?.user.lastName}`}
                                        </TableCell>
                                        <TableCell >
                                            <span>{`${adminDetails.user.contactNo}`}</span>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            Self
                                        </TableCell>
                                    </TableRow> */}
                                    {travellerList.map((traveller, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                Requested By
                                                <Radio 
                                                    checked={traveller.id === requestBy.id }
                                                    value={traveller.id}
                                                    // onChange={ () => handleself(traveller) }
                                                    onClick={ () => handleself(traveller) }
                                                    name = "requestedby"
                                                 />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {traveller.name}
                                            </TableCell>
                                            <TableCell  component="th" scope="row">
                                                {traveller.number}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <IconButton
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setTravellerList(travellerList.filter(t => t.id !== traveller.id));
                                                        setTravellerListData(travellerList.filter(t => t.id !== traveller.id))
                                                    }}><DeleteIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
                </Stack>
                <Stack style={{width:'100%', marginTop: '20px'}}
                       direction="column"
                       justifyContent="flex-start"
                       alignItems="flex-start">
                    <div style={{ width:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <Button variant="contained" size="medium" style={{padding:'4px 15px' }}
                                onClick={e => {e.preventDefault(); setIsOpen(pState => !pState)}}>
                            Add Traveller
                        </Button>
                    </div>
                </Stack>
                <Stack style={{width:'100%'}}
                       direction="column"
                       justifyContent="flex-start"
                       alignItems="flex-start">
                    <div style={{ width:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <Button sx={{marginTop: '20px'}} variant="contained" size="medium" style={{padding:'4px 15px' }}
                                onClick={handleRequest}>
                            Submit Request
                        </Button>
                    </div>
                </Stack>

                <Modal
                    className={classes.middlePosition}
                    open={isOpen}
                    onClose={e => {
                        e.preventDefault();
                        setIsOpen(false)
                    }}>
                    <Paper className={classes.form} style={{padding: 16}}>
                        <Stack direction="row" justifyContent="space-between"
                               alignItems="center" spacing={2}>
                            <Stack direction="column">
                                <Typography variant='h6' component='div'>Add Traveller Details</Typography>
                                <Typography variant='caption' component='div'>Please add the person you would like to travel with</Typography>
                            </Stack>
                            <IconButton aria-label="delete" onClick={e => {
                                e.preventDefault();
                                setIsOpen(false)
                            }}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                        <hr className={classes.divider}/>
                        <Autocomplete
                            freeSolo
                            id="userList"
                            disableClearable
                            onChange={(event, value) =>
                                selectedNumberOnChange(event,value)
                            }
                            onInputChange={onInputChange}
                            options={allUserList}
                            getOptionLabel={(option, index) => {
                                let fullName = `${option.firstName} ${option.middleName===null?'':option.middleName+' '} ${option.lastName}`;
                                return fullName
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className={classes.textField}
                                    label="Name"
                                    type="Name"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />

                        <TextField
                            required
                            error={travellerNumber.length !== 10}
                            helperText={travellerNumber.length<=9 || travellerNumber.match(/[^0-9]/g) ? 'Please enter valid mobile No.' : ''}
                            variant="outlined"
                            placeholder='Mobile No.'
                            inputProps={{maxLength: 10 , pattern: "[0-9]{0,10}"}}
                            className={classes.textField}
                            value={travellerNumber}
                            onChange={(e )=> {
                                setTravellerNumber(e.target.value.replace(/[^0-9]/g, ""))
                                setTravellerId(0);
                            }}
                        />
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}>
                            <Button size="medium" variant="contained"
                                    onClick={addTraveller}>
                                Add Traveller
                            </Button>
                        </Stack>
                    </Paper>
                </Modal>
            </main>
            <div style={{height:100, width:'100%'}}> </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        loading: state.request.loading,
        requestRideData: state.request.requestRideData,
        allUserList: state.request.allUserList,
        vehicleList: state.request.vehicleList,
        travellerListData: state.request.travellerListData,
        destinationLocation: state.trackLocation.destinationLocation,
        sourceLocation: state.trackLocation.sourceLocation,
        adminDetails:state.admin.adminDetails ,
        error: state.request.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTravellerRequestData: (requestBody) => dispatch(ActionCreators.setTravellerRequestData(requestBody)),
        getVehicleListData: () => dispatch(ActionCreators.getVehicleListData()),
        setTravellerListData: (requestBody) => dispatch(ActionCreators.setTravellerListData(requestBody)),
        getAllUserListData: (requestBody) => dispatch(ActionCreators.getAllUserListData(requestBody)),
        flushRequestState: () => dispatch(ActionCreators.flushRequestState())
    }
};

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        background: '#fcfcfc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    appbar: {
        alignItems: 'center',
        padding: '15px',
        background: '#0c1572 !important',
    },
    appbarBackIcon: {
        fontSize: '40px !important'
    },
    main: {
        height: 'calc(100% - 70px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '600px'
    },
    heading: {
        color: theme.palette.primary.main,
        margin: '20px !important'
    },
    textFields: {
        width: '100% !important',
        marginBottom: '24px !important'
    },
    textField: {
        width: '100% !important',
        marginBottom: '15px !important'
    },
    placeholders: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        background: '#0c1572 !important',
        color: 'white !important',
    },
    divider: {
        width: '100%',
        margin: '20px 0',
    },
    mainButton: {
        background: '#0c1572 !important',
        color: 'white !important',
        padding: '0.5rem 3rem !important',
        borderRadius: '50px !important'
    },
    form: {
        padding: '20px',
        borderRadius: '20px !important',
        display: 'flex',
        flexDirection: 'column'
    },
    travellerHeading: {
        fontWeight: 'bolder !important',
        position: 'relative',
        right: '160px',
        marginLeft: '58px !important',
        marginBottom: '18px !important',
    },
    travellerItem: {
        width: '100%',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    itemLeftSection: {
        color: 'black',
        paddingLeft: '15px'
    },
    itemRightSection: {
        color: 'grey !important',
        paddingRight: '15px',
        display: 'flex',
        alignItems: 'center'
    },
    middlePosition: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
}));

export default connect(mapStateToProps, mapDispatchToProps)(Request)
