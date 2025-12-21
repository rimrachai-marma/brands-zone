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

            if (response.success && response.data?.length > 0) {
                setHeroSections(response.data);
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
            <section className="relative py-8 lg:py-12 container-fluid mx-auto">
                <div className="mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                        <div className="lg:col-span-8 h-[450px] lg:h-[750px] bg-gray-200 animate-pulse rounded"></div>
                        <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6">
                            <div className="h-[220px] lg:h-[330px] bg-gray-200 animate-pulse rounded"></div>
                            <div className="h-[220px] lg:h-[330px] bg-gray-200 animate-pulse rounded"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (heroSections.length === 0) {
        return (
            <section className="relative py-8 lg:py-12 container-fluid mx-auto">
                <div className="mx-auto text-center">
                    <p className="text-gray-500">No hero sections available</p>
                </div>
            </section>
        );
    }

    const currentSection = heroSections[currentSlide];

    return (
        <section className="relative py-8 lg:py-12 container-fluid mx-auto">
            <div className="mx-auto">
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
                                    src={currentSection.full_image_1 || '/images/placeholder.png'}
                                    alt={currentSection.title || 'Hero image'}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Content Overlay - LEFT SIDE */}
                            <div className="absolute inset-0 flex items-center z-10">
                                <div className="px-8 lg:px-16 max-w-2xl">
                                    {currentSection.title && (
                                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                                            {currentSection.title}
                                        </h1>
                                    )}
                                    {currentSection.subtitle && (
                                        <p className="text-base lg:text-lg text-white/90 mb-6 lg:mb-8 leading-relaxed">
                                            {currentSection.subtitle}
                                        </p>
                                    )}
                                    {currentSection.cta_text && (
                                        <a
                                            href={currentSection.cta_link || '#'}
                                            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 lg:px-10 lg:py-4 rounded transition-all text-sm lg:text-base shadow-lg hover:shadow-xl"
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
                                                className={`h-2 rounded-full transition-all ${
                                                    currentSlide === idx
                                                        ? 'w-8 bg-red-600'
                                                        : 'w-2 bg-white/50'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDE - 2 Stacked Images */}
                    <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6">

                        {/* Top Image */}
                        {currentSection.full_image_2 && (
                            <div
                                className={`relative h-[220px] lg:h-[330px] border border-gray-200 overflow-hidden transition-opacity duration-500 group cursor-pointer ${
                                    fadeIn ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <img
                                    src={currentSection.full_image_2}
                                    alt="Featured product top"
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        )}

                        {/* Bottom Image */}
                        {currentSection.full_image_3 && (
                            <div
                                className={`relative h-[220px] lg:h-[330px] border border-gray-200 overflow-hidden transition-opacity duration-500 group cursor-pointer ${
                                    fadeIn ? 'opacity-100' : 'opacity-0'
                                }`}
                                style={{ transitionDelay: '150ms' }}
                            >
                                <img
                                    src={currentSection.full_image_3}
                                    alt="Featured product bottom"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSlider;