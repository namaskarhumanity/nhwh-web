import { motion } from "framer-motion";
import Layout from "../layout/Layout";
import ContactForm from "../components/ContactForm";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPinIcon,
      title: "Visit Us",
      details: ["Udahin Khurd Sirathu", "Kaushambi, Uttar Pradesh", "India - 212217"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: PhoneIcon,
      title: "Call Us",
      details: ["+91 8808250884", "+91 7379164906", "Available 9 AM - 6 PM"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: EnvelopeIcon,
      title: "Email Us",
      details: [
        "help@namaskarhumanity.org",
        "info@namaskarhumanity.org",
        "We reply within 24 hours",
      ],
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: ClockIcon,
      title: "Working Hours",
      details: ["Monday - Friday: 9 AM - 6 PM", "Saturday: 10 AM - 4 PM", "Sunday: Closed"],
      color: "from-red-500 to-pink-500",
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

  return (
    <Layout
      title={"Contact Us - Namaskar Humanity Welfare Society"}
      description={
        "Get in touch with Namaskar Humanity Welfare Society. Whether you have questions, want to volunteer, or need support, we're here to help. Contact us today to join our mission of positive change."
      }
      keywords={"contact, volunteer, donate, NGO, help, support, Namaskar Humanity"}
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center text-white"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Let's Connect</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Touch
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We'd love to hear from you! Whether you have questions, want to volunteer, or need
              support, we're here to help you make a difference.
            </motion.p>

            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left">
                <p className="text-lg leading-relaxed">
                  Share your thoughts • Collaborate with us • Volunteer or support our causes
                  <br />
                  <strong>
                    Together, we can create a brighter future, one conversation at a time!
                  </strong>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Contact{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Information
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
              <p
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Multiple ways to reach us. Choose what works best for you.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info) => (
                <motion.div
                  key={info.title}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center hover:-translate-y-2"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <info.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3
                    className="text-xl font-semibold text-gray-900 mb-4"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {info.title}
                  </h3>

                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gradient-to-br from-slate-50 via-sky-50 to-white py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full"
        >
          <motion.div
            variants={itemVariants}
            className="mx-auto mb-16 max-w-7xl px-6 text-center lg:px-8"
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Find{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Our Location
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Visit us at our headquarters in Uttar Pradesh, India.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full overflow-hidden border-y border-slate-200 bg-white"
          >
            {/* Map body */}
            <div className="relative flex h-[260px] items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-slate-100 sm:h-[300px] md:h-[340px]">
              {/* Grid lines mimicking a map feel */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(14,165,233,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.4) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Subtle radial glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.12),transparent)]" />

              <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
                {/* Pin icon */}
                <div className="flex h-20 w-20 items-center justify-center bg-gradient-to-br from-sky-500 to-indigo-600 shadow-[0_16px_40px_-12px_rgba(99,102,241,0.55)]">
                  <MapPinIcon className="h-10 w-10 text-white" />
                </div>

                <div>
                  <h3
                    className="text-2xl font-bold text-slate-800"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Find Us Here
                  </h3>
                  <p
                    className="mt-1 text-sm text-slate-500"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Map integration coming soon
                  </p>
                </div>

                {/* Address link */}
                <a
                  href="https://maps.app.goo.gl/2fZDfez8cQMApA627?g_st=awb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-t border-slate-200 px-2 pt-4 text-center transition-colors duration-300 hover:text-sky-700"
                >
                  <p
                    className="font-semibold text-slate-800"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Namaskar Humanity Welfare Society
                  </p>
                  <p
                    className="mt-1 text-sm text-slate-500"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Udahin Khurd Sirathu, Kaushambi, UP 212217
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <span className="h-2 w-2 bg-sky-500"></span>
                    <span className="text-xs font-medium text-sky-600 group-hover:underline">
                      Uttar Pradesh, India — Open in Maps
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
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
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Questions
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl mb-12 opacity-90"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Got questions? We've got answers! Here are some common inquiries we receive.
            </motion.p>

            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-4">How can I volunteer?</h3>
                <p className="text-gray-200">
                  You can register as a volunteer through our website or contact us directly. We
                  have opportunities in education, healthcare, and community development.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-4">How can I make a donation?</h3>
                <p className="text-gray-200">
                  We accept donations through our secure online platform. Every contribution, big or
                  small, makes a significant impact in our community programs.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
