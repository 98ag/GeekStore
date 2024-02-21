import { Product } from "../../../../types/types.ts";
import ProductCard from "./ProductCard.tsx";
import "../../Styles/cardSection.css"

// Returns an array of ProductCard given an array of Product
const productCardArray = (arr :Product[]) => {
    return arr.map((prod, index) =>
        <ProductCard
            product={ prod }
            key={ index }
        />);
}

// Returns a subarray of the Product array which contains 1 to 9 elements.
//  The contents of the resulting array depends on the given page.
const productsByPage = (products: Product[], page: number) => {
    const idxStart = (page - 1) * 9;
    const idxEnd = (page - 1) * 9 + 9;
    return productCardArray(products.slice(idxStart, idxEnd));
}

type Props = {
    products: Product[] | null;
    page: number;
}

export default function CardSection({ products, page }: Props) {
    const content = () => {
        if (!products) return null;

        return (
            <div className="products__list">
                { productsByPage(products, page) }
            </div>
        );
    }

    return content();
}