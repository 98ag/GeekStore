import {Footer, Header, Menu} from "../../common-components";
import { useNavigate } from "react-router-dom";
import CarritoSeccionProductos from "./Componentes/CarritoSeccionProductos.tsx";
import "./carrito.css";

export default function Carrito() {
    const navigate = useNavigate();
    function keyHandler(valor: string) {
        if (valor)
            navigate("/catalogo?busq=" + valor);
        else
            navigate("/catalogo");
    }

    return (
        <div className="carrito">
            <div className="carrito__mainContainer">
                <Header handleSearchBarKey={keyHandler}/>
                <Menu />
                <p className="carrito__titulo">Carrito de compras</p>
                <CarritoSeccionProductos />
            </div>
            <Footer />
        </div>
    )
}