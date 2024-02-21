import Banner from "./Components/Banner.tsx";
import { Header, Menu, Footer } from "../../common-components";
import LatestProducts from "./Components/LatestProducts.tsx";

export default function Home() {
    return(
        <>
            <div className="main">
                <Header />
                <Menu />
                <Banner />
                <LatestProducts />
            </div>
            <Footer />
        </>
    );
}