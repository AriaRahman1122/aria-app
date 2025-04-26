import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type productType = {
    id: number;
    name: string;
    price: number;
    size: string;
};

const ProductPages = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // State to track login status
    const [products, setProducts] = useState([]); // State to store the list of products [products]
    const router = useRouter(); // Router instance from Next.js

    useEffect(() => {
        if (!isLoggedIn) { // If the user is not logged in
            router.push('/auth/login'); // Redirect to login page
        }
    }, [isLoggedIn]); // Dependency array to re-run effect when isLoggedIn changes

    useEffect(() => {
        // Fetch the list of products from the API when the component mounts
        fetch('http://localhost:3000/api/product')
        .then(res => res.json())
        .then(response => {
            // Update the state with the received data
            setProducts(response.data);
        });
    }, []); // Empty dependency array to only run the effect once when the component mounts
    return (
        <div>
            <h1>Product Page</h1>
            {products.map((product: productType) => (
                <div key={product.id}>{product.name}</div>
            ))}
        </div>
    )
}

export default ProductPages;

// Access: http://localhost:3000/product