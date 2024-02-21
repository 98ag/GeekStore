import { Link, useSearchParams } from "react-router-dom";
import { useGetProductWithIDQuery } from "../../../app/Slices/ProductApiSlice.ts";
import ProductInfo from "./ProductInfo.tsx";
import { Box, LinearProgress } from "@mui/material";
import { ConnectionErrorDialog } from "../../../common-components";

export default function DetailsContent() {
    const [params] = useSearchParams();
    const id = params.get("id") || "";
    const { data: queryResultData, isLoading, isError } = useGetProductWithIDQuery(id);

    const content = () => {
        // Server response error
        if (isError)
            return <ConnectionErrorDialog />;

        // Request is being processed
        else if (isLoading)
            return (
                <Box sx={{ width: "80%", margin: "auto"}}>
                    <LinearProgress />
                </Box>
            );

        // Error: No ID given or no matching product was found
        else if (!(id && queryResultData))
            return(
                <div className="error">
                    <h1 className="error__titulo">¡Ups!</h1>
                    <h2 className="error__texto">El producto no fue encontrado.</h2>
                    <Link to="/catalogo">
                        <h3 className="error__link">Volver al catalogo</h3>
                    </Link>
                </div>
            );

        else
            return(<ProductInfo producto={ queryResultData }/>);
    }

    return content();
}