import { redirect } from "react-router-dom";

export async function addProduct({ request}){
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    console.log( formData);
    return redirect("/admin/products");
} 