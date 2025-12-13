"use client";
import { motion } from "framer-motion";

const ContactMap = () => {
  return (
    <section className="pt-12">
      <motion.div
        className="mx-auto relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="after:content-[''] after:bg-primary/50 after:w-15 after:h-0.5 after:absolute after:left-1/2 after:top-10 after:-translate-x-1/2"
        >
          <h3 className="text-center font-bold text-primary text-3xl mb-8 uppercase">
            Get in touch
          </h3>
        </motion.div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d317893.9737282887!2d-0.11951900000000001!3d51.503186!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2sLondon%20Eye!5e0!3m2!1sen!2sus!4v1761643414331!5m2!1sen!2sus"
          allowFullScreen={true}
          loading="lazy"
          className="border-none w-full h-150"
        ></iframe>
      </motion.div>
    </section>
  );
};

export default ContactMap;
