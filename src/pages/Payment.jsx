import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import {
  HeartIcon,
  CurrencyRupeeIcon,
  MapPinIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const server = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    panCard: "",
    amount: "",
    customAmount: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [selectedAmount, setSelectedAmount] = useState("");

  const predefinedAmounts = [
    { value: "500", label: "₹500" },
    { value: "1000", label: "₹1,000" },
    { value: "2000", label: "₹2,000" },
    { value: "5000", label: "₹5,000" },
    { value: "10000", label: "₹10,000" },
    { value: "custom", label: "Custom Amount" },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    if (amount !== "custom") {
      setFormData((prev) => ({
        ...prev,
        amount: amount,
        customAmount: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        amount: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    if (!/^\d{10}$/.test(formData.phone.trim())) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    if (!formData.panCard.trim()) {
      toast.error("PAN card number is required");
      return;
    }
    if (!/^([A-Z]{5}[0-9]{4}[A-Z])$/.test(formData.panCard.trim().toUpperCase())) {
      toast.error("Please enter a valid PAN card number (e.g., ABCDE1234F)");
      return;
    }
    if (!formData.address.trim()) {
      toast.error("Address is required");
      return;
    }
    if (!formData.city.trim()) {
      toast.error("City is required");
      return;
    }
    if (!formData.pincode.trim()) {
      toast.error("PIN code is required");
      return;
    }
    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      toast.error("Please enter a valid 6-digit PIN code");
      return;
    }
    const amount = selectedAmount === "custom" ? formData.customAmount : selectedAmount;
    if (!amount || Number(amount) <= 0) {
      toast.error("Please select a valid donation amount");
      return;
    }
    if (
      selectedAmount === "custom" &&
      (!formData.customAmount || Number(formData.customAmount) <= 0)
    ) {
      toast.error("Please enter a valid custom amount");
      return;
    }

    const payload = {
      amount: Number(amount),
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      pancard: formData.panCard,
    };

    setLoading(true);

    try {
      const res = await axios.post(`${server}/payment/donate`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (!res.data.success) {
        toast.error(res.data.message || "Failed to create donation order");
        setLoading(false);
        return;
      }

      const orderData = res.data.data.donation;
      const options = {
        key: res.data.data.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Namaskar Humanity Welfare Society",
        description: "Donation",
        order_id: orderData.id,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#F97316",
        },
        handler: async (response) => {
          try {
            const verificationPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              data: res.data.data,
            };
            const verifyRes = await axios.post(`${server}/payment/verify`, verificationPayload, {
              headers: { "Content-Type": "application/json" },
            });
            if (verifyRes.data.success) {
              toast.success(verifyRes.data.message || "Payment Successful!");
              navigate(
                `/payment-success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&amount=${res.data.data.amount}&donor_name=${encodeURIComponent(formData.fullName || "")}&donor_phone=${encodeURIComponent(formData.phone || "")}`
              );
            }
          } catch (verifyError) {
            toast.error(verifyError?.response?.data?.message || "Payment verification failed");
            navigate(
              `/payment-failure?reason=${encodeURIComponent(verifyError?.response?.data?.message || "Payment verification failed")}`
            );
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            // Redirect to payment failure page when user dismisses the payment modal
            navigate(`/payment-failure?reason=${encodeURIComponent("Payment cancelled by user")}`);
          },
        },
      };

      if (window?.Razorpay) {
        new window.Razorpay(options).open();
      } else {
        toast.error("Razorpay checkout script failed to load");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred creating donation");
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Layout
      title={"Donate Now - Namaskar Humanity Welfare Society"}
      description={
        "Make a donation to support our social causes and help us create positive change in communities."
      }
      keywords={"donate, donation, charity, NGO, social work, help, contribute"}
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 overflow-hidden">
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
                <GiftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Make a Difference</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Donate for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-200">
                Social Helps
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Your contribution helps us provide education, healthcare, and essential services to
              those in need.
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100"
            >
              {/* Form Header */}
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HeartIcon className="w-8 h-8 text-white" />
                </div>
                <h2
                  className="text-3xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Make a Donation
                </h2>
                <p
                  className="text-lg text-gray-600 max-w-2xl mx-auto"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Every contribution, no matter the size, helps us make a meaningful impact in
                  communities.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Donation Amount Selection */}
                <motion.div
                  variants={itemVariants}
                  className="bg-orange-50 rounded-xl p-6 border border-orange-100"
                >
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <CurrencyRupeeIcon className="w-6 h-6 text-orange-600" />
                    Select Donation Amount
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount.value}
                        type="button"
                        onClick={() => handleAmountSelect(amount.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 font-semibold ${
                          selectedAmount === amount.value
                            ? "border-orange-500 bg-orange-500 text-white shadow-lg"
                            : "border-gray-300 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50"
                        }`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {amount.label}
                      </button>
                    ))}
                  </div>
                  {selectedAmount === "custom" && (
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Enter Custom Amount
                      </label>
                      <div className="relative">
                        <CurrencyRupeeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="number"
                          name="customAmount"
                          value={formData.customAmount}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter amount"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Personal Information */}
                <motion.div
                  variants={itemVariants}
                  className="bg-blue-50 rounded-xl p-6 border border-blue-100"
                >
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <UserIcon className="w-6 h-6 text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your email"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your phone number"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        PAN Card Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="panCard"
                        value={formData.panCard}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter PAN card number"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        required
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Address Information */}
                <motion.div
                  variants={itemVariants}
                  className="bg-green-50 rounded-xl p-6 border border-green-100"
                >
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <MapPinIcon className="w-6 h-6 text-green-600" />
                    Address Information
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Complete Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your complete address"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label
                          className="block text-sm font-semibold text-gray-700 mb-2"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="City"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-semibold text-gray-700 mb-2"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="State"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-semibold text-gray-700 mb-2"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          PIN Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="PIN Code"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="text-center pt-6">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    disabled={loading}
                    className={`w-full sm:w-auto ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-xl hover:shadow-orange-500/25"} text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <HeartIcon className="w-6 h-6" />
                    {loading ? "Processing..." : "Proceed to Payment"}
                  </motion.button>
                  <p
                    className="text-sm text-gray-600 mt-4"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Your donation is secure and helps us continue our social work initiatives.
                  </p>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
