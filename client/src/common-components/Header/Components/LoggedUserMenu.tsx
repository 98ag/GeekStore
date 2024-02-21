import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../../../app/Slices/UserApiSlice.ts";
import { deleteCredentials } from "../../../app/Slices/CredentialsSlice.ts";
import { store } from "../../../app/Store.ts";

type Props = {
    username: string;
    isAdmin: boolean;
}

export default function LoggedUserMenu({ username, isAdmin }: Props) {
    // Popup anchor element state
    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
    const [logout, { isError: logoutIsError, isLoading: logoutIsLoading }] = useLogoutMutation();

    // Sends a logout request and, if successful, deletes the user data from the redux store
    const handleLogout= async () => {
        await logout();
        if ( !logoutIsError )
            store.dispatch(deleteCredentials());
    }

    // Returns the 'create product' button if the user has admin rights
    const createProductAdminButton = () => {
        if (isAdmin)
            return(
                <Link to="/agregar">
                    <MenuItem onClick={ () => setAnchor(null) }>
                        Agregar producto
                    </MenuItem>
                </Link>
            );
    }

    return (
        <>
            <Button size="small" onClick={(e) => setAnchor(e.currentTarget)}>
                <Typography sx={{ marginRight: 1, textTransform: 'none' }}>
                    { username }
                </Typography>

                <Avatar sx={{ width: 32, height: 32 }}>
                    <AccountCircleIcon />
                </Avatar>
            </Button>

            <Menu
                anchorEl={ anchor }
                open={ Boolean(anchor) }
                onClose={ () => setAnchor(null) }
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                { createProductAdminButton() }

                <MenuItem
                    onClick={ handleLogout }
                    disabled={ logoutIsLoading }
                >
                    Cerrar Sesion
                </MenuItem>
            </Menu>
        </>
    )
}