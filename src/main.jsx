import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Page from './components/Page'
import { product, products } from './loader/loader'
import Shop from './components/shop/Shop'
import Home from './components/home/Home'
import SingleProduct from './components/SingleProduct'

const router = createBrowserRouter([
  {
    path : "/",
    element : <Page/>,
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
      }
    ]
  },
  {
    path:"/admin",
    element : "this is Admin route"
  }
])




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
