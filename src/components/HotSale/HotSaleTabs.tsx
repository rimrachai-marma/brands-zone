"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const campaigns = [
    {
        title: "Running Shoes Sale",
        discount: "30%",
        description: "Lightweight performance shoes for every runner",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        url: "/campaign/running-sale",
        tag: "New Arrivals"
    },
    {
        title: "Casual Collection",
        discount: "25%",
        description: "Comfortable sneakers for everyday wear",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80",
        url: "/campaign/casual",
        tag: "Most Popular"
    },
    {
        title: "Sports Footwear",
        discount: "35%",
        description: "Professional grade shoes for athletes",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80",
        url: "/campaign/sports",
        tag: "Limited Time"
    }
];

const CampaignShowcase = () => {
    return (
        <div className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Featured Campaigns
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Exclusive deals on premium footwear
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {campaigns.map((campaign, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            <Link href={campaign.url} className="block group">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                                    {/* Image Section */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={campaign.image}
                                            alt={campaign.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

                                        {/* Discount Badge */}
                                        <div className="absolute top-4 left-4">
                      <span className="bg-white text-gray-900 text-lg font-bold px-4 py-2 rounded-lg shadow-md">
                        -{campaign.discount}
                      </span>
                                        </div>

                                        {/* Tag */}
                                        <div className="absolute top-4 right-4">
                      <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                        {campaign.tag}
                      </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                            {campaign.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-6">
                                            {campaign.description}
                                        </p>

                                        {/* CTA Button */}
                                        <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                        Shop Collection
                      </span>
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                                                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/campaigns"
                        className="inline-flex items-center px-8 py-3 bg-secondary text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300"
                    >
                        View All Campaigns
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CampaignShowcase;