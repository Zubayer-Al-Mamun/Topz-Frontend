const url = import.meta.env.VITE_API_URL;

export async function products() {
    console.log(`${url}/products`);

    try {
        const response = await fetch(`${url}/products`);

        console.log(response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data; // Return the actual JSON
    } catch (err) {
        console.error("Failed to fetch products:", err);
        throw err; // React Router loader will catch this
    }
}

export async function product({ params }) {
    const { productId } = params;
    try {
        const response = await fetch(`${url}/product/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log("Product fecth problem..", err);
        throw err;
    }
}
