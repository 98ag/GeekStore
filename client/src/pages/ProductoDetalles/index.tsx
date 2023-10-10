import { Header, Menu, Footer } from "../../common-components";
import Detalles from "./Componentes/Detalles"
import "./productoDetalles.css"

export default function ProductoDetalles () {
    return (
        <>
            <div className="main">
                <Header handleSearchBarKey={ () => {console.log("abc")} } />
                <Menu />
                <Detalles />
            </div>
            <Footer />
        </>
    );
}