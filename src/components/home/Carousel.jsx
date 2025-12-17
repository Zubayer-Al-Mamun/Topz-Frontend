// import { useEffect, useRef, useState } from "react";

// /**
//  * Simple, accessible React Carousel using TailwindCSS.
//  * - container uses `w-[100%]` as requested
//  * - Supports arrows, dots, keyboard, touch swipe and optional autoplay
//  * - Props:
//  *    slides: array of { id: string|number, content: ReactNode } OR array of image URLs (string)
//  *    autoplay: boolean (default: false)
//  *    autoplayInterval: number in ms (default: 4000)
//  *    showDots: boolean (default: true)
//  *    showArrows: boolean (default: true)
//  *
//  * Usage example (see bottom of file):
//  * <Carousel slides={["/img/1.jpg","/img/2.jpg"]} autoplay />
//  */

// const Carousel = ({
//     slides = ["https://picsum.photos/id/237/450/200","https://picsum.photos/id/500/450/200","https://picsum.photos/id/150/450/200"],
//     autoplay = true,
//     autoplayInterval = 4000,
//     showDots = true,
//     showArrows = true,
//     className = "",
// }) => {
//     const normalizedSlides = slides.map((s, i) =>
//         typeof s === "string" ? { id: i, img: s } : { id: s.id ?? i, ...s }
//     );

//     const [index, setIndex] = useState(0);
//     const containerRef = useRef(null);
//     const touchStartX = useRef(null);
//     const autoplayRef = useRef();

//     const count = normalizedSlides.length;

//     useEffect(() => {
//         autoplayRef.current = () => setIndex((i) => (i + 1) % count);
//     }, [count]);

//     useEffect(() => {
//         if (!autoplay) return;
//         const tick = () => autoplayRef.current && autoplayRef.current();
//         const id = setInterval(tick, autoplayInterval);
//         return () => clearInterval(id);
//     }, [autoplay, autoplayInterval]);

//     useEffect(() => {
//         const onKey = (e) => {
//             if (e.key === "ArrowRight") next();
//             if (e.key === "ArrowLeft") prev();
//         };
//         window.addEventListener("keydown", onKey);
//         return () => window.removeEventListener("keydown", onKey);
//     });

//     const prev = () => setIndex((i) => (i - 1 + count) % count);
//     const next = () => setIndex((i) => (i + 1) % count);
//     const goTo = (i) => setIndex(i % count);

//     const onTouchStart = (e) => {
//         touchStartX.current = e.touches?.[0]?.clientX ?? null;
//     };
//     const onTouchMove = (e) => {
//         if (touchStartX.current == null) return;
//         const currentX = e.touches?.[0]?.clientX ?? null;
//         if (currentX == null) return;
//         const diff = touchStartX.current - currentX;
//         // simple threshold
//         if (diff > 50) {
//             next();
//             touchStartX.current = null;
//         } else if (diff < -50) {
//             prev();
//             touchStartX.current = null;
//         }
//     };

//     if (count === 0) return null;

//     return (
//         <div ref={containerRef} className={`relative w-[100%] ${className}`} aria-roledescription="carousel">
//             {/* viewport */}
//             <div className="overflow-hidden w-full rounded-lg" onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
//                 <div className="flex transition-transform duration-500 ease-in-out"
//                     style={{
//                         transform: `translateX(-${index * 100}%)`,
//                         width: `${count * 100}%`,
//                     }}
//                 >
//                     {normalizedSlides.map((s) => (
//                         <div
//                             key={s.id}
//                             className="w-full flex items-center justify-center"
//                         >
//                             {/* If slide has img prop treat as image, else render content */}
//                             {s.img ? (
//                                 <img
//                                     src={s.img}
//                                     alt={s.alt ?? "carousel slide"}
//                                     className="block w-full h-auto object-cover"
//                                     style={{ maxHeight: "600px" }}
//                                 />
//                             ) : (
//                                 <div className="w-full p-6">{s.content}</div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Arrows */}
//             {showArrows && (
//                 <>
//                     <button
//                         aria-label="Previous slide"
//                         onClick={prev}
//                         className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow-lg"
//                     >
//                         ‹
//                     </button>
//                     <button
//                         aria-label="Next slide"
//                         onClick={next}
//                         className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow-lg"
//                     >
//                         ›
//                     </button>
//                 </>
//             )}

//             {/* Dots */}
//             {showDots && (
//                 <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
//                     {normalizedSlides.map((_, i) => (
//                         <button
//                             key={i}
//                             aria-label={`Go to slide ${i + 1}`}
//                             className={`w-3 h-3 rounded-full ${
//                                 i === index ? "scale-110" : "opacity-60"
//                             } bg-white/90 shadow`}
//                             onClick={() => goTo(i)}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Carousel;

// // -------------------
// // Example usage:
// // import Carousel from "./Carousel";
// // const slides = [
// //   "/images/one.jpg",
// //   "/images/two.jpg",
// //   { id: "three", content: (<div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-20">Custom content</div>) }
// // ];
// // <Carousel slides={slides} autoplay autoplayInterval={3000} />
