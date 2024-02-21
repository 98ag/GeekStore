import { Button, CircularProgress, Dialog, DialogContent, TextField } from "@mui/material";
import { AccountCircle, CheckCircleOutlined } from '@mui/icons-material';
import React from "react";
import { useLoginMutation, useSignupMutation } from "../../../app/Slices/UserApiSlice.ts"

type loginErrorType = {
    status: number;
    data: any;
}

export default function LoginMenu() {
    // Controls whether the login dialog is open
    const [loginDiagState, setLoginDiagState] = React.useState<boolean>(false);

    const [username, setUser] = React.useState<string>("");
    const [password, setPass] = React.useState<string>("");
    const [lastUserLoggedIn, setlastUserLoggedIn] = React.useState<string>("");
    const [lastUserSignUp, setLastUserSignUp] = React.useState<string>("");

    const [login, {
            isLoading: loginLoading,
            isError: loginIsError,
            error: loginErrorData,
    }] = useLoginMutation();

    // Error: user does not exist in the database
    const userDoesNotExistError =  loginIsError                                         // Request returned an error
                                && (loginErrorData as loginErrorType).status === 404    // Error code is 404 (not found)
                                && Boolean(lastUserLoggedIn)                            // Login was attempted
                                && username === lastUserLoggedIn;                       // Current username matches the previously requested username
                                                                                        //  (avoids sending more than one invalid request with the same username)

    // Error: password is wrong for provided username
    const wrongPasswordError =  loginIsError
                                && (loginErrorData as loginErrorType).status === 401    // Error code is 404 (unauthorized)
                                && Boolean(lastUserLoggedIn)
                                && password !== "";                                     // Password is not empty

    const [signup, {
            isLoading: signupLoading,
            isError: signupIsError,
            error: signupErrorData,
            data: signupResponseData,
        }] = useSignupMutation();

    // Error: username provided already exists in the database
    const signupUserAlreadyExistsError = signupIsError
                                        && (signupErrorData as loginErrorType).status === 409   // Error code is 404 (already exists)
                                        && Boolean(lastUserSignUp)
                                        && username === lastUserSignUp;

    // Last signup request success check
    const signupSuccess: boolean =  !signupIsError
                                    && (signupResponseData ?? false)
                                    && (signupResponseData! as { status: string }).status === "success"
                                    && Boolean(lastUserSignUp)
                                    && username === lastUserSignUp;

    const handleLogin = async () => {
        setlastUserLoggedIn(username);
        await login({ username, password });
    }

    const handleSignup = async () => {
        setLastUserSignUp(username);
        await signup({ username, password });
    }

    // Closes the signup / sign in dialog and resets the LastUser states
    const handleDialogClose = () => {
        setUser("");
        setPass("");
        setLastUserSignUp("");
        setlastUserLoggedIn("");
        setLoginDiagState(false);
    }

    const signupDisplay = () => {
        if (signupLoading)
            return <CircularProgress />;
        else if (signupSuccess)
            return <CheckCircleOutlined color="success"/>;

        return "Registrarse";
    }

    return(
        <>
            <Button
                variant="outlined"
                startIcon={<AccountCircle />}
                className="login"
                disableRipple
                onClick={ () => setLoginDiagState(true) }
            >
                Iniciar Sesion
            </Button>

            <Dialog
                open={ loginDiagState }
                onClose={ handleDialogClose }
            >
                <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                        variant="standard"
                        label="Nombre de usuario"
                        onInput={ (e) => setUser((e.target as HTMLTextAreaElement).value) }
                        error={ userDoesNotExistError || signupUserAlreadyExistsError }
                        helperText={ (userDoesNotExistError && "El usuario no existe") || (signupUserAlreadyExistsError && "El usuario ya esta registrado, inicie sesion .") }
                    />

                    <TextField
                        variant="standard"
                        label="Contraseña"
                        type="password"
                        error={ wrongPasswordError }
                        helperText={ wrongPasswordError ? "La contraseña es incorrecta" : "" }
                        onInput={ (e) => setPass((e.target as HTMLTextAreaElement).value) }
                        sx={{ marginTop: 3 }}
                    />

                    <Button
                        variant="contained"
                        disableElevation
                        sx={{ marginTop: 3 }}
                        onClick={ handleLogin }
                        type="submit"
                        disabled= { username === "" || password === "" }
                    >
                        {
                            (loginLoading)
                            ? <CircularProgress />
                            : "Iniciar sesion"
                        }
                    </Button>

                    <Button
                        variant="outlined"
                        disableElevation
                        sx={{ marginTop: 3 }}
                        onClick={ handleSignup }
                        type="submit"
                        disabled={ username === "" || password === "" || (signupUserAlreadyExistsError && username === lastUserLoggedIn) || signupSuccess }
                        color={ signupSuccess ? "success" : "primary" }
                    >
                        { signupDisplay() }
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
}