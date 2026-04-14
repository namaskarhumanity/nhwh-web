import { motion } from "framer-motion";
import Layout from "../layout/Layout";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Link, useSearchParams } from "react-router-dom";

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get("reason");

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <Layout
      title={"Payment Failed - Namaskar Humanity Welfare Society"}
      description={"Your payment could not be processed. Please try again or contact support."}
      keywords={"payment failed, donation failed, support"}
    >
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8"
        >
          {/* Error Icon */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <motion.div animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.6 }}>
              <ExclamationTriangleIcon className="w-20 h-20 text-red-500" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold text-center text-gray-900 mb-3"
          >
            Payment Failed
          </motion.h1>

          {/* Message */}
          <motion.p variants={itemVariants} className="text-center text-gray-600 mb-6">
            We are sorry! Your payment could not be processed. Please try again or contact our
            support team if the issue persists.
          </motion.p>

          {/* Error Details */}
          <motion.div
            variants={itemVariants}
            className="bg-red-50 rounded-lg p-4 mb-6 text-sm border border-red-200"
          >
            <div>
              <p className="text-gray-600 mb-1">
                {" "}
                <strong>Reason:</strong>
              </p>
              <p className="text-gray-900">
                {reason ||
                  "Payment processing error. Please check your payment details and try again."}
              </p>
            </div>
          </motion.div>

          {/* Helpful Tips */}
          <motion.div
            variants={itemVariants}
            className="bg-yellow-50 rounded-lg p-4 mb-8 text-sm border border-yellow-200"
          >
            <p className="font-semibold text-gray-900 mb-2">Tips to resolve this:</p>
            <ul className="text-gray-700 space-y-1">
              <li>• Check your payment details</li>
              <li>• Ensure sufficient balance</li>
              <li>• Try a different payment method</li>
              <li>• Contact your bank if the issue persists</li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex gap-3 flex-col">
            <Link
              to="/donate"
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-700 transition-all text-center"
            >
              Try Again
            </Link>
            <Link
              to="/contact"
              className="w-full py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all text-center"
            >
              Contact Support
            </Link>
            <Link
              to="/"
              className="w-full py-3 border-2 border-gray-300 text-gray-800 font-semibold rounded-lg hover:border-gray-400 transition-all text-center"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default PaymentFailure;
