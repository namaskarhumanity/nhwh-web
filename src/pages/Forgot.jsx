import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../layout/Layout";
import axios from "axios";
import LodingButton from "../components/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  KeyIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const Forgot = () => {
  const server = import.meta.env.VITE_SERVER;
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: email, 2: otp and password
  const navigate = useNavigate();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setOtpLoading(true);
    try {
      const res = await axios.post(`${server}/auth/send-otp`, { email });
      if (res.data.success) {
        toast.success(res.data?.message);
        setStep(2);
      }
      setOtpLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
      setOtpLoading(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();

    if (!otp || !password || !confirmPassword) {
      toast.error("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setResetLoading(true);
    try {
      const res = await axios.post(`${server}/auth/forgot-password`, {
        otp,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/sign-in");
      }
      setResetLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setResetLoading(false);
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

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Layout
      title={"Namaskar Humanity Welfare Society - Reset Password"}
      description={"Reset your password securely at Namaskar Humanity Welfare Society"}
      keywords={"reset password, forgot password, welfare society"}
    >
      {/* Hero Section */}
      <section className="relative min-h-[40vh] bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <KeyIcon className="w-10 h-10" />
            </motion.div>
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Reset Your Password
            </h1>
            <p
              className="text-xl text-blue-100 max-w-2xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Secure and simple password recovery for your account
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Password Reset Form Section */}
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
              className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden"
            >
              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                    } transition-all duration-300`}
                  >
                    {step > 1 ? <CheckCircleIcon className="w-6 h-6" /> : "1"}
                  </div>
                  <div
                    className={`w-12 h-1 ${
                      step > 1 ? "bg-blue-600" : "bg-gray-200"
                    } transition-all duration-300`}
                  ></div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                    } transition-all duration-300`}
                  >
                    2
                  </div>
                </div>
              </div>

              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step === 1 ? (
                    <EnvelopeIcon className="w-8 h-8 text-white" />
                  ) : (
                    <ShieldCheckIcon className="w-8 h-8 text-white" />
                  )}
                </div>
                <h2
                  className="text-2xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {step === 1 ? "Enter Your Email" : "Verify & Reset"}
                </h2>
                <p className="text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {step === 1
                    ? "We'll send you a verification code to reset your password"
                    : "Enter the OTP sent to your email and create a new password"}
                </p>
              </div>

              {/* Step 1: Email Form */}
              {step === 1 && (
                <motion.div variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                  <form onSubmit={handleGenerate} className="space-y-6">
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter your registered email"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      {otpLoading ? (
                        <LodingButton
                          content={"Sending OTP..."}
                          btnClass={
                            "w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                          }
                        />
                      ) : (
                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          Send Verification Code
                        </button>
                      )}
                    </motion.div>
                  </form>
                </motion.div>
              )}

              {/* Step 2: OTP and Password Form */}
              {step === 2 && (
                <motion.div variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                  <form onSubmit={handleForgot} className="space-y-6">
                    {/* OTP Field */}
                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="otp"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Verification Code
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="otp"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter 6-digit code"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          maxLength="6"
                          required
                        />
                      </div>
                      <p
                        className="text-sm text-gray-500 mt-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Code sent to {email}
                      </p>
                    </motion.div>

                    {/* New Password Field */}
                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <LockClosedIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Create a strong password"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          required
                        />
                      </div>
                    </motion.div>

                    {/* Confirm Password Field */}
                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <LockClosedIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Confirm your new password"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          required
                        />
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div variants={itemVariants} className="space-y-3">
                      {resetLoading ? (
                        <LodingButton
                          content={"Resetting Password..."}
                          btnClass={
                            "w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                          }
                        />
                      ) : (
                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          Reset Password
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Back to Email
                      </button>
                    </motion.div>
                  </form>
                </motion.div>
              )}

              {/* Bottom Link */}
              <motion.div variants={itemVariants} className="mt-8 text-center">
                <p className="text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Remember your password?{" "}
                  <Link
                    to="/sign-in"
                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    Sign in here
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Forgot;
