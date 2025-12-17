import { useState, useEffect, useRef, useCallback } from "react";

export default function ImageCarousel({
    images = [], 
    autoPlay = true,
    interval = 3000,
    showArrows = true,
    className = ""
}) {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const autoPlayRef = useRef();

    const prev = useCallback(() => {
        setIndex((i) => (i - 1 + images.length) % images.length);
    }, [images.length]);

    const next = useCallback(() => {
        setIndex((i) => (i + 1) % images.length);
    }, [images.length]);

    // AutoPlay logic
    autoPlayRef.current = () => {
        if (!autoPlay || isPaused || images.length <= 1) return;
        next();
    };

    useEffect(() => {
        if (!autoPlay) return;
        const id = setInterval(() => autoPlayRef.current(), interval);
        return () => clearInterval(id);
    }, [autoPlay, interval, isPaused, images.length]);

    // Keyboard navigation
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [prev, next]);

    // Touch handlers for mobile swipe
    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        setIsPaused(true);
    };
    const onTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
        const dx = touchEndX.current - touchStartX.current;
        if (Math.abs(dx) > 40) {
            if (dx > 0) prev();
            else next();
        }
        touchStartX.current = 0;
        touchEndX.current = 0;
        setTimeout(() => setIsPaused(false), 200);
    };

    // Pause on hover
    const onMouseEnter = () => setIsPaused(true);
    const onMouseLeave = () => setIsPaused(false);

    return (
        <div
            className={`w-full h-full relative overflow-hidden ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Slides */}
            <div
                className="flex w-full h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {images.map((img, i) => (
                    <div key={i} className="w-full flex-shrink-0">
                        <img
                            src={img}
                            alt={`Slide ${i + 1}`}
                            className="w-full h-full rounded-lg object-cover"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {/* Arrows */}
            {showArrows && images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-full focus:outline-none"
                    >
                        &#10094;
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-full  focus:outline-none"
                    >
                        &#10095;
                    </button>
                </>
            )}

            {/* Indicators */}
            {/* {images.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                i === index ? " border border-black/80 scale-125" : "bg-white/30"
                            }`}
                        />
                    ))}
                </div>
            )} */}
        </div>
    );
}
