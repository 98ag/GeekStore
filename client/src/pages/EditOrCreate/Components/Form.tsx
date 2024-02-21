import { Product } from "../../../types/types.ts";
import React from "react";
import { Button, CircularProgress, InputAdornment, TextField } from "@mui/material";
import "../Styles/EditForm.css"
import { useNavigate } from "react-router-dom"
import {
    useUpdateProductMutation,
    useCreateProductMutation,
    useDeleteProductMutation,
} from "../../../app/Slices/ProductApiSlice.ts";

type Props = {
    product?: Partial<Product>;
    id?: string;
}

export default function Form({ product, id }: Props) {
    const [info, setInfo] = React.useState<Partial<Product>>(product || {
        img_url: "",
        category: "",
        name: "",
        price: 0,
        description: "",
    });

    const [updateProduct, { isError: isErrorUpdate, isLoading: isLoadingUpdate }] = useUpdateProductMutation();
    const [createProduct, { isError: isErrorCreate, isLoading: isLoadingCreate }] = useCreateProductMutation();
    const [deleteProduct, { isError: isErrorDelete, isLoading: isLoadingDelete }] = useDeleteProductMutation();
    const navigate = useNavigate();

    // Sends an update request. On success, redirects to Products route.
    const handleUpdate = async () => {
        id && await updateProduct({ _id: id,...info});
        if (!isErrorUpdate) navigate("/catalogo");
    }

    // Sends a create request. On success, redirects to Products route.
    const handleCreate = async () => {
        await createProduct(info);
        if (!isErrorCreate) navigate("/catalogo");
    }

    // Sends a delete request. On success, redirects to Products route.
    const handleDelete = async () => {
        id && await deleteProduct(id);
        if (!isErrorDelete) navigate("/catalogo");
    }

    // Returns true if all state values match the product prop values.
    const checkUnchanged = () => {
        if (product) {
            let cond = true;
            // Loop over the state object values and return false if one of them does not match.
            Object.keys(info).forEach(key => {
                const typedKey = key as keyof Product;
                const val = info[typedKey];
                if (val !== product[typedKey]) cond = false;
            });

            return cond;
        }
    }

    const requestUpdateButton =
        <Button
            type="submit"
            onClick={ handleUpdate }
            variant="contained"
            disabled={ checkUnchanged() }
        >
            { isLoadingUpdate
                ? <CircularProgress size={ 20 } sx={{ mx: 5 }}/>
                : "Editar producto" }
        </Button>;

    const requestDeleteButton =
        <Button
            type="submit"
            variant="contained"
            onClick={ handleDelete }
        >
            { isLoadingDelete
                ? <CircularProgress size={ 20 } sx={{ mx: 5 }}/>
                : "Eliminar Producto" }
        </Button>;

    const editorButtons =
        <>
            { requestUpdateButton }
            { requestDeleteButton }
        </>

    // Returns true if any of the text areas is empty
    const checkEmpty = () => {
        let cond = false;

        // Check if any of the info state object values are falsy
        Object.keys(info).forEach( key => {
            const val = info[key as keyof Product];
            if (!val) cond = true;
        });

        return cond;
    }

    const requestCreateButton =
        <Button
            type="submit"
            onClick={ handleCreate }
            variant="contained"
            disabled={ checkEmpty() }
        >
            { isLoadingCreate
                ? <CircularProgress size={20} sx={{ mx: 5 }}/>
                : "Crear producto" }
        </Button>;

    // Shows edit and delete buttons if editing an existing product, otherwise shows the create button.
    const formButtons =
        <div className="editor__buttoncontainer">
            { id ? editorButtons : requestCreateButton }

            <Button variant="outlined" onClick={() => navigate("/catalogo")}>
                Cancelar
            </Button>
        </div>;


    return (
        <div className="editor__container">
            <TextField  
                required
                defaultValue={ info.name }
                onChange={ (e) => setInfo({...info, name: e.target.value})}
                label="Nombre"
                error={ info.name === "" }
                helperText={ info.name === "" ? "Campo requerido." : "" }/>

            <TextField
                required
                defaultValue={ info.description }
                onChange={ (e) => setInfo({...info, description: e.target.value})}
                label="Descripcion"
                multiline
                maxRows={ 6 }
                error={ info.description === "" }
                helperText={ info.description === "" ? "Campo requerido." : "" }/>

            <TextField
                required
                defaultValue={ String(info.price) }
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                onChange={ (e) => setInfo({...info, price: parseInt(e.target.value)}) }
                label="Precio"
                type="number"
                error={ Number.isNaN(info.price) || (info.price as number) < 1 }
                helperText={ Number.isNaN(info.price) || (info.price as number) < 1 ? "Campo requerido. Solo se permiten numeros" : "" }/>

            <TextField
                required
                defaultValue={ info.category }
                onChange={ (e) => setInfo({...info, category: e.target.value})}
                label="Categoria"
                error={ info.category === "" }
                helperText={ info.category === "" ? "Campo requerido." : "" }/>

            <TextField
                required
                defaultValue={ info.img_url }
                placeholder="https://placehold.co/450x450"
                onChange={ (e) => setInfo({...info, img_url: e.target.value})}
                label="URL Imagen"
                error={ info.img_url === "" }
                type="url"
                helperText={ info.img_url === "" ? "Campo requerido." : "" } />

            { formButtons }
        </div>
    )
}
