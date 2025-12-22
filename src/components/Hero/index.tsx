'use client'
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getHeroSections } from "@/lib/actions/hero-section";
import { toast } from "sonner";
import {HeroSection} from "@/types/hero-section";

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchHeroSections = async () => {
        try {
            setLoading(true);
            const response = await getHeroSections({
                page: 1,
                limit: 10,
            });
            console.log(response);
            setHeroSections(response.data);
            if (response.data?.length > 0) {
                setHeroSections(response.data);
                console.log(response);
            } else {
                toast.error(response.message || "No hero sections found");
            }
        } catch (error) {
            toast.error("Failed to fetch hero sections");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHeroSections();
    }, []);

    useEffect(() => {
        if (heroSections.length === 0) return;

        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentSlide, heroSections.length]);

    const handleNext = () => {
        if (heroSections.length === 0) return;
        setFadeIn(false);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSections.length);
            setFadeIn(true);
        }, 300);
    };

    const handlePrev = () => {
        if (heroSections.length === 0) return;
        setFadeIn(false);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + heroSections.length) % heroSections.length);
            setFadeIn(true);
        }, 300);
    };

    if (loading) {
        return (
            <section className="relative py-4 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
                <div className="container-fluid mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                        <div className="lg:col-span-8 h-[300px] sm:h-[350px] md:h-[450px] lg:h-[750px] bg-gray-200 animate-pulse rounded-lg"></div>
                        <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
                            <div className="h-[140px] sm:h-40 md:h-[220px] lg:h-[365px] bg-gray-200 animate-pulse rounded-lg"></div>
                            <div className="h-[140px] sm:h-40 md:h-[220px] lg:h-[365px] bg-gray-200 animate-pulse rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (heroSections.length == 0) {
        return (
            <section className="relative py-4 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
                <div className="container-fluid mx-auto text-center">
                    <p className="text-gray-500">No hero sections available</p>
                </div>
            </section>
        );
    }

    const currentSection = heroSections[currentSlide];

    return (
        <section className="relative py-4 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
            <div className=" mx-auto container-fluid">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">

                    {/* LEFT SIDE - Main Large Slider */}
                    <div className="lg:col-span-8 relative">
                        <div className="relative h-[300px] sm:h-[350px] md:h-[450px] lg:h-[765px] overflow-hidden ">
                            {/* Background Image with Fade */}
                            <div
                                className={`absolute inset-0 transition-opacity duration-500 ${
                                    fadeIn ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <img
                                    src={currentSection.full_image_1 || '/images/placeholder.png'}
                                    alt={currentSection.title || 'Hero image'}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src = '/images/placeholder.png';
                                    }}
                                />
                            </div>

                            {/* Gradient Overlay for Better Text Visibility */}
                            <div className="absolute inset-0 bg-linear-to-r from-black/40 via-black/10 to-transparent lg:from-black/30"></div>

                            {/* Content Overlay - LEFT SIDE */}
                            <div className="absolute inset-0 flex items-center z-10">
                                <div className="px-4 sm:px-6 md:px-8 lg:px-16 max-w-lg md:max-w-3xl text-wrap">
                                    {currentSection.title && (
                                        <h1 className="text-2xl sm:text-3xl text-wrap md:text-4xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-snug sm:leading-tight">
                                            {currentSection.title}
                                        </h1>
                                    )}
                                    {currentSection.subtitle && (
                                        <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                                            {currentSection.subtitle}
                                        </p>
                                    )}
                                    {currentSection.cta_text && (
                                        <a
                                            href={currentSection.cta_link || '#'}
                                            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 sm:px-8 sm:py-3 lg:px-10 lg:py-4 rounded-md sm:rounded-lg transition-all text-xs sm:text-sm md:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            {currentSection.cta_text}
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            {heroSections.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrev}
                                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 border border-gray-300/30 bg-white/10 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full transition-all z-10 hover:bg-white/20 "
                                        aria-label="Previous slide"
                                    >
                                        <ChevronLeft size={20}  />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 border border-gray-300/30 bg-white/10 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full transition-all z-10 hover:bg-white/20 "
                                        aria-label="Next slide"
                                    >
                                        <ChevronRight size={20}  />
                                    </button>

                                    {/* Dots Indicator */}
                                    <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
                                        {heroSections.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setFadeIn(false);
                                                    setTimeout(() => {
                                                        setCurrentSlide(idx);
                                                        setFadeIn(true);
                                                    }, 300);
                                                }}
                                                className={`transition-all rounded-full ${
                                                    currentSlide === idx
                                                        ? 'bg-red-600'
                                                        : 'bg-white/50'
                                                } ${currentSlide === idx ? 'w-6 sm:w-8 h-2' : 'w-2 h-2'}`}
                                                aria-label={`Go to slide ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDE - 2 Stacked Images */}
                    <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-4 md:gap-6">

                        {/* Top Image */}
                        {currentSection.full_image_2 && (
                            <div
                                className={`relative h-[140px] sm:h-40 md:h-[220px] lg:h-[370px] transition-opacity duration-500 group cursor-pointer ${
                                    fadeIn ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <img
                                    src={currentSection.full_image_2}
                                    alt="Featured product top"
                                    className="w-full h-full object-cover transition-transform duration-500"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src = '/images/placeholder.png';
                                    }}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        )}

                        {/* Bottom Image */}
                        {currentSection.full_image_3 && (
                            <div
                                className={`relative h-[140px] sm:h-40 md:h-[220px] lg:h-[370px] transition-opacity duration-500 group cursor-pointer ${
                                    fadeIn ? 'opacity-100' : 'opacity-0'
                                }`}
                                style={{ transitionDelay: '150ms' }}
                            >
                                <img
                                    src={currentSection.full_image_3}
                                    alt="Featured product bottom"
                                    className="w-full h-full object-cover transition-transform duration-500"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src = '/images/placeholder.png';
                                    }}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSlider;