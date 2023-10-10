import { Chip } from "@mui/material";
import "../Styles/chips.css"

type props = {
    filtros: string[];
    handleClick: any;
}

export default function ChipsFiltro( {filtros, handleClick }: props) {
    //const array = ["Test 1", "Test 2", "Test 3", "Test 4", "Test 5", "Test 6", "Test 7", "Test 8", "Test 9"];
    if (filtros[0] != "")
        return(
            <div className="chips--container">
                {filtros.map( (elem, index) => <Chip
                        key={index}
                        label={elem}
                        variant="outlined"
                        sx={{ mr: 1, my: 0.5, py: 2.5 }}
                        onDelete={handleClick}
                />)}
            </div>
        );
}