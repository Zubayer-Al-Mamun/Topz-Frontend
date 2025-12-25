import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { addProduct } from "./actions/action";
import Page from "./components/Page";
import PrivateRoute from "./components/PrivateRoute";
import SingleProduct from "./components/SingleProduct";
import AddColor from "./components/adminPanel/AddColor";
import AddProduct from "./components/adminPanel/AddProduct";
import Dashboard from "./components/adminPanel/Dashboard";
import ProductEdit from "./components/adminPanel/ProductEdit";
import AdminProducts from "./components/adminPanel/compo/AdminProducts";
import Analytics from "./components/adminPanel/compo/Analytics";
import Login from "./components/adminPanel/login";
import ContactUs from "./components/contacts/ContactUs";
import Home from "./components/home/Home";
import Shop from "./components/shop/Shop";
import "./index.css";
import { product, products } from "./loader/loader";
import Buy from "./components/buy/Buy";
import SeeColor from "./components/adminPanel/compo/SeeColor";
import Loading from "./components/Loading";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Page />,
        errorElement: <div>Some error in this Route..</div>,
        hydrateFallbackElement: <Loading/>,
        children: [
            {
                index: true,
                element: <Home /> ,
                loader: products,
            },
            {
                path: "buy/:productId",
                element: <Buy/>,
                loader: product,
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
                element: <ContactUs />,
            },
            {
                path: "login",
                element: <Login />,
            },
        ],
    },

    // Protected Admin Routes
    {
        path: "/admin",
        element: <PrivateRoute />, // Protect all admin routes
        children: [
            {
                element: <Dashboard />,
                hydrateFallbackElement: <Loading/>,
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
                        path : "products/seecolor/:productId",
                        element : <SeeColor/>,
                        loader : product,
                    },
                    {
                        path: "products/addcolor/:productId",
                        element: <AddColor />,
                        loader : product,
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
