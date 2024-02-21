import "../Styles/productsBanner.css"

export default function ProductsBanner() {
    return (
        <div className="products__bannercontainer">
            <img src="images/cat-default.jpg" alt="Banner Catalogo" className="products__banner"/>
            <p className="products__bannertext">CATALOGO</p>
        </div>
    );
}