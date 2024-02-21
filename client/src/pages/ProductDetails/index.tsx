import { Header, Menu, Footer } from "../../common-components";
import DetailsContent from "./Components/DetailsContent.tsx"
import "./Styles/productDetails.css"

export default function ProductDetails () {
    return (
        <>
            <div className="main">
                <Header />
                <Menu />
                <DetailsContent />
            </div>
            <Footer />
        </>
    );
}