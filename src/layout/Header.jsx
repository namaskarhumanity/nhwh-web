import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { HeartIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo/nhws-logo.png";
import logoText from "../assets/logo/nhws-text.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileMenu from "../components/ProfileMenu";

const menuItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Programs",
    path: "/program",
  },
  {
    name: "Certificates",
    path: "/certificates",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  const authPayload = currentUser?.data ?? currentUser;
  const authUser = authPayload?.user ?? authPayload ?? null;
  const isAuthenticated = Boolean(authUser?.name || authUser?.email || authUser?._id);
  const accessToken = authPayload?.accessToken || null;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.15,
      },
    },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/98 backdrop-blur-xl shadow-2xl border-b border-gray-200"
          : "bg-white/95 backdrop-blur-lg shadow-lg"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-4 group">
          <motion.img
            width="70"
            height="70"
            src={logo}
            alt="Namaskar Humanity Welfare Society Logo"
            className="transition-transform duration-300 group-hover:scale-110 drop-shadow-lg filter brightness-110 contrast-125"
            whileHover={{ rotate: 5, scale: 1.1 }}
            style={{
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2)) brightness(1.1) contrast(1.2)",
            }}
          />
          <div className="hidden sm:block">
            <img
              height="45"
              src={logoText}
              alt="NHWS"
              className="h-10 drop-shadow-md filter brightness-110 contrast-125"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15)) brightness(1.1) contrast(1.2)",
              }}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:block">
          <ul className="flex items-center gap-1 rounded-2xl border border-slate-200/80 bg-slate-100/80 p-1.5 shadow-inner shadow-slate-200/60">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`relative flex items-center px-4 py-2.5 text-sm font-semibold transition-all duration-300 rounded-xl group ${
                    location.pathname === item.path
                      ? "bg-white text-slate-950 shadow-lg shadow-sky-600/10 ring-1 ring-sky-300/60"
                      : "text-slate-700 hover:text-slate-950 hover:bg-white/80 hover:shadow-md"
                  }`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    textShadow:
                      location.pathname === item.path ? "none" : "0 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  <span
                    className={`relative z-10 mr-2 h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      location.pathname === item.path
                        ? "bg-sky-500 shadow-[0_0_0_4px_rgba(14,165,233,0.18)]"
                        : "bg-slate-300 group-hover:bg-slate-400"
                    }`}
                  />
                  <span className="relative z-10">{item.name}</span>
                  {location.pathname !== item.path && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-slate-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  )}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl border border-sky-300/60 bg-white"
                      initial={false}
                      transition={{ type: "spring", stiffness: 460, damping: 34 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Auth/Profile */}
        {isAuthenticated ? (
          <div className="hidden xl:flex items-center gap-3">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-lg hover:shadow-emerald-500/10"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <HeartIcon className="h-4 w-4" />
              Support Our Mission
            </Link>
            <ProfileMenu user={authUser} accessToken={accessToken} />
          </div>
        ) : (
          <div className="hidden xl:flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/sign-in"
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                Sign In
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/register-as-volunteer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <HeartIcon className="w-4 h-4" />
                Join as Volunteer
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-sm hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="text-lg">💝</span>
                Donate Now
              </Link>
            </motion.div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <motion.button
          className="xl:hidden rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-800 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.5)] transition-all duration-200 hover:border-sky-200 hover:bg-sky-50"
          onClick={toggleMenu}
          whileTap={{ scale: 0.95 }}
        >
          <IoMenu className="h-6 w-6 text-gray-800" />
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm xl:hidden z-40"
                onClick={toggleMenu}
              />

              {/* Mobile Menu */}
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-0 right-0 w-80 max-w-[90vw] h-screen bg-white shadow-2xl xl:hidden z-50 overflow-y-auto"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                    <Link to="/" onClick={toggleMenu} className="flex items-center space-x-4">
                      <img
                        width="60"
                        height="60"
                        src={logo}
                        alt="logo"
                        className="drop-shadow-lg filter brightness-110 contrast-125"
                        style={{
                          filter:
                            "drop-shadow(0 4px 8px rgba(0,0,0,0.2)) brightness(1.1) contrast(1.2)",
                        }}
                      />
                      <img
                        height="40"
                        src={logoText}
                        alt="NHWS"
                        className="h-9 drop-shadow-md filter brightness-110 contrast-125"
                        style={{
                          filter:
                            "drop-shadow(0 2px 4px rgba(0,0,0,0.15)) brightness(1.1) contrast(1.2)",
                        }}
                      />
                    </Link>
                    <motion.button
                      onClick={toggleMenu}
                      className="p-2 rounded-xl hover:bg-white/70 transition-colors duration-200 shadow-sm"
                      whileTap={{ scale: 0.95 }}
                    >
                      <RxCross2 className="h-6 w-6 text-gray-700" />
                    </motion.button>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 px-6 py-6">
                    <ul className="space-y-3">
                      {menuItems.map((item, index) => (
                        <motion.li
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: { delay: index * 0.1 },
                          }}
                        >
                          <Link
                            to={item.path}
                            onClick={toggleMenu}
                            className={`flex items-center px-4 py-3.5 rounded-2xl font-semibold transition-all duration-200 ${
                              location.pathname === item.path
                                ? "bg-white text-slate-950 ring-1 ring-sky-300/70 shadow-lg shadow-sky-600/10 border-l-4 border-sky-500"
                                : "text-slate-700 hover:bg-white hover:text-slate-950 hover:shadow-md border-l-4 border-transparent"
                            }`}
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              textShadow:
                                location.pathname === item.path
                                  ? "none"
                                  : "0 1px 2px rgba(0,0,0,0.1)",
                            }}
                          >
                            <span
                              className={`mr-2 h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                                location.pathname === item.path
                                  ? "bg-sky-500 shadow-[0_0_0_4px_rgba(14,165,233,0.18)]"
                                  : "bg-slate-300"
                              }`}
                            />
                            <span className="relative z-10">{item.name}</span>
                            {location.pathname === item.path && (
                              <span className="ml-auto h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 shadow-sm" />
                            )}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile Action Buttons */}
                  <div className="p-6 border-t border-gray-200 bg-gray-50">
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <ProfileMenu
                          user={authUser}
                          accessToken={accessToken}
                          onNavigate={toggleMenu}
                          mobile
                        />
                        <Link
                          to="/donate"
                          onClick={toggleMenu}
                          className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          <HeartIcon className="w-5 h-5" />
                          Support Our Mission
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Link
                          to="/sign-in"
                          onClick={toggleMenu}
                          className="block w-full text-center px-4 py-3.5 border-2 border-gray-300 rounded-xl font-semibold text-gray-800 hover:bg-gray-100 hover:border-blue-300 transition-all duration-200 shadow-sm"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                          }}
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register-as-volunteer"
                          onClick={toggleMenu}
                          className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          <UserGroupIcon className="w-5 h-5" />
                          Become a Volunteer
                        </Link>
                        <Link
                          to="/donate"
                          onClick={toggleMenu}
                          className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          <span className="text-lg">💝</span>
                          Donate Now
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
