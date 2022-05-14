import { Box, Button, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import React from 'react'
import { connect } from 'react-redux'
import { Rating } from '@mui/material';
import * as ActionCreators from "../../actions/requestAction";

const labels = {
    1: 'Not Good',

    2: 'Ok',

    3: 'Average',

    4: 'Good',

    5: 'Excellent',

  };

 const Feedback = ( { userDetails,setfeedbackData } ) => {
    const [value1, setValue1] = React.useState(2);
    const [value2, setValue2] = React.useState(2);
    const [value3, setValue3] = React.useState(2);
    const [value4, setValue4] = React.useState(2);
    const [hover1, setHover1] = React.useState(-1);
    const [hover2, setHover2] = React.useState(-1);
    const [hover3, setHover3] = React.useState(-1);
    const [hover4, setHover4] = React.useState(-1);
    const classes = useStyles();

    console.log(userDetails.user.firstName);
  return (
    <div className={classes.root} >
            <div className={classes.title}>
                <h1 className={classes.header} ><strong>Feedback Page</strong></h1>
            </div>
            <Box className={classes.box} >
                <div style={{flexDirection:'column', justifyContent:'space-between', maxWidth:400, flex:1}}>
                    <Paper className={classes.card}  elevation={3}  >
                    <Typography component="legend">How do you rate the driver ?</Typography>
                    <Rating
                         name="hover-feedback"
                         value={value1}
                        onChange={(event, newValue1) => {
                        setValue1(newValue1);
                        }}
                        onChangeActive={(event, newHover) => {
                         setHover1(newHover);
                         }}
                         defaultValue={2}
                         size="large"
                     />
                    {value1 !== null && <Box ml={2}>{labels[hover1 !== -1 ? hover1 : value1]}</Box>}      
                    </Paper>  
                </div>        

                <div style={{flexDirection:'column', justifyContent:'space-between', maxWidth:400, flex:1}}>
                    <Paper className={classes.card}  elevation={3} >
                    <Typography component="legend">How was the enviroment in the car ?</Typography>
                    <Rating
                         name="hover-feedback"
                         value={value2}
                        onChange={(event, newValue2) => {
                        setValue2(newValue2);
                        }}
                        onChangeActive={(event, newHover2) => {
                         setHover2(newHover2);
                         }}
                         defaultValue={2}
                         size="large"
                     />
                    {value2 !== null && <Box ml={2}>{labels[hover2 !== -1 ? hover2 : value2]}</Box>}      
                    </Paper>  
                </div>        

                <div style={{flexDirection:'column', justifyContent:'space-between', maxWidth:400, flex:1}}>
                    <Paper className={classes.card}  elevation={3} >
                    <Typography component="legend">Was speed limit ok ?</Typography>
                    <Rating
                         name="hover-feedback"
                         value={value3}
                        onChange={(event, newValue3) => {
                        setValue3(newValue3);
                        }}
                        onChangeActive={(event, newHover3) => {
                         setHover3(newHover3);
                         }}
                         defaultValue={2}
                         size="large"
                     />
                    {value3 !== null && <Box ml={2}>{labels[hover3 !== -1 ? hover3 : value3]}</Box>}      
                    </Paper>  
                </div>        

                <div style={{flexDirection:'column', justifyContent:'space-between', maxWidth:400, flex:1}}>
                    <Paper className={classes.card}  elevation={3} >
                    <Typography component="legend">How do you find Overall travel experience ?</Typography>
                    <Rating
                         name="hover-feedback"
                         value={value4}
                        onChange={(event, newValue4) => {
                        setValue4(newValue4);
                        }}
                        onChangeActive={(event, newHover4) => {
                         setHover4(newHover4);
                         }}
                         defaultValue={2}
                         size="large"
                     />
                    {value4 !== null && <Box ml={2}>{labels[hover4 !== -1 ? hover4 : value4]}</Box>}      
                    </Paper>  
                </div>        
            </Box>
            <div style={{ textAlign:'center',marginTop:20,marginLeft:20 }}>
            <Button onClick={ () => { setfeedbackData(userDetails) } } variant="contained" color='success' >Submit feedback</Button>
            </div>
    </div>
  )
}

const useStyles = makeStyles( theme => ({
    root:{
        minHeight: '100%',
        background: '#fcfcfc',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width:400,
        height: 'max-content',
        padding: '20px',
        marginTop: '20px',
        borderRadius: '10px !important',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    box : {
        display: 'flex', 
        flexDirection: 'column',
         justifyContent:'space-between',
         alignItems:'center',
    },
    title : {
        textAlign:'center',
        marginLeft:20
    },
    header: {
        color: theme.palette.primary.main
    },

}) );

const mapStateToProps = state => ({
    userDetails: state.auth.userDetails,
});

const mapDispatchToProps = dispatch => {
    return {
        setfeedbackData : (userDetails) => dispatch(ActionCreators.setfeedbackdata(userDetails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback)
