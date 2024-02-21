import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

// Dialog shown when the server can't be reached
export default function ConnectionErrorDialog() {
    return (
        <Dialog
            open={ true }
            onClose={() => {}}
        >
            <DialogContent>
                <DialogContentText>
                    No se pudo comunicar con el servidor. Intente de nuevo en unos minutos.
                </DialogContentText>

                <DialogActions>
                    <Button onClick={ () => location.reload() }>Recargar Pagina</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}