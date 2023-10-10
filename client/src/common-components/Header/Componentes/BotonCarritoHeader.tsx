import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { carritoTotal } from "../../../app/CarritoSlice.ts";

export default function BotonCarritoHeader() {
    const total = useSelector(carritoTotal);
    return (
        <IconButton disableFocusRipple disableRipple>
            <Link to="/carrito">
                <Badge
                    badgeContent={total}
                    showZero
                    max={99}
                    sx={{
                        "& .MuiBadge-badge": {
                            color: "white",
                            backgroundColor: "#2A7AE4"
                        }
                    }}
                >
                    <ShoppingCartOutlinedIcon sx={{ color: "#1a1a1a", fontSize: 33 }} />
                </Badge>
            </Link>
        </IconButton>
    )
}