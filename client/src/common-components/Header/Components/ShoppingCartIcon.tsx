import { IconButton, Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartTotalQuantity } from "../../../app/Slices/ShoppingCartSlice.ts";

export default function ShoppingCartIcon() {
    const total = useSelector(cartTotalQuantity);
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