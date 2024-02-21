import { routerType } from "../types/router.types";
import Home from "./Home";
import Products from "./Products"
import ShoppingCart from "./ShoppingCart"
import Info from "./Info";
import ProductDetails from "./ProductDetails";
import EditOrCreate from "./EditOrCreate";

const pageData: routerType[] = [
    {
        path: "",
        element: <Home />,
        title: "Home"
    },
    {
        path: "/catalogo",
        element: <Products />,
        title: "Products"
    },
    {
        path: "/carrito",
        element: <ShoppingCart />,
        title: "ShoppingCart"
    },
    {
        path: "/info",
        element: <Info />,
        title: "Info"
    },
    {
        path: "/detalles",
        element: <ProductDetails />,
        title: "Detalles"
    },
    {
        path: "/editar",
        element: <EditOrCreate />,
        title: "Editar"
    },
    {
        path: "/agregar",
        element: <EditOrCreate />,
        title: "Agregar"
    }
]

export default pageData;