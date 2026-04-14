const education1 = new URL("../assets/wallpaper/education.jpeg", import.meta.url).href;
const awareness = new URL("../assets/wallpaper/11.jpg", import.meta.url).href;
const woman = new URL("../assets/wallpaper/woman.jpg", import.meta.url).href;
const health = new URL("../assets/wallpaper/health.jpeg", import.meta.url).href;

export const DEFAULT_INITIATIVES = [
  {
    _id: "default-1",
    icon: "AcademicCapIcon",
    title: "Education",
    description:
      "Education is the key to unlocking opportunities and breaking the cycle of poverty. We provide resources, scholarships, and support to students in need, believing that education is a fundamental right, not a privilege.",
    image: education1,
    iconImage: "",
    stats: "500+ Students Supported",
    color: "#2563eb",
  },
  {
    _id: "default-2",
    icon: "SpeakerWaveIcon",
    title: "Awareness",
    description:
      "Awareness is the first step towards change. We organize campaigns on various social and environmental issues, such as hygiene, sanitation, climate change, and more to inspire action in our communities.",
    image: awareness,
    iconImage: "",
    stats: "50+ Awareness Campaigns",
    color: "#10b981",
  },
  {
    _id: "default-3",
    icon: "HeartIcon",
    title: "Healthcare",
    description:
      "We are passionate about improving community health and well-being. Through health initiatives, medical camps, and awareness programs, we ensure everyone has access to healthcare services.",
    image: health,
    iconImage: "",
    stats: "200+ Medical Camps",
    color: "#ef4444",
  },
  {
    _id: "default-4",
    icon: "UserGroupIcon",
    title: "Women Empowerment",
    description:
      "We are dedicated to making women self-reliant through education, skill development, and employment opportunities. Our mission is to strengthen women's role in society through various empowerment programs.",
    image: woman,
    iconImage: "",
    stats: "300+ Women Empowered",
    color: "#7c3aed",
  },
];
