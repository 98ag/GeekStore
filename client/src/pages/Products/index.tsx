import { Header, Menu, Footer } from "../../common-components";
import ProductsBanner from "./Components/ProductsBanner.tsx";
import ProductsMainContent from "./Components/ProductsMainContent.tsx";

export default function Products() {
    return(
        <>
            <div className="main">
                <Header />
                <Menu />
                <ProductsBanner />
                <ProductsMainContent />
            </div>
            <Footer />
        </>
    );
}