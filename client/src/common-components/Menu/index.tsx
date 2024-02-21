import "./menu.css"
import { Link } from 'react-router-dom';
//import DarkMode from "./Components/DarkMode.tsx"

export default function Menu() {
    return(
        <div className="menu">
            <div className="menu__linkcontainer">
                <Link className="menu__link" to="/catalogo">Productos</Link>
                <Link className="menu__link" to="/info">Mas informacion</Link>
            </div>
        </div>
        
    );
}