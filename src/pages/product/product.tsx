type ProductPageprops = {params: {slug: string[]}};

async function getData() {
    const res = await fetch("https://fakestoreapi.com/products");

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function ProductPage({params}: ProductPageprops) {
    const products = await getData();
    return (
        <div>
            <h1>Product Page</h1>
            {products.length > 0 && products.map((product: any) => (
                <div key={product.id}>
                    <h2>{product.title}</h2>
                </div>
                
            ))}
        </div>
    )
}