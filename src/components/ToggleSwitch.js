import React,{ useState } from 'react'
import { makeStyles } from '@mui/styles'
import theme from '../theme'

const useStyles = makeStyles( theme => ({
    ToggleSwitch:{
        background: 'linear-gradient(#ccc, #eee)',
        border: '1px solid purple',
        height: '2em',
        width: '5em',
        borderRadius: '1em',
    },
    knob:{
    position: 'relative',
    width: '1.9em',
    height: '1.9em',
    background: '#666',
    border: '1px solid #ddd',
    borderRadius: '50%',
    transition: 'left 0.3s ease-out',
  }
}) )


const  ToggleSwitch = () => {
    const classes = useStyles();
    const [istoggle,setistoggle] = useState(false)

 const handleclick = () => {
        setistoggle(!istoggle);
    }

  return (
    <div className={classes.ToggleSwitch} onClick={ () => handleclick()}>
        <div className={classes.knob} style={ istoggle ? { left:'0em' } : { left:'3em' } } >
            { istoggle ? 'No' : 'Yes' }
        </div>
    </div>
  )
}

export default ToggleSwitch
