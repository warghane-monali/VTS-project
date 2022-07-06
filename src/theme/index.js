import { createTheme } from "@mui/material/styles"

const defaultTheme = createTheme({
    typography: {
        fontFamily: " ",
    },
    palette: {
        primary: {
            main: "#020202",
            dark: "#D4AC0D",
        },
        secondary: {
            main: "#fcfcfc",
            dark: "#020202",
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 450,
            md: 600,
            lg: 900,
            xl: 1200
        }
    }
});

const theme = {
    ...defaultTheme,
    // components: {
    //     MuiButton: {
    //         styleOverrides: {
    //             root: {
    //                 backgroundColor: defaultTheme.palette.primary.main,
    //                 color: 'white',
    //                 textTransform: 'none',
    //                 fontSize: '20px',
    //                 padding: '0.5rem 3rem',
    //                 borderRadius: '10px',
    //                 '&:hover': {
    //                     color: defaultTheme.palette.primary.main
    //                 }
    //             },
    //         },
    //     },
    // },
};

export default theme
