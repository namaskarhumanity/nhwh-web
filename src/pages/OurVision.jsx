import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

const OurVision = () => {
  const server = import.meta.env.VITE_SERVER;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [loadingVision, setLoadingVision] = useState(false);
  const [visionData, setVisionData] = useState({
    heading: "Our Vision",
    introDescription:
      "Namaskar Humanity Welfare Society envisions a just and inclusive society where every individual, regardless of their background, has access to education, healthcare, and equal opportunities.",
    subHeading: "Empowering Communities, Transforming Lives",
    paragraphOne:
      "Our vision is to empower the underprivileged, promote gender equality, and raise awareness about social and environmental issues. We strive to build a compassionate community where everyone can thrive, contribute, and lead a dignified life.",
    paragraphTwo:
      "Through sustainable development initiatives and collaborative efforts, we aim to bring lasting positive change to society, creating opportunities for a better, more equitable future for all.",
    quote:
      "We believe that change begins with understanding, grows with compassion, and flourishes through collective action.",
    quoteAuthor: "Anurag Singh, Founder",
  });

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

  const hasIntroHtml = /<[^>]+>/.test(visionData.introDescription || "");
  const hasParagraphOneHtml = /<[^>]+>/.test(visionData.paragraphOne || "");
  const hasParagraphTwoHtml = /<[^>]+>/.test(visionData.paragraphTwo || "");

  const sanitizedIntro = DOMPurify.sanitize(visionData.introDescription || "");
  const sanitizedParagraphOne = DOMPurify.sanitize(visionData.paragraphOne || "");
  const sanitizedParagraphTwo = DOMPurify.sanitize(visionData.paragraphTwo || "");

  useEffect(() => {
    const getVisionContent = async () => {
      try {
        setLoadingVision(true);
        const res = await axios.get(`${server}/vision/get`);

        if (res.data?.success) {
          const vision = res.data?.data || {};
          setVisionData((prev) => ({
            ...prev,
            heading: vision?.heading || prev.heading,
            introDescription: vision?.introDescription || prev.introDescription,
            subHeading: vision?.subHeading || prev.subHeading,
            paragraphOne: vision?.paragraphOne || prev.paragraphOne,
            paragraphTwo: vision?.paragraphTwo || prev.paragraphTwo,
            quote: vision?.quote || prev.quote,
            quoteAuthor: vision?.quoteAuthor || prev.quoteAuthor,
          }));
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to load vision content");
      } finally {
        setLoadingVision(false);
      }
    };

    getVisionContent();
  }, [server]);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {visionData.heading.split(" ").slice(0, -1).join(" ") || "Our"}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {visionData.heading.split(" ").slice(-1).join(" ") || "Vision"}
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            {hasIntroHtml ? (
              <div
                className="text-left md:text-center text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
                dangerouslySetInnerHTML={{ __html: sanitizedIntro }}
              />
            ) : (
              <p
                className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto whitespace-pre-line"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {visionData.introDescription}
              </p>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid lg:grid-cols-2 gap-12 items-center mb-16"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{visionData.subHeading}</h3>
              {loadingVision ? (
                <div className="space-y-4">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-5 w-5/6 animate-pulse rounded bg-slate-200" />
                </div>
              ) : (
                <>
                  {hasParagraphOneHtml ? (
                    <div
                      className="text-lg text-gray-600 leading-relaxed [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6"
                      dangerouslySetInnerHTML={{ __html: sanitizedParagraphOne }}
                    />
                  ) : (
                    <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                      {visionData.paragraphOne}
                    </p>
                  )}
                  {hasParagraphTwoHtml ? (
                    <div
                      className="text-lg text-gray-600 leading-relaxed [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6"
                      dangerouslySetInnerHTML={{ __html: sanitizedParagraphTwo }}
                    />
                  ) : (
                    <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                      {visionData.paragraphTwo}
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-xl">
                <blockquote className="text-xl italic text-gray-700 mb-4">
                  &quot;{visionData.quote}&quot;
                </blockquote>
                <cite className="text-blue-600 font-semibold">- {visionData.quoteAuthor}</cite>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurVision;
