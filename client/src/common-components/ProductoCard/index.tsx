import "./productoCard.css";
import { Producto } from "../../types/types.ts";
import { useDispatch } from "react-redux";
import { agregarProducto, quitarProducto, carritoCantidadId } from "../../app/CarritoSlice.ts";
import { Button, IconButton } from '@mui/material';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { Link } from "react-router-dom";

type Props = {
    producto: Producto;
    esThumbnail: boolean;
}

export default function ProductoCard({ producto, esThumbnail }: Props) {
    const dispatch = useDispatch();
    const cantidad = carritoCantidadId(producto._id);

    const botonAgregarNuevo = () => {
        return (
            <Button
                className="card__botoncarrito"
                variant="contained"
                sx = {{ mb: 2 }}
                onClick={ () =>  dispatch(agregarProducto(producto._id)) }
            >
                Agregar al carrito
            </Button>
        );
    }

    const botoneraCarrito = () => {
        return (
            <div className="card__botonera">
                <IconButton
                    size="large"
                    sx={{
                        padding: 0,
                        "&.MuiButtonBase-root:hover": {bgcolor: "transparent"}
                    }}
                    onClick={ () => dispatch(quitarProducto(producto._id)) }
                >
                    <RemoveOutlined sx={{ color: "#2A7AE4" }} fontSize="large"/>
                </IconButton>

                <textarea
                    className="card__botoneraTexto"
                    name="card-cantidad"
                    cols={2}
                    rows={1}
                    disabled={true}
                    readOnly={true}
                    value={cantidad}
                />

                <IconButton
                    size="large"
                    sx={{
                        padding: 0,
                        "&.MuiButtonBase-root:hover": {bgcolor: "transparent"}
                    }}
                    onClick={ () =>  dispatch(agregarProducto(producto._id)) }
                >
                    <AddOutlined sx={{ color: "#2A7AE4" }} fontSize="large"/>
                </IconButton>
            </div>
        )
    }

    const LinkCondicional = ( {children, condicion, ...props}: any) => {
        return (condicion && props.to) ? <Link {...props}>{children}</Link> : <>{children}</>
    }

    return (
            <div className={"card " + (esThumbnail && "thumbnail")}>
                <LinkCondicional to={"/detalles?id=" + producto._id} condicion={esThumbnail}>
                    <div className="card__container">
                        <LinkCondicional to={"/detalles?id=" + producto._id} condicion={!esThumbnail}>
                            <div>
                                <img className="card__imagen" src={producto.img_url} alt="producto-imagen"/>
                            </div>

                            <h2 className='card__nombre'>{producto.nombre}</h2>
                        </LinkCondicional>
                        <p className='card__precio'>${producto.precio}</p>
                        {!esThumbnail &&
                            ( (cantidad)
                            ? botoneraCarrito()
                            : botonAgregarNuevo() )
                        }
                    </div>
                </LinkCondicional>
            </div>
    )
}