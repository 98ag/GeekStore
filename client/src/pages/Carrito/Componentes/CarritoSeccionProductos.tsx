import "../Styles/carritoSeccionProductos.css";
import CarritoCard from "./CarritoCard.tsx";
import { useGetProductosQuery } from "../../../app/ApiSlice.ts";
import { carritoTodos } from "../../../app/CarritoSlice.ts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {Button} from "@mui/material";

export default function CarritoSeccionProductos() {
    const productos = useGetProductosQuery().data;
    const carritoActual = useSelector(carritoTodos);
    let precioTotal = 0;

    const productosAMostrar = () => {
        if (productos && Object.keys(carritoActual).length) {
            let prodArr = [];
            let idx = 0;
            for (const [id, cant] of Object.entries(carritoActual)) {
                const objProd = productos.data.find( (obj) => obj._id === id );

                if (objProd) {
                    prodArr.push(
                        <CarritoCard titulo={objProd.nombre} cantidad={cant} precio={objProd.precio} id={id} key={idx++}/>
                    );
                    precioTotal += cant * objProd.precio;
                }

            }
            return prodArr;
        }
        return(
            <div className="carrito__error">
                <h1 className="">El carrito esta vacio.</h1>
                <Link to={"/catalogo"}><span className="carrito__errorLink">Volver al catalogo.</span></Link>
            </div>
        )
    }

    return (
        <div className="carrito__container">
            { productosAMostrar() }
            {
                precioTotal !== 0
                &&
                <div className="carrito__total">
                    <h1 className="carrito__totalPrecio">Total: <span style={{ fontWeight: 600 }}>${precioTotal}</span></h1>
                    <Button variant="contained">Comprar</Button>
                </div>
            }
        </div>
    )
}