import { InputAdornment } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TextField from "@mui/material/TextField";
import React from "react";
import "../Styles/searchbar.css"

type SearchbarProps = {
    handleKey: any;
    defaultVal: string;
}

export default function SearchBar( { handleKey, defaultVal } :SearchbarProps) {
    const [valor, setValor] = React.useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValor(e.target.value.trim().toLowerCase());
    }

    return(
        <TextField
            id="outlined-basic"
            variant="outlined"
            label="Buscar"
            className="searchbar"
            placeholder="Buscar productos..."
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchOutlinedIcon />
                    </InputAdornment>
                ),  
            }}
            onChange={handleChange}
            onKeyDown={(e) => (e.code == "Enter" || e.code == "NumpadEnter") && handleKey(valor)}
            defaultValue={defaultVal || ""}
        />
    )
}