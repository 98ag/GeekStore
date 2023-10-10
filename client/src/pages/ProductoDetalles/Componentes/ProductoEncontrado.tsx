import "../Styles/productoEncontrado.css"
import { Producto } from "../../../types/types.ts";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { agregarProducto, carritoCantidadId } from "../../../app/CarritoSlice.ts";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

type props = {
    producto: Producto;
}

export default function ProductoEncontrado({ producto }: props) {
    const dispatch = useDispatch();
    const cantidad = carritoCantidadId(producto._id);

    return (
        <div className="pe__container">
            <div className="pe__imagenContainer">
                <img src={producto.img_url} alt="imagen-producto" className="pe__imagen"/>
            </div>

            <div className="pe__infoContainer">
                <h1 className="pe__nombre">{producto.nombre}</h1>
                <p className="pe__descripcion">{producto.descripcion}</p>

                <div className="pe__precio">
                    <p className="pe__precioTitulo">Precio unitario</p>
                    <p className="pe__precioValor">${producto.precio}</p>
                </div>

                <div className="pe__boton">
                    <Button
                        onClick={() => dispatch(agregarProducto(producto._id))}
                        disabled={cantidad > 4}
                        variant="contained"

                    >
                        <AddShoppingCartOutlinedIcon/>Agregar al carrito
                    </Button>
                    { cantidad &&
                        <div className="pe__cantidadContainer">
                            <textarea
                                name="prod-cantidad"
                                className="pe__cantidad"
                                cols={2}
                                rows={1}
                                disabled={true}
                                readOnly={true}
                                value={cantidad} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}