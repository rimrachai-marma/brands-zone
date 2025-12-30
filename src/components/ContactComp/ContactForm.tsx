"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { contactSchema } from "@/schema/contactSchema";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {

  };

  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            className="bg-white p-6 border border-primary/20 shadow-md lg:col-span-8"
            {...animationProps}
          >
            <div className="mb-6 text-center">
              <h4 className="text-2xl font-semibold mb-2">Online Enquiry</h4>
              <p>Please fill out the form below and send it to us:</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {(["name", "email", "mobile", "subject", "message"] as const).map(
                (field, index) => (
                  <motion.div
                    key={field}
                    className="flex flex-col"
                    {...animationProps}
                    transition={{
                      ...animationProps.transition,
                      delay: index * 0.1,
                    }}
                  >
                    <Label htmlFor={field} className="mb-1">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </Label>
                    {field !== "message" ? (
                      <Input
                        id={field}
                        placeholder={field}
                        {...register(field)}
                        className="border-gray-300"
                      />
                    ) : (
                      <Textarea
                        id={field}
                        placeholder="Message"
                        {...register(field)}
                        className="border-gray-300"
                        rows={5}
                      />
                    )}
                    {errors[field] && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors[field]?.message as string}
                      </span>
                    )}
                    {field === "message" && (
                      <span className="text-sm text-gray-500 mt-1">
                        <strong>Hint:</strong> Please enter between 80 - 300
                        characters.
                      </span>
                    )}
                  </motion.div>
                )
              )}
              <motion.div
                className="flex justify-center mt-4"
                {...animationProps}
                transition={{ ...animationProps.transition, delay: 0.5 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="hover:bg-secondary"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </motion.div>
            </form>
          </motion.div>
          <motion.div
            className="lg:col-span-4"
            {...animationProps}
            transition={{ ...animationProps.transition, delay: 0.3 }}
          >
            <div className="border border-primary/20 p-6">
              <h4 className="text-xl font-semibold mb-2">Address:</h4>
              <ul className="space-y-2">
                {[
                  "BrandsZone",
                  "309 Fellowship Road, ",
                  "Suite 200 Mt. Laurel, NJ 08054,",
                  "United States America",
                  "Tel:  +1 (609)-256-9162",
                  "Email: bizdev@brandszoneglobal.com",
                ].map((line, index) => (
                  <motion.li
                    key={index}
                    {...animationProps}
                    transition={{
                      ...animationProps.transition,
                      delay: 0.2 + index * 0.1,
                    }}
                  >
                    {line}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
