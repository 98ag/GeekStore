import { routerType } from "../types/router.types";
import Home from "./Home";
import Catalogo from "./Catalogo"
import Carrito from "./Carrito"
import Info from "./Info";
import ProductoDetalles from "./ProductoDetalles";

const pageData: routerType[] = [
    {
        path: "",
        element: <Home />,
        title: "home"
    },
    {
        path: "/catalogo",
        element: <Catalogo />,
        title: "catalogo"
    },
    {
        path: "/carrito",
        element: <Carrito />,
        title: "carrito"
    },
    {
        path: "/info",
        element: <Info />,
        title: "info"
    },
    {
        path: "/detalles",
        element: <ProductoDetalles />,
        title: "detalles"
    }
]

export default pageData;