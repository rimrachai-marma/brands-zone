"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  // const stats = [
  //   { value: "12", label: "Years Experience" },
  //   { value: "20K", label: "Happy Customers" },
  //   { value: "100%", label: "Clients Satisfaction" },
  // ];

  const benefits = [
    {
      title: "Seamless Digital Experiences",
      description:
        "intuitive tools that make discovery, purchase, and fulfillment effortless.",
    },
    {
      title: "Tailored Services",
      description:
        "customized support for sustainable businesses to scale responsibly.",
    },
    {
      title: "Trust & Transparency",
      description: "verified eco-credentials that build consumer confidence.",
    },
    {
      title: "Shared Growth",
      description:
        "empowering both businesses and customers to prosper together.",
    },
    {
      title: "Market Differentiation",
      description:
        "positioning merchants at the forefront of the sustainability movement.",
    },
  ];

  return (
    <section className="container mx-auto py-12 px-4 md:py-24">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 lg:items-start">
        {/* Left Content Column */}
        <div className="order-2 lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            ABOUT BRANDSZONE
          </p>

          {/* Main Content */}
          <div className="mt-6 space-y-4 text-gray-700 text-lg">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className=" leading-relaxed"
            >
              Brandszone is more than a marketplace; it is a dynamic ecosystem
              built to elevate sustainable brands and connect them with
              conscious consumers through innovative digital platforms.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="leading-relaxed"
            >
              With a foundation rooted in quality, trust, and customer
              satisfaction, Brandszone empowers businesses to align
              profitability with purpose.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="leading-relaxed"
            >
              By curating a diverse portfolio of eco-friendly products and
              offering tailored business solutions, Brandszone enables merchants
              to tap into the fast-growing demand for sustainable goods.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="leading-relaxed"
            >
              From ethically sourced fashion to renewable household essentials,
              the marketplace ensures that every transaction contributes to a
              greener future.
            </motion.p>

            {/* Why Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Why Sustainable Brands Thrive on Brandszone
              </h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex gap-3"
                  >
                    <span className="text-primary mt-1 font-bold">•</span>
                    <p className="">
                      <span className="font-semibold text-gray-900">
                        {benefit.title}
                      </span>
                      {" - "}
                      <span className="text-gray-600">
                        {benefit.description}
                      </span>
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Closing Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="leading-relaxed pt-4"
            >
              For wholesalers, retailers, traders and consumers, Brandszone
              represents a scalable opportunity: a marketplace where
              sustainability is not just a trend, but a profitable business
              model. By bridging top sustainable brands with engaged customers,
              Brandszone transforms commerce into a force for both growth and
              good.
            </motion.p>
          </div>

          {/* Statistics */}
          {/* <div className="mt-10 flex space-x-8">
            {stats.map((stat, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="flex flex-col items-start"
                >
                  <div className="text-4xl font-extrabold text-primary">
                    {stat.value}
                  </div>
                  <p className="mt-1 text-sm text-secondary">{stat.label}</p>
                </motion.div>
              );
            })}
          </div> */}
        </div>

        {/* Right Image Column */}
        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-64 w-full md:h-96 lg:h-[500px]"
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

export default About;
{
  /* <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-2 text-4xl font-bold leading-tight md:text-5xl"
          >
            Creative and renovate fashion trends
          </motion.h2> */
}
