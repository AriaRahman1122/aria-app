import { useRouter } from "next/router";

/**
 * DetailProductPage component
 * This component displays the details of a specific product.
 */
const DetailProductPage = () => {
    const router = useRouter();
    return (
        <div>
            {/* Heading for the detail product page */}
            <h1>Detail Product Page</h1>
            {/* Placeholder for product details */}
            {/* router.query.product is the product of the product */}
            {/* router.query.product is the product of the product, we display it in this paragraph */}
            <p>Product : {router.query.product}</p>
        </div>
    )
}

export default DetailProductPage;

// Example url: http://localhost:3000/product/123 -> product = 123, so will Display "Product : 123"