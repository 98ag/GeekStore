import React from 'react';
import { Producto } from "../../../types/types.ts";
import "../Styles/ultimos.css"
import useEmblaCarousel from 'embla-carousel-react';
import { BotonAnterior, BotonSiguiente, ProductoCard } from '../../../common-components';
import { useGetProductosQuery } from "../../../app/ApiSlice.ts";

export default function Ultimos(): React.JSX.Element {
    const { data } = useGetProductosQuery();

    const productoElements = () => {
        if (data) {
            return data.data.map( (prod: Producto, index: number) =>
                    <ProductoCard
                        producto={prod}
                        esThumbnail={true}
                        key={index}
                    />)
        }
        return [];
    }

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: 5, duration: 50 }); 
    const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return(
        <div className='ultimos'>
            <h1 className="ultimos__titulo">Ultimos productos</h1>

            <div className="ultimos__carouselcontainer">
                <div className="ultimos__emblacontainer">
                    <div className="overflow" ref={emblaRef}>
                        <div className="ultimos__emblaelements">
                            {productoElements()}
                        </div>           
                    </div>  
                </div>

                <BotonAnterior onClick={scrollPrev} clase="ultimos__prev"/>
                <BotonSiguiente onClick={scrollNext} clase="ultimos__next"/>
            </div>
        </div>
    )
}