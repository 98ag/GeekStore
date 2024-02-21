import { BrowserRouter } from "react-router-dom"
import Router from "./pages/router"
import "./app.css"

export default function App() {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
}