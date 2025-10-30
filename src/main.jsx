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
import PrivateRoute from "./components/PrivateRoute"; // ✅ import this
import "./index.css";
import { product, products } from "./loader/loader";
import Login from "./components/adminPanel/login";

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
                path: "shop",
                element: <Shop />,
                loader: products,
            },
            {
                path: "product/:productId",
                element: <SingleProduct />,
                loader: product,
            },
            {
                path: "contacts",
                element: <div>This route is under Construction</div>,
            },
            {
                path : "login",
                element : <Login/>
            }
        ],
    },

    // ✅ Protected Admin Routes
    {
        path: "/admin",
        element: <PrivateRoute />, // Protect all admin routes
        children: [
            {
                element: <Dashboard />, // Dashboard layout
                children: [
                    {
                        index: true,
                        element: <Analytics />,
                    },
                    {
                        path: "products",
                        element: <AdminProducts />,
                        loader: products,
                    },
                    {
                        path: "products/:productId",
                        element: <ProductEdit />,
                        loader: product,
                    },
                    {
                        path: "newproduct",
                        element: <AddProduct />,
                        action: addProduct,
                    },
                    {
                        path: "*",
                        element: <div>This route is under Construction</div>,
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
