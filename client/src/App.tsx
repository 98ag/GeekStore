import { BrowserRouter } from "react-router-dom"
import Router from "./pages/router"
import { useGetProductosQuery } from "./app/ApiSlice.ts"
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box"
import "./app.css"

export default function App() {
    const cargandoLista = useGetProductosQuery().isLoading;


    return(
        <div className="app">
            { (cargandoLista)
                ? <Box sx={{ height: "100vh", display: "flex"}}><CircularProgress sx={{ margin: "auto" }}/></Box>
                :<BrowserRouter>
                    <Router />
                </BrowserRouter>
            }
        </div>
    )
}