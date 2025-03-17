import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { Product } from "../types/Product";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await apiClient.get("");
      return response.data;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await apiClient.get(`/${id}`);
      return response.data;
    },
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (product: Product) => {
      const response = await apiClient.post("", product);
      return response.data;
    }
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async ({ id, product }: { id: number; product: Product }) => {
      const response = await apiClient.put(`/${id}`, product);
      return response.data;
    },
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/${id}`);
    },
  });
};
