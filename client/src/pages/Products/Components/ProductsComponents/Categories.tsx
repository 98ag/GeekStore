import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSearchParams } from "react-router-dom";
import "../../Styles/categories.css"

type props = {
   categoriesSet: Set<string>;
}

export default function Categories({ categoriesSet } : props) {
    const [searchParams, setSearchParams] = useSearchParams();

    // Sets the "category" search param to the chosen category
    const setCategoryParam = (cat: string) => {
        searchParams.set("category", cat.toLocaleLowerCase());
        setSearchParams(searchParams);
    }

    // Builds an array from the given set, sorts it alphabetically and maps it into renderable elements
    const categoryElementArray = () => {
        return [...categoriesSet].sort().map((cat, index) =>
            <Typography
                fontFamily={"'Raleway', sans-serif"}
                fontWeight={500}
                className="categories__t"
                key={index}
            >
                <span className="categories__name" onClick={ () => setCategoryParam(cat) }>
                    {cat}
                </span>
            </Typography>
        );
    }

    return(
        <div className="categories__container">
            <Accordion defaultExpanded square disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{ borderBottom: '1px solid #dddddd' }}>
                    <Typography fontFamily={"'Raleway', sans-serif"} fontWeight={500}>
                        Categorias
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    { categoryElementArray() }
                </AccordionDetails>
            </Accordion>
        </div>
    );
}