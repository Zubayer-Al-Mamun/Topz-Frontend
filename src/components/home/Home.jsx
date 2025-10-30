import Product from "../Product";
// import bannar from "../../assets/bannar.png"
import "./home.css";

// import bannar from "../../assets/bannar.png";
import { useLoaderData } from "react-router-dom";
import FullWidthCarousel from "./FullWidthCarousel";

export default function Home() {
    const products = useLoaderData();
    console.log(products);

    // const products = [...products_data].sort(() => Math.random() - 0.5);

    const categories = ["Shirt", "T-Shirt","Hoodie", "Drop Shoulder",  ];
    // console.log(products);

    const slides = [
        {
            id: 1,
            title: "View More..",
            subtitle: "Subtitle",
            image: "https://picsum.photos/1600/700?random=1",
            link: "",
        },
        {
            id: 2,
            title: "Slide 2",
            subtitle: "Subtitle",
            image: "https://picsum.photos/1600/700?random=2",
            link: "",
        },
        {
            id: 3,
            title: "Slide 3",
            subtitle: "Subtitle",
            image: "https://picsum.photos/1600/700?random=3",
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
                    <Product key={idx} product={product} />
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-[#24344c] flex justify-around items-center py-2 border-t md:hidden">
                <button>🏠</button>
                <button>💗</button>
                <button className="bg-blue-500 text-white rounded-full p-4 -mt-8 shadow-lg">
                    🛒
                </button>
                <button>🔔</button>
                <button>👤</button>
            </div>
        </div>
    );
}
