import { useRouter } from "next/router";

const ShopPages = () => {
    const router = useRouter();
    return (
        <div>
            <h1>Shop Page</h1>
            {/* Display the category from the router query. If 'slug' is an array, join the elements with a hyphen; otherwise, display it directly */}
            <p>Category : {Array.isArray(router.query.slug) ? router.query.slug.join('-') : router.query.slug}</p>
        </div>
    )
}   

export default ShopPages;