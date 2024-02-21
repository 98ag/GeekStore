import { IconButton, Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { RemoveOutlined, AddOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import { store } from "../../../app/Store.ts";
import { cartAddOne, cartRemoveOne, cartDelete } from "../../../app/Slices/ShoppingCartSlice.ts";
import { Link } from "react-router-dom";
import { Product } from "../../../types/types.ts";

type Props = {
    product: Product;
    quantity: number;
}

export default function CartCard ({ product, quantity }: Props) {
    const { name, price, _id: id, img_url } = product;

    const cardImage =
            <Link to={"/detalles?id=" + id}>
                <CardMedia
                    component="img"
                    sx={{ width: 120 }}
                    image={img_url}
                    title="imagen"
                />
            </Link>;

    const cardName =
            <Link to={"/detalles?id=" + id}>
                <Typography fontSize={18} fontFamily="Raleway, sans-serif">
                    {name}
                </Typography>
            </Link>;

    const cardRemoveOneButton =
            <IconButton onClick={() => store.dispatch(cartRemoveOne(id))} disabled={quantity === 1}>
                <RemoveOutlined />
            </IconButton>;

    const cardAddOneButton =
            <IconButton onClick={() => store.dispatch(cartAddOne(id))}>
                <AddOutlined />
            </IconButton>;

    const cardDeleteButton =
            <IconButton disableRipple onClick={ () => store.dispatch(cartDelete(id)) }>
                <DeleteOutlineOutlined  sx={{ fill: "rgba(157,15,15,0.7)", fontSize: 28 }}/>
            </IconButton>;

    const cardQuantityControlButtons =
        <Box sx={{ display: "flex", width: 4/5, alignItems: "center", justifyContent: "space-between", border: "1px solid grey", borderRadius: 5}}>
            { cardRemoveOneButton }
            <Typography fontFamily="Raleway, sans-serif">{ quantity }</Typography>
            { cardAddOneButton }
        </Box>;

    return(
        <Card sx={{ display: "flex", borderRadius: 5 }}>
            { cardImage }

            <CardContent sx={{ display: "flex", alignItems: "center", width: 6/10}}>
                { cardName }
            </CardContent>

            <Box sx={{ display: "flex", flexDirection: "column", width: 1/5, alignItems: "center", justifyContent: "space-evenly"}}>
                { cardQuantityControlButtons }

                <Typography fontFamily="Raleway, sans-serif" fontWeight={600} fontSize={18}>
                    {`$${quantity * price}`}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                { cardDeleteButton }
            </Box>
        </Card>
    );
}