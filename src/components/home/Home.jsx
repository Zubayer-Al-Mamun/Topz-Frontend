import { Link, NavLink, useLoaderData } from "react-router-dom";
import Product from "../Product";
import FullWidthCarousel from "./FullWidthCarousel";
import "./home.css";
import BottomNavbar from "./bottom_nav/BottomNavbar";
import { useState } from "react";

export default function Home() {
    const products = useLoaderData();
    const [cat, setCat] = useState("all");
    console.log(cat)

    console.log(products)

    // const products = [...products_data].sort(() => Math.random() - 0.5);

    const categories = ["All","Sharee","Shirt", "T-Shirt", "Hoodie"];
    // console.log(products);

    const slides = [
        {
            id: 1,
            title: "",
            subtitle: "Subtitle",
            image: "https://res.cloudinary.com/drtnxa49y/image/upload/v1788321643/21e70e03047119b47129730297a92b33.jpg",
            link: "",
        },
        {
            id: 2,
            title: "",
            subtitle: "Subtitle",
            image: "https://res.cloudinary.com/drtnxa49y/image/upload/v1788321644/871714161665ca651fd24f9a6bdd988f.jpg",
            link: "",
        },
        {
            id: 3,
            title: "",
            subtitle: "Subtitle",
            image: "https://res.cloudinary.com/drtnxa49y/image/upload/v1788321644/799113f5aa96a8e0df9cd52cc13fbd28.jpg",
            link: "",
        },
        {
            id: 3,
            title: "",
            subtitle: "Subtitle",
            image: "https://res.cloudinary.com/drtnxa49y/image/upload/v1788321645/db0f5688e8c6a68145e7d9bf0096a1c8.jpg",
            link: "",

            
        },
    ];

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);

    return (
        <div className="w-[100%] lg:w-[1100px] flex flex-col items-center ">
            {/* <Carousel2 /> */}

            <FullWidthCarousel
                slides={slides}
                autoPlay={true}
                interval={3000}
            />

            <div className="flex m-[10px] px-2 gap-[10px] overflow-y-hidden categorie">
                {categories.map((cate) => (
                    <button
                        onClick={() => setCat(cate.toLowerCase())}
                        key={cate}
                        className={(cate.toLowerCase()  === cat) ? "flex-shrink-0 px-4 py-2 rounded-xl shadow text-sm md:text-base font-medium hover:bg-blue-100 bg-blue-400" : "flex-shrink-0 bg-white px-4 py-2 rounded-xl shadow text-sm md:text-base font-medium hover:bg-blue-100" }
                    >
                        {cate}
                    </button>
                ))}
            </div>

            <div className="product-cont w-[100%] pb-[60px] flex flex-wrap justify-center max-sm:gap-1 sm:gap-2 mt-2">
                {/* <div>
                    <p className="bangla-text" > আসসালামু আলাইকুম </p>
                </div> */}
                {cat === "all" && products.map((product, idx) => (
                    <Product key={idx} product={product}  idx={idx} />
                ))}

                {cat != "all" && products.filter((item)=> item.category === cat.toLowerCase()).map((product, idx) => (
                     <Product key={idx} product={product}  idx={idx} />
                ))}
            </div>
            <BottomNavbar/>
        </div>
    );
}


