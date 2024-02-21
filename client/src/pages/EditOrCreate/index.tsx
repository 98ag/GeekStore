import { Header, Menu, Footer } from "../../common-components";
import type { RootState } from "../../app/Store.ts";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import ProductEdit from "./Components/ProductEdit.tsx";
import ProductCreate from "./Components/ProductCreate.tsx"

export default function EditOrCreate() {
    const { isAdmin } = useSelector((state: RootState) => state.credentials);
    const { pathname } = useLocation();

    // Shows the ProductEdit screen if an ID was provided through query params, otherwise shows the Create screen
    const page =
        (pathname === "/editar")
            ? <ProductEdit />
            : <ProductCreate />;

    // Redirects to / (Home) if the user does not have admin rights.
    const editOrCreateContent = () => {
        if (isAdmin)
            return(
                <>
                    <div className="main">
                        <Header />
                        <Menu />
                        { page }
                    </div>
                    <Footer />
                </>
            );

        return <Navigate to="/" />;
    }

    return editOrCreateContent();
}
