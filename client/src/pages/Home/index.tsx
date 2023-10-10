import Banner from "./Componentes/Banner.tsx";
import { Header, Menu, Footer } from "../../common-components";
import Ultimos from "./Componentes/Ultimos.tsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    function keyHandler(valor: string) {
        if (valor)
            navigate("/catalogo?busq=" + valor);
        else  
            navigate("/catalogo");
    }

    const images = [
        "images/banner1.png",
        "images/banner2.jpg",
        "images/banner3.jpg",
        "images/banner4.jpg",
        "images/banner5.jpg"
    ]
    
    return(
        <>
            <div className="main">
                <Header handleSearchBarKey={keyHandler}/>
                <Menu />
                <Banner images={images}/>
                <Ultimos />
            </div>
            <Footer />
        </>
    )
}