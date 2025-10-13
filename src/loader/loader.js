// const url = "https://topz-backend.onrender.com";
// const url = "http://localhost:8000";
// const url = "https://cgt900jz-8000.inc1.devtunnels.ms";
// const url = "https://sn34t60d-8000.inc1.devtunnels.ms";

import { getProduct, getProducts } from "../products";









export async function products() {

  return getProducts();



  // try {
  //   const response = await fetch(`${url}/products`);
    
  //   if (!response.ok) {
  //     // Handle HTTP errors
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   const data = await response.json(); // Parse JSON
  //   return data; // Return the actual JSON
    
  // } catch (err) {
  //   console.error("Failed to fetch products:", err);
  //   throw err; // React Router loader will catch this
  // }
}


export async function product({params}) {

  const {productId} = params;
  return getProduct(productId);


  // const {productId} = params;
  // try{
  //   const response = await fetch(`${url}/products/${productId}`);
  //   if(!response.ok){
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   const data = await response.json(); // Parse JSON
  //   console.log(data);
  //   return data;

  // }catch(err){
  //   console.log("Product fecth problem..",err);
  //   throw err;
  // }

}
