import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type props = {
   categorias: Set<string>;
   handleCat: any;
}
export default function Filtros( { categorias, handleCat } : props) {
    return(
        <Accordion
            defaultExpanded
            square
            disableGutters
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                sx={{ borderBottom: '1px solid #dddddd' }}
            >
                <Typography
                    fontFamily={"'Raleway', sans-serif"}
                    fontWeight={500}
                >
                    Categorias
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                {[...categorias].sort().map( (cat, index) =>
                    <Typography
                        fontFamily={"'Raleway', sans-serif"}
                        fontWeight={500}
                        className="subcat"
                        key={index}
                    >
                        <span className="subcat-titulo" onClick={ () => handleCat(cat) }>
                            {cat}
                        </span>
                    </Typography>
                )}
            </AccordionDetails>
        </Accordion>
    );
}