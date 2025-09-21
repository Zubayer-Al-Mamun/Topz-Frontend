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
import AddProduct from './components/adminPanel/AddProduct'
import ProductEdit from './components/adminPanel/ProductEdit'

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
        element : <div className='text-3xl text-red-400'>Products, EditProduct and ProductAdd is available now</div>
      },
      {
        path : "products/:productId",
        element : <ProductEdit/>,
        loader : product
      },
      {
        path : "productadd",
        element : <AddProduct/>
      },
      // {
      //   path : "products/:productId",
      //   element : <AdminProduct/>,
      //   loader : product,
      // },
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
    <RouterProvider fallback router={router}></RouterProvider>
  </StrictMode>,
)
