import {Button} from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutLinedIcon from '@mui/icons-material/DarkModeOutlined';
import React from 'react';

export default function DarkMode(): React.JSX.Element {
    const [darkMode, toggleDarkMode] = React.useState<boolean>(false);

    function handleChange(){
        toggleDarkMode(!darkMode);
    }

    return(
        <Button
            className='darkmode'
            onClick={handleChange}
            startIcon={darkMode ? <DarkModeOutLinedIcon /> : <LightModeOutlinedIcon />}
            sx={{ color: 'white', outline: 'white solid thin' }}
        >
            {darkMode ? "Oscuro" : "Claro"}
        </Button>
    )
}