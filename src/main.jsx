import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Page from './components/Page'
import { product, products } from './loader/loader'
import Shop from './components/shop/Shop'
import Home from './components/home/Home'
import SingleProduct from './components/SingleProduct'
import Dashboard from './components/adminPanel/Dashboard'
import AdminProducts from './components/adminPanel/compo/AdminProducts'
import AdminProduct from './components/adminPanel/compo/AdminProduct'

const router = createBrowserRouter([
  {
    path : "/",
    element : <Page/>,
    errorElement : <div>Some error in this Route..</div>,
    children : [
      {
        index : true,
        element : <Home/>,
        loader : products,
      },
      {
        path : "/shop",
        element : <Shop/>,
        loader : products,
      },
      {
        path : "/products/:productId",
        element : <SingleProduct/>,
        loader : product,
      },
      {
        path : "/contacts",
        element : "this route is under Construction",
      }
    ]
  },
  {
    path:"/admin",
    element : <Dashboard/>,
    children:[
      {
        index : true,
        element : "Analisis data"
      },
      {
        path : "products/:productId",
        element : <AdminProduct/>,
        loader : product,
      },
      {
        path : "products",
        element : <AdminProducts/>,
        loader : products,
      },
      {
        path : "*",
        element : "This route is under Construction"
      }
    ]
  },
])




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
