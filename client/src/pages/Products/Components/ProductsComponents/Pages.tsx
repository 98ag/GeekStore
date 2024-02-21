import { Box, Pagination } from "@mui/material";
import React from "react";

type Props = {
    totalPages: number;
    handlePages: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export default function Pages({ totalPages, handlePages }: Props) {
    // Displays the page buttons if there's at least two pages
    const pagesContent = () => {
        if (totalPages >= 2)
            return (
                <Box sx={{display: "flex", justifyContent: "space-around", mt: 3}}>
                    <Pagination
                        count={totalPages}
                        hidePrevButton
                        hideNextButton
                        color="primary"
                        onChange={handlePages}
                    />
                </Box>);
    }

    return pagesContent();
}