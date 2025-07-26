"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "@/providers/productsProvider";

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = right, -1 = left
    const { carouselItems } = useProducts();

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) =>
            prev === 0 ? carouselItems.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        if (!carouselItems.length) return;
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(interval);
    }, [carouselItems]);

    if (!carouselItems.length) {
        return (
            <div className="flex items-center justify-center w-full h-[300px] sm:h-[350px] lg:h-[400px] bg-gray-100">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px] mx-auto overflow-hidden shadow-lg">
            <div className="relative w-full h-full">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={carouselItems[currentIndex]?.id}
                        className="absolute w-full h-full"
                        initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src={carouselItems[currentIndex]?.image}
                            alt={`Slide ${currentIndex + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>


                {/* Description and Button in Bottom-Left */}
                <div className="absolute bottom-6 left-6 z-20 flex flex-col items-start space-y-3">
                    {/* Description */}
                    <h1
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white font-serif  px-3 py-1 rounded-md max-w-xs sm:max-w-md"
                        style={{
                            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        {carouselItems[currentIndex]?.description}
                    </h1>

                    {/* Button */}
                    <a
                        href={carouselItems[currentIndex]?.link || "#"}
                        rel="noopener noreferrer"
                        className="mx-4 px-4 py-2 rounded-lg font-semibold text-white backdrop-blur-xl bg-white/20 border border-gray/20 shadow-[inset_0_0_8px_rgba(255,255,255,0.3),_0_0_8px_rgba(255,255,255,0.1)] transition duration-300 hover:backdrop-blur-lg hover:bg-white/20"
                    >
                        {carouselItems[currentIndex]?.name || "Learn More"}
                    </a>
                </div>

                {/* Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full z-30 transition duration-200"
                >
                    <ChevronLeft className="h-5 w-5 text-gray-800" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full z-30 transition duration-200"
                >
                    <ChevronRight className="h-5 w-5 text-gray-800" />
                </button>
            </div>
        </div>
    );
};

export default Carousel;