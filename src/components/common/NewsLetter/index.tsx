"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

// This is a placeholder for your actual form submission logic
const handleSubmit = (email: string) => {
  console.log("Subscribing email:", email);
  // In a real application, you would send this to an API endpoint
  alert(`Thank you for subscribing, ${email}!`);
};

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      handleSubmit(email);
      setEmail(""); // Clear the input after submission
    }
  };

  return (
    // Outer container for padding and background
    <section className="container mx-auto py-12 px-4 md:py-24">
      <div className="bg-white py-16 ">
        <div className="max-w-7xl mx-auto">
          {/* Main layout using flexbox to put title on the left and form on the right */}
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 lg:space-x-12">
            {/* Left Side: Title and Description */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Newsletter & Get Updates
              </h2>
              <p className="mt-3">
                Sign up for our newsletter to get up-to-date information from
                us.
              </p>
            </div>

            {/* Right Side: Search Input and Button */}
            <div className="w-full max-w-lg">
              <form
                onSubmit={handleFormSubmit}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2"
              >
                {/* Email Input Field */}
                <div className="grow">
                  <Input
                    id="email-input"
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Email address for newsletter"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 w-full text-lg  focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Submit Button with Framer Motion */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    className="w-full sm:w-auto h-12 px-6 text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Subscribe
                  </Button>
                </motion.div>
              </form>
              <p className="mt-3 text-sm  text-center sm:text-left">
                We care about the protection of your data. Read our{" "}
                <a
                  href="#"
                  className="underline hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
