import { Link, useSearchParams } from "react-router-dom";
import { useGetProductWithIDQuery } from "../../../app/Slices/ProductApiSlice.ts";
import Form from "./Form.tsx";
import { ConnectionErrorDialog } from "../../../common-components";
import { Box, LinearProgress } from "@mui/material";

export default function ProductEdit() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id") || "";
    const { data, isLoading, isError, error } = useGetProductWithIDQuery(id);

    // Returns the edit form screen when the GetProductWithIDQuery request is completed.
    const editorContent = () => {
        if (isLoading) // Request is loading
            return (
                <Box sx={{ width: "80%", margin: "auto"}}>
                    <LinearProgress />
                </Box>
            );

        else if (isError) {
            if ('status' in error && error.status === 404) // not found
                return (
                    <div className="editor__IDerror">
                        <h1>No se encontro un producto con esa ID.</h1>
                        <Link to={"/catalogo"}><span className="editor__IDerrorlink">Volver al catalogo.</span></Link>
                    </div>
                );

            return <ConnectionErrorDialog />; // Server error message if code is not 404
        }

        return(
            <Form
                product={ data }
                id={ id }
            />);
    }

    return editorContent();
}
