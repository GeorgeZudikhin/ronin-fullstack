import { Link } from "react-router-dom";
import { useDeleteProduct, useProducts } from "../api/products";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductList() {
    const { data: products, isLoading } = useProducts();
    const deleteMutation = useDeleteProduct();
    const queryClient = useQueryClient();

    if (isLoading)
        return <p className="text-center text-lg text-white">Loading...</p>;

    return (
        <div className="min-h-screen p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">
                Product List
            </h2>
            <div className="flex justify-center mb-5">
                <Link to="/create">
                    <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
                        Create Product
                    </button>
                </Link>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products?.map((product) => (
                    <li
                        key={product.id}
                        className="flex flex-col justify-between bg-cyan-800 p-4 rounded-lg shadow-lg text-white border border-gray-700"
                    >
                        <span className="font-semibold text-lg">
                            {product.name}
                        </span>
                        <span className="text-gray-300">
                            Price: ${product.price.toFixed(2)}
                        </span>
                        <div className="mt-4 flex justify-between">
                            <Link to={`/edit/${product.id}`}>
                                <button className="text-white px-3 py-1 rounded transition">
                                    Edit
                                </button>
                            </Link>
                            <button
                                onClick={() => {
                                    deleteMutation.mutate(product.id!, {
                                        onSuccess: () => {
                                            queryClient.invalidateQueries({
                                                queryKey: ["products"],
                                            });
                                        },
                                    });
                                }}
                                className="text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
