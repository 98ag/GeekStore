import { Producto } from "../modelos/ProductoModelo";

const crearProducto = (request, response) => {
    const body = request.body;
    if (!body)
        return response.status(400).json({
            success: false,
            error: "Debe proveer un producto"
        });

    const producto = new Producto(body);
    if (!producto)
        return response.status(400).json({
            success: false,
            error: "El producto no es valido"
        });

    producto.save()
        .then(() => {
            response.status(201).json({
                success: true,
                id: producto._id
            })
        })
        .catch (err => {
            return response.status(400).json({
                success: false,
                error: err
            })
        })
}

const actualizarProducto = async (request, response) => {
    const body = request.body;

    if (!body)
        return response
            .status(400)
            .json({ success: false, error: 'Se deben proveer parametros para actualizar el producto.' });

    try {
        const producto = await Producto.findByIdAndUpdate(request.params.id, body, { new: true }).select("-__v");

        if (!producto)
            return response
                .status(404)
                .json({ success: false, error: 'No se encontro el producto a actualizar.'})

        return response.status(200).json({ success: true, data: producto });
    } catch(err) { console.log(err); }
}

const borrarProducto = async (request, response) => {
    try {
        const producto = await Producto.findByIdAndDelete(request.params.id).select("-__v");

        if (!producto)
            return response
                .status(404)
                .json({ success: false, error: 'No se encontro el producto' });

        return response.status(200).json({ success: true, data: producto });
    } catch(err) { console.log(err); }
}

const traerProductos = async (_, response) => {
    try {
        const productos = await Producto.find({}).select("-__v");

        if (!productos.length)
            return response
                .status(404)
                .json({ success: false, error: 'No se encontraron productos.' });

        return response.status(200).json({ success: true, data: productos });
    } catch(err) { console.log("Error: ", err); }
}

const traerProductoId = async (request, response) => {
    try {
        const producto = await Producto.findById(request.params.id).select("-__v");

        if (!producto)
            return response
                .status(404)
                .json({ success: false, error: 'No se encontro el producto.' });

        return response.status(200).json({ success: true, data: producto });
    } catch(err) { console.log(err); }
}

const ProductoController = { crearProducto, actualizarProducto, borrarProducto, traerProductos, traerProductoId };
export default ProductoController;



