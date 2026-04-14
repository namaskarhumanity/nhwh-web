import { motion } from "framer-motion";
import {
  UserGroupIcon,
  AcademicCapIcon,
  HeartIcon,
  TrophyIcon,
  UsersIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    icon: UsersIcon,
    number: "100+",
    label: "Active Volunteers",
    color: "from-orange-500 to-red-500",
    featured: true,
  },
  {
    icon: UserGroupIcon,
    number: "1000+",
    label: "Lives Impacted",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: AcademicCapIcon,
    number: "500+",
    label: "Students Educated",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: BuildingOfficeIcon,
    number: "10+",
    label: "Cities",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: HeartIcon,
    number: "200+",
    label: "Medical Camps",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: TrophyIcon,
    number: "50+",
    label: "Awards & Recognition",
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

const OurImpact = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Impact
          </span>
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-300 max-w-3xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          See the difference we've made together in transforming lives across communities
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className={`text-center group ${stat.featured ? "lg:col-span-1 lg:scale-110" : ""}`}
          >
            <div
              className={`${stat.featured ? "w-24 h-24" : "w-20 h-20"} bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.featured ? "ring-4 ring-orange-400/30 shadow-2xl shadow-orange-500/25" : ""}`}
            >
              <stat.icon className={`${stat.featured ? "w-12 h-12" : "w-10 h-10"} text-white`} />
            </div>
            <motion.h3
              className={`${stat.featured ? "text-5xl md:text-6xl" : "text-4xl"} font-bold text-white mb-2 ${stat.featured ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400" : ""}`}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {stat.number}
            </motion.h3>
            <p
              className={`${stat.featured ? "text-orange-200 font-bold text-lg" : "text-gray-300 font-medium"}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {stat.label}
            </p>
            {stat.featured && (
              <motion.div
                className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                🌟 Growing Strong!
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default OurImpact;
