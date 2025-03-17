import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/create" element={<ProductForm />} />
            <Route path="/edit/:id" element={<ProductForm />} />
        </Routes>
    );
}
