import Layout from "./layout/Layout";
import { BiSearch } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Avatar, Button, Datepicker, Modal } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LodingButton from "../../components/LoadingButton";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";

const AllVolunteer = () => {
  const server = import.meta.env.VITE_SERVER;
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [volunteerData, setVolunteerData] = useState();
  const [search, setSearch] = useState("");
  const [volunteerId, setVolunteerId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [page, setPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreiw, setAvatarPreiew] = useState(null);
  const [qualification, setQualification] = useState("");
  const [name, setName] = useState("");
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [skills, setSkills] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  //formate date
  let formatedDob = "";
  if (dob) {
    const date = new Date(dob);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    formatedDob = `${day}-${month}-${year}`;
  }

  //Image size
  const maxSize = 2 * 1024 * 1024;
  const minSize = 100 * 1024;

  const onPageChange = (page) => {
    setPage(page);
  };

  const formatRegistrationDate = (rawDate) => {
    if (!rawDate) {
      return "-";
    }

    const parsedDate = new Date(rawDate);
    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const getAllVolunteer = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${server}/admin/get-volunteers`, {
        headers: { Authorization: `Bearer ${currentUser?.data?.accessToken}` },
        params: { search, page },
      });
      setVolunteerData(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load volunteers");
    } finally {
      setLoading(false);
    }
  }, [server, search, page, currentUser?.data?.accessToken]);

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setVolunteerId(id);
    try {
      const res = await axios.delete(`${server}/admin/delete-volunteer/${id}`, {
        headers: { Authorization: `Bearer ${currentUser?.data?.accessToken}` },
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete volunteer");
    } finally {
      setDeleteLoading(false);
      setVolunteerId(null);
    }
  };

  const handelAvatar = (e) => {
    let file = e.target.files[0];
    if (file.size > maxSize || file.size < minSize) {
      toast.error("File size should be 100KB to 2MB!.");
      file = "";
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

  const handleDateChange = (date) => {
    setDob(date);
  };

  const setOpen = (id) => {
    setOpenModal(true);
    setUpdateId(id);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    formData.append("dob", formatedDob);
    formData.append("skills", skills);
    formData.append("address", address);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("pincode", pincode);
    setUpdateLoading(true);
    try {
      const res = await axios.put(
        `${server}/admin/update-volunteer-details/${updateId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    getAllVolunteer();
  }, [getAllVolunteer]);

  const volunteers = volunteerData?.data?.volunteer || [];
  const totalPages = volunteerData?.data?.totalPages || 1;
  const femaleCount = volunteers.filter((v) => (v?.gender || "").toLowerCase() === "female").length;
  const maleCount = volunteers.filter((v) => (v?.gender || "").toLowerCase() === "male").length;

  return (
    <Layout>
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-emerald-900 to-cyan-900 p-6 text-white shadow-lg sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">Admin Outreach</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Volunteers</h1>
          <p className="mt-1 text-sm text-slate-200 sm:text-base">
            Review volunteer registrations and keep records updated.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Volunteers This Page
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{volunteers.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Female Volunteers
            </p>
            <p className="mt-2 text-2xl font-bold text-rose-700">{femaleCount}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Male Volunteers
            </p>
            <p className="mt-2 text-2xl font-bold text-sky-700">{maleCount}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Volunteer Records</h2>
            <p className="mt-0.5 text-sm text-slate-600">
              Search by name, email, city, state, or skill.
            </p>
          </div>
          <div className="relative text-gray-500 focus-within:text-gray-900">
            <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
              <BiSearch />
            </div>
            <input
              type="text"
              id="default-search"
              className="block h-11 w-full rounded-xl border border-slate-300 py-2.5 pl-12 pr-5 text-base placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-72"
              placeholder="Search volunteer"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    Sr.
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    Avatar
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    DOB
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    F Name
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    M Name
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    Qualification
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    Skills
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    Gender
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    State
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    Pincode
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    Registration Date
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan={17} className="p-10 text-center text-slate-500">
                      Loading volunteers...
                    </td>
                  </tr>
                ) : volunteers.length ? (
                  volunteers.map((v, idx) => (
                    <tr key={v?._id} className="transition-all duration-300 hover:bg-slate-50/80">
                      <td className="p-4 text-sm font-medium text-slate-700 sm:p-5">
                        {(page - 1) * 6 + idx + 1}
                      </td>
                      <td className="p-4 text-sm leading-6 font-medium text-gray-900 sm:p-5">
                        <Avatar img={v?.avatar?.url} alt="avatar" rounded />
                      </td>
                      <td className="p-4 text-sm font-semibold text-slate-900 sm:p-5">
                        {v?.name || "-"}
                      </td>
                      <td className="p-4 text-sm text-slate-700 sm:p-5">{v?.dob || "-"}</td>
                      <td className="p-4 text-sm text-slate-700 sm:p-5">{v?.fname || "-"}</td>
                      <td className="p-4 text-sm text-slate-700 sm:p-5">{v?.mname || "-"}</td>
                      <td className="p-4 text-sm text-slate-700 sm:p-5">{v?.email || "-"}</td>
                      <td className="p-4 text-sm text-slate-700 sm:p-5">{v?.phone || "-"}</td>
                      <td className="p-4 text-sm text-slate-700 sm:p-5">
                        {v?.qualification || "-"}
                      </td>
                      <td className="max-w-[220px] truncate p-4 text-sm text-slate-700 sm:p-5">
                        {v?.skills || "-"}
                      </td>
                      <td className="p-4 sm:p-5">
                        <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                          {v?.gender || "-"}
                        </span>
                      </td>
                      <td className="max-w-[220px] truncate p-4 text-sm text-slate-700 sm:p-5">
                        {v?.address || "-"}
                      </td>
                      <td className="p-4 text-sm text-slate-700 sm:p-5">{v?.state || "-"}</td>
                      <td className="p-4 text-sm text-slate-700 sm:p-5">{v?.city || "-"}</td>
                      <td className="p-4 text-sm text-slate-700 sm:p-5">{v?.pincode || "-"}</td>
                      <td className="p-4 sm:p-5">
                        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          {formatRegistrationDate(v?.createdAt)}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5">
                        <div className="flex items-center gap-1">
                          <div className="p-2 rounded-full group transition-all duration-500 flex items-center">
                            {/* modal start */}
                            <Button onClick={() => setOpen(v?._id)} color={""}>
                              <FiEdit color="blue" />
                            </Button>
                            <Modal show={openModal} size="5xl" onClose={onCloseModal} popup>
                              <Modal.Header />
                              <Modal.Body>
                                <form
                                  className="w-[90%] ml-6 sm:ml-8 md:ml-10 xl:ml-16 my-10"
                                  onSubmit={handleSubmit}
                                >
                                  <div className="space-y-12">
                                    <div className="">
                                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        Upade Volunter
                                      </h2>
                                      <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Fill and submit to update volunteer details.
                                      </p>
                                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="col-span-full">
                                          <label
                                            htmlFor="cover-photo"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Profile photo
                                          </label>
                                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                              {avatarPreiw ? (
                                                <img
                                                  className="mx-auto h-12 w-12 text-gray-300"
                                                  src={
                                                    avatarPreiw
                                                      ? `${avatarPreiw}`
                                                      : "/docHolder.jpg"
                                                  }
                                                  alt="svg"
                                                />
                                              ) : (
                                                <FaImage
                                                  aria-hidden="true"
                                                  className="mx-auto h-12 w-12 text-gray-300"
                                                />
                                              )}
                                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                  htmlFor="avatar"
                                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                  <span>Upload Photo</span>
                                                  <input
                                                    id="avatar"
                                                    name="avatar"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={handelAvatar}
                                                  />
                                                </label>
                                                <p className="pl-1"> Passport Size</p>
                                              </div>
                                              <p className="text-xs leading-5 text-gray-600">
                                                PNG, JPG, JPEG OR WEBP, 100KB to 2MB
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="border-b border-gray-900/10 pb-12">
                                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                          <label
                                            htmlFor="name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Full name
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="name"
                                              name="name"
                                              type="text"
                                              onChange={(e) => setName(e.target.value)}
                                              autoComplete="given-name"
                                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                            />
                                          </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                          <label
                                            htmlFor="qualification"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Qualification
                                          </label>
                                          <div className="mt-2">
                                            <select
                                              id="qualification"
                                              name="qualification"
                                              onChange={(e) => setQualification(e.target.value)}
                                              autoComplete="qualification"
                                              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                            >
                                              <option value={""}>---Select Here---</option>
                                              <option value={"High School"}>High School</option>
                                              <option value={"Inter Mediate"}>Inter Mediate</option>
                                              <option value={"Graduate"}>Graduate</option>
                                              <option value={"Post Graduate"}>Post Graduate</option>
                                              <option value={"PhD"}>PhD</option>
                                            </select>
                                          </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                          <label
                                            htmlFor="fname"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Father name
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="fname"
                                              name="fname"
                                              onChange={(e) => setFname(e.target.value)}
                                              type="text"
                                              autoComplete="family-name"
                                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                            />
                                          </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                          <label
                                            htmlFor="mname"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Mother name
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="mname"
                                              name="mname"
                                              onChange={(e) => setMname(e.target.value)}
                                              type="text"
                                              autoComplete="family-name"
                                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                            />
                                          </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                          <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Email address
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="email"
                                              name="email"
                                              onChange={(e) => setEmail(e.target.value)}
                                              type="email"
                                              autoComplete="email"
                                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                            />
                                          </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                          <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Mobile number
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="phone"
                                              name="phone"
                                              onChange={(e) => setPhone(e.target.value)}
                                              type="text"
                                              autoComplete="phone"
                                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                            />
                                          </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                          <label
                                            htmlFor="gender"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Gender
                                          </label>
                                          <div className="mt-2">
                                            <select
                                              id="gender"
                                              name="gender"
                                              onChange={(e) => setGender(e.target.value)}
                                              autoComplete="gender"
                                              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                            >
                                              <option value={""}>---Select Here---</option>
                                              <option value={"Male"}>Male</option>
                                              <option value={"Female"}>Female</option>
                                              <option value={"Other"}>Other</option>
                                            </select>
                                          </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                          <label
                                            htmlFor="dob"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            DOB
                                          </label>
                                          <div className="mt-2">
                                            <Datepicker onSelectedDateChanged={handleDateChange} />
                                          </div>
                                        </div>
                                        <div className="col-span-full">
                                          <label
                                            htmlFor="skills"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Skills
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="skills"
                                              name="skills"
                                              onChange={(e) => setSkills(e.target.value)}
                                              type="text"
                                              autoComplete="skills"
                                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-span-full">
                                          <label
                                            htmlFor="address"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            Street address
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="address"
                                              name="address"
                                              onChange={(e) => setAddress(e.target.value)}
                                              type="text"
                                              autoComplete="address"
                                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                            />
                                          </div>
                                        </div>
                                        <div className="sm:col-span-2 sm:col-start-1">
                                          <label
                                            htmlFor="city"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            City
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="city"
                                              name="city"
                                              onChange={(e) => setCity(e.target.value)}
                                              type="text"
                                              autoComplete="address-level2"
                                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                            />
                                          </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                          <label
                                            htmlFor="state"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            State / Province
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="state"
                                              name="state"
                                              onChange={(e) => setState(e.target.value)}
                                              type="text"
                                              autoComplete="address-level1"
                                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                            />
                                          </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                          <label
                                            htmlFor="pincode"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                            ZIP / Postal code
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              id="pincode"
                                              name="pincode"
                                              onChange={(e) => setPincode(e.target.value)}
                                              type="text"
                                              autoComplete="postal-code"
                                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-6 flex items-center justify-end gap-x-6 mx-5">
                                    {updateLoading ? (
                                      <LodingButton
                                        content={"Loading..."}
                                        btnClass={
                                          "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        }
                                      />
                                    ) : (
                                      <button
                                        type="submit"
                                        className="rounded-md bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                                      >
                                        Submit
                                      </button>
                                    )}
                                  </div>
                                </form>
                              </Modal.Body>
                            </Modal>
                            {/* modal end */}
                          </div>
                          <div className="p-2 rounded-full group transition-all duration-500 flex items-center">
                            {deleteLoading && volunteerId === v?._id ? (
                              <LodingButton content={""} btnClass={""} />
                            ) : (
                              <RiDeleteBin6Line color="red" onClick={() => handleDelete(v?._id)} />
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={17} className="p-10 text-center text-slate-500">
                      No volunteers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-5">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
          >
            Previous
          </button>

          <span className="text-sm font-medium text-slate-600">
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
          >
            Next
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default AllVolunteer;
