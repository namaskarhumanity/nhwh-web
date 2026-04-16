import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

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

const OurMission = () => {
  const server = import.meta.env.VITE_SERVER;
  const [missionData, setMissionData] = useState({
    heading: "Welcome to Our Mission",
    description:
      "Namaskar Humanity Welfare Society is dedicated to making a positive impact on society through various initiatives. Our primary focus is on providing quality education, accessible healthcare services, and raising awareness on critical social issues.",
    profilePhoto: null,
  });
  const [loadingMission, setLoadingMission] = useState(false);

  const hasHtmlTags = /<[^>]+>/.test(missionData.description || "");
  const sanitizedMissionDescription = DOMPurify.sanitize(missionData.description || "");

  useEffect(() => {
    const getMissionContent = async () => {
      try {
        setLoadingMission(true);
        const res = await axios.get(`${server}/mission/get`);
        if (res.data?.success) {
          const mission = res.data?.data || {};
          setMissionData({
            heading: mission?.heading || "Welcome to Our Mission",
            description:
              mission?.description ||
              "Namaskar Humanity Welfare Society is dedicated to making a positive impact on society through various initiatives. Our primary focus is on providing quality education, accessible healthcare services, and raising awareness on critical social issues.",
            profilePhoto: mission?.profilePhoto || null,
          });
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to load mission content");
      } finally {
        setLoadingMission(false);
      }
    };

    getMissionContent();
  }, [server]);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-8 md:mb-12">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {missionData.heading}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 md:p-12"
          >
            {loadingMission ? (
              <div className="space-y-4">
                <div className="mx-auto h-16 w-16 animate-pulse rounded-full bg-slate-200" />
                <div className="mx-auto h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="mx-auto h-5 w-full animate-pulse rounded bg-slate-200" />
                <div className="mx-auto h-5 w-5/6 animate-pulse rounded bg-slate-200" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center mb-6">
                  {missionData?.profilePhoto?.url ? (
                    <img
                      src={missionData.profilePhoto.url}
                      alt={missionData?.profilePhoto?.alt || "Mission profile"}
                      className="h-20 w-20 rounded-full object-cover ring-4 ring-blue-100"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">AS</span>
                    </div>
                  )}
                </div>

                {hasHtmlTags ? (
                  <div
                    className="text-left text-base sm:text-lg text-gray-600 leading-relaxed break-words [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: sanitizedMissionDescription }}
                  />
                ) : (
                  <p
                    className="text-base sm:text-lg text-gray-600 leading-relaxed whitespace-pre-line break-words"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {missionData.description}
                  </p>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurMission;
