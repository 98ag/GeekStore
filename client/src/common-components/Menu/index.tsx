import "./menu.css"
import { Link } from 'react-router-dom';
export default function Menu() {
    return(
        <div className="menu">
            <div className="menu__links">
                <Link className="menu__link" to="/catalogo">Productos</Link>
                <Link className="menu__link" to="/info">Mas informacion</Link>
            </div>
        </div>
    );
}