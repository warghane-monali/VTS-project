import React from "react";
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: '25%',
        left: '25%',
        padding: '5px 20px',
        border: '5px solid #fe6464',
        color: '#fe6464',
        transform: 'rotate(20deg)'
    }
}));

const CancelledTicket = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography
                variant='h3'
                component='div'
            >
                Cancel
            </Typography>
        </div>
    )
};

export default CancelledTicket
