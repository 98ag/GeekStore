import "../Styles/products.css"
import { Product } from "../../../types/types.ts";
import Categories from "./ProductsComponents/Categories.tsx";
import Filters from "./ProductsComponents/Filters.tsx";
import Pages from "./ProductsComponents/Pages.tsx";
import CardSection from "./ProductsComponents/CardSection.tsx";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../app/Slices/ProductApiSlice.ts";
import { Box, LinearProgress, Button } from "@mui/material";
import { ConnectionErrorDialog } from "../../../common-components";

// Returns a filtered Product array where each product's name contains the given string.
//  If no valid string was given, returns the original array.
const filterByName = (array: Product[], str: string | null) => {
    return str
        ? array.filter((p) => p.name.toLocaleLowerCase().includes(str))
        : array;
}

// Returns a filtered Product array where each product's category matches the given string.
//  If no valid string was given, returns the original array.
const filterByCategory = (array: Product[], str: string | null) => {
    return str
        ? array.filter(p => p.category.toLocaleLowerCase() === str)
        : array;
}

export default function ProductsMainContent() {
    const [searchParams] = useSearchParams();
    const searchbarParam = searchParams.get("search");
    const categoryParam = searchParams.get("category");

    const [filteredProducts, setFilteredProducts] = React.useState<null | Product[]>(null);
    const [categories, setCategories] = React.useState<Set<string>>(new Set());
    const [currentPage, setCurrentPage] = React.useState<number>(1);

    const { data, isLoading, isError } = useGetAllProductsQuery(null, { pollingInterval:  300000 });

    React.useEffect(() => {
        if (data) {
            // Filter server data by name ("search" search parameter)
            let result = filterByName(data, searchbarParam);
            // Build a set with the filtered items' categories and store it in state
            const catset = new Set<string>(result.map(p => p.category));
            setCategories(catset);
            // Then filter by category ("category" search parameter)
            result = filterByCategory(result, categoryParam);
            // Reset the page tracker state
            setCurrentPage(1);
            setFilteredProducts(result);
        }
    }, [data, searchbarParam, categoryParam]); // Run this every time new data from the server is fetched or the search params change

    // Parameter values for Filters. Each possible filter is hardcoded here.
    const filterComponentParams = {
        search: searchbarParam,
        category: categoryParam,
    }

    // Changes the current page and scrolls up to the top
    const handlePageChange = (_e: React.ChangeEvent<unknown>, page: number) => {
        if (page !== currentPage) {
            setCurrentPage(page);
            window.scrollTo({ top: 160, behavior: 'smooth', });
        }
    }

    // Shows the products page content
    const productsContent = () => {
        // Couldn't fetch data from server
        if (isError)
            return <ConnectionErrorDialog />;

        // Displays a progress bar while awaiting server response
        else if (isLoading)
            return (
                <Box sx={{ width: "80%", margin: "auto"}}>
                    <LinearProgress />
                </Box>
            );

        // No products were found. Provides a button to clear the current filters
        else if (filteredProducts && !filteredProducts.length)
            return (
                <Box sx={{ width: "80%", mx: "auto", textAlign: "center"}}>
                    <h1>No se encontraron productos.</h1>
                    <Link to={"/catalogo"}>
                        <Button>Limpiar filtros</Button>
                    </Link>
                </Box>
            );

        return(
            <div className="products__container">
                <Categories categoriesSet={ categories } />

                <div className="products__main">
                    <Filters filters={ filterComponentParams } />

                    <CardSection
                        products={ filteredProducts }
                        page={ currentPage }
                    />

                    <Pages
                        totalPages={ filteredProducts ? Math.floor(filteredProducts.length / 9) + 1 : 0 }
                        handlePages={ handlePageChange }
                    />
                </div>
            </div>
        );
    }

    return productsContent();
}