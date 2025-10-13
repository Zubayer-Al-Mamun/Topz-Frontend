import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { addProduct } from "./actions/action";
import Page from "./components/Page";
import SingleProduct from "./components/SingleProduct";
import AddProduct from "./components/adminPanel/AddProduct";
import Dashboard from "./components/adminPanel/Dashboard";
import ProductEdit from "./components/adminPanel/ProductEdit";
import AdminProducts from "./components/adminPanel/compo/AdminProducts";
import Analytics from "./components/adminPanel/compo/Analytics";
import Home from "./components/home/Home";
import Shop from "./components/shop/Shop";
import "./index.css";
import { product, products } from "./loader/loader";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Page />,
        errorElement: <div>Some error in this Route..</div>,
        children: [
            {
                index: true,
                element: <Home />,
                loader: products,
            },
            {
                path: "/shop",
                element: <Shop />,
                loader: products,
            },
            {
                path: "/products/:productId",
                element: <SingleProduct />,
                loader: product,
            },
            {
                path: "/contacts",
                element: "this route is under Construction",
            },
        ],
    },
    {
        path: "/admin",
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <Analytics />,
            },
            {
                path: "products/:productId",
                element: <ProductEdit />,
                loader: product,
            },
            {
                path: "newproduct",
                element: <AddProduct />,
                action : addProduct
            },
            {
                path: "products",
                element: <AdminProducts />,
                loader: products,
            },
            {
                path: "*",
                element: "This route is under Construction",
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider fallback router={router}></RouterProvider>
    </StrictMode>
);
