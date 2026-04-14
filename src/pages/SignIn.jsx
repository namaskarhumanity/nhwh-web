import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/slices/userSlice";
import LoadingButton from "../components/LoadingButton";
import axios from "axios";
import { toast } from "react-toastify";
import { UserIcon, LockClosedIcon, EnvelopeIcon, SparklesIcon } from "@heroicons/react/24/outline";

const SignIn = () => {
  const server = import.meta.env.VITE_SERVER;
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Reset loading state on component mount and set timeout to prevent infinite loading
  useEffect(() => {
    if (loading) {
      dispatch(signInFailure(null));
    }
  }, [dispatch, loading]);

  // Prevent loading state from staying true indefinitely (timeout safety)
  useEffect(() => {
    let timeoutId;
    if (loading) {
      timeoutId = setTimeout(() => {
        dispatch(signInFailure("Request timeout. Please try again."));
      }, 30000); // 30 second timeout
    }
    return () => clearTimeout(timeoutId);
  }, [loading, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields!"));
    }
    try {
      dispatch(signInStart());

      const res = await axios.post(`${server}/auth/sign-in`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(signInSuccess(res.data));
        // Navigate after a brief delay to ensure state is updated
        setTimeout(() => navigate("/"), 100);
      } else {
        const errorMsg = res.data.message || "Sign in failed. Please try again.";
        toast.error(errorMsg);
        dispatch(signInFailure(errorMsg));
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Sign in failed. Please try again.";
      toast.error(errorMessage);
      dispatch(signInFailure(errorMessage));
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
      title={"Sign In - Namaskar Humanity Welfare Society"}
      description={
        "Sign in to your account to access volunteer opportunities and manage your profile with Namaskar Humanity Welfare Society."
      }
      keywords={"sign in, login, volunteer, NGO, account"}
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
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
                <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Welcome Back</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Sign{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                In
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg opacity-90 mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Welcome back! Sign in to continue your journey with us.
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Sign In Form Section */}
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="w-8 h-8 text-white" />
                </div>
                <h2
                  className="text-2xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Sign In to Your Account
                </h2>
                <p className="text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Don't have an account?{" "}
                  <Link
                    to="/sign-up"
                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    Create one here
                  </Link>
                </p>
              </div>

              {/* Sign In Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-700"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      onChange={handleChange}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your password"
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

                {/* Sign In Button */}
                <motion.div variants={itemVariants}>
                  {loading ? (
                    <LoadingButton
                      content={"Signing In..."}
                      btnClass={
                        "w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-semibold text-white hover:shadow-xl transition-all duration-300"
                      }
                    />
                  ) : (
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-semibold text-white hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <UserIcon className="w-5 h-5 mr-2" />
                      Sign In
                    </motion.button>
                  )}
                </motion.div>
              </form>

              {/* Volunteer CTA */}
              <motion.div variants={itemVariants} className="mt-8 text-center">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center justify-center mb-3">
                    <SparklesIcon className="w-6 h-6 text-blue-600 mr-2" />
                    <h3
                      className="text-lg font-semibold text-gray-900"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      New to Our Community?
                    </h3>
                  </div>
                  <p
                    className="text-gray-600 mb-4 text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Join thousands of volunteers making a difference in communities across India.
                  </p>
                  <Link
                    to="/register-as-volunteer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-sm"
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

export default SignIn;
