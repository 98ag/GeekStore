import {IconButton} from "@mui/material";
import "../../Styles/filters.css"
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { useSearchParams } from "react-router-dom";
import React from "react";

export default function Filters({ filters }: any) {
    const [searchParams, setSearchParams] = useSearchParams();

    // Removes the given search parameter from the URL
    const clearParam = (key: string) => {
        searchParams.delete(key);
        setSearchParams(searchParams);
    }

    // Returns an array of renderable filter elements
    const filterElements = () => {
        const keys = Object.keys(filters);

        // Reduce the keys array to an array of renderable elements. Filter values can be null so the returned array may be empty.
        return keys.reduce<React.ReactElement[]>((acc, key, currentIndex) => {
            const value: string | null = filters[key];

            if (value)
                acc.push(
                    <div className="filters__filtercontainer" key={currentIndex}>
                        {value}
                        <IconButton sx={{padding: 0}} onClick={() => clearParam(key)} disableRipple>
                            <HighlightOffRoundedIcon fontSize="small"/>
                        </IconButton>
                    </div>
                );

            return acc;
        }, []);
    }

    // Render the filters section if at least one filter is applied
    const filterContent = () => {
        const elements = filterElements();

        if (elements.length)
            return(
                <div className="filters__container">
                    <div className="filters__title">Filtros</div>
                    { filterElements() }
                </div>
            );

        return null;
    }

    return filterContent();
}