import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  HeartIcon,
  SpeakerWaveIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { DEFAULT_INITIATIVES } from "./initiativesData";

const ICON_MAP = {
  AcademicCapIcon,
  SpeakerWaveIcon,
  HeartIcon,
  UserGroupIcon,
};

const getCardPreview = (value, maxLength = 180) => {
  const plainText = DOMPurify.sanitize(String(value || ""), { ALLOWED_TAGS: [] })
    .replace(/\s+/g, " ")
    .trim();

  if (plainText.length <= maxLength) return plainText;
  return `${plainText.slice(0, maxLength).trim()}...`;
};

const isHexColor = (value) => /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(value || "");

const hexToRgb = (value) => {
  if (!isHexColor(value)) return null;

  let normalized = value.replace("#", "");
  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((char) => `${char}${char}`)
      .join("");
  }

  const parsed = Number.parseInt(normalized, 16);

  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255,
  };
};

const withAlpha = (value, alpha) => {
  const rgb = hexToRgb(value);
  return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : undefined;
};

const InitiativesSection = () => {
  const server = import.meta.env.VITE_SERVER;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [initiatives, setInitiatives] = useState(DEFAULT_INITIATIVES);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const getInitiatives = useCallback(async () => {
    try {
      const res = await axios.get(`${server}/initiative/get`);
      const apiData = Array.isArray(res.data?.data) ? res.data.data : [];

      if (res.data?.success && apiData.length > 0) {
        const formattedData = apiData.map((item) => ({
          _id: item._id,
          icon: item.icon || "AcademicCapIcon",
          title: item.title,
          description: item.description,
          image: item.coverImage?.url,
          iconImage: item.iconImage?.url || "",
          stats: item.stats || "",
          color: item.color || "#2563eb",
        }));

        setInitiatives(formattedData);
      }
    } catch (error) {
      // Keep default section data on API failure.
      setInitiatives(DEFAULT_INITIATIVES);
    }
  }, [server]);

  useEffect(() => {
    getInitiatives();
  }, [getInitiatives]);

  return (
    <section ref={ref} className="bg-gradient-to-br from-white via-slate-50 to-sky-50/40 py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                Initiatives
              </span>
            </h2>
            <div className="mx-auto mb-8 h-1 w-24 bg-gradient-to-r from-sky-500 to-indigo-600"></div>
            <p
              className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Discover how we're making a difference through our comprehensive programs designed to
              uplift communities and create lasting impact.
            </p>
          </motion.div>

          {/* Initiatives Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {initiatives.map((initiative) => {
              const IconComponent = ICON_MAP[initiative.icon] || AcademicCapIcon;
              const colorValue = initiative.color || "#2563eb";
              const accentColor = isHexColor(colorValue) ? colorValue : "#0284c7";
              const accentSoft = withAlpha(accentColor, 0.12);
              const accentBorder = withAlpha(accentColor, 0.26);
              const accentGlow = withAlpha(accentColor, 0.22);
              const accentBarStyle = {
                background: `linear-gradient(135deg, ${withAlpha(accentColor, 0.92)}, ${accentColor})`,
              };
              const iconShellStyle = {
                backgroundColor: accentSoft,
                borderColor: accentBorder,
                color: accentColor,
                boxShadow: `0 18px 40px -24px ${accentGlow}`,
              };
              const badgeStyle = {
                backgroundColor: accentSoft,
                borderColor: accentBorder,
                color: accentColor,
              };

              return (
                <motion.div
                  key={initiative._id || initiative.title}
                  variants={cardVariants}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-32px_rgba(15,23,42,0.28)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_34px_90px_-42px_rgba(2,132,199,0.34)]"
                >
                  <div
                    className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-sky-500 to-indigo-600"
                    style={accentBarStyle}
                  />

                  {/* Background Image */}
                  <div className="relative h-64 overflow-hidden rounded-b-[2rem]">
                    <img
                      src={initiative.image}
                      alt={initiative.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-900/10 to-white/5" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/85 to-transparent" />

                    {/* Icon and Stats */}
                    <div className="absolute left-6 top-6 flex items-start gap-3">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/90 backdrop-blur-md"
                        style={iconShellStyle}
                      >
                        {initiative.iconImage ? (
                          <img
                            src={initiative.iconImage}
                            alt={initiative.title}
                            className="h-8 w-8 rounded-xl object-cover"
                          />
                        ) : (
                          <IconComponent className="h-7 w-7" />
                        )}
                      </div>
                      <span className="rounded-full border border-white/60 bg-white/88 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 backdrop-blur-md">
                        Initiative
                      </span>
                    </div>
                    <div className="absolute bottom-6 right-6">
                      {initiative.stats ? (
                        <span
                          className="rounded-full border border-white/70 bg-white/92 px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/10 backdrop-blur-md"
                          style={badgeStyle}
                        >
                          {initiative.stats}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-8 pt-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
                        style={badgeStyle}
                      >
                        Community Impact
                      </span>
                    </div>

                    <h3
                      className="mb-4 text-2xl font-bold leading-tight text-slate-900 md:text-[1.75rem]"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {initiative.title}
                    </h3>
                    <p
                      className="mb-8 min-h-[96px] text-[15px] leading-7 text-slate-600"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {getCardPreview(initiative.description)}
                    </p>

                    {/* Learn More Button */}
                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Focus
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          Sustainable outreach
                        </p>
                      </div>

                      <Link
                        to={`/initiative/${encodeURIComponent(initiative._id || "")}`}
                        className="inline-flex items-center gap-3 rounded-2xl border px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                        style={badgeStyle}
                      >
                        <span>Explore</span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm">
                          <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InitiativesSection;
