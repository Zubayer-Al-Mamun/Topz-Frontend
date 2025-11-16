import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export default function FullWidthCarousel({
    slides = [],
    autoPlay = true,
    interval = 5000,
    showIndicators = true,
    showArrows = true,
    className = "",
}) {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const autoPlayRef = useRef();

    const prev = useCallback(() => {
        setIndex((i) => (i - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const next = useCallback(() => {
        setIndex((i) => (i + 1) % slides.length);
    }, [slides.length]);

    // AutoPlay logic
    autoPlayRef.current = () => {
        if (!autoPlay || isPaused || slides.length <= 1) return;
        next();
    };

    useEffect(() => {
        if (!autoPlay) return;
        const id = setInterval(() => autoPlayRef.current(), interval);
        return () => clearInterval(id);
    }, [autoPlay, interval, isPaused, slides.length]);

    // Keyboard navigation
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [prev, next]);

    const goTo = (i) => setIndex(i % slides.length);

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
            ref={containerRef}
            className={`w-full mt-2 sm:rounded-lg relative overflow-hidden ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            aria-roledescription="carousel"
        >
            {/* Slides container */}
            <div
                className="flex w-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {slides.map((s, i) => (
                    <NavLink
                        to=""
                        key={s.id ?? i}
                        className="w-full flex-shrink-0 relative"
                        aria-hidden={i !== index}
                    >
                        <img
                            src={s.image}
                            alt={s.title ?? `Slide ${i + 1}`}
                            className="w-full h-auto block object-contain"
                            loading="lazy"
                        />

                        {(s.title || s.subtitle || s.cta) && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="max-w-4xl text-center p-6 md:p-10 text-white rounded-2xl pointer-events-auto">
                                    {s.title && (
                                        <h2 className="text-2xl md:text-4xl font-bold mb-2">
                                            {s.title}
                                        </h2>
                                    )}
                                    {s.subtitle && (
                                        <p className="mb-4 text-sm md:text-base">
                                            {s.subtitle}
                                        </p>
                                    )}
                                    {s.cta && (
                                        <div>
                                            <a
                                                href={s.cta.href}
                                                className="inline-block px-4 py-2 bg-white text-black rounded-md font-medium"
                                            >
                                                {s.cta.label}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* Arrows */}
            {showArrows && slides.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        aria-label="Previous slide"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-1 rounded-full hover:bg-black/60 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>

                    <button
                        onClick={next}
                        aria-label="Next slide"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-1 rounded-full hover:bg-black/60 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </>
            )}

            {/* Indicators */}
            {showIndicators && slides.length > 1 && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex items-center gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`w-2 h-5  max-sm:w-1 max-sm:h-3 rounded-full transition-all duration-200 focus:outline-none ${
                                i === index
                                    ? "scale-125 bg-white"
                                    : "bg-white/50"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
