import { useLoaderData } from "react-router-dom";
import Product from "../Product";
import FullWidthCarousel from "./FullWidthCarousel";
import "./home.css";
import BottomNavbar from "./bottom_nav/BottomNavbar";

export default function Home() {
    const products = useLoaderData();

    // const products = [...products_data].sort(() => Math.random() - 0.5);

    const categories = ["Shirt", "T-Shirt", "Hoodie", "Drop Shoulder"];
    // console.log(products);

    const slides = [
        {
            id: 1,
            title: "View More..",
            subtitle: "Subtitle",
            image: "https://res.cloudinary.com/drtnxa49y/image/upload/v1765689968/frnyy6mvoa6pulbwwtvp.jpg",
            link: "",
        },
        {
            id: 2,
            title: "Slide 2",
            subtitle: "Subtitle",
            image: "https://res.cloudinary.com/drtnxa49y/image/upload/v1765689968/frnyy6mvoa6pulbwwtvp.jpg",
            link: "",
        },
        {
            id: 3,
            title: "Slide 3",
            subtitle: "Subtitle",
            image: "https://res.cloudinary.com/drtnxa49y/image/upload/v1765689968/frnyy6mvoa6pulbwwtvp.jpg",
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
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className="flex-shrink-0 bg-white px-4 py-2 rounded-xl shadow text-sm md:text-base font-medium hover:bg-blue-100"
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="product-cont w-[100%] pb-[60px] flex flex-wrap justify-center max-sm:gap-1 sm:gap-2 mt-2">
                {/* <div>
                    <p className="bangla-text" > আসসালামু আলাইকুম </p>
                </div> */}
                {products.map((product, idx) => (
                    <Product key={idx} product={product}  idx={idx} />
                ))}
            </div>
            <BottomNavbar/>
        </div>
    );
}


