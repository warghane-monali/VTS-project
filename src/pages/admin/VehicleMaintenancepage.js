import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {Card, CardActions, CardContent, IconButton, Modal, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import * as ActionCreators from "../../actions/requestAction";
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
    },
    flexContainer : {
        display: 'flex',
        flexDirection: 'row',
    }
}));




 const VehicleMaintenancepage = ({ adminDetails, vehicleList,getVehicleListData,AddMaintenanceData }) => {

    const classes = useStyles();
    const [vehicleId, setVehicleId] = useState("");
    const [maintenaceDescription,setmaintenaceDescription] = useState("");
    const [maintenaceCost,setmaintenaceCost] = useState("");
    const [maintenacePlace,setmaintenacePlace] = useState("");
    const [maintenacePlaceNo,setmaintenacePlaceNo] = useState("");
    const [maintenaceStartDate,setmaintenaceStartDate] = useState("");
    const [maintenaceEndDate,setmaintenaceEndDate] = useState("");
    const [odoMeterReading,setodoMeterReading] = useState("");
    const [homeLocation, setHomeLocation] = useState("");
    const [vehicleName, setVehicleName] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");
    const [openMaintenance, setOpenMaintenace] = useState(false);
    const [error, setError] = useState(false);
    const [data,setData] = useState([]);
    const [selectedvehicle,setselectedvehicle] = useState([]);

    useEffect(() => {
        getVehicleList();
    }, []);

    const getVehicleList = async () => {
        const data = await getVehicleListData();
        setData(data);
        console.log('This is vehicle data',data)
    };

    const handleMaintenanceClickOpen = () => {
        console.log('In handle click maintainence')
        setVehicleId('')
        setVehicleName('')
        setVehicleNo('')
        setmaintenaceDescription('');
        setmaintenaceCost('');
        setmaintenacePlace('');
        setmaintenacePlaceNo('');
        setmaintenaceStartDate('');
        setmaintenaceEndDate('');
        setodoMeterReading('');
        setOpenMaintenace(true);
    };

    const AddMaintenanceDetails = async (e) => {

        console.log('In Maintenance Details')

        e.preventDefault();

        if (
         
          
            vehicleName !=='' &&
          
            vehicleNo !=='' &&
           
            maintenaceDescription !=='' &&
          
            maintenaceCost !=='' &&
     
            maintenacePlace !=='' &&
      
            maintenacePlaceNo !=='' &&
          
            maintenaceStartDate !=='' &&
         
            maintenaceEndDate !=='' &&
       
            odoMeterReading !=='' &&

            adminDetails?.user._id !==''
         
        ) {

            e.preventDefault();
            console.log("Assigning Value")

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
                homeLocation: homeLocation,
                createdBy: adminDetails?.user._id
           
            });
            if(data){
                await getVehicleList()
            }
        }else {
            setError(true);
        }
    
    }; 
    
    function handleselect(e){
        console.log('In Handle Select')
        setselectedvehicle(e.target.value)
        console.log('Selevted vehicle',selectedvehicle)
    }


    const card = (
       <div className="container" sx={{
            p: 1,
            m: 1,
            borderRadius: 1,
            textAlign: 'center',
            fontSize: '1rem',
            fontWeight: '700',
        }} >
            <CardContent>
            <div style={{display: 'flex', flexDirection: 'row',  justifyItems: 'center', justifyContent: 'space-between',  }}>
                 <Typography style={{margin:8}} variant='h5' component='div'>
                     Vehicle Details
                </Typography>
             </div>
             <hr className={classes.divider}/>
             <div  >
                <div style={{ display: 'flex', flexDirection: 'row' }} >
                <div  style={{margin:30,display: 'flex', flexDirection: 'row'}}>
                    <label>Vehicle Name:-</label>
                    <strong  style={ { marginLeft:2 } } >BOLERO</strong> 
               </div>
               <div  style={{margin:30,display: 'flex', flexDirection: 'row'}}>
                    <label>Vehicle No:-</label>
                    <strong style={ { marginLeft:2 } } >MH21X5788</strong>
               </div>
               <div  style={{margin:30,display: 'flex', flexDirection: 'row'}}>
                    <label>Vehicle Type:-</label>
                    <strong style={{ marginLeft:2 }} >LCV</strong>
               </div>
                </div>
               
                <div style={{ display: 'flex', flexDirection: 'row' }} >
                <div  style={{margin:8}}>
                    <label>Vehicle Capacity:-</label>
                   <strong style={ { marginLeft:2 } }>2</strong>
               </div>
               <div  style={{margin:8}}>
                    <label>Vehicle Agency Name:-</label>
                    <strong style={{ marginLeft:2 }}>SAKAL PAPERS LTD.</strong>
               </div>
               <div  style={{margin:8}}>
                    <label>Make:-</label>
                    <strong style={{ marginLeft:2 }} >MAHINDRA & MAHINDRA</strong>
               </div>
                </div>
                <CardActions style={ { justifyContent:'center' }  }>
                <Button size='medium' variant="contained" className={classes.button} onClick={ () => handleMaintenanceClickOpen() } >Add Vehicle Maintenance</Button>
                </CardActions>
             </div>
            </CardContent>
        </div>
    );

  return (
    <div className="container" >
        <Box sx={{display: 'flex', justifyContent: 'space-between', m: 3, bgcolor: 'background.paper',  '& button': { m: 1 } }} >
            <div style={ { float:'left' } }><h1 >Vehicle Maintenance Details :-</h1></div>
            {/* <div style={{ float:'right',marginTop:20 }} ><Button variant='contained' size='small' onClick={ () => handleMaintenanceClickOpen() } >Add Maintenance</Button></div> */}
        </Box>
        <div style={{ margin:20 }}>
            
            <div className={classes.flexContainer}>
                <div className='select' style={ { flex:1 } }>
                <h3>Select Vehicle:</h3>
            {
                data.length === 0
                ? " "
                : <select value={selectedvehicle} onChange={ () => handleselect }   >
                    <option value="default">Select the vehicle</option>
                    {
                        data.map( (data) => {
                            return <option value={data} key={data._id}  >{data.vehicleNo}</option>
                        } )
                    }
                </select>
            }
                </div>

    
                <Box style={ { marginLeft:20,marginRight:20,marginBottom:20 } } >
                <Card>
                    {card}
                </Card>
                </Box>
              
            </div>

        </div>

            

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
                        AddMaintenanceDetails(e)
                    }}>
                        Add Vehicle Maintenance Details
                    </Button>
                    </div>
                </Paper>
            </Modal>
    </div>
  )
}


const mapStateToProps = state => {
    return{
        adminDetails: state.admin.adminDetails,
        vehicleList: state.request.vehicleList,
        error: state.request.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getVehicleListData: () => dispatch(ActionCreators.getVehicleListData()),
        AddMaintenanceData: (requestBody) => dispatch(ActionCreators.AddMaintenanceData(requestBody)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMaintenancepage)
