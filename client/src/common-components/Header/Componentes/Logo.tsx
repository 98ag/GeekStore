import { Link } from 'react-router-dom';
import "../Styles/logo.css"
export default function Logo() {
    return (
        <Link to="/" className="logo">
            <img src="images/Logo.svg" alt="Logo" className="logo--img"/>
        </Link>
    )
}