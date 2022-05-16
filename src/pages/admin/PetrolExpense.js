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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


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




 const VehicleMaintenancepage = ({ adminDetails, vehicleList,getVehicleListData,AddPetrolExpenseData }) => {

    const classes = useStyles();
    const [vehicleId, setVehicleId] = useState("");
    const [petrolLiter,setpetrolLiter] = useState("");
    const [petrolCost,setpetrolCost] = useState("");
    const [petrolFIllingPlace,setpetrolFIllingPlace] = useState("");
    const [Date,setDate] = useState("");
    const [odoMeterReading,setodoMeterReading] = useState("");
    const [homeLocation, setHomeLocation] = useState("");
    const [vehicleName, setVehicleName] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");
    const [openPetrolExpense, setopenPetrolExpense] = useState(false);
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

    const handlePetrolExpenseClickOpen = () => {
        console.log('In handle click Petrol Expense')
        setVehicleName('')
        setVehicleNo('')
        setpetrolLiter('')
        setpetrolCost('')
        setpetrolFIllingPlace('')
        setDate('')
        setodoMeterReading('');
        setopenPetrolExpense(true);
    };
    
    const AddPetrolExpenseDetails = async (e) => {
        console.log('In Petrol Expense Details')
        if (
            vehicleName !=='' &&
            vehicleNo !=='' &&
            petrolLiter !=='' &&
            petrolCost !=='' &&
            petrolFIllingPlace !=='' &&
            Date !=='' &&
            odoMeterReading !=='' &&
            adminDetails?.user._id !==''
         
        ) {
            e.preventDefault();
            console.log("Assigning Value")
            const data = await AddPetrolExpenseData({
            
                vehicleName: vehicleName,
                vehicleNo: vehicleNo,
                petrolLiter : petrolLiter,
                petrolCost: petrolCost ,
                petrolFIllingPlace : petrolFIllingPlace ,
                Date: Date ,
                odoMeterReading : odoMeterReading ,
                createdBy: adminDetails?.user._id
             
            });
            if(data){
                await getVehicleList()
            }
        }else {
            setError(true);
        }
    
    };


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
                <Button size='medium' variant="contained" className={classes.button} onClick={ () => handlePetrolExpenseClickOpen() } >Add Petrol Expense</Button>
                </CardActions>
             </div>
            </CardContent>
        </div>
    );

  return (
    <div className="container" >
        <Box sx={{display: 'flex', justifyContent: 'space-between', m: 3, bgcolor: 'background.paper',  '& button': { m: 1 } }} >
            <div style={ { float:'left' } }><h1 >Petrol Expense Details :-</h1></div>
        </Box>
        <div style={{ margin:20 }}>
            
            <div className={classes.flexContainer}>
                <div className='select' style={ { flex:1 } }>
                <h3>Select Vehicle:</h3>
            {
                data.length === 0 
                ? " "
                : <select value={selectedvehicle} onChange={ e => setselectedvehicle(e.target.value) }   >
                    <option value="default">Select the vehicle</option>
                    {
                        data.map( (data) => {
                            return <option value={data} key={data._id}   >{data.vehicleNo}</option>
                        } )
                    }
                </select>
            }
                </div>

                <div className='card' style={{ flex:1 }}>
                <Box style={ { marginLeft:20,marginRight:20,marginBottom:20 } } >
                <Card variant='outlined'>
                    {card}
                </Card>
                </Box>
                </div>
            </div>

        </div>

            

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
                    <div style={{display: 'flex', flexDirection: 'row',  justifyItems: 'center', justifyContent: 'space-between',  }}>
                        <Typography style={{margin:8}}
                                    variant='h5'
                                    component='div'>
                            Add Petrol Expense Details
                        </Typography>
                        <IconButton aria-label="delete" onClick={e => {e.preventDefault(); setopenPetrolExpense(false)}}>
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
                            label='Petrol in Ltrs'
                            required
                            className={classes.textFields}
                            value={petrolLiter}
                            onChange={e => {setpetrolLiter(e.target.value)}}
                        />
                        <TextField 
                            style={{margin:8}}
                            label='Petrol Cost'
                            required
                            error={petrolCost.match(/^\d+\.\d{0,1}$/) ? 'Please enter valid Cost' : ''}
                            helperText={petrolCost.match(/^\d+\.\d{0,1}$/) ? 'Please enter valid Cost' : ''}
                            className={classes.textFields}
                            value={petrolCost}
                            onChange={e => {setpetrolCost(e.target.value)}}
                        />
                         <TextField 
                            style={{margin:8}}
                            label='Petrol Filling Place'
                            required
                            error={petrolFIllingPlace.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            helperText={petrolFIllingPlace.match(/[^A-Za-z0-9]/g) ? 'Please enter valid vehicle no' : ''}
                            className={classes.textFields}
                            value={petrolFIllingPlace}
                            onChange={e => {setpetrolFIllingPlace(e.target.value)}}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker 
                            value={Date}
                            label="Petrol filled Date"
                            onChange = { (newvalue) => {
                                setDate(newvalue);
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
    return{
        adminDetails: state.admin.adminDetails,
        vehicleList: state.request.vehicleList,
        error: state.request.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getVehicleListData: () => dispatch(ActionCreators.getVehicleListData()),
        AddPetrolExpenseData: (requestBody) => dispatch(ActionCreators.AddPetrolExpenseData(requestBody)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMaintenancepage)