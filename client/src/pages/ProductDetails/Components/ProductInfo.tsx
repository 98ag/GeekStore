import "../Styles/productInfo.css"
import { Product } from "../../../types/types.ts";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { cartAddOne, cartQuantityID } from "../../../app/Slices/ShoppingCartSlice.ts";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

type props = {
    producto: Product;
}

export default function ProductInfo({ producto }: props) {
    const dispatch = useDispatch();
    const quantityInCart = cartQuantityID(producto._id);

    return (
        <div className="productinfo__container">
            <div className="productinfo__imagecontainer">
                <img src={producto.img_url} alt="imagen-producto" className="productinfo_image"/>
            </div>

            <div className="productinfo__data">
                <h1 className="productinfo__name">{producto.name}</h1>
                <p className="productinfo__description">{producto.description}</p>

                <div className="productinfo__price">
                    <p className="productinfo__priceTitle">Precio unitario</p>
                    <p className="productinfo__priceNumber">${producto.price}</p>
                </div>

                <div className="productinfo__buttons">
                    <Button
                        onClick={() => dispatch(cartAddOne(producto._id))}
                        variant="contained"
                    >
                        <AddShoppingCartOutlinedIcon/> Agregar al carrito
                    </Button>
                    { quantityInCart &&
                        <div className="productinfo__qtycontainer">
                            <textarea
                                name="productinfo-qty"
                                className="productinfo__qty"
                                cols={2}
                                rows={1}
                                disabled={true}
                                readOnly={true}
                                value={quantityInCart} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}