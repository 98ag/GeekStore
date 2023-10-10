import { Header, Menu, Footer } from "../../common-components";
import CatalogoBanner from "./Componentes/CatalogoBanner.tsx";
import Productos from "./Componentes/Productos.tsx";
import React from "react";
import { Producto } from "../../types/types";
import { useSearchParams } from "react-router-dom";
import { useGetProductosQuery } from "../../app/ApiSlice.ts";

export default function Catalogo() {
    const [productosFiltrados, actualizarProductosFiltrados] = React.useState<Producto[]>([]);
    const [categorias, setCategorias] = React.useState<Set<string>>(new Set());
    const [searchParams, setSearchParams] = useSearchParams();
    const data = useGetProductosQuery().data || { data: [] };

    React.useEffect(() => {
        const param = searchParams.get("busq");
        const newCat = new Set<string>();
        data.data.forEach( (prod: Producto) => prod.categoria && newCat.add(prod.categoria));
        setCategorias(newCat);
        (param)
            ? actualizarProductosFiltrados(filtrar(data.data, param))
            : actualizarProductosFiltrados(data.data);
    }, []);

    const filtrar = (array: Producto[], str: string) => {
        return array.filter((prod) => prod.nombre.toLocaleLowerCase().includes(str));
    }

    const keyHandler = (valor: string) => {
        if (data) {
            if (valor) {
                actualizarProductosFiltrados(filtrar(data.data, valor));
                setSearchParams({ "busq": valor });
            }
            else {
                actualizarProductosFiltrados(data.data);
                setSearchParams({ "busq": "" });
            }
        }
    }

    return(
        <>
            <div className="main">
                <Header handleSearchBarKey={keyHandler} defaultSearchBarText={searchParams.get("busq")}/>
                <Menu />
                <CatalogoBanner />
                <Productos lista={productosFiltrados} categorias={categorias}/>
                <Footer />
            </div>
        </>
    );
};