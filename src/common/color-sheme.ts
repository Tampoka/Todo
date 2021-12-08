import {createTheme} from "@mui/material";

const themeOptions = createTheme({
    palette: {
        // type: 'light',
        primary: {
            main: '#1c7888',
        },
        secondary: {
            main: '#894ee3',
            light: 'rgba(255,167,51,0.38)',
        },
        background: {
            default: '#e0e0e0',
            paper: 'rgba(250,250,250,0.77)',
        },
        error: {
            main: '#e34337',
        },
    },
})

export default themeOptions