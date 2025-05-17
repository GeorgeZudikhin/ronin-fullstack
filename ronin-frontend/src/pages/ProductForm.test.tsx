import { vi, describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductForm from "./ProductForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as productsApi from "../api/products";

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

describe("ProductForm", () => {
    it("renders without crashing", () => {
        vi.spyOn(productsApi, "useProduct").mockReturnValue({
            data: null,
            isLoading: false,
        } as any);

        const queryClient = createTestQueryClient();

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <ProductForm />
                </BrowserRouter>
            </QueryClientProvider>
        );

        expect(getByText(/Create Product/i)).toBeInTheDocument();
    });
});
