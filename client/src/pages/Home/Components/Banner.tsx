import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import "../Styles/banner.css"
import React from 'react';

export default function Banner(): React.JSX.Element {
    const [currentSlide, setSlide] = React.useState(0);
    const images = [
        "images/banner1.png",
        "images/banner2.jpg",
        "images/banner3.jpg",
        "images/banner4.jpg",
        "images/banner5.jpg"
    ];

    const autoplayOptions = {
        delay: 4000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
    };

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true,}, [Autoplay(autoplayOptions)]);    

    const updateCurrentSlide = (index: number) => {
        if (!emblaApi) return;
        if (index != currentSlide)
            setSlide(index);
    }

    const handleDotClick = (index: number) => {
        if (!emblaApi) return;
        emblaApi.scrollTo(index);
        updateCurrentSlide(emblaApi.selectedScrollSnap());
    }

    const onSelect = React.useCallback((emblaApi: any) => {
        setSlide(emblaApi.selectedScrollSnap());
      }, []);
    
     React.useEffect(() => {
        if (emblaApi) emblaApi.on('select', onSelect);
      }, [emblaApi, onSelect]);

    return(
        <div className='banner overflow' ref={emblaRef}>
            <div className="banner__container">
                {images.map( (img, index) => 
                    <div className='banner__slide' key={index}>
                        <img src={img} alt="imagen" className='slide-image'/>   
                    </div>
                )}
            </div>
            <div className="banner__dots-container">
                <div className="banner__dots">
                {images.map((_, index) => (
                    <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`${index === currentSlide ? 'activeSlideDot' : ''}`}
                    ></button>
                ))}
                </div>               
            </div>
        </div>
    );
}