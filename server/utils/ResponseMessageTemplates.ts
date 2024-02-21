export const responseError = (err) => {
    return(
        {
            status: "error",
            message: "Error interno del servidor.",
            data: err,
        });
}

export const responseSuccess = (data) => {
    return(
        {
            status: "success",
            data: data,
        });
}

export const responseFail = (data) => {
    return(
        {
            status: "fail",
            data: data,
        });
}