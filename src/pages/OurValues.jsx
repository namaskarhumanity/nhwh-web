import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HeartIcon, LightBulbIcon, UsersIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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

const ICON_MAP = {
  HeartIcon,
  LightBulbIcon,
  UsersIcon,
};

const DEFAULT_VALUES = [
  {
    _id: "default-1",
    icon: "HeartIcon",
    title: "Compassion",
    description: "At the heart of everything we do lies genuine compassion for those in need.",
  },
  {
    _id: "default-2",
    icon: "LightBulbIcon",
    title: "Innovation",
    description: "We embrace innovative approaches to solve complex social challenges.",
  },
  {
    _id: "default-3",
    icon: "UsersIcon",
    title: "Community",
    description: "Building strong, inclusive communities where everyone has a voice.",
  },
];

const OurValues = () => {
  const server = import.meta.env.VITE_SERVER;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [loading, setLoading] = useState(false);

  const getValues = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${server}/values/get`);
      if (res.data?.success && Array.isArray(res.data?.data) && res.data.data.length > 0) {
        setValues(res.data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to load values");
    } finally {
      setLoading(false);
    }
  }, [server]);

  useEffect(() => {
    getValues();
  }, [getValues]);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-64 animate-pulse rounded-xl bg-white shadow-lg" />
                  ))
                : values.map((value) => {
                    const IconComponent = ICON_MAP[value.icon] || HeartIcon;
                    const hasRichDescription = /<[^>]+>/.test(value.description || "");
                    const safeDescriptionHtml = DOMPurify.sanitize(value.description || "");
                    return (
                      <motion.div
                        key={value._id}
                        variants={itemVariants}
                        className="group text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                      >
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                          {value.iconImage?.url ? (
                            <img
                              src={value.iconImage.url}
                              alt={value.title}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <IconComponent className="w-8 h-8 text-white" />
                          )}
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h4>
                        {hasRichDescription ? (
                          <div
                            className="text-gray-600 leading-relaxed text-left [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5"
                            dangerouslySetInnerHTML={{ __html: safeDescriptionHtml }}
                          />
                        ) : (
                          <p className="text-gray-600 leading-relaxed">{value.description}</p>
                        )}
                      </motion.div>
                    );
                  })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurValues;
