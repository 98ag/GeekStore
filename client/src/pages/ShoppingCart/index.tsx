import { Footer, Header, Menu } from "../../common-components";
import CartContent from "./Components/CartContent.tsx";
import "./Styles/shoppingCart.css";

export default function ShoppingCart() {
    return (
        <>
            <div className="main">
                <Header />
                <Menu />
                <p className="cart__title">Carrito de compras</p>
                <CartContent />
            </div>
            <Footer />
        </>
    );
}