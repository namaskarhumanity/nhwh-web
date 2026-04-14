import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import Hero from "../components/Hero";
import InitiativesSection from "./OurInitiatives";
import TestimonialsSection from "../components/TestimonialsSection";
import OurMission from "./OurMission";
import OurVision from "./OurVision";
import OurValues from "./OurValues";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <Layout
      title={"Namaskar Humanity Welfare Society - Transforming Lives, Building Hope"}
      description={
        "Join Namaskar Humanity Welfare Society in creating lasting change through education, healthcare, and women empowerment initiatives. A UP government-registered NGO making a positive impact on society."
      }
      keywords={
        "NGO, charity, education, healthcare, women empowerment, social work, volunteer, donate, Namaskar Humanity, UP government registered"
      }
    >
      {/* Hero Section */}
      <Hero />
      {/* Hero Section */}
      {/* Our Mission Section */}

      <OurMission />
      {/* Our Mission Section */}

      {/* Vision Section */}
      <OurVision />
      {/* Vision Section */}

      {/* Our values */}
      <OurValues />
      {/* Our values */}

      {/* Our Impact */}
      {/* <OurImpact /> */}
      {/* Our Impact */}

      {/* Initiatives Section */}
      <InitiativesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />
      {/* Call to Action Section */}

      {/* Ready to Make a Difference Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Ready to Make a Difference?
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl mb-12 leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Join Namaskar Humanity Welfare Society as a volunteer and become part of a mission to
              transform lives and build a better future for those in need. Your efforts can make a
              real impact in underprivileged communities.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                to="/register-as-volunteer"
                className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <span className="flex items-center gap-2">
                  Become a Volunteer
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </span>
              </Link>

              <Link
                to="/donate"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
              >
                Make a Donation
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8"
            >
              <p className="text-lg leading-relaxed">
                Whether you're passionate about education, healthcare, women's empowerment, or
                environmental sustainability, your contribution matters. Together, we can create a
                more equitable and compassionate society—your journey toward making a difference
                starts here!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
