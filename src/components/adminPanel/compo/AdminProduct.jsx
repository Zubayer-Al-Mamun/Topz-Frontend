import { useLoaderData } from "react-router-dom";

export default function AdminProduct(){
    const product = useLoaderData();
    return (
        <div className="bg-amber-200 ">
            {
                product.title
            }
        </div>
    );
}