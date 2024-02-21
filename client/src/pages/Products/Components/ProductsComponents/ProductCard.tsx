import {Product} from "../../../../types/types.ts";
import {cartAddOne, cartRemoveOne, cartQuantityID} from "../../../../app/Slices/ShoppingCartSlice.ts";
import {useSelector} from "react-redux";
import {RootState, store} from "../../../../app/Store.ts";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import React from "react";
import {IconButton} from "@mui/material";
import {AddOutlined, RemoveOutlined} from "@mui/icons-material";
import "../../Styles/productCard.css"

type Props = {
    product: Product
}

export default function ProductCard ({ product }: Props) {
    const quantity = cartQuantityID(product._id);
    const { isAdmin } =  useSelector((state: RootState) => state.credentials);

    // If the user has admin rights, returns a button which redirects to /edit/id when clicked
    const buttonEditProduct = () => {
        if (isAdmin)
            return(
                <Link to={`/editar?id=${product._id}`} >
                    <Button
                        className="productcard__button"
                        variant="contained"
                        sx = {{ mb: 2 }}
                    >
                        Modificar
                    </Button>
                </Link>
            );
    }

    // Returns a remove/add button to be used when there's at least one unit in the shopping cart
    const buttonUnitControl = (type: "add" | "remove" ) => {
        const isRemove = (type === "remove");

        return (
            <IconButton
                size="large"
                sx={{ padding: 0, "&.MuiButtonBase-root:hover": {bgcolor: "transparent"} }}
                onClick={ () => store.dispatch(isRemove ? cartRemoveOne(product._id) : cartAddOne(product._id)) }
            >
                { isRemove
                    ? <RemoveOutlined sx={{ color: "#2A7AE4" }} fontSize="large"/>
                    : <AddOutlined sx={{ color: "#2A7AE4" }} fontSize="large"/> }
            </IconButton>
        );
    }

    // Returns the quantity control buttons (addOne, removeOne, quantity) if there's at least one unit in the shopping cart
    //  otherwise return an "Add to cart" button
    const cardButtons = () => {
        if (quantity)
            return (
                <div className="productcard__quantitycontrol">
                    { buttonUnitControl("remove") }

                    <textarea
                        className="productcard__quantity"
                        name="card-cantidad"
                        cols={3}
                        rows={1}
                        disabled={true}
                        readOnly={true}
                        value={quantity}
                    />

                    { buttonUnitControl("add") }
                </div>
            );

        return (
            <Button
                className="productcard__button"
                variant="contained"
                sx = {{ mb: 2 }}
                onClick={ () =>  store.dispatch(cartAddOne(product._id)) }
            >
                Agregar al carrito
            </Button>
        );
    }

    // State used to track whether the product's image is loaded (shows a placeholder while it's loading)
    const [imageLoading, setImageLoading] = React.useState<boolean>(true);

    return (
        <div className="productcard">
            <div className="productcard__container">
                <Link to={"/detalles?id=" + product._id}>
                    <img
                        className="productcard__image"
                        src="/images/Placeholder.svg"
                        alt="producto-imagen"
                        style={{ display: imageLoading ? "block" : "none" }}
                    />

                    <img
                        className="productcard__image"
                        src={product.img_url}
                        alt="producto-imagen"
                        style={{ display: imageLoading ? "none" : "block" }}
                        onLoad={() => setImageLoading(false)}
                    />
                </Link>
                <h2 className='productcard__name'>{product.name}</h2>
                <p className='productcard__price'>${product.price}</p>
                { cardButtons() }
                { buttonEditProduct() }
            </div>
        </div>
    );
}

