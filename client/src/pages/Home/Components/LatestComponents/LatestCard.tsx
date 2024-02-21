import "../../Styles/latestCard.css";
import { Product } from "../../../../types/types.ts";
import { Link } from "react-router-dom";
import React from "react";

type Props = {
    product: Product;
}

export default function LatestCard({ product }: Props) {
    // Set state to false when image is done loading. While true, show a placeholder image.
    const [imageLoading, setImageLoading] = React.useState<boolean>(true);

    return (
            <div className="latestcard">
                <Link to={"/detalles?id=" + product._id} >
                    <div className="latestcard__container">
                        <div className="latestcard__imagecontainer">
                            <img
                                className="latestcard__image"
                                src="/images/Placeholder.svg"
                                alt="producto-imagen"
                                style={{ display: imageLoading ? "block" : "none" }}
                            />

                            <img
                                className="latestcard__image"
                                src={product.img_url}
                                alt="producto-imagen"
                                style={{ display: imageLoading ? "none" : "block" }}
                                onLoad={() => setImageLoading(false)}
                            />
                        </div>

                        <h2 className='latestcard__name'>{product.name}</h2>
                        <p className='latestcard__price'>${product.price}</p>
                    </div>
                </Link>
            </div>
    );
}