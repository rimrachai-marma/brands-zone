'use client'
import { motion } from 'framer-motion';

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const PrivacyPolicyComp = () => {
    return (
        <section className="py-12">
            <div className='container mx-auto'>
                <div className="space-y-8">
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h5 className='font-bold text-center text-3xl text-primary mb-8'>Privacy Policy</h5>
                        <p>In the below write-up, “we” or “us” or “our” refers to <strong>BrandsZone</strong> and “you” refers to the consumer or the site visitor. The Privacy Policy are liable to be changed without any prior notice and it is the responsibility of the user to stay updated with changes if any.</p>
                    </motion.div>

                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h5 className='font-bold  mb-4'>Information Gathering, Use and Sharing</h5>
                        <p>We value your association with us and thus ensure highest standards in securing your personal information and details. We ensure that the information provided by you will not be shared or sold to any third party outside our organization. Customer information will be used by us in contacting them back in case of queries as requested by them and in case of shipping of products the details would be shared to our shipping channels. We may use your email to contact you in future to inform you about our new products, special offers or any change in our privacy policy.</p>
                    </motion.div>

                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h5 className='font-bold  mb-4'>Security</h5>
                        <p>We ensure to secure your sensitive information both offline and online. All your information is encrypted and transferred to us in a secured way. We ensure that your information will be used only by our team to perform specific jobs like billing or customer service. In addition to this, in order to view certain sections of the website, users will be asked to provide specific information like name, email, query and more. This information will be used in order to contact you about products and services on our website.</p>
                    </motion.div>

                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h5 className='font-bold  mb-4'>Cookies and Links</h5>
                        <p className='mb-3'>Our website is subjected to the use of cookies from your PC/Laptop. Cookie is a piece of information which is stored and saved in your web browser. This information helps us identify you for the next time you visit our website and thus help us offer you a better customer experience. The cookies will help you quickly navigate to the products of your choice, based on the ones you visited previously. However, be rest assured that none of your personally identifiable information would be stored.</p>
                        <p>Our website also contains links to other websites. In such case we will not be responsible for the privacy policy of other websites. We request users to be prior aware of the policies and terms of information use on other websites.</p>
                    </motion.div>

                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h5 className='font-bold  mb-4'>Updates</h5>
                        <p>Our privacy policy is subjected to get updated from time to time. And so, in case you have any questions, we request you to visit this page prior to sharing information and contacting us in case of any queries.</p>
                    </motion.div>

                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <strong className=''>Last Updated On: 28th October, 2025</strong>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PrivacyPolicyComp;