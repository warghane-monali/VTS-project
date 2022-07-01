import { Box, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded'
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded'
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded'
import CarRepairIcon from '@mui/icons-material/CarRepair';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import React from "react";
import {useNavigate} from "react-router-dom";

const upperList = [
    { icon: <HomeIcon />, title: 'Home', url:'/admin/dashboard' },
    { icon: <PersonRoundedIcon />, title: 'Employees', url:'/admin/employee-wise' },
    { icon: <ManageAccountsRoundedIcon />, title: 'Drivers', url: '/admin/drivers' },
    { icon: <DirectionsCarRoundedIcon />, title: 'Vehicles', url:'/admin/all-vehicle' },
    { icon: <CarRepairIcon /> , title: 'Vehicle Maintenance', url : '/admin/VehicleMaintenancepage'  },
    { icon: <LocalGasStationIcon /> ,title:'Petrol Expense',url:'/admin/petrol-expense' },
    { icon: <AccountBoxIcon />, title: 'Driver Leave Management', url:'/admin/attendance-status' },
    { icon: <DirectionsCarRoundedIcon />, title: 'Request for Ride' , url:'/admin/requestfromadmin' },
    // { icon: <AccountBoxIcon />, title: 'Driver Attendance Details', url:'/admin/attendance-status' },
 

];

const lowerList = [
    { icon: <LocationCityRoundedIcon />, title: 'Reports', url:'/admin/reports' },
    // { icon: <LocationCityRoundedIcon />, title: 'Agency', url:'' },
    // { icon: <DirectionsWalkRoundedIcon />, title: 'Journey', url:'' },
    // { icon: <EventNoteRoundedIcon />, title: 'Driver Attendance', url:'' }
];

const AdminSidebar = ({ isDrawerOpen, setIsDrawerOpen }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{ width: isDrawerOpen && 250 }}
            role="presentation"
            onClick={() => setIsDrawerOpen(false)}
            onKeyDown={() => setIsDrawerOpen(false)}
        >
            <List>
                {upperList.map(item => (
                    <ListItem button key={item.title} onClick={() => navigate(item.url)}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {lowerList.map(item => (
                    <ListItem button key={item.title} onClick={() => navigate(item.url)}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
};

export default AdminSidebar
