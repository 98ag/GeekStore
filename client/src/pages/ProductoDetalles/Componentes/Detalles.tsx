import {Link, useSearchParams} from "react-router-dom";
import { useGetProductoPorIdQuery } from "../../../app/ApiSlice.ts";
import ProductoEncontrado from "./ProductoEncontrado";
import CircularProgress from '@mui/material/CircularProgress';
import "../Styles/detalles.css"

export default function Detalles() {
    const [ params ] = useSearchParams();
    const id = params.get("id") || "";
    const { data, isLoading } = useGetProductoPorIdQuery(id);
    const producto = data && data.data;

    const mostrarError = () => {
        if (isLoading)
            return <CircularProgress />

        return (
            <div className="error">
                <h1 className="error__titulo">¡Ups!</h1>
                <h2 className="error__texto">El producto no fue encontrado.</h2>
                <Link to="/catalogo">
                    <h3 className="error__link">Volver al catalogo</h3>
                </Link>
            </div>
        )
    }

    return (
        <>
            { producto
                ? <ProductoEncontrado producto={producto}/>
                : mostrarError()
            }
        </>
    )
}