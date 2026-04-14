import Layout from "./layout/Layout";
import { IndianRupee, MessageSquareMore, UserCheck, Users } from "lucide-react";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BiSearch } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import LodingButton from "../../components/LoadingButton";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const Dashboard = () => {
  const server = import.meta.env.VITE_SERVER;
  const { currentUser } = useSelector((state) => state.user);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalVolunteers: 0,
    totalMessages: 0,
    totalDonations: 0,
  });
  const [testimonialsData, setTestimonialsData] = useState({
    testimonials: [],
    totalPages: 1,
    currentPage: 1,
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [approvedFilter, setApprovedFilter] = useState("all");
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "",
    location: "",
    feedback: "",
    rating: 5,
    isApproved: false,
  });
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [heroForm, setHeroForm] = useState({
    title: "",
    highlightText: "",
    description: "",
    primaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonText: "",
    secondaryButtonLink: "",
  });
  const [heroImages, setHeroImages] = useState([]);
  const [heroImagePreview, setHeroImagePreview] = useState([]);
  const [heroCurrentImages, setHeroCurrentImages] = useState([]);
  const [heroLoading, setHeroLoading] = useState(false);
  const [heroSaving, setHeroSaving] = useState(false);
  const [missionForm, setMissionForm] = useState({
    heading: "",
    description: "",
    profilePhotoAlt: "",
  });
  const [missionPhoto, setMissionPhoto] = useState(null);
  const [missionPhotoPreview, setMissionPhotoPreview] = useState("");
  const [missionCurrentPhoto, setMissionCurrentPhoto] = useState("");
  const [missionLoading, setMissionLoading] = useState(false);
  const [missionSaving, setMissionSaving] = useState(false);
  const [visionForm, setVisionForm] = useState({
    heading: "",
    introDescription: "",
    subHeading: "",
    paragraphOne: "",
    paragraphTwo: "",
    quote: "",
    quoteAuthor: "",
  });
  const [visionLoading, setVisionLoading] = useState(false);
  const [visionSaving, setVisionSaving] = useState(false);
  const [valuesData, setValuesData] = useState([]);
  const [valuesLoading, setValuesLoading] = useState(false);
  const [valueForm, setValueForm] = useState({
    title: "",
    description: "",
    iconSource: "heroicon",
    icon: "HeartIcon",
    iconFile: null,
    iconFilePreview: "",
    iconUrl: "",
  });
  const [valueAdding, setValueAdding] = useState(false);
  const [valueEditId, setValueEditId] = useState(null);
  const [valueEditForm, setValueEditForm] = useState({
    title: "",
    description: "",
    iconSource: "heroicon",
    icon: "HeartIcon",
    iconFile: null,
    iconFilePreview: "",
    iconUrl: "",
  });
  const [valueUpdatingId, setValueUpdatingId] = useState(null);
  const [valueDeletingId, setValueDeletingId] = useState(null);
  const [initiativesData, setInitiativesData] = useState([]);
  const [initiativesLoading, setInitiativesLoading] = useState(false);
  const [initiativeForm, setInitiativeForm] = useState({
    title: "",
    description: "",
    stats: "",
    color: "#2563eb",
    iconSource: "heroicon",
    icon: "AcademicCapIcon",
    iconFile: null,
    iconFilePreview: "",
    iconUrl: "",
    coverImage: null,
    coverImagePreview: "",
  });
  const [initiativeAdding, setInitiativeAdding] = useState(false);
  const [initiativeEditId, setInitiativeEditId] = useState(null);
  const [initiativeEditForm, setInitiativeEditForm] = useState({
    title: "",
    description: "",
    stats: "",
    color: "#2563eb",
    iconSource: "heroicon",
    icon: "AcademicCapIcon",
    iconFile: null,
    iconFilePreview: "",
    iconUrl: "",
    coverImage: null,
    coverImagePreview: "",
  });
  const [initiativeUpdatingId, setInitiativeUpdatingId] = useState(null);
  const [initiativeDeletingId, setInitiativeDeletingId] = useState(null);

  const normalizePickerColor = (value) =>
    /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(value || "") ? value : "#2563eb";

  const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(Number(value || 0));

  const stats = useMemo(
    () => [
      {
        title: "Total Users",
        value: formatNumber(dashboardStats.totalUsers),
        icon: Users,
        iconBg: "bg-emerald-500",
      },
      {
        title: "Total Volunteers",
        value: formatNumber(dashboardStats.totalVolunteers),
        icon: UserCheck,
        iconBg: "bg-sky-500",
      },
      {
        title: "Total Messages",
        value: formatNumber(dashboardStats.totalMessages),
        icon: MessageSquareMore,
        iconBg: "bg-indigo-500",
      },
      {
        title: "Total Donations",
        value: `Rs. ${formatNumber(dashboardStats.totalDonations)}`,
        icon: IndianRupee,
        iconBg: "bg-rose-500",
      },
    ],
    [dashboardStats]
  );

  const recentActivities = useMemo(
    () => [
      {
        id: "volunteers",
        title: "Volunteer Pipeline",
        detail: `${formatNumber(dashboardStats.totalVolunteers)} total volunteer profiles available for review.`,
        tone: "from-sky-50 to-sky-100/40 border-sky-200 text-sky-800",
      },
      {
        id: "donations",
        title: "Donation Updates",
        detail: `Total recorded donations reached Rs. ${formatNumber(dashboardStats.totalDonations)}.`,
        tone: "from-emerald-50 to-emerald-100/40 border-emerald-200 text-emerald-800",
      },
      {
        id: "messages",
        title: "Inbox Attention",
        detail: `${formatNumber(dashboardStats.totalMessages)} messages currently tracked in admin inbox.`,
        tone: "from-indigo-50 to-indigo-100/40 border-indigo-200 text-indigo-800",
      },
    ],
    [dashboardStats, formatNumber]
  );

  const missionEditorModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "link"],
        [{ align: [] }],
        ["clean"],
      ],
    }),
    []
  );

  const missionEditorFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "blockquote",
    "link",
    "align",
  ];

  useEffect(() => {
    const getDashboardStats = async () => {
      try {
        if (!currentUser?.data?.accessToken) return;
        const headers = {
          Authorization: `Bearer ${currentUser.data.accessToken}`,
        };

        const res = await axios.get(`${server}/admin/dashboard-stats`, {
          headers,
        });

        if (res.data?.success) {
          setDashboardStats(res.data.data);
        }
      } catch (error) {
        const statusCode = error?.response?.status;

        // Fallback for older deployments where /admin/dashboard-stats is not available yet.
        if (statusCode === 404) {
          try {
            const headers = {
              Authorization: `Bearer ${currentUser.data.accessToken}`,
            };
            const limit = 6;

            const getTotalFromPagedEndpoint = async (endpoint, dataKey) => {
              const first = await axios.get(`${server}${endpoint}?page=1`, { headers });
              const totalPages = Number(first?.data?.data?.totalPages || 1);
              if (totalPages <= 1) {
                return Number(first?.data?.data?.[dataKey]?.length || 0);
              }

              const last = await axios.get(`${server}${endpoint}?page=${totalPages}`, { headers });
              const lastPageCount = Number(last?.data?.data?.[dataKey]?.length || 0);
              return (totalPages - 1) * limit + lastPageCount;
            };

            const [totalUsers, totalVolunteers, messagesRes, paymentsRes] = await Promise.all([
              getTotalFromPagedEndpoint(`/admin/get-users`, "users"),
              getTotalFromPagedEndpoint(`/admin/get-volunteers`, "volunteer"),
              axios.get(`${server}/message/get`, { headers }),
              axios.get(`${server}/admin/get-payments`, { headers }),
            ]);

            const totalMessages = Number(messagesRes?.data?.data?.length || 0);
            const payments = paymentsRes?.data?.data?.payments || [];
            const totalDonations = payments.reduce((acc, payment) => {
              const amount = Number(String(payment?.amount || "0").replace(/,/g, ""));
              return acc + (Number.isNaN(amount) ? 0 : amount);
            }, 0);

            setDashboardStats({
              totalUsers,
              totalVolunteers,
              totalMessages,
              totalDonations,
            });
          } catch (fallbackError) {
            toast.error(fallbackError?.response?.data?.message || "Unable to load dashboard stats");
          }
          return;
        }

        toast.error(error?.response?.data?.message || "Unable to load dashboard stats");
      }
    };

    getDashboardStats();
  }, [server, currentUser]);

  const getHeroContent = useCallback(async () => {
    try {
      setHeroLoading(true);
      const res = await axios.get(`${server}/hero/get`);
      if (res.data?.success) {
        const hero = res.data.data;
        setHeroForm({
          title: hero?.title || "",
          highlightText: hero?.highlightText || "",
          description: hero?.description || "",
          primaryButtonText: hero?.primaryButtonText || "",
          primaryButtonLink: hero?.primaryButtonLink || "",
          secondaryButtonText: hero?.secondaryButtonText || "",
          secondaryButtonLink: hero?.secondaryButtonLink || "",
        });
        setHeroCurrentImages(Array.isArray(hero?.images) ? hero.images : []);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to load hero content");
    } finally {
      setHeroLoading(false);
    }
  }, [server]);

  useEffect(() => {
    getHeroContent();
  }, [getHeroContent]);

  const getMissionContent = useCallback(async () => {
    try {
      setMissionLoading(true);
      const res = await axios.get(`${server}/mission/get`);
      if (res.data?.success) {
        const mission = res.data.data;
        setMissionForm({
          heading: mission?.heading || "",
          description: mission?.description || "",
          profilePhotoAlt: mission?.profilePhoto?.alt || "",
        });
        setMissionCurrentPhoto(mission?.profilePhoto?.url || "");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to load mission content");
    } finally {
      setMissionLoading(false);
    }
  }, [server]);

  useEffect(() => {
    getMissionContent();
  }, [getMissionContent]);

  const getVisionContent = useCallback(async () => {
    try {
      setVisionLoading(true);
      const res = await axios.get(`${server}/vision/get`);
      if (res.data?.success) {
        const vision = res.data.data;
        setVisionForm({
          heading: vision?.heading || "",
          introDescription: vision?.introDescription || "",
          subHeading: vision?.subHeading || "",
          paragraphOne: vision?.paragraphOne || "",
          paragraphTwo: vision?.paragraphTwo || "",
          quote: vision?.quote || "",
          quoteAuthor: vision?.quoteAuthor || "",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to load vision content");
    } finally {
      setVisionLoading(false);
    }
  }, [server]);

  useEffect(() => {
    getVisionContent();
  }, [getVisionContent]);

  const handleHeroInputChange = (e) => {
    const { name, value } = e.target;
    setHeroForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHeroImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []).slice(0, 5);
    setHeroImages(selectedFiles);
    setHeroImagePreview(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleHeroUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!currentUser?.data?.accessToken) return;

      if (heroImages.length > 0 && (heroImages.length < 3 || heroImages.length > 5)) {
        toast.error("Please select minimum 3 and maximum 5 images for hero slider");
        return;
      }

      setHeroSaving(true);

      const formData = new FormData();
      formData.append("title", heroForm.title);
      formData.append("highlightText", heroForm.highlightText);
      formData.append("description", heroForm.description);
      formData.append("primaryButtonText", heroForm.primaryButtonText);
      formData.append("primaryButtonLink", heroForm.primaryButtonLink);
      formData.append("secondaryButtonText", heroForm.secondaryButtonText);
      formData.append("secondaryButtonLink", heroForm.secondaryButtonLink);

      heroImages.forEach((file) => {
        formData.append("heroImages", file);
      });

      const res = await axios.put(`${server}/hero/admin/update`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser?.data?.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Hero content updated");
        setHeroImages([]);
        setHeroImagePreview([]);
        getHeroContent();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update hero content");
    } finally {
      setHeroSaving(false);
    }
  };

  const handleMissionInputChange = (e) => {
    const { name, value } = e.target;
    setMissionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMissionPhotoChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setMissionPhoto(selectedFile);
    setMissionPhotoPreview(selectedFile ? URL.createObjectURL(selectedFile) : "");
  };

  const handleMissionUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!currentUser?.data?.accessToken) return;

      const plainMissionDescription = (missionForm.description || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .trim();

      if (!missionForm.heading?.trim() || !plainMissionDescription) {
        toast.error("Mission heading and description are required");
        return;
      }

      setMissionSaving(true);
      const formData = new FormData();
      formData.append("heading", missionForm.heading);
      formData.append("description", missionForm.description);
      formData.append("profilePhotoAlt", missionForm.profilePhotoAlt);

      if (missionPhoto) {
        formData.append("missionProfilePhoto", missionPhoto);
      }

      const res = await axios.put(`${server}/mission/admin/update`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser?.data?.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Mission content updated");
        setMissionPhoto(null);
        setMissionPhotoPreview("");
        getMissionContent();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update mission content");
    } finally {
      setMissionSaving(false);
    }
  };

  const getValues = useCallback(async () => {
    try {
      setValuesLoading(true);
      const res = await axios.get(`${server}/values/get?includeInactive=true`);
      if (res.data?.success) {
        setValuesData(res.data.data || []);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to load values");
    } finally {
      setValuesLoading(false);
    }
  }, [server]);

  useEffect(() => {
    getValues();
  }, [getValues]);

  const handleAddValue = async (e) => {
    e.preventDefault();
    try {
      if (!currentUser?.data?.accessToken) return;

      const plainValueDescription = (valueForm.description || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .trim();

      if (!valueForm.title.trim() || !plainValueDescription) {
        toast.error("Title and description are required");
        return;
      }
      if (valueForm.iconSource === "upload" && !valueForm.iconFile) {
        toast.error("Please select an icon image to upload");
        return;
      }
      if (valueForm.iconSource === "url" && !valueForm.iconUrl.trim()) {
        toast.error("Please enter an icon URL");
        return;
      }
      setValueAdding(true);
      const formData = new FormData();
      formData.append("title", valueForm.title);
      formData.append("description", valueForm.description);
      if (valueForm.iconSource === "heroicon") {
        formData.append("icon", valueForm.icon);
      } else if (valueForm.iconSource === "upload" && valueForm.iconFile) {
        formData.append("iconImage", valueForm.iconFile);
      } else if (valueForm.iconSource === "url") {
        formData.append("iconUrl", valueForm.iconUrl);
      }
      const res = await axios.post(`${server}/values/add`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser.data.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data?.success) {
        toast.success(res.data.message || "Value added");
        setValueForm({
          title: "",
          description: "",
          iconSource: "heroicon",
          icon: "HeartIcon",
          iconFile: null,
          iconFilePreview: "",
          iconUrl: "",
        });
        getValues();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to add value");
    } finally {
      setValueAdding(false);
    }
  };

  const startValueEdit = (item) => {
    setValueEditId(item._id);
    const hasUpload = !!(item.iconImage?.url && item.iconImage.public_id);
    const hasUrl = !!(item.iconImage?.url && !item.iconImage.public_id);
    setValueEditForm({
      title: item.title || "",
      description: item.description || "",
      iconSource: hasUpload ? "upload" : hasUrl ? "url" : "heroicon",
      icon: item.icon || "HeartIcon",
      iconFile: null,
      iconFilePreview: item.iconImage?.url || "",
      iconUrl: hasUrl ? item.iconImage.url : "",
    });
  };

  const cancelValueEdit = () => {
    setValueEditId(null);
    setValueEditForm({
      title: "",
      description: "",
      iconSource: "heroicon",
      icon: "HeartIcon",
      iconFile: null,
      iconFilePreview: "",
      iconUrl: "",
    });
  };

  const handleUpdateValue = async (id) => {
    try {
      if (!currentUser?.data?.accessToken) return;

      const plainEditDescription = (valueEditForm.description || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .trim();

      if (!valueEditForm.title.trim() || !plainEditDescription) {
        toast.error("Title and description are required");
        return;
      }

      setValueUpdatingId(id);
      const formData = new FormData();
      formData.append("title", valueEditForm.title);
      formData.append("description", valueEditForm.description);
      if (valueEditForm.iconSource === "heroicon") {
        formData.append("icon", valueEditForm.icon);
        // Clear existing uploaded/link icon so selected heroicon is rendered.
        formData.append("iconUrl", "");
      } else if (valueEditForm.iconSource === "upload" && valueEditForm.iconFile) {
        formData.append("iconImage", valueEditForm.iconFile);
      } else if (valueEditForm.iconSource === "url") {
        formData.append("iconUrl", valueEditForm.iconUrl);
      }
      const res = await axios.put(`${server}/values/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser.data.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data?.success) {
        toast.success(res.data.message || "Value updated");
        cancelValueEdit();
        getValues();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update value");
    } finally {
      setValueUpdatingId(null);
    }
  };

  const handleDeleteValue = async (id) => {
    try {
      if (!currentUser?.data?.accessToken) return;
      setValueDeletingId(id);
      const res = await axios.delete(`${server}/values/delete/${id}`, {
        headers: { Authorization: `Bearer ${currentUser.data.accessToken}` },
      });
      if (res.data?.success) {
        toast.success(res.data.message || "Value deleted");
        getValues();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to delete value");
    } finally {
      setValueDeletingId(null);
    }
  };

  const getInitiatives = useCallback(async () => {
    try {
      setInitiativesLoading(true);
      const res = await axios.get(`${server}/initiative/get?includeInactive=true`);
      if (res.data?.success) {
        setInitiativesData(res.data.data || []);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to load initiatives");
    } finally {
      setInitiativesLoading(false);
    }
  }, [server]);

  useEffect(() => {
    getInitiatives();
  }, [getInitiatives]);

  const handleAddInitiative = async (e) => {
    e.preventDefault();
    try {
      if (!currentUser?.data?.accessToken) return;

      const plainInitiativeDescription = (initiativeForm.description || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .trim();

      if (!initiativeForm.title.trim() || !plainInitiativeDescription) {
        toast.error("Title and description are required");
        return;
      }
      if (!initiativeForm.coverImage) {
        toast.error("Cover image is required");
        return;
      }

      setInitiativeAdding(true);

      const formData = new FormData();
      formData.append("title", initiativeForm.title);
      formData.append("description", initiativeForm.description);
      formData.append("stats", initiativeForm.stats);
      formData.append("color", initiativeForm.color);
      if (initiativeForm.iconSource === "heroicon") {
        formData.append("icon", initiativeForm.icon);
      } else if (initiativeForm.iconSource === "upload" && initiativeForm.iconFile) {
        formData.append("iconImage", initiativeForm.iconFile);
      } else if (initiativeForm.iconSource === "url") {
        formData.append("iconUrl", initiativeForm.iconUrl);
      }
      formData.append("coverImage", initiativeForm.coverImage);

      const res = await axios.post(`${server}/initiative/add`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser.data.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Initiative added");
        setInitiativeForm({
          title: "",
          description: "",
          stats: "",
          color: "#2563eb",
          iconSource: "heroicon",
          icon: "AcademicCapIcon",
          iconFile: null,
          iconFilePreview: "",
          iconUrl: "",
          coverImage: null,
          coverImagePreview: "",
        });
        getInitiatives();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to add initiative");
    } finally {
      setInitiativeAdding(false);
    }
  };

  const startInitiativeEdit = (item) => {
    setInitiativeEditId(item._id);
    const hasUpload = !!(item.iconImage?.url && item.iconImage.public_id);
    const hasUrl = !!(item.iconImage?.url && !item.iconImage.public_id);
    setInitiativeEditForm({
      title: item.title || "",
      description: item.description || "",
      stats: item.stats || "",
      color: normalizePickerColor(item.color || "#2563eb"),
      iconSource: hasUpload ? "upload" : hasUrl ? "url" : "heroicon",
      icon: item.icon || "AcademicCapIcon",
      iconFile: null,
      iconFilePreview: item.iconImage?.url || "",
      iconUrl: hasUrl ? item.iconImage.url : "",
      coverImage: null,
      coverImagePreview: item.coverImage?.url || "",
    });
  };

  const cancelInitiativeEdit = () => {
    setInitiativeEditId(null);
    setInitiativeEditForm({
      title: "",
      description: "",
      stats: "",
      color: "#2563eb",
      iconSource: "heroicon",
      icon: "AcademicCapIcon",
      iconFile: null,
      iconFilePreview: "",
      iconUrl: "",
      coverImage: null,
      coverImagePreview: "",
    });
  };

  const handleUpdateInitiative = async (id) => {
    try {
      if (!currentUser?.data?.accessToken) return;

      const plainInitiativeEditDescription = (initiativeEditForm.description || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .trim();

      if (!initiativeEditForm.title.trim() || !plainInitiativeEditDescription) {
        toast.error("Title and description are required");
        return;
      }

      setInitiativeUpdatingId(id);

      const formData = new FormData();
      formData.append("title", initiativeEditForm.title);
      formData.append("description", initiativeEditForm.description);
      formData.append("stats", initiativeEditForm.stats);
      formData.append("color", initiativeEditForm.color);
      if (initiativeEditForm.iconSource === "heroicon") {
        formData.append("icon", initiativeEditForm.icon);
        formData.append("iconUrl", "");
      } else if (initiativeEditForm.iconSource === "upload" && initiativeEditForm.iconFile) {
        formData.append("iconImage", initiativeEditForm.iconFile);
      } else if (initiativeEditForm.iconSource === "url") {
        formData.append("iconUrl", initiativeEditForm.iconUrl);
      }
      if (initiativeEditForm.coverImage) {
        formData.append("coverImage", initiativeEditForm.coverImage);
      }

      const res = await axios.put(`${server}/initiative/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser.data.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Initiative updated");
        cancelInitiativeEdit();
        getInitiatives();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update initiative");
    } finally {
      setInitiativeUpdatingId(null);
    }
  };

  const handleDeleteInitiative = async (id) => {
    try {
      if (!currentUser?.data?.accessToken) return;
      setInitiativeDeletingId(id);
      const res = await axios.delete(`${server}/initiative/delete/${id}`, {
        headers: { Authorization: `Bearer ${currentUser.data.accessToken}` },
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Initiative deleted");
        getInitiatives();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to delete initiative");
    } finally {
      setInitiativeDeletingId(null);
    }
  };

  const handleVisionInputChange = (e) => {
    const { name, value } = e.target;
    setVisionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVisionUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!currentUser?.data?.accessToken) return;

      const plainIntro = (visionForm.introDescription || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .trim();
      const plainParagraphOne = (visionForm.paragraphOne || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .trim();
      const plainParagraphTwo = (visionForm.paragraphTwo || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .trim();

      if (
        !visionForm.heading?.trim() ||
        !visionForm.subHeading?.trim() ||
        !plainIntro ||
        !plainParagraphOne ||
        !plainParagraphTwo
      ) {
        toast.error("Heading, sub heading, and all description fields are required");
        return;
      }

      setVisionSaving(true);

      const payload = {
        heading: visionForm.heading,
        introDescription: visionForm.introDescription,
        subHeading: visionForm.subHeading,
        paragraphOne: visionForm.paragraphOne,
        paragraphTwo: visionForm.paragraphTwo,
        quote: visionForm.quote,
        quoteAuthor: visionForm.quoteAuthor,
      };

      const res = await axios.put(`${server}/vision/admin/update`, payload, {
        headers: {
          Authorization: `Bearer ${currentUser?.data?.accessToken}`,
        },
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Vision content updated");
        getVisionContent();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update vision content");
    } finally {
      setVisionSaving(false);
    }
  };

  const getTestimonials = useCallback(async () => {
    try {
      setLoadingTestimonials(true);
      if (!currentUser?.data?.accessToken) return;

      const approved = approvedFilter === "all" ? undefined : approvedFilter;
      const res = await axios.get(`${server}/testimonial/admin/get`, {
        params: {
          search: search || undefined,
          approved,
          page,
        },
        headers: {
          Authorization: `Bearer ${currentUser.data.accessToken}`,
        },
      });

      if (res.data?.success) {
        setTestimonialsData(res.data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to load testimonials");
    } finally {
      setLoadingTestimonials(false);
    }
  }, [approvedFilter, currentUser?.data?.accessToken, page, search, server]);

  useEffect(() => {
    getTestimonials();
  }, [getTestimonials]);

  const startEdit = (testimonial) => {
    setEditId(testimonial._id);
    setEditForm({
      name: testimonial.name || "",
      email: testimonial.email || "",
      role: testimonial.role || "",
      location: testimonial.location || "",
      feedback: testimonial.feedback || "",
      rating: Number(testimonial.rating) || 5,
      isApproved: !!testimonial.isApproved,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({
      name: "",
      email: "",
      role: "",
      location: "",
      feedback: "",
      rating: 5,
      isApproved: false,
    });
  };

  const handleApproveToggle = async (id, currentStatus) => {
    try {
      setUpdatingId(id);
      const res = await axios.patch(
        `${server}/testimonial/admin/approve/${id}`,
        { approved: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data?.accessToken}`,
          },
        }
      );

      if (res.data?.success) {
        toast.success(res.data.message || "Status updated");
        getTestimonials();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdate = async (id) => {
    try {
      setUpdatingId(id);
      const res = await axios.put(`${server}/testimonial/admin/update/${id}`, editForm, {
        headers: {
          Authorization: `Bearer ${currentUser?.data?.accessToken}`,
        },
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Testimonial updated");
        cancelEdit();
        getTestimonials();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update testimonial");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      const res = await axios.delete(`${server}/testimonial/admin/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.data?.accessToken}`,
        },
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Testimonial deleted");
        getTestimonials();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to delete testimonial");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Layout>
      <section className="space-y-6">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-cyan-900 to-emerald-900 p-6 text-white shadow-lg sm:p-8">
          <div className="pointer-events-none absolute -left-10 -top-14 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
              Dashboard Overview
            </p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Admin Home</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-100">
              Track organization metrics, monitor platform health, and prioritize the next admin
              actions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {item.title}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
                  </div>
                  <div
                    className={`rounded-xl p-2.5 text-white shadow-sm transition-transform duration-300 group-hover:scale-105 ${item.iconBg}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-500">
              Live summary from current metrics
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {recentActivities.map((activity) => (
                <li
                  key={activity.id}
                  className={`rounded-xl border bg-gradient-to-r p-3 ${activity.tone}`}
                >
                  <p className="text-sm font-semibold">{activity.title}</p>
                  <p className="mt-1 text-sm">{activity.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Notes</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              <li className="rounded-lg bg-slate-50 px-3 py-2">
                Update team profiles weekly with latest role changes.
              </li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">
                Review inbox and testimonials daily to maintain response time.
              </li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">
                Refresh hero banners and campaigns before major events.
              </li>
            </ul>
          </div>
        </div>

        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Hero Section Management</h2>
            <p className="text-sm text-slate-600">
              Add hero images and update text and links for homepage.
            </p>
          </div>

          {heroLoading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="h-44 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-44 animate-pulse rounded-xl bg-slate-100" />
            </div>
          ) : (
            <form onSubmit={handleHeroUpdate} className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <input
                  type="text"
                  name="title"
                  value={heroForm.title}
                  onChange={handleHeroInputChange}
                  className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Hero title"
                  required
                />
                <input
                  type="text"
                  name="highlightText"
                  value={heroForm.highlightText}
                  onChange={handleHeroInputChange}
                  className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Hero highlight text"
                  required
                />
              </div>

              <textarea
                name="description"
                value={heroForm.description}
                onChange={handleHeroInputChange}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Hero description"
                required
              ></textarea>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <input
                  type="text"
                  name="primaryButtonText"
                  value={heroForm.primaryButtonText}
                  onChange={handleHeroInputChange}
                  className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Primary button text"
                  required
                />
                <input
                  type="text"
                  name="primaryButtonLink"
                  value={heroForm.primaryButtonLink}
                  onChange={handleHeroInputChange}
                  className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Primary button link"
                  required
                />
                <input
                  type="text"
                  name="secondaryButtonText"
                  value={heroForm.secondaryButtonText}
                  onChange={handleHeroInputChange}
                  className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Secondary button text"
                  required
                />
                <input
                  type="text"
                  name="secondaryButtonLink"
                  value={heroForm.secondaryButtonLink}
                  onChange={handleHeroInputChange}
                  className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Secondary button link"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Hero Images (minimum 3, maximum 5)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleHeroImageChange}
                  className="block w-full rounded-lg border border-slate-300 p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-white"
                />
                <p className="text-xs text-slate-500">
                  Upload 3 to 5 images. If you upload new images, existing hero images will be
                  replaced.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {(heroImagePreview.length
                  ? heroImagePreview
                  : heroCurrentImages.map((img) => img?.url)
                )
                  .filter(Boolean)
                  .map((src, idx) => (
                    <div
                      key={`${src}-${idx}`}
                      className="overflow-hidden rounded-lg border border-slate-200"
                    >
                      <img
                        src={src}
                        alt={`Hero preview ${idx + 1}`}
                        className="h-28 w-full object-cover"
                      />
                    </div>
                  ))}
              </div>

              <button
                type="submit"
                disabled={heroSaving}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                  heroSaving ? "bg-slate-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {heroSaving ? "Updating..." : "Update Hero Section"}
              </button>
            </form>
          )}
        </section>

        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Mission Section Management</h2>
            <p className="text-sm text-slate-600">
              Update mission heading, description, and profile photo shown on homepage.
            </p>
          </div>

          {missionLoading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
            </div>
          ) : (
            <form onSubmit={handleMissionUpdate} className="space-y-4">
              <input
                type="text"
                name="heading"
                value={missionForm.heading}
                onChange={handleMissionInputChange}
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mission heading"
                required
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Mission Description</label>
                <div className="rounded-lg border border-slate-300 bg-white">
                  <ReactQuill
                    theme="snow"
                    value={missionForm.description}
                    onChange={(value) =>
                      setMissionForm((prev) => ({
                        ...prev,
                        description: value,
                      }))
                    }
                    modules={missionEditorModules}
                    formats={missionEditorFormats}
                    placeholder="Write mission description with formatting..."
                  />
                </div>
              </div>

              <input
                type="text"
                name="profilePhotoAlt"
                value={missionForm.profilePhotoAlt}
                onChange={handleMissionInputChange}
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Profile photo alt text"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Mission Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMissionPhotoChange}
                  className="block w-full rounded-lg border border-slate-300 p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-white"
                />
              </div>

              {(missionPhotoPreview || missionCurrentPhoto) && (
                <div className="w-fit overflow-hidden rounded-lg border border-slate-200">
                  <img
                    src={missionPhotoPreview || missionCurrentPhoto}
                    alt="Mission profile preview"
                    className="h-24 w-24 object-cover"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={missionSaving}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                  missionSaving ? "bg-slate-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {missionSaving ? "Updating..." : "Update Mission Section"}
              </button>
            </form>
          )}
        </section>

        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Vision Section Management</h2>
            <p className="text-sm text-slate-600">
              Update the Our Vision page heading, rich descriptions, quote, and author.
            </p>
          </div>

          {visionLoading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
            </div>
          ) : (
            <form onSubmit={handleVisionUpdate} className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <input
                  type="text"
                  name="heading"
                  value={visionForm.heading}
                  onChange={handleVisionInputChange}
                  className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Vision heading"
                  required
                />
                <input
                  type="text"
                  name="subHeading"
                  value={visionForm.subHeading}
                  onChange={handleVisionInputChange}
                  className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Vision sub heading"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Intro Description</label>
                <div className="rounded-lg border border-slate-300 bg-white">
                  <ReactQuill
                    theme="snow"
                    value={visionForm.introDescription}
                    onChange={(value) =>
                      setVisionForm((prev) => ({
                        ...prev,
                        introDescription: value,
                      }))
                    }
                    modules={missionEditorModules}
                    formats={missionEditorFormats}
                    placeholder="Write intro description with formatting..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Paragraph One</label>
                <div className="rounded-lg border border-slate-300 bg-white">
                  <ReactQuill
                    theme="snow"
                    value={visionForm.paragraphOne}
                    onChange={(value) =>
                      setVisionForm((prev) => ({
                        ...prev,
                        paragraphOne: value,
                      }))
                    }
                    modules={missionEditorModules}
                    formats={missionEditorFormats}
                    placeholder="Write first paragraph with formatting..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Paragraph Two</label>
                <div className="rounded-lg border border-slate-300 bg-white">
                  <ReactQuill
                    theme="snow"
                    value={visionForm.paragraphTwo}
                    onChange={(value) =>
                      setVisionForm((prev) => ({
                        ...prev,
                        paragraphTwo: value,
                      }))
                    }
                    modules={missionEditorModules}
                    formats={missionEditorFormats}
                    placeholder="Write second paragraph with formatting..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <input
                  type="text"
                  name="quote"
                  value={visionForm.quote}
                  onChange={handleVisionInputChange}
                  className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Quote"
                />
                <input
                  type="text"
                  name="quoteAuthor"
                  value={visionForm.quoteAuthor}
                  onChange={handleVisionInputChange}
                  className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Quote author"
                />
              </div>

              <button
                type="submit"
                disabled={visionSaving}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                  visionSaving ? "bg-slate-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {visionSaving ? "Updating..." : "Update Vision Section"}
              </button>
            </form>
          )}
        </section>

        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Our Values Management</h2>
            <p className="text-sm text-slate-600">
              Add, update, and delete value cards shown on the Our Values page.
            </p>
          </div>

          {/* Add new value form */}
          <form
            onSubmit={handleAddValue}
            className="space-y-3 rounded-lg border border-dashed border-slate-300 p-4"
          >
            <h3 className="text-sm font-semibold text-slate-700">Add New Value</h3>
            <input
              type="text"
              value={valueForm.title}
              onChange={(e) => setValueForm((prev) => ({ ...prev, title: e.target.value }))}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Title (e.g. Compassion)"
              required
            />
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Icon Source</label>
              <div className="flex overflow-hidden rounded-lg border border-slate-200 text-xs font-medium">
                {["heroicon", "upload", "url"].map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setValueForm((prev) => ({ ...prev, iconSource: src }))}
                    className={`flex-1 py-2 ${
                      valueForm.iconSource === src
                        ? "bg-blue-600 text-white"
                        : "bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {src === "heroicon" ? "Heroicon" : src === "upload" ? "Upload" : "URL"}
                  </button>
                ))}
              </div>
              {valueForm.iconSource === "heroicon" && (
                <select
                  value={valueForm.icon}
                  onChange={(e) => setValueForm((prev) => ({ ...prev, icon: e.target.value }))}
                  className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="HeartIcon">HeartIcon</option>
                  <option value="LightBulbIcon">LightBulbIcon</option>
                  <option value="UsersIcon">UsersIcon</option>
                </select>
              )}
              {valueForm.iconSource === "upload" && (
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setValueForm((prev) => ({
                        ...prev,
                        iconFile: file,
                        iconFilePreview: file ? URL.createObjectURL(file) : "",
                      }));
                    }}
                    className="block w-full rounded-lg border border-slate-300 p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-white"
                  />
                  {valueForm.iconFilePreview && (
                    <img
                      src={valueForm.iconFilePreview}
                      alt="Icon preview"
                      className="h-10 w-10 rounded object-contain border border-slate-200"
                    />
                  )}
                </div>
              )}
              {valueForm.iconSource === "url" && (
                <div className="space-y-2">
                  <input
                    type="url"
                    value={valueForm.iconUrl}
                    onChange={(e) => setValueForm((prev) => ({ ...prev, iconUrl: e.target.value }))}
                    className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/icon.png"
                  />
                  {valueForm.iconUrl && (
                    <img
                      src={valueForm.iconUrl}
                      alt="Icon preview"
                      className="h-10 w-10 rounded object-contain border border-slate-200"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Description</label>
              <div className="rounded-lg border border-slate-300 bg-white">
                <ReactQuill
                  theme="snow"
                  value={valueForm.description}
                  onChange={(value) =>
                    setValueForm((prev) => ({
                      ...prev,
                      description: value,
                    }))
                  }
                  modules={missionEditorModules}
                  formats={missionEditorFormats}
                  placeholder="Write value description with formatting..."
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={valueAdding}
              className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                valueAdding ? "bg-slate-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {valueAdding ? "Adding..." : "Add Value"}
            </button>
          </form>

          {/* Existing values list */}
          {valuesLoading ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-36 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : valuesData.length === 0 ? (
            <p className="text-sm text-slate-500">No values added yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {valuesData.map((item) =>
                valueEditId === item._id ? (
                  <div
                    key={item._id}
                    className="space-y-2 rounded-xl border border-blue-300 bg-blue-50 p-3"
                  >
                    <input
                      type="text"
                      value={valueEditForm.title}
                      onChange={(e) =>
                        setValueEditForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      className="h-9 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Title"
                    />
                    <div className="space-y-1.5">
                      <div className="flex overflow-hidden rounded-lg border border-slate-200 text-xs font-medium">
                        {["heroicon", "upload", "url"].map((src) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() =>
                              setValueEditForm((prev) => ({ ...prev, iconSource: src }))
                            }
                            className={`flex-1 py-1.5 ${
                              valueEditForm.iconSource === src
                                ? "bg-blue-600 text-white"
                                : "bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            {src === "heroicon" ? "Heroicon" : src === "upload" ? "Upload" : "URL"}
                          </button>
                        ))}
                      </div>
                      {valueEditForm.iconSource === "heroicon" && (
                        <select
                          value={valueEditForm.icon}
                          onChange={(e) =>
                            setValueEditForm((prev) => ({ ...prev, icon: e.target.value }))
                          }
                          className="h-9 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="HeartIcon">HeartIcon</option>
                          <option value="LightBulbIcon">LightBulbIcon</option>
                          <option value="UsersIcon">UsersIcon</option>
                        </select>
                      )}
                      {valueEditForm.iconSource === "upload" && (
                        <div className="space-y-1.5">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              setValueEditForm((prev) => ({
                                ...prev,
                                iconFile: file,
                                iconFilePreview: file
                                  ? URL.createObjectURL(file)
                                  : prev.iconFilePreview,
                              }));
                            }}
                            className="block w-full rounded-lg border border-slate-300 p-1.5 text-xs file:mr-2 file:rounded-md file:border-0 file:bg-slate-900 file:px-2 file:py-1 file:text-xs file:text-white"
                          />
                          {valueEditForm.iconFilePreview && (
                            <img
                              src={valueEditForm.iconFilePreview}
                              alt="Icon preview"
                              className="h-10 w-10 rounded object-contain border border-slate-200"
                            />
                          )}
                        </div>
                      )}
                      {valueEditForm.iconSource === "url" && (
                        <div className="space-y-1.5">
                          <input
                            type="url"
                            value={valueEditForm.iconUrl}
                            onChange={(e) =>
                              setValueEditForm((prev) => ({ ...prev, iconUrl: e.target.value }))
                            }
                            className="h-9 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://example.com/icon.png"
                          />
                          {valueEditForm.iconUrl && (
                            <img
                              src={valueEditForm.iconUrl}
                              alt="Icon preview"
                              className="h-10 w-10 rounded object-contain border border-slate-200"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="rounded-lg border border-slate-300 bg-white">
                      <ReactQuill
                        theme="snow"
                        value={valueEditForm.description}
                        onChange={(value) =>
                          setValueEditForm((prev) => ({
                            ...prev,
                            description: value,
                          }))
                        }
                        modules={missionEditorModules}
                        formats={missionEditorFormats}
                        placeholder="Write value description with formatting..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateValue(item._id)}
                        disabled={valueUpdatingId === item._id}
                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:bg-slate-400"
                      >
                        {valueUpdatingId === item._id ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={cancelValueEdit}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <article
                    key={item._id}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 p-4"
                  >
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-2">
                        {item.iconImage?.url ? (
                          <img
                            src={item.iconImage.url}
                            alt=""
                            className="h-8 w-8 rounded object-contain border border-slate-100"
                          />
                        ) : (
                          <span className="text-xs font-medium text-slate-500">{item.icon}</span>
                        )}
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            item.isActive
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="mt-1 text-sm text-slate-500 line-clamp-3">{item.description}</p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => startValueEdit(item)}
                        className="rounded-lg border border-blue-600 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteValue(item._id)}
                        disabled={valueDeletingId === item._id}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        {valueDeletingId === item._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
        </section>

        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Our Initiatives Management</h2>
            <p className="text-sm text-slate-600">
              Add, update, and delete initiatives shown on the home page.
            </p>
          </div>

          <form
            onSubmit={handleAddInitiative}
            className="space-y-3 rounded-lg border border-dashed border-slate-300 p-4"
          >
            <h3 className="text-sm font-semibold text-slate-700">Add New Initiative</h3>
            <input
              type="text"
              value={initiativeForm.title}
              onChange={(e) => setInitiativeForm((prev) => ({ ...prev, title: e.target.value }))}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Title"
              required
            />
            <input
              type="text"
              value={initiativeForm.stats}
              onChange={(e) => setInitiativeForm((prev) => ({ ...prev, stats: e.target.value }))}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Stats (e.g. 500+ Students Supported)"
            />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600">Icon Source</label>
                <div className="flex overflow-hidden rounded-lg border border-slate-200 text-xs font-medium">
                  {["heroicon", "upload", "url"].map((src) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setInitiativeForm((prev) => ({ ...prev, iconSource: src }))}
                      className={`flex-1 py-2 ${
                        initiativeForm.iconSource === src
                          ? "bg-blue-600 text-white"
                          : "bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {src === "heroicon" ? "Heroicon" : src === "upload" ? "Upload" : "URL"}
                    </button>
                  ))}
                </div>
                {initiativeForm.iconSource === "heroicon" && (
                  <select
                    value={initiativeForm.icon}
                    onChange={(e) =>
                      setInitiativeForm((prev) => ({ ...prev, icon: e.target.value }))
                    }
                    className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="AcademicCapIcon">AcademicCapIcon</option>
                    <option value="SpeakerWaveIcon">SpeakerWaveIcon</option>
                    <option value="HeartIcon">HeartIcon</option>
                    <option value="UserGroupIcon">UserGroupIcon</option>
                  </select>
                )}
                {initiativeForm.iconSource === "upload" && (
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setInitiativeForm((prev) => ({
                          ...prev,
                          iconFile: file,
                          iconFilePreview: file ? URL.createObjectURL(file) : "",
                        }));
                      }}
                      className="block w-full rounded-lg border border-slate-300 p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-white"
                    />
                    {initiativeForm.iconFilePreview ? (
                      <img
                        src={initiativeForm.iconFilePreview}
                        alt="Initiative icon preview"
                        className="h-10 w-10 rounded object-cover border border-slate-200"
                      />
                    ) : null}
                  </div>
                )}
                {initiativeForm.iconSource === "url" && (
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={initiativeForm.iconUrl}
                      onChange={(e) =>
                        setInitiativeForm((prev) => ({ ...prev, iconUrl: e.target.value }))
                      }
                      className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/icon.png"
                    />
                    {initiativeForm.iconUrl ? (
                      <img
                        src={initiativeForm.iconUrl}
                        alt="Initiative icon preview"
                        className="h-10 w-10 rounded object-cover border border-slate-200"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : null}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600">Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={normalizePickerColor(initiativeForm.color)}
                    onChange={(e) =>
                      setInitiativeForm((prev) => ({ ...prev, color: e.target.value }))
                    }
                    className="h-10 w-14 rounded-lg border border-slate-300 p-1"
                  />
                  <input
                    type="text"
                    value={initiativeForm.color}
                    onChange={(e) =>
                      setInitiativeForm((prev) => ({ ...prev, color: e.target.value }))
                    }
                    className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="#2563eb"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setInitiativeForm((prev) => ({
                    ...prev,
                    coverImage: file,
                    coverImagePreview: file ? URL.createObjectURL(file) : "",
                  }));
                }}
                className="block w-full rounded-lg border border-slate-300 p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-white"
                required
              />
              {initiativeForm.coverImagePreview && (
                <img
                  src={initiativeForm.coverImagePreview}
                  alt="Initiative cover preview"
                  className="h-24 w-40 rounded object-cover border border-slate-200"
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Description</label>
              <div className="rounded-lg border border-slate-300 bg-white">
                <ReactQuill
                  theme="snow"
                  value={initiativeForm.description}
                  onChange={(value) =>
                    setInitiativeForm((prev) => ({
                      ...prev,
                      description: value,
                    }))
                  }
                  modules={missionEditorModules}
                  formats={missionEditorFormats}
                  placeholder="Write initiative description with formatting..."
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={initiativeAdding}
              className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                initiativeAdding ? "bg-slate-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {initiativeAdding ? "Adding..." : "Add Initiative"}
            </button>
          </form>

          {initiativesLoading ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-36 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : initiativesData.length === 0 ? (
            <p className="text-sm text-slate-500">No initiatives added yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {initiativesData.map((item) =>
                initiativeEditId === item._id ? (
                  <div
                    key={item._id}
                    className="space-y-2 rounded-xl border border-blue-300 bg-blue-50 p-3"
                  >
                    <input
                      type="text"
                      value={initiativeEditForm.title}
                      onChange={(e) =>
                        setInitiativeEditForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      className="h-9 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={initiativeEditForm.stats}
                      onChange={(e) =>
                        setInitiativeEditForm((prev) => ({ ...prev, stats: e.target.value }))
                      }
                      className="h-9 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Stats"
                    />
                    <div className="space-y-1.5">
                      <div className="flex overflow-hidden rounded-lg border border-slate-200 text-xs font-medium">
                        {["heroicon", "upload", "url"].map((src) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() =>
                              setInitiativeEditForm((prev) => ({ ...prev, iconSource: src }))
                            }
                            className={`flex-1 py-1.5 ${
                              initiativeEditForm.iconSource === src
                                ? "bg-blue-600 text-white"
                                : "bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            {src === "heroicon" ? "Heroicon" : src === "upload" ? "Upload" : "URL"}
                          </button>
                        ))}
                      </div>
                      {initiativeEditForm.iconSource === "heroicon" && (
                        <select
                          value={initiativeEditForm.icon}
                          onChange={(e) =>
                            setInitiativeEditForm((prev) => ({ ...prev, icon: e.target.value }))
                          }
                          className="h-9 w-full rounded-lg border border-slate-300 px-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="AcademicCapIcon">AcademicCapIcon</option>
                          <option value="SpeakerWaveIcon">SpeakerWaveIcon</option>
                          <option value="HeartIcon">HeartIcon</option>
                          <option value="UserGroupIcon">UserGroupIcon</option>
                        </select>
                      )}
                      {initiativeEditForm.iconSource === "upload" && (
                        <div className="space-y-1.5">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              setInitiativeEditForm((prev) => ({
                                ...prev,
                                iconFile: file,
                                iconFilePreview: file
                                  ? URL.createObjectURL(file)
                                  : prev.iconFilePreview,
                              }));
                            }}
                            className="block w-full rounded-lg border border-slate-300 p-1.5 text-xs file:mr-2 file:rounded-md file:border-0 file:bg-slate-900 file:px-2 file:py-1 file:text-xs file:text-white"
                          />
                          {initiativeEditForm.iconFilePreview ? (
                            <img
                              src={initiativeEditForm.iconFilePreview}
                              alt="Initiative icon preview"
                              className="h-10 w-10 rounded object-cover border border-slate-200"
                            />
                          ) : null}
                        </div>
                      )}
                      {initiativeEditForm.iconSource === "url" && (
                        <div className="space-y-1.5">
                          <input
                            type="url"
                            value={initiativeEditForm.iconUrl}
                            onChange={(e) =>
                              setInitiativeEditForm((prev) => ({
                                ...prev,
                                iconUrl: e.target.value,
                              }))
                            }
                            className="h-9 w-full rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://example.com/icon.png"
                          />
                          {initiativeEditForm.iconUrl ? (
                            <img
                              src={initiativeEditForm.iconUrl}
                              alt="Initiative icon preview"
                              className="h-10 w-10 rounded object-cover border border-slate-200"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : null}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={normalizePickerColor(initiativeEditForm.color)}
                        onChange={(e) =>
                          setInitiativeEditForm((prev) => ({ ...prev, color: e.target.value }))
                        }
                        className="h-9 w-12 rounded-lg border border-slate-300 p-1"
                      />
                      <input
                        type="text"
                        value={initiativeEditForm.color}
                        onChange={(e) =>
                          setInitiativeEditForm((prev) => ({ ...prev, color: e.target.value }))
                        }
                        className="h-9 w-full rounded-lg border border-slate-300 px-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="#2563eb"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setInitiativeEditForm((prev) => ({
                            ...prev,
                            coverImage: file,
                            coverImagePreview: file
                              ? URL.createObjectURL(file)
                              : prev.coverImagePreview,
                          }));
                        }}
                        className="block w-full rounded-lg border border-slate-300 p-1.5 text-xs file:mr-2 file:rounded-md file:border-0 file:bg-slate-900 file:px-2 file:py-1 file:text-xs file:text-white"
                      />
                      {initiativeEditForm.coverImagePreview && (
                        <img
                          src={initiativeEditForm.coverImagePreview}
                          alt="Initiative cover preview"
                          className="h-20 w-28 rounded object-cover border border-slate-200"
                        />
                      )}
                    </div>
                    <div className="rounded-lg border border-slate-300 bg-white">
                      <ReactQuill
                        theme="snow"
                        value={initiativeEditForm.description}
                        onChange={(value) =>
                          setInitiativeEditForm((prev) => ({
                            ...prev,
                            description: value,
                          }))
                        }
                        modules={missionEditorModules}
                        formats={missionEditorFormats}
                        placeholder="Write initiative description with formatting..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateInitiative(item._id)}
                        disabled={initiativeUpdatingId === item._id}
                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:bg-slate-400"
                      >
                        {initiativeUpdatingId === item._id ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={cancelInitiativeEdit}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <article
                    key={item._id}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 p-4"
                  >
                    <div>
                      {item.coverImage?.url ? (
                        <img
                          src={item.coverImage.url}
                          alt={item.title}
                          className="mb-2 h-20 w-full rounded-lg object-cover"
                        />
                      ) : null}
                      <div className="mb-2 flex items-center justify-between gap-2">
                        {item.iconImage?.url ? (
                          <img
                            src={item.iconImage.url}
                            alt=""
                            className="h-8 w-8 rounded object-cover border border-slate-100"
                          />
                        ) : (
                          <span className="text-xs font-medium text-slate-500">{item.icon}</span>
                        )}
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            item.isActive
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      {item.stats ? (
                        <p className="mt-1 text-xs font-medium text-blue-600">{item.stats}</p>
                      ) : null}
                      <p className="mt-1 text-sm text-slate-500 line-clamp-3">{item.description}</p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => startInitiativeEdit(item)}
                        className="rounded-lg border border-blue-600 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteInitiative(item._id)}
                        disabled={initiativeDeletingId === item._id}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        {initiativeDeletingId === item._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
        </section>

        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Testimonials</h2>
              <p className="text-sm text-slate-600">
                Approve, edit, and delete client feedback from one place.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative text-gray-500 focus-within:text-gray-900">
                <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
                  <BiSearch />
                </div>
                <input
                  type="text"
                  className="block w-full sm:w-56 h-10 pr-4 pl-10 py-2 text-sm border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search feedback"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>

              <select
                value={approvedFilter}
                onChange={(e) => {
                  setApprovedFilter(e.target.value);
                  setPage(1);
                }}
                className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="true">Approved</option>
                <option value="false">Pending</option>
              </select>
            </div>
          </div>

          {loadingTestimonials ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-52 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : testimonialsData?.testimonials?.length ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {testimonialsData.testimonials.map((item) => (
                <article key={item._id} className="rounded-xl border border-slate-200 p-4">
                  {editId === item._id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Name"
                        />
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Email"
                        />
                        <input
                          type="text"
                          value={editForm.role}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, role: e.target.value }))
                          }
                          className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Role"
                        />
                        <input
                          type="text"
                          value={editForm.location}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, location: e.target.value }))
                          }
                          className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Location"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <select
                          value={editForm.rating}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, rating: Number(e.target.value) }))
                          }
                          className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={5}>5</option>
                          <option value={4}>4</option>
                          <option value={3}>3</option>
                          <option value={2}>2</option>
                          <option value={1}>1</option>
                        </select>
                        <select
                          value={String(editForm.isApproved)}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              isApproved: e.target.value === "true",
                            }))
                          }
                          className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="true">Approved</option>
                          <option value="false">Pending</option>
                        </select>
                      </div>

                      <textarea
                        value={editForm.feedback}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, feedback: e.target.value }))
                        }
                        rows={4}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Feedback"
                      ></textarea>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleUpdate(item._id)}
                          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                          {updatingId === item._id ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-slate-900">{item.name}</h3>
                          <p className="text-xs text-slate-500">{item.email}</p>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            item.isApproved
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {item.isApproved ? "Approved" : "Pending"}
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 line-clamp-4">{item.feedback}</p>

                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <p>
                          {item.role || "Client"} | {item.location || "India"}
                        </p>
                        <p>Rating: {item.rating || 5}/5</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          onClick={() => handleApproveToggle(item._id, item.isApproved)}
                          className={`rounded-lg px-3 py-2 text-xs font-semibold text-white ${
                            item.isApproved
                              ? "bg-amber-500 hover:bg-amber-600"
                              : "bg-emerald-600 hover:bg-emerald-700"
                          }`}
                        >
                          {updatingId === item._id
                            ? "Updating..."
                            : item.isApproved
                              ? "Move to Pending"
                              : "Approve"}
                        </button>

                        <button
                          onClick={() => startEdit(item)}
                          className="rounded-lg border border-blue-600 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-300 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          {deletingId === item._id ? (
                            <LodingButton content="Deleting..." btnClass="text-red-600 text-xs" />
                          ) : (
                            <>
                              <RiDeleteBin6Line className="h-3.5 w-3.5" />
                              Delete
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
              No testimonials found for current filters.
            </div>
          )}

          {testimonialsData.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: testimonialsData.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${
                    p === page
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((prev) => Math.min(testimonialsData.totalPages, prev + 1))}
                disabled={page === testimonialsData.totalPages}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </section>
    </Layout>
  );
};

export default Dashboard;
