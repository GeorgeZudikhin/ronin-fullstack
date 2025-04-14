import { useProducts } from "../api/products";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
    const { data: products, isLoading } = useProducts();

    if (isLoading)
        return <p className="text-center text-lg text-white">Loading...</p>;

    return (
        <>
            <Navbar />
            <div className="min-h-screen p-6 mt-14">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products?.map((product) => (
                        <li key={product.id}>
                            <ProductCard
                                id={product.id}
                                name={product.name}
                                price={product.price}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
