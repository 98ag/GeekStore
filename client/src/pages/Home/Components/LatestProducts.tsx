import React from 'react';
import { Product } from "../../../types/types.ts";
import useEmblaCarousel from 'embla-carousel-react';
import { PrevButton, NextButton } from './LatestComponents/LatestCarouselButtons.tsx';
import LatestCard from "./LatestComponents/LatestCard.tsx";
import { useGetLatestProductsQuery } from "../../../app/Slices/ProductApiSlice.ts";
import { Box, LinearProgress } from "@mui/material";
import { ConnectionErrorDialog } from "../../../common-components";
import "../Styles/latest.css"

export default function LatestProducts() {
    const { data, isLoading, isError } = useGetLatestProductsQuery(8, { pollingInterval:  300000 });
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true, duration: 60 });
    const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const latestCardArray = () => {
        if (data)
            return data.map((prod: Product, index: number) =>
                <LatestCard
                    product={prod}
                    key={index}
                />
            );

        return [];
    }

    const latestContent = () => {
        if (isLoading)
            return (
                <Box sx={{ width: "80%", margin: "auto"}}>
                    <LinearProgress />
                </Box>
            );

        else if (isError)
            return <ConnectionErrorDialog />;

        else {
            const elementArray = latestCardArray();

            if (elementArray.length)
                return(
                    <div className="latest__carouselcontainer">
                        <div className="latest__emblacontainer">
                            <div className="overflow" ref={ emblaRef }>
                                <div className="latest__emblaelements">
                                    { latestCardArray() }
                                </div>
                            </div>
                        </div>

                        <PrevButton onClick={scrollPrev} classProp="latest__prev"/>
                        <NextButton onClick={scrollNext} classProp="latest__next"/>
                    </div>
                );

            return null;
        }
    }


    return(
        <div className='latest'>
            <h1 className="latest__title">Ultimos productos</h1>

            { latestContent() }
        </div>
    )
}