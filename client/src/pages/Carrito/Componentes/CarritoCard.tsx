import "../Styles/carritoCard.css"
import { IconButton, Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { RemoveOutlined, AddOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { agregarProducto, quitarProducto, eliminarProducto } from "../../../app/CarritoSlice";
import {Link} from "react-router-dom";

type props = {
    titulo: string;
    cantidad: number;
    precio: number;
    id: string;
}
export default function CarritoCard ({ titulo, cantidad, precio, id }: props) {
    const dispatch = useDispatch();

    return(
        <Card sx={{ display: "flex", borderRadius: 5 }}>
            <Link to={"/detalles?id=" + id}>
                <CardMedia
                    component="img"
                    sx={{ width: 120 }}
                    image="images/Placeholder.svg"
                    title="imagen"
                />
            </Link>


            <CardContent sx={{ display: "flex", alignItems: "center", width: 6/10}}>
                <Link to={"/detalles?id=" + id}>
                    <Typography fontSize={18} fontFamily="Raleway, sans-serif">
                        {titulo}
                    </Typography>
                </Link>
            </CardContent>

            <Box sx={{ display: "flex", flexDirection: "column", width: 1/5, alignItems: "center", justifyContent: "space-evenly"}}>
                <Box sx={{ display: "flex", width: 4/5, alignItems: "center", justifyContent: "space-between", border: "1px solid grey", borderRadius: 5}}>
                    <IconButton onClick={() => dispatch(quitarProducto(id))} disabled={cantidad === 1}>
                        <RemoveOutlined />
                    </IconButton>

                    <Typography fontFamily="Raleway, sans-serif">{cantidad}</Typography>

                    <IconButton onClick={() => dispatch(agregarProducto(id))}>
                        <AddOutlined />
                    </IconButton>
                </Box>

                <Typography fontFamily="Raleway, sans-serif" fontWeight={600} fontSize={18}>
                    {`$${cantidad * precio}`}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around"}}>
                <IconButton disableRipple onClick={ () => dispatch(eliminarProducto(id)) }>
                    <DeleteOutlineOutlined  sx={{ fill: "rgba(157,15,15,0.7)", fontSize: 28 }}/>
                </IconButton>
            </Box>
        </Card>
    );
}