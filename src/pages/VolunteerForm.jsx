import { useState } from "react";
import { motion } from "framer-motion";
import { FaImage, FaUser, FaEnvelope, FaPhone, FaCheckCircle } from "react-icons/fa";
import LodingButton from "../components/LoadingButton";
import Layout from "../layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  UserGroupIcon,
  HeartIcon,
  SparklesIcon,
  IdentificationIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const VolunteerForm = () => {
  const server = import.meta.env.VITE_SERVER;
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [avatarPreiw, setAvatarPreiew] = useState(null);
  const [qualification, setQualification] = useState("");
  const [name, setName] = useState("");
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [skills, setSkills] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1940; year--) {
    years.push(year);
  }

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const getDaysInMonth = (month, year) => {
    if (!month || !year) return 31;
    return new Date(year, month, 0).getDate();
  };

  const getDaysArray = () => {
    const daysInMonth = getDaysInMonth(parseInt(dobMonth), parseInt(dobYear));
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day.toString().padStart(2, "0"));
    }
    return days;
  };

  const getFormattedDob = () => {
    if (dobDay && dobMonth && dobYear) {
      return `${dobDay}-${dobMonth}-${dobYear}`;
    }
    return "";
  };

  const maxSize = 2 * 1024 * 1024;
  const minSize = 100 * 1024;

  const handelAvatar = (e) => {
    let file = e.target.files[0];
    if (file.size > maxSize || file.size < minSize) {
      toast.error("File size should be 100KB to 2MB!.");
      setErrors({ ...errors, avatar: "File size should be 100KB to 2MB" });
      file = "";
    } else {
      setErrors({ ...errors, avatar: "" });
    }
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarPreiew(reader.result);
      };
    }
  };

  const handleDateChange = (type, value) => {
    if (type === "day") {
      setDobDay(value);
    } else if (type === "month") {
      setDobMonth(value);
      if (dobDay && dobYear && value) {
        const daysInMonth = getDaysInMonth(parseInt(value), parseInt(dobYear));
        if (parseInt(dobDay) > daysInMonth) {
          setDobDay("");
        }
      }
    } else if (type === "year") {
      setDobYear(value);
      if (dobDay && dobMonth && value) {
        const daysInMonth = getDaysInMonth(parseInt(dobMonth), parseInt(value));
        if (parseInt(dobDay) > daysInMonth) {
          setDobDay("");
        }
      }
    }
    setErrors({ ...errors, dob: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Full name is required";
    if (!qualification) newErrors.qualification = "Qualification is required";
    if (!fname.trim()) newErrors.fname = "Father's name is required";
    if (!mname.trim()) newErrors.mname = "Mother's name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is invalid";
    }
    if (!phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Mobile number should be 10 digits";
    }
    if (!gender) newErrors.gender = "Gender is required";
    if (!dobDay || !dobMonth || !dobYear) newErrors.dob = "Complete date of birth is required";
    if (!skills.trim()) newErrors.skills = "Skills are required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "PIN code should be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setAvatar(null);
    setAvatarPreiew(null);
    setQualification("");
    setName("");
    setFname("");
    setMname("");
    setEmail("");
    setPhone("");
    setGender("");
    setDobDay("");
    setDobMonth("");
    setDobYear("");
    setSkills("");
    setAddress("");
    setState("");
    setCity("");
    setPincode("");
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    const formData = new FormData();
    if (avatarPreiw) {
      formData.append("avatar", avatar);
    }
    formData.append("qualification", qualification);
    formData.append("name", name);
    formData.append("fname", fname);
    formData.append("mname", mname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("gender", gender);
    formData.append("dob", getFormattedDob());
    formData.append("skills", skills);
    formData.append("address", address);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("pincode", pincode);

    setLoading(true);

    try {
      const res = await axios.post(`${server}/volunteer/re-as-volunteer`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setSubmitted(true);
        setLoading(false);
        toast.success("🎉 Volunteer Application Submitted Successfully!");

        setTimeout(() => {
          resetForm();
        }, 2000);

        setTimeout(() => {
          navigate("/");
        }, 4000);
      }
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message || "Failed to submit application. Please try again.";
      toast.error(errorMessage);
    }
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (submitted) {
    return (
      <Layout
        title={"Application Submitted - Namaskar Humanity Welfare Society"}
        description={"Thank you for your volunteer application. We will contact you soon."}
      >
        <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-12 border border-green-100">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                  className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <FaCheckCircle className="w-12 h-12 text-white" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-4xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Application Submitted Successfully! 🎉
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-xl text-gray-600 mb-8 leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Thank you <strong>{name}</strong> for joining our volunteer community! We're
                  excited to have you on board. Our team will review your application and contact
                  you within 2-3 business days.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="bg-green-50 rounded-2xl p-6 mb-8"
                >
                  <h3 className="text-lg font-semibold text-green-800 mb-3">What's Next?</h3>
                  <ul className="text-green-700 space-y-2 text-left">
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      Our team will review your application
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      You'll receive an email confirmation shortly
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      We'll contact you for orientation details
                    </li>
                  </ul>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="text-gray-500 text-sm"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Redirecting to homepage in a few seconds...
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout
      title={"Volunteer Registration - Namaskar Humanity Welfare Society"}
      description={
        "Join our volunteer community and make a difference. Register as a volunteer with Namaskar Humanity Welfare Society to contribute to meaningful social causes."
      }
      keywords={"volunteer registration, join NGO, volunteer form, social work, community service"}
    >
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center text-white"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Join Our Mission</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Become a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Volunteer
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Join our community of passionate changemakers and help us create lasting impact in
              society.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100"
            >
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HeartIcon className="w-8 h-8 text-white" />
                </div>
                <h2
                  className="text-3xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Volunteer Registration
                </h2>
                <p
                  className="text-lg text-gray-600 max-w-2xl mx-auto"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Fill out this form to join our volunteer community and start making a difference
                  in people's lives.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                  variants={itemVariants}
                  className="bg-blue-50 rounded-xl p-6 border border-blue-100"
                >
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <IdentificationIcon className="w-6 h-6 text-blue-600" />
                    Profile Photo
                  </h3>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative">
                      {avatarPreiw ? (
                        <img
                          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                          src={avatarPreiw}
                          alt="Profile Preview"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center">
                          <FaUser className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <label
                        htmlFor="avatar"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
                      >
                        <FaImage className="w-5 h-5" />
                        Upload Photo
                      </label>
                      <input
                        id="avatar"
                        name="avatar"
                        type="file"
                        className="hidden"
                        onChange={handelAvatar}
                        accept="image/*"
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        PNG, JPG, JPEG or WEBP • 100KB to 2MB • Passport size preferred
                      </p>
                      {errors.avatar && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-4 h-4" />
                          {errors.avatar}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-green-50 rounded-xl p-6 border border-green-100"
                >
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <FaUser className="w-6 h-6 text-green-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors({ ...errors, name: "" });
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Enter your full name"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Qualification <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={qualification}
                        onChange={(e) => {
                          setQualification(e.target.value);
                          setErrors({ ...errors, qualification: "" });
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.qualification ? "border-red-500" : "border-gray-300"}`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <option value="">Select Qualification</option>
                        <option value="High School">High School</option>
                        <option value="Inter Mediate">Intermediate</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Post Graduate">Post Graduate</option>
                        <option value="PhD">PhD</option>
                      </select>
                      {errors.qualification && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-4 h-4" />
                          {errors.qualification}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Father's Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={fname}
                        onChange={(e) => {
                          setFname(e.target.value);
                          setErrors({ ...errors, fname: "" });
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.fname ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Enter father's name"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                      {errors.fname && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-4 h-4" />
                          {errors.fname}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Mother's Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={mname}
                        onChange={(e) => {
                          setMname(e.target.value);
                          setErrors({ ...errors, mname: "" });
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.mname ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Enter mother's name"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                      {errors.mname && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-4 h-4" />
                          {errors.mname}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => {
                          setGender(e.target.value);
                          setErrors({ ...errors, gender: "" });
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.gender ? "border-red-500" : "border-gray-300"}`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-4 h-4" />
                          {errors.gender}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <select
                            value={dobDay}
                            onChange={(e) => handleDateChange("day", e.target.value)}
                            className={`w-full px-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.dob ? "border-red-500" : "border-gray-300"}`}
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            <option value="">Day</option>
                            {getDaysArray().map((day) => (
                              <option key={day} value={day}>
                                {day}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <select
                            value={dobMonth}
                            onChange={(e) => handleDateChange("month", e.target.value)}
                            className={`w-full px-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.dob ? "border-red-500" : "border-gray-300"}`}
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            <option value="">Month</option>
                            {months.map((month) => (
                              <option key={month.value} value={month.value}>
                                {month.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <select
                            value={dobYear}
                            onChange={(e) => handleDateChange("year", e.target.value)}
                            className={`w-full px-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.dob ? "border-red-500" : "border-gray-300"}`}
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            <option value="">Year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {errors.dob && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-4 h-4" />
                          {errors.dob}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Select day, month, and year</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-purple-50 rounded-xl p-6 border border-purple-100"
                >
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <FaEnvelope className="w-6 h-6 text-purple-600" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({ ...errors, email: "" });
                          }}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Enter your email"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            setErrors({ ...errors, phone: "" });
                          }}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Enter your mobile number"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-orange-50 rounded-xl p-6 border border-orange-100"
                >
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <SparklesIcon className="w-6 h-6 text-orange-600" />
                    Skills & Location
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Skills & Interests <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={skills}
                        onChange={(e) => {
                          setSkills(e.target.value);
                          setErrors({ ...errors, skills: "" });
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.skills ? "border-red-500" : "border-gray-300"}`}
                        placeholder="e.g., Teaching, Healthcare, Event Management, Social Media"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                      {errors.skills && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-4 h-4" />
                          {errors.skills}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          setErrors({ ...errors, address: "" });
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.address ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Enter your complete address"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-4 h-4" />
                          {errors.address}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label
                          className="block text-sm font-semibold text-gray-700 mb-2"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            setErrors({ ...errors, city: "" });
                          }}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.city ? "border-red-500" : "border-gray-300"}`}
                          placeholder="City"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <ExclamationTriangleIcon className="w-4 h-4" />
                            {errors.city}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          className="block text-sm font-semibold text-gray-700 mb-2"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => {
                            setState(e.target.value);
                            setErrors({ ...errors, state: "" });
                          }}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.state ? "border-red-500" : "border-gray-300"}`}
                          placeholder="State"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <ExclamationTriangleIcon className="w-4 h-4" />
                            {errors.state}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          className="block text-sm font-semibold text-gray-700 mb-2"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          PIN Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => {
                            setPincode(e.target.value);
                            setErrors({ ...errors, pincode: "" });
                          }}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.pincode ? "border-red-500" : "border-gray-300"}`}
                          placeholder="PIN Code"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                        {errors.pincode && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <ExclamationTriangleIcon className="w-4 h-4" />
                            {errors.pincode}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center pt-6">
                  {loading ? (
                    <LodingButton
                      content={"Submitting Application..."}
                      btnClass="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300"
                    />
                  ) : (
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <HeartIcon className="w-6 h-6" />
                      Submit Application
                    </motion.button>
                  )}
                  <p
                    className="text-sm text-gray-600 mt-4"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    By submitting this form, you agree to join our volunteer community and
                    contribute to our mission.
                  </p>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default VolunteerForm;
