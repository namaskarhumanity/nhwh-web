import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import societyCertificate from "../../src/assets/certificates/society_certificate.jpg";
import twelve_a from "../../src/assets/certificates/12A_certificate_page.jpg";
import eight_g from "../../src/assets/certificates/80G_certificate_pag.jpg";
import {
  ShieldCheckIcon,
  DocumentCheckIcon,
  UserGroupIcon,
  HeartIcon,
  CheckBadgeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const Certificate = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const SO_CERTIFICATE =
    "Namaskar Humanity Welfare Society Registration Certificate (Issued by Govt. Of Uttar Pradesh, Under Act 21 Of 1860)";
  const TWA = "12A Certificate (Issued by Commissioner of Income tax)";
  const EIGH = "80G Certificate (Issued by Commissioner of Income tax)";

  const certificates = [
    {
      id: 1,
      image: societyCertificate,
      title: SO_CERTIFICATE,
      issuer: "Government of Uttar Pradesh",
      act: "Under Act 21 of 1860",
      icon: ShieldCheckIcon,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      image: twelve_a,
      title: TWA,
      issuer: "Commissioner of Income Tax",
      act: "Section 12A Certificate",
      icon: DocumentCheckIcon,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      image: eight_g,
      title: EIGH,
      issuer: "Commissioner of Income Tax",
      act: "Section 80G Certificate",
      icon: CheckBadgeIcon,
      color: "from-purple-500 to-indigo-500",
    },
  ];

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

  const benefits = [
    {
      title: "Tax Deductions",
      description: "Donations are eligible for tax deductions under Section 80G",
      icon: "💰",
    },
    {
      title: "Transparency",
      description: "All funds are utilized transparently for social welfare",
      icon: "🔍",
    },
    {
      title: "Legal Compliance",
      description: "Fully registered and compliant with government regulations",
      icon: "⚖️",
    },
    {
      title: "Impact Reports",
      description: "Regular reports on how your donations create positive change",
      icon: "📊",
    },
  ];

  return (
    <Layout
      title={"Government Verified Certificates - Namaskar Humanity Welfare Society"}
      description={
        "View our government-verified certificates including 12A & 80G registration. Namaskar Humanity Welfare Society is a legally registered NGO committed to transparency, accountability, and impactful social change."
      }
      keywords={"certificates, 12A, 80G, government registered, NGO, verification, transparency"}
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 overflow-hidden">
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
                <ShieldCheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Government Verified</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Verified{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Certificates
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Our commitment to transparency and accountability is validated through
              government-verified certificates, ensuring your trust and confidence in our mission.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register-as-volunteer"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Join Our Mission
              </Link>
              <Link
                to="/donate"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 backdrop-blur-sm"
              >
                Donate Securely
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Why Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  Verification
                </span>{" "}
                Matters
              </h2>
              <p
                className="text-lg text-gray-600 max-w-3xl mx-auto"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Our government certifications ensure transparency, legal compliance, and tax
                benefits for all contributors.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-3"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="text-gray-600 text-sm leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificates Section */}
      <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Government Verified{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Certificates
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
              <p
                className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Namaskar Humanity Welfare Society is a 12A & 80G registered NGO dedicated to
                uplifting marginalized communities. Our verified certificates ensure transparency,
                accountability, and legitimacy in all our social welfare initiatives.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {certificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
                >
                  {/* Certificate Icon Header */}
                  <div className={`bg-gradient-to-r ${cert.color} p-6 text-center`}>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <cert.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3
                      className="text-white font-semibold text-lg"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {cert.act}
                    </h3>
                  </div>

                  {/* Certificate Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Certificate Details */}
                  <div className="p-6">
                    <p
                      className="text-gray-600 leading-relaxed mb-4 text-sm"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {cert.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                        ✓ Verified
                      </span>
                      <span className="text-xs text-gray-500">{cert.issuer}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="text-center mt-16">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <SparklesIcon className="w-8 h-8 text-blue-600 mr-3" />
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Trusted by Thousands
                  </h3>
                </div>
                <p
                  className="text-lg text-gray-600 mb-8 leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Our government verification reinforces our commitment to transparency and ensures
                  your donations are used effectively for social impact. Join thousands who trust us
                  to create meaningful change.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register-as-volunteer"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                    >
                      <HeartIcon className="w-5 h-5" />
                      Volunteer Today
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/donate"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                    >
                      <span className="text-lg">💝</span>
                      Make a Donation
                    </Link>
                  </motion.div>
                </div>

                {/* Tax Benefit Notice */}
                <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-4">
                  <p
                    className="text-green-800 text-sm font-medium"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <strong>Tax Benefit:</strong> All donations to Namaskar Humanity Welfare Society
                    are eligible for 80G tax deductions as per Income Tax Act.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Certificate;
