"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react"; // Example Icon from lucide-react (used by shadcn)

interface BenefitProps {
  text: string;
  delay: number;
}

const BenefitItem = ({ text, delay }: BenefitProps) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5, delay: delay }}
    className="flex items-start space-x-3 mt-4"
  >
    <Check className="h-5 w-5 shrink-0 text-green-500 mt-1" />
    <span className="text-gray-700">{text}</span>
  </motion.li>
);

const Vision = () => {
  const benefits = [
    "Credibly innovate granular internal",
    "Grantedly underconstructions reloaded",
    "Interactively procrastinate high-payoff",
  ];

  return (
    <section className="container mx-auto py-10 px-4 md:py-24">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Left Image Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-96 w-full lg:h-full"
        >
          <Image
            src="/images/team/about-2.avif"
            alt="Couple shopping"
            layout="fill"
            objectFit="cover"
            className=" shadow-xl"
          />
        </motion.div>

        {/* Right Content Column */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our vision
          </p>
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-2 text-4xl font-bold leading-tight  md:text-5xl"
          >
            We are marketpress
          </motion.h2>
          <p className="mt-6 text-lg text-gray-600">
            Dynamically procrastinate B2C users after installed base benefits.
            Dramatically visualize customer directed convergence without
            revolutionary ROI.
          </p>

          {/* Benefits List */}
          <ul className="mt-8">
            {benefits.map((benefit, index) => (
              <BenefitItem
                key={index}
                text={benefit}
                delay={0.3 + index * 0.2}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Vision;
