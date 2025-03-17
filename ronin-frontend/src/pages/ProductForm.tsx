import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useCreateProduct,
    useProduct,
    useUpdateProduct,
} from "../api/products";
import { Product } from "../types/Product";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductForm() {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct();

    const productId = id && !isNaN(Number(id)) ? Number(id) : null;
    const isEditMode = productId !== null;

    const { data: productData, isLoading } = useProduct(productId ?? 0);

    const [formState, setFormState] = useState<Product>({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        sellerId: 0,
        categoryId: 0,
    });

    useEffect(() => {
        if (isEditMode && productData) setFormState(productData);
    }, [productData, isEditMode]);

    if (isLoading) return <p className="text-white text-center">Loading...</p>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEditMode) {
            updateMutation.mutate(
                { id: productId, product: formState },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({
                            queryKey: ["products"],
                        });
                        navigate("/");
                    },
                }
            );
        } else {
            createMutation.mutate(formState, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["products"] });
                    navigate("/");
                },
            });
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-white border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-center">
                {isEditMode ? "Edit Product" : "Create Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {[
                    { label: "Product Name", name: "name", type: "text" },
                    { label: "Description", name: "description", type: "text" },
                    { label: "Price", name: "price", type: "number" },
                    { label: "Stock", name: "stock", type: "number" },
                    { label: "Seller ID", name: "sellerId", type: "number" },
                    {
                        label: "Category ID",
                        name: "categoryId",
                        type: "number",
                    },
                ].map(({ label, name, type }) => (
                    <div key={name} className="flex flex-col">
                        <label className="text-sm text-gray-300 mb-1">
                            {label}
                        </label>
                        <input
                            type={type}
                            name={name}
                            value={(formState as any)[name]}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded bg-gray-800 text-white"
                        />
                    </div>
                ))}
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        {isEditMode ? "Update" : "Create"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
