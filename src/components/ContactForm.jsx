import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import {
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        message: `${data.subject ? `${data.subject} - ` : ""}${data.message}`,
      };

      const server = import.meta.env.VITE_SERVER;
      const res = await axios.post(`${server}/message/send`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        setSubmitStatus("success");
        toast.success(res.data.message || "Message sent successfully!");
        reset();
      } else {
        setSubmitStatus("error");
        toast.error(res.data.message || "Failed to send message");
      }
    } catch (error) {
      setSubmitStatus("error");
      toast.error(error?.response?.data?.message || "Unable to send message");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 transition-all duration-300 outline-none focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200";
  const errorClasses = "border-red-400 focus:border-red-400 focus:ring-red-200";

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)] lg:p-12"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h3
          className="mb-4 text-3xl font-bold text-slate-900"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Get in Touch
        </h3>
        <div className="mx-auto mb-4 h-1 w-16 bg-gradient-to-r from-sky-600 to-indigo-600"></div>
        <p className="text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
          Have questions or want to get involved? We'd love to hear from you!
        </p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className={`${inputClasses} ${errors.name ? errorClasses : ""}`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <ExclamationCircleIcon className="w-4 h-4" />
                {errors.name.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`${inputClasses} ${errors.email ? errorClasses : ""}`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <ExclamationCircleIcon className="w-4 h-4" />
                {errors.email.message}
              </p>
            )}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone", {
                pattern: {
                  value: /^[+]?[\d\s-()]+$/,
                  message: "Invalid phone number",
                },
              })}
              className={`${inputClasses} ${errors.phone ? errorClasses : ""}`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <ExclamationCircleIcon className="w-4 h-4" />
                {errors.phone.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-700">
              Subject *
            </label>
            <select
              id="subject"
              {...register("subject", { required: "Please select a subject" })}
              className={`${inputClasses} ${errors.subject ? errorClasses : ""}`}
            >
              <option value="">Select a subject</option>
              <option value="volunteer">Volunteer Opportunities</option>
              <option value="donation">Donation Inquiry</option>
              <option value="partnership">Partnership</option>
              <option value="general">General Inquiry</option>
              <option value="support">Support Request</option>
            </select>
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <ExclamationCircleIcon className="w-4 h-4" />
                {errors.subject.message}
              </p>
            )}
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
            Message *
          </label>
          <textarea
            id="message"
            rows="6"
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            })}
            className={`${inputClasses} resize-none ${errors.message ? errorClasses : ""}`}
            placeholder="Tell us about your inquiry or how you'd like to get involved..."
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <ExclamationCircleIcon className="w-4 h-4" />
              {errors.message.message}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              {...register("consent", {
                required: "Please agree to our privacy policy",
              })}
              className="mt-1 h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <span className="text-sm text-slate-600">
              I agree to the{" "}
              <a href="/privacy" className="text-sky-600 hover:text-sky-700 hover:underline">
                Privacy Policy
              </a>{" "}
              and consent to being contacted by Namaskar Humanity Welfare Society.
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <ExclamationCircleIcon className="w-4 h-4" />
              {errors.consent.message}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
              isSubmitting
                ? "cursor-not-allowed bg-slate-400"
                : "bg-gradient-to-r from-sky-600 to-indigo-600 shadow-lg hover:from-sky-700 hover:to-indigo-700 hover:shadow-xl"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                Send Message
                <PaperAirplaneIcon className="w-5 h-5" />
              </>
            )}
          </button>
        </motion.div>

        {/* Success/Error Messages */}
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"
          >
            <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-green-800">Message sent successfully!</h4>
              <p className="text-green-700 text-sm">
                Thank you for reaching out. We'll get back to you soon.
              </p>
            </div>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
          >
            <ExclamationCircleIcon className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-800">Something went wrong!</h4>
              <p className="text-red-700 text-sm">Please try again or contact us directly.</p>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;
