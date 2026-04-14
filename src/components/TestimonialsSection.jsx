import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { StarIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import DOMPurify from "dompurify";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote"],
    ["clean"],
  ],
};

const TestimonialsSection = () => {
  const server = import.meta.env.VITE_SERVER;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    location: "",
    feedback: "",
    rating: 5,
  });
  const [errors, setErrors] = useState({});

  const getTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${server}/testimonial/get`);
      if (res.data?.success) {
        setTestimonials(res.data?.data?.testimonials || []);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }, [server]);

  useEffect(() => {
    getTestimonials();
  }, [getTestimonials]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFeedbackChange = (value) => {
    setFormData((prev) => ({ ...prev, feedback: value }));
    setErrors((prev) => ({ ...prev, feedback: "" }));
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email";
    }
    const plainText = formData.feedback.replace(/<[^>]*>?/gm, "").trim();
    if (!plainText) nextErrors.feedback = "Feedback is required";
    else if (plainText.length < 10) {
      nextErrors.feedback = "Feedback must be at least 10 characters";
    }
    if (formData.rating < 1 || formData.rating > 5) {
      nextErrors.rating = "Rating must be between 1 and 5";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        location: formData.location,
        feedback: formData.feedback,
        rating: formData.rating,
      };

      const res = await axios.post(`${server}/testimonial/share`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data?.success) {
        toast.success(res.data?.message || "Feedback submitted successfully!");
        setFormData({
          name: "",
          email: "",
          role: "",
          location: "",
          feedback: "",
          rating: 5,
        });
        setShowForm(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

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
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              What People Say{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                About Us
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p
              className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Hear from the volunteers, beneficiaries, and partners who are part of our mission to
              create positive change in communities.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-8 animate-pulse h-72" />
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-md p-10 text-center"
            >
              <p className="text-gray-600 text-lg">
                No approved feedback yet. Be the first to share your story.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial._id}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 relative overflow-hidden hover:-translate-y-2"
                >
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <ChatBubbleLeftIcon className="w-16 h-16 text-blue-600" />
                  </div>

                  <div className="flex items-center mb-6">
                    {[...Array(Number(testimonial.rating) || 5)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>

                  <div
                    className="text-gray-700 leading-relaxed mb-6 relative z-10 prose prose-sm max-w-none"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(testimonial.feedback) }}
                  />

                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {(testimonial.name || "U")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <h4
                        className="font-semibold text-gray-900"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {testimonial.name}
                      </h4>
                      <p className="text-blue-600 text-sm font-medium">
                        {testimonial.role || "Client"}
                      </p>
                      <p className="text-gray-500 text-xs">{testimonial.location || "India"}</p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <p className="text-lg text-gray-600 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
              Want to share your experience with us?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm((prev) => !prev)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
            >
              {showForm ? "Close Form" : "Share Your Story"}
            </motion.button>
          </motion.div>

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-10 bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Share Your Feedback</h3>
              <p className="text-gray-600 mb-6">
                Your feedback will be reviewed by admin before publishing.
              </p>

              <form onSubmit={submitFeedback} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    name="role"
                    placeholder="Role (optional)"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="location"
                    placeholder="Location (optional)"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">Rating</label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={5}>5 - Excellent</option>
                    <option value={4}>4 - Very Good</option>
                    <option value={3}>3 - Good</option>
                    <option value={2}>2 - Fair</option>
                    <option value={1}>1 - Poor</option>
                  </select>
                  {errors.rating && <p className="text-red-600 text-sm mt-1">{errors.rating}</p>}
                </div>

                <div className="md:col-span-2">
                  <ReactQuill
                    theme="snow"
                    value={formData.feedback}
                    onChange={handleFeedbackChange}
                    modules={quillModules}
                    placeholder="Write your feedback..."
                    className="rounded-lg"
                  />
                  {errors.feedback && (
                    <p className="text-red-600 text-sm mt-1">{errors.feedback}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full md:w-auto px-8 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                      submitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg"
                    }`}
                  >
                    {submitting ? "Submitting..." : "Submit Feedback"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
