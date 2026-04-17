import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPinIcon, PhoneIcon, EnvelopeIcon, HeartIcon } from "@heroicons/react/24/outline";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo/nhws-logo.png";
import logoText from "../assets/logo/nhws-text.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Programs", path: "/program" },
    { name: "Certificates", path: "/certificates" },
    { name: "Contact", path: "/contact" },
    { name: "Volunteer", path: "/register-as-volunteer" },
    { name: "Donate", path: "/donate" },
  ];

  const programs = [
    { name: "Education Support", path: "/program" },
    { name: "Healthcare Services", path: "/program" },
    { name: "Women Empowerment", path: "/program" },
    { name: "Awareness Campaigns", path: "/program" },
    { name: "Skill Development", path: "/program" },
    { name: "Community Building", path: "/program" },
  ];

  const socialLinks = [
    {
      icon: FaFacebook,
      href: " https://www.facebook.com/share/1L3vfJfkex/",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: FaTwitter,
      href: "https://x.com/NamaskarSo27283",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/nhwsofficial?igsh=MTdoczkzMzQzbW13bA==",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/company/namaskar-humanity/",
      label: "LinkedIn",
      color: "hover:text-blue-700",
    },
    {
      icon: FaYoutube,
      href: "https://youtube.com/@nhwsofficial?si=Y9icswq42xS3X9JC",
      label: "YouTube",
      color: "hover:text-red-600",
    },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="mt-14 border-t border-gray-200 bg-white/98 backdrop-blur-xl sm:mt-16">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Organization Info */}
          <motion.div variants={itemVariants} className="space-y-5">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src={logo}
                alt="NHWS Logo"
                className="w-12 h-12 transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                style={{
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15)) brightness(1.1) contrast(1.2)",
                }}
              />
              <img
                src={logoText}
                alt="NHWS"
                className="h-8 drop-shadow-sm"
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1)) brightness(1.1) contrast(1.2)",
                }}
              />
            </Link>
            <p
              className="text-sm leading-relaxed text-slate-600"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Namaskar Humanity Welfare Society is a UP government-registered NGO dedicated to
              creating lasting positive change through education, healthcare, and empowerment
              initiatives.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                <span className="text-sm text-slate-600">
                  Udahin Khurd Sirathu, Kaushambi, UP 212217
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 shrink-0 text-sky-500" />
                <span className="text-sm text-slate-600">+91 8808250884</span>
              </div>
              <div className="flex items-center gap-2.5">
                <EnvelopeIcon className="h-4 w-4 shrink-0 text-sky-500" />
                <span className="text-sm text-slate-600">info@namaskarhumanity.org</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h3
              className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-sky-600"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-2 group-hover:bg-sky-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h3
              className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Our Programs
            </h3>
            <ul className="space-y-2.5">
              {programs.map((program) => (
                <li key={program.name}>
                  <Link
                    to={program.path}
                    className="group flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-sky-600"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-2 group-hover:bg-sky-500" />
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h3
              className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Stay Connected
            </h3>
            <p className="text-sm text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              Subscribe to our newsletter for updates on our programs and impact.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
                required
              />
              <button
                type="submit"
                disabled={isSubscribed}
                className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isSubscribed
                    ? "bg-emerald-500 text-white"
                    : "bg-gradient-to-r from-sky-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-sky-500/25 hover:scale-[1.02]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {isSubscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>

            {/* Social Media */}
            <div className="space-y-3">
              <h4
                className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Follow Us
              </h4>
              <div className="flex gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${social.color}`}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <span className="text-xs text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
              &copy; {new Date().getFullYear()} Namaskar Humanity Welfare Society. All rights
              reserved.
            </span>

            <div
              className="flex items-center gap-1.5 text-xs text-slate-500"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span>Made with</span>
              <HeartIcon className="h-3.5 w-3.5 text-rose-500" />
              <span>for humanity</span>
            </div>

            <div className="flex gap-5">
              <Link
                to="/privacy"
                className="text-xs font-medium text-slate-500 transition-colors duration-200 hover:text-sky-600"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-xs font-medium text-slate-500 transition-colors duration-200 hover:text-sky-600"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
