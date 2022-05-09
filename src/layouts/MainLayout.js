import React from 'react';
import {Outlet} from "react-router-dom";
import Typography from "@mui/material/Typography";

const MainLayout = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default MainLayout;
