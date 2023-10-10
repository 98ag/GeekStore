import Logo from "./Componentes/Logo.tsx";
import SearchBar from "./Componentes/SearchBar.tsx";
import BotonCarritoHeader from "./Componentes/BotonCarritoHeader.tsx"
import "./header.css"

type HeaderProps = {
    handleSearchBarKey: any;
    defaultSearchBarText?: string | null;
}

export default function Header( {handleSearchBarKey, defaultSearchBarText } :HeaderProps) {
    return(
        <div className="Header">
            <Logo />
            <SearchBar handleKey={handleSearchBarKey} defaultVal={defaultSearchBarText || ""}/>
            <BotonCarritoHeader />
        </div>
    )
}