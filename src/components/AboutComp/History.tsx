"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const History = () => {
  const stats = [
    { value: "12", label: "Years Experience" },
    { value: "20K", label: "Happy Customers" },
    { value: "100%", label: "Clients Satisfaction" },
  ];

  return (
    <section className="container mx-auto py-12 px-4 md:py-24">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Left Content Column */}
        <div className="order-2 lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            OUR HISTORY
          </p>
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-2 text-4xl font-bold leading-tight md:text-5xl"
          >
            Creative and renovate fashion trends
          </motion.h2>
          <p className="mt-6 text-lg text-gray-600">
            Collaboratively administer empowered markets via plug-and-play
            maintain networks. Dynamically usable procrastinate B2B users after
            installed base benefits. Dramatically visualize customer directed
            convergence without revolutionary ROI.
          </p>

          {/* Statistics */}
          <div className="mt-10 flex space-x-8">
            {stats.map((stat, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-start"
                >
                  <div className="text-4xl font-extrabold text-primary">
                    {stat.value}
                  </div>
                  <p className="mt-1 text-sm text-secondary">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Image Column */}
        <div className="order-1 lg:order-2 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-64 w-full md:h-96"
          >
            <Image
              src="/images/team/about-1.avif"
              alt="Shopping bags and cart"
              layout="fill"
              objectFit="contain"
              className=""
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default History;
