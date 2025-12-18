'use client'
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Main slider images - LEFT SIDE (large single image) - 7 slides
const mainSlides = [
    {
        img: '/images/Hero/img6.png',
        title: 'WALK THE SPIRIT',
        title2: 'WEAR THE LEGACY',
        subtitle: 'TULSA SNEAKER COLLECTION',
        description: 'Discover the best products at unbeatable prices. Shop now and enjoy exclusive deals!',
        cta: 'SHOP NOW'
    },
    {
        img: '/images/Hero/img13.jpg',

    },
    {
        img: '/images/Hero/img15.PNG',

    },
    {
        img: '/images/Hero/img14.jpg',

    },
    {
        img: '/images/Hero/img1.JPG',

    },
    {
        img: '/images/Hero/img15.PNG',

    },
    {
        img: '/images/Hero/img10.png',

    }
];

// RIGHT SIDE - 2 images stacked vertically for each of the 7 slides
const rightImageSets = [
    {
        top: '/images/Hero/img2.png',
        bottom: '/images/Hero/img7.png'
    },
    {
        top: '/images/Hero/img8.png',
        bottom: '/images/Hero/img9.png'
    },
    {
        top: '/images/Hero/img11.png',
        bottom: '/images/Hero/img10.png'
    },
    {
        top: '/images/Hero/img4.PNG',
        bottom: '/images/Hero/img8.png'
    },
    {
        top: '/images/Hero/img3.jpg',
        bottom: '/images/Hero/img12.jpg'
    },
    {
        top: '/images/Hero/img5.PNG',
        bottom: '/images/Hero/img8.png'
    },
    {
        top: '/images/Hero/img6.png',
        bottom: '/images/Hero/img7.png'
    }
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 50000);
        return () => clearInterval(timer);
    }, [currentSlide]);

    const handleNext = () => {
        setFadeIn(false);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % mainSlides.length);
            setFadeIn(true);
        }, 300);
    };

    const handlePrev = () => {
        setFadeIn(false);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + mainSlides.length) % mainSlides.length);
            setFadeIn(true);
        }, 300);
    };

    const currentMainSlide = mainSlides[currentSlide];
    const currentRightImages = rightImageSets[currentSlide];

    return (
        <section className="relative py-8 lg:py-12 container-fluid mx-auto">
            <div className="mx-auto ">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">

                    {/* LEFT SIDE - Main Large Slider */}
                    <div className="lg:col-span-8 relative">
                        <div className="relative h-[450px] lg:h-[750px] border border-gray-200 overflow-hidden">
                            {/* Background Image with Fade */}
                            <div
                                className={`absolute inset-0 transition-opacity duration-500 ${
                                    fadeIn ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <img
                                    src={currentMainSlide.img}
                                    alt={currentMainSlide.title}
                                    className="w-full h-full object-contain"
                                />

                            </div>

                            {/* Content Overlay - LEFT SIDE */}
                            <div className="absolute inset-0 flex items-center z-10">
                                <div className="px-8 lg:px-16 max-w-2xl">
                                    <h1 className="text-4xl lg:text-6xl font-bold text-black mb-2 lg:mb-4 leading-tight">
                                        {currentMainSlide.title}
                                    </h1>
                                    <h1 className="text-4xl lg:text-6xl font-bold text-black mb-4 lg:mb-6 leading-tight">
                                        {currentMainSlide.title2}
                                    </h1>
                                    <p className="text-base lg:text-lg text-black/90 mb-6 lg:mb-8 leading-relaxed">
                                        {currentMainSlide.description}
                                    </p>
                                    {
                                        currentMainSlide.cta &&  <button className="bg-red-600 hover:bg-red-700 text-black font-bold px-8 py-3 lg:px-10 lg:py-4 rounded transition-all text-sm lg:text-base shadow-lg hover:shadow-xl">
                                            {currentMainSlide.cta}
                                        </button>
                                    }
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={handlePrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 border border-gray-300/30 bg-gray-100 hover:bg-white/20 backdrop-blur-sm text-gray-600 p-2 rounded-full transition-all z-10 hover:scale-110"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 border border-gray-300/30 bg-gray-100 hover:bg-white/20 backdrop-blur-sm text-gray-600 p-2 rounded-full transition-all z-10 hover:scale-110"
                            >
                                <ChevronRight size={24} />
                            </button>

                            {/* Dots Indicator */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {mainSlides.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setFadeIn(false);
                                            setTimeout(() => {
                                                setCurrentSlide(idx);
                                                setFadeIn(true);
                                            }, 300);
                                        }}
                                        className={`h-2 rounded-full transition-all ${
                                            currentSlide === idx
                                                ? 'w-8 bg-red-600'
                                                : 'w-2 bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - 2 Stacked Images */}
                    <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6">

                        {/* Top Image */}
                        <div
                            className={`relative h-[220px] lg:h-[330px] border border-gray-200 overflow-hidden transition-opacity duration-500 group cursor-pointer ${
                                fadeIn ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <img
                                src={currentRightImages.top}
                                alt="Featured product top"
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 flex items-start justify-start"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Bottom Image */}
                        <div
                            className={`relative h-[220px] lg:h-[330px] border border-gray-200 overflow-hidden transition-opacity duration-500 group cursor-pointer ${
                                fadeIn ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{ transitionDelay: '150ms' }}
                        >
                            <img
                                src={currentRightImages.bottom}
                                alt="Featured product bottom"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSlider;