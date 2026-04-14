import { AnimatePresence, motion } from "framer-motion";
import b1 from "../assets/wallpaper/b1.jpeg";
import b2 from "../assets/wallpaper/b2.jpeg";
import b3 from "../assets/wallpaper/b3.jpg";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Hero = () => {
  const server = import.meta.env.VITE_SERVER;
  const fallbackImages = useMemo(
    () => [
      { url: b1, alt: "Community helping each other" },
      { url: b2, alt: "Education initiatives" },
      { url: b3, alt: "Healthcare programs" },
    ],
    []
  );

  const [heroData, setHeroData] = useState({
    title: "Transforming Lives,",
    highlightText: "Building Hope",
    description:
      "Join Namaskar Humanity Welfare Society in creating lasting change through education, healthcare, and women empowerment initiatives across communities.",
    primaryButtonText: "Become a Volunteer",
    primaryButtonLink: "/register-as-volunteer",
    secondaryButtonText: "Donate Now",
    secondaryButtonLink: "/donate",
    images: [],
  });

  const getHeroContent = useCallback(async () => {
    try {
      const res = await axios.get(`${server}/hero/get`);
      if (res.data?.success && res.data?.data) {
        setHeroData((prev) => ({
          ...prev,
          ...res.data.data,
          images: Array.isArray(res.data.data.images) ? res.data.data.images : [],
        }));
      }
    } catch (error) {
      // Fallback content keeps hero usable when API fails.
    }
  }, [server]);

  useEffect(() => {
    getHeroContent();
  }, [getHeroContent]);

  const carouselImages =
    Array.isArray(heroData.images) && heroData.images.length > 0
      ? heroData.images.map((image, index) => ({
          url: image?.url,
          alt: image?.alt || `Hero image ${index + 1}`,
        }))
      : fallbackImages;

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setActiveSlide(0);
  }, [carouselImages.length]);

  useEffect(() => {
    if (carouselImages.length <= 1) return undefined;

    const sliderInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5200);

    return () => clearInterval(sliderInterval);
  }, [carouselImages.length]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-[100svh] min-h-[640px] overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={`${carouselImages[activeSlide]?.url}-${activeSlide}`}
              className="absolute inset-0"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: "transform" }}
            >
              <img
                className="w-full h-full object-cover scale-[1.03]"
                src={carouselImages[activeSlide]?.url}
                alt={carouselImages[activeSlide]?.alt}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 gap-2 sm:flex">
          {carouselImages.map((_, index) => (
            <button
              key={`hero-dot-${index}`}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === index ? "w-7 bg-white" : "w-2.5 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[100svh] items-center justify-center pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center text-white"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              className="mb-5 text-4xl font-bold leading-tight sm:text-5xl md:mb-6 md:text-7xl"
              variants={fadeInUp}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {heroData.title}
              <span className="block pb-1 leading-[1.15] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                {heroData.highlightText}
              </span>
            </motion.h1>

            <motion.p
              className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-gray-200 sm:text-lg md:text-2xl"
              variants={fadeInUp}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {heroData.description}
            </motion.p>

            <motion.div
              className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center"
              variants={fadeInUp}
            >
              <Link
                to={heroData.primaryButtonLink || "/register-as-volunteer"}
                className="group w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-center font-semibold text-white shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:scale-105 sm:w-auto"
              >
                <span className="flex items-center gap-2">
                  {heroData.primaryButtonText || "Become a Volunteer"}
                  <ArrowDownIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to={heroData.secondaryButtonLink || "/donate"}
                className="w-full rounded-full border-2 border-white px-8 py-4 text-center font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-gray-900 sm:w-auto"
              >
                {heroData.secondaryButtonText || "Donate Now"}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 transform text-white sm:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDownIcon className="w-6 h-6" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
