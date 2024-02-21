import { InputAdornment } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TextField from "@mui/material/TextField";
import React from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

export default function SearchBar() {
    const [searchBarText, setSearchBarText] = React.useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Navigates to the Products route 
    const handleSearch = () => {
        if (searchBarText) {
            const searchbarContent = searchBarText.trim().toLowerCase();
            location.pathname === "/catalogo" && setSearchBarText("");
            navigate("/catalogo?search=" + searchbarContent);
        }
        else
            navigate("/catalogo");

        (document.activeElement as HTMLElement).blur(); // Unfocus the search bar after submitting
    }

    return(
        <TextField
            id="outlined-basic"
            variant="outlined"
            label="Buscar"
            className="searchbar"
            placeholder={ searchParams.get("search") || "Buscar productos..." }
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchOutlinedIcon />
                    </InputAdornment>
                ),  
            }}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={ e => setSearchBarText(e.target.value) }
            value={ searchBarText }
            onKeyDown={(e) => (e.code == "Enter" || e.code == "NumpadEnter") && handleSearch() }
        />
    )
}