import Logo from "./Components/Logo.tsx";
import SearchBar from "./Components/SearchBar.tsx";
import LoginMenu from "./Components/LoginMenu.tsx";
import ShoppingCartIcon from "./Components/ShoppingCartIcon.tsx"
import LoggedUserMenu from "./Components/LoggedUserMenu.tsx";
import "./header.css"
import { useDispatch, useSelector } from 'react-redux'
import React from "react";
import { deleteCredentials, getCredentials } from "../../app/Slices/CredentialsSlice.ts";
import { Button, Dialog, DialogContentText } from "@mui/material";

export default function Header() {
    const dispatch = useDispatch();
    const { token, username, isAdmin, expiration } = useSelector(getCredentials);
    const [expiredDiagState, setExpiredDiagState] = React.useState<boolean>(false);

    // Check logged-in user's JWT token expiration time. If it's expired, notify the user and delete credentials from state.
    React.useEffect(() => {
        if (expiration !== 0) {
            const currentTimeSeconds = Math.round(Date.now() / 1000);
            if (expiration <= currentTimeSeconds) {
                dispatch(deleteCredentials());
                setExpiredDiagState(true);
            }
        }
    }, []);

    // Display the user menu if there's a JWT token stored in state, else display the login button.
    const renderLoginButtonOrUserMenu =
        (token)
            ? <LoggedUserMenu username={username} isAdmin={isAdmin} />
            : <LoginMenu />;

    // Session expired dialog. Only renders when the expiredDiagState is true.
    const dialogSessionExpired =
            <Dialog
                open={ expiredDiagState }
                onClose={ () => setExpiredDiagState(false) }
                sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}
            >
                <DialogContentText sx={{ margin: 1.3 }}>
                    La sesion ha expirado.<br />Para continuar inicie sesion nuevamente.
                </DialogContentText>

                <Button 
                    onClick={ () => setExpiredDiagState(false) }
                    variant="contained"
                    sx={{ width: 1/2, alignSelf: "center", marginY: 2 }}
                >
                    Entendido.
                </Button>
            </Dialog>;

    return(
        <div className="Header">
            <Logo />
            <SearchBar />
            <ShoppingCartIcon />
            { renderLoginButtonOrUserMenu }
            { dialogSessionExpired }
        </div>
    );
}
