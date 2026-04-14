import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Layout from "../layout/Layout";
import LodingButton from "../components/LoadingButton";
import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  HeartIcon,
  UserGroupIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useApiResource } from "../hooks/useApiResource";

const getProgramPreview = (value, maxLength = 150) => {
  const plainText = String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trim()}...`;
};

const formatProgramDate = (value) => {
  if (!value) return "Recently added";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently added";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Program = () => {
  const server = import.meta.env.VITE_SERVER;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: programData, loading } = useApiResource({
    url: `${server}/program/get`,
    errorMessage: "Failed to load programs",
  });

  const programs = Array.isArray(programData?.data) ? programData.data : [];
  const totalPrograms = programs.length;
  const latestProgram = [...programs]
    .filter((program) => program?.updatedAt || program?.createdAt)
    .sort(
      (left, right) =>
        new Date(right?.updatedAt || right?.createdAt).getTime() -
        new Date(left?.updatedAt || left?.createdAt).getTime()
    )[0];
  const uniqueThemes = new Set(
    programs
      .map(
        (program) =>
          String(program?.title || "")
            .trim()
            .split(" ")[0]
      )
      .filter(Boolean)
  ).size;

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

  const stats = [
    {
      value: totalPrograms ? String(totalPrograms).padStart(2, "0") : "00",
      label: "Programs Live",
      detail: totalPrograms ? "Currently showcased on the site" : "Programs will appear here soon",
      icon: AcademicCapIcon,
    },
    {
      value: uniqueThemes ? String(uniqueThemes).padStart(2, "0") : "00",
      label: "Focus Areas",
      detail: uniqueThemes
        ? "Different themes currently represented"
        : "Waiting for program themes",
      icon: UserGroupIcon,
    },
    {
      value: latestProgram
        ? formatProgramDate(latestProgram.updatedAt || latestProgram.createdAt)
        : "Live",
      label: "Latest Update",
      detail: latestProgram?.title || "Dynamic data connected to the API",
      icon: HeartIcon,
    },
  ];

  return (
    <Layout
      title={"Our Programs - Namaskar Humanity Welfare Society"}
      description={
        "Discover our comprehensive programs designed to create lasting change. From education and healthcare to women empowerment and community development, join us in transforming lives across India."
      }
      keywords={"programs, education, healthcare, community development, volunteer, NGO"}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-700 via-indigo-700 to-slate-900 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.22),transparent_28%)]"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center text-white"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Dynamic Community Programs</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Creating{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Change
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Explore live program updates from our platform. Each initiative highlights real work
              happening across education, healthcare, empowerment, and community support.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mx-auto mb-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 text-left backdrop-blur-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-100/90">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-200/90">{stat.detail}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register-as-volunteer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-sky-700 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-slate-100 sm:px-8 sm:py-4 sm:text-lg"
              >
                <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Join Our Programs
                <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                to="/contact"
                className="rounded-full border-2 border-white/70 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-sky-700 sm:px-8 sm:py-4 sm:text-lg"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-slate-100 bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 text-center shadow-[0_22px_60px_-38px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-36px_rgba(2,132,199,0.32)]"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/20 transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <motion.h3
                  className="mb-2 text-2xl font-bold text-slate-900 sm:text-4xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {stat.value}
                </motion.h3>
                <p
                  className="text-sm sm:text-base font-medium text-slate-700"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {stat.label}
                </p>
                <p className="mt-2 text-xs leading-6 text-slate-500">{stat.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section
        ref={ref}
        className="bg-gradient-to-br from-white via-slate-50 to-sky-50/40 py-16 sm:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Our Latest{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                  Programs
                </span>
              </h2>
              <div className="mx-auto mb-8 h-1 w-24 bg-gradient-to-r from-sky-500 to-indigo-600"></div>
              <p
                className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Namaskar Humanity Welfare Society regularly organizes comprehensive programs aimed
                at improving lives in underprivileged communities. From education and healthcare to
                environmental protection and women's empowerment, each initiative creates lasting
                positive change.
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center">
                <LodingButton />
              </div>
            ) : programs.length === 0 ? (
              <motion.div variants={itemVariants} className="mx-auto max-w-3xl">
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-sm backdrop-blur-sm">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                    <AcademicCapIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Programs are being updated</h3>
                  <p className="mt-3 text-slate-600">
                    Fresh initiatives will appear here as soon as they are published from the
                    dashboard.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
              >
                {programs.map((program, index) => (
                  <motion.div
                    key={program?._id}
                    variants={itemVariants}
                    className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-3 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.28)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_26px_70px_-36px_rgba(2,132,199,0.26)]"
                  >
                    <Link to={`/program/${program?._id}`} className="block h-full">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={program?.coverImage?.url}
                          alt={program?.title}
                          className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/5 to-transparent" />
                        <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-lg shadow-slate-900/10">
                          Program {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
                            <AcademicCapIcon className="h-4 w-4" />
                            Active Program
                          </div>
                          <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                            {formatProgramDate(program?.updatedAt || program?.createdAt)}
                          </span>
                        </div>

                        <h3
                          className="mb-3 text-xl font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-sky-700 sm:text-[1.4rem]"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {program?.title}
                        </h3>

                        <p
                          className="mb-6 min-h-[96px] text-sm leading-7 text-slate-600 sm:text-base"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {getProgramPreview(program?.description)}
                        </p>

                        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                              Open For
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-700">
                              Volunteers & Support
                            </p>
                          </div>

                          <span className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-emerald-100">
                            View Details
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Call to Action */}
            <motion.div variants={itemVariants} className="text-center mt-12 sm:mt-16">
              <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_28px_80px_-42px_rgba(15,23,42,0.35)] sm:p-8 md:p-12">
                <h3
                  className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Ready to Make a Difference?
                </h3>
                <p
                  className="text-base sm:text-lg text-gray-600 mb-8"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Join our programs as a volunteer and become part of a mission to transform lives
                  and build stronger communities across India.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register-as-volunteer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4"
                    >
                      <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      Volunteer with Us
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/donate"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                    >
                      <span className="text-lg">💝</span>
                      Support Our Programs
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Program;
