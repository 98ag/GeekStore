import "../Styles/seccionProductos.css"
import { Producto } from "../../../types/types.ts";
import { ProductoCard } from "../../../common-components";
import Filtros from "./Filtros.tsx"
import ChipsFiltro from "./ChipsFiltro.tsx"
import React from "react";

type props = {
    lista: Producto[];
    categorias: Set<string>;
}

export default function Productos({ lista, categorias }: props ) {
    const [catFiltro, setCatFiltro] = React.useState<string>("");

    const productoElementos = (arr :Producto[]) => {
        return arr.map( (prod: Producto, index) =>
            <ProductoCard
                producto={prod}
                esThumbnail={false}
                key={index}
            />);
    }

    const productoFiltrar = () => {
        if (catFiltro)
            return productoElementos(lista.filter(prod => prod.categoria === catFiltro));
        else
            return productoElementos(lista);
    }

    const handleCat = (cat: string) => {
        setCatFiltro(cat);
    }

    const handleClick = () => {
        setCatFiltro("");
    }

    return (
    <div className="seccionproduc--container">
        <div className="seccionproduc--categ">
            <Filtros categorias={categorias} handleCat={handleCat}/>
            <ChipsFiltro filtros={[catFiltro]} handleClick={handleClick}/>
        </div>
        <div className="seccionproduc--lista">
            { productoFiltrar() }
        </div>

    </div>
    );
}