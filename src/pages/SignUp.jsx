import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LodingButton from "../components/LoadingButton";
import axios from "axios";
import { toast } from "react-toastify";
import {
  UserPlusIcon,
  LockClosedIcon,
  EnvelopeIcon,
  UserIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const server = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${server}/auth/sign-up`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/sign-in");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <Layout
      title={"Sign Up - Namaskar Humanity Welfare Society"}
      description={
        "Create your account to join our volunteer community and start making a difference in lives across India."
      }
      keywords={"sign up, register, volunteer, NGO, account, join"}
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-md mx-auto text-center text-white"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <UserPlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Join Our Mission</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Create{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Account
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg opacity-90 mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Join thousands of volunteers making a difference across India.
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Sign Up Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
            >
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlusIcon className="w-8 h-8 text-white" />
                </div>
                <h2
                  className="text-2xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Create Your Account
                </h2>
                <p className="text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Already have an account?{" "}
                  <Link
                    to="/sign-in"
                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>

              {/* Sign Up Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your full name"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your email"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      onChange={handleChange}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Create a strong password"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Create Account Button */}
                <motion.div variants={itemVariants}>
                  {loading ? (
                    <LodingButton
                      content={"Creating Account..."}
                      btnClass={
                        "w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-4 py-3 font-semibold text-white hover:shadow-xl transition-all duration-300"
                      }
                    />
                  ) : (
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-4 py-3 font-semibold text-white hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <UserPlusIcon className="w-5 h-5 mr-2" />
                      Create Account
                    </motion.button>
                  )}
                </motion.div>
              </form>

              {/* Volunteer Info */}
              <motion.div variants={itemVariants} className="mt-8 text-center">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center justify-center mb-3">
                    <SparklesIcon className="w-6 h-6 text-green-600 mr-2" />
                    <h3
                      className="text-lg font-semibold text-gray-900"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Ready to Make an Impact?
                    </h3>
                  </div>
                  <p
                    className="text-gray-600 mb-4 text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    By creating an account, you'll be able to join volunteer programs, track your
                    impact, and connect with like-minded changemakers.
                  </p>
                  <Link
                    to="/register-as-volunteer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 text-sm"
                  >
                    <UserIcon className="w-4 h-4" />
                    Become a Volunteer
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SignUp;
