import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Layout from "../layout/Layout";
import { MapPin, Users, Heart, Target } from "lucide-react";
import google_map from "../../src/assets/wallpaper/google_map.png";
import join from "../../src/assets/wallpaper/joining.jpeg";
import LodingButton from "../components/LoadingButton";
import { Link } from "react-router-dom";
import {
  UserGroupIcon,
  HeartIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useApiResource } from "../hooks/useApiResource";

const locations = [
  {
    title: "Kaushambi office",
    timings: "Mon-Sat 9am to 5pm",
    address: "231 Udahin Khurd Sirathu, Kaushambi, Uttar Pradesh (212217)",
  },
];

const About = () => {
  const server = import.meta.env.VITE_SERVER;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: teamData, loading } = useApiResource({
    url: `${server}/team/get`,
    errorMessage: "Failed to load team",
  });

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

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We lead with empathy and understanding in every initiative",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Unity",
      description: "Building stronger communities through collective action",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "Impact",
      description: "Creating measurable, lasting change in people's lives",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: SparklesIcon,
      title: "Innovation",
      description: "Finding creative solutions to complex social challenges",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <Layout
      title={"About Us - Namaskar Humanity Welfare Society"}
      description={
        "Learn about our passionate team dedicated to creating positive change. Discover our mission, vision, and the inspiring individuals working to uplift communities across India through compassionate humanitarian service."
      }
      keywords={"about, team, mission, vision, volunteers, social impact, community development"}
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-600 via-red-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center text-white"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Our Story</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Our Mission
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Made with love, right here in India. Every initiative is born from the heart, rooted
              in compassion and unity, creating lasting change across communities.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register-as-volunteer"
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Join Our Team
                <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 backdrop-blur-sm"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-2 mb-6">
                  <span className="text-sm font-semibold text-orange-600">About the NGO</span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Made with love, right here in{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                    India
                  </span>
                </h2>
                <p
                  className="text-lg text-gray-600 leading-relaxed mb-8"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  At Namaskar Humanity Welfare Society, every initiative, every act of kindness, and
                  every step towards a brighter future is born from the heart of India. Rooted in
                  the rich heritage of compassion and unity, our work is a reflection of the love we
                  carry for our people and our nation.
                </p>
                <p
                  className="text-lg text-gray-600 leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  From the vibrant cities to the quiet villages, our efforts span across India,
                  touching lives and spreading hope. With deep pride in our country and unwavering
                  commitment to its people, we create lasting change—crafted with love, right here
                  in the heart of India.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <img
                  className="w-full h-64 sm:h-80 rounded-2xl object-cover shadow-2xl"
                  src={google_map}
                  alt="Our Impact Across India"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Our Core{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  Values
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto mb-8"></div>
              <p
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                The principles that guide our mission and shape every interaction with the
                communities we serve.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-4"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Visit{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  Our Office
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100"
            >
              {locations.map((location) => (
                <div
                  key={location.title}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-2xl font-semibold text-gray-900 mb-2"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {location.title}
                    </h3>
                    <p className="text-gray-600 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {location.timings}
                    </p>
                    <p
                      className="text-gray-700 font-medium"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {location.address}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-semibold text-orange-600">Join Us →</span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Meet Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  Team
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto mb-8"></div>
              <p
                className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                We are a passionate group of individuals united by a common purpose – to bring
                positive change and uplift communities in need. Our team is a vibrant mix of
                visionaries, social workers, and volunteers, all working together with unwavering
                dedication and integrity.
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center">
                <LodingButton />
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {teamData?.data?.map((user, index) => (
                  <motion.div
                    key={user?._id}
                    variants={itemVariants}
                    className="group relative overflow-hidden rounded-xl border border-sky-100/80 bg-white shadow-[0_22px_60px_-34px_rgba(15,23,42,0.28)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-38px_rgba(2,132,199,0.28)]"
                  >
                    <div className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-sky-500 to-indigo-600"></div>
                    <div className="relative overflow-hidden rounded-b-lg">
                      <img
                        src={user?.avatar?.url}
                        alt={user?.name}
                        className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent"></div>
                    </div>

                    <div className="mt-3 rounded-lg border border-sky-200 bg-gradient-to-r from-sky-50 to-indigo-50 px-5 py-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-500">
                        Namaskar Humanity
                      </p>
                      <p
                        className="text-sm font-bold text-slate-800"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Dharmendra Kumar <span style={{ color: "#099A6B" }}>- Developer</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Join Team CTA */}
            <motion.div variants={itemVariants} className="text-center mt-16">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <SparklesIcon className="w-8 h-8 text-orange-600 mr-3" />
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    We're Just Getting Started
                  </h3>
                </div>
                <p
                  className="text-lg text-gray-600 mb-8 leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  At Namaskar Humanity Welfare Society, our journey of compassion and service has
                  only just begun. Every step we take, every hand we hold, and every life we touch
                  inspires us to dream bigger and do more. Together, with the power of community, we
                  are building a brighter tomorrow.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register-as-volunteer"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                    >
                      <UserGroupIcon className="w-5 h-5" />
                      Join Our Team
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/donate"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                    >
                      <span className="text-lg">💝</span>
                      Support Our Mission
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA with Image */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-2 mb-6">
                  <span className="text-sm font-semibold text-orange-600">Join our team →</span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Ready to Make a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                    Difference?
                  </span>
                </h2>
                <p
                  className="text-lg text-gray-600 leading-relaxed mb-8"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  At Namaskar Humanity Welfare Society, our journey of compassion and service has
                  only just begun. While we've already made an impact, we know the road ahead is
                  filled with new challenges and endless opportunities to uplift humanity. With
                  hearts full of hope and unwavering commitment, we are ready to reach farther,
                  serve deeper, and spread kindness in ways we've only imagined.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register-as-volunteer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
                  >
                    <HeartIcon className="w-5 h-5" />
                    Join Now
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <img
                  src={join}
                  alt="Join Our Mission"
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
