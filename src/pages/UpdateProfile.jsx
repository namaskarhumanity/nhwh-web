import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStart, updateSuccess, updateFailure } from "../redux/slices/userSlice";
import LodingButton from "../components/LoadingButton";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const server = import.meta.env.VITE_SERVER;
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);
  const user = currentUser?.data?.user;
  const defaultAvatar =
    "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg";

  const [name, setName] = useState(currentUser && currentUser?.data?.user?.name);
  const [email, setEmail] = useState(currentUser && currentUser?.data?.user?.email);
  const [phone, setPhone] = useState(currentUser && currentUser?.data?.user?.phone);
  const [gender, setGender] = useState(currentUser && currentUser?.data?.user?.gender);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "");

  //Image size
  const maxSize = 2 * 1024 * 1024;
  const minSize = 100 * 1024;

  const avatarHandler = (e) => {
    let file = e.target.files[0];
    if (!file) return;

    if (file.size > maxSize || file.size < minSize) {
      toast.error("File size should be 100KB to 2MB!.");
      file = "";
    }

    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (avatar) {
      formData.append("avatar", avatar);
    }
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("gender", gender);
    try {
      dispatch(updateStart());
      const res = await axios.put(`${server}/user/update-acc-details`, formData, {
        headers: {
          Authorization: `${currentUser?.data?.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(updateSuccess(res.data));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(updateFailure(error.response.data.message));
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white">
      <form onSubmit={handleSubmit}>
        <div className="border-b border-slate-200 px-5 py-6 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Account Center
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">Update Profile</h2>
          <p className="mt-2 text-sm text-slate-600">
            Keep your personal details up to date so your account stays accurate and secure.
          </p>
        </div>

        <div className="grid gap-8 px-5 py-6 sm:px-8 md:grid-cols-[250px_1fr]">
          <div className="relative overflow-hidden space-y-4 rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-cyan-50 p-6 text-center shadow-[0_24px_60px_-32px_rgba(16,185,129,0.28)]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-8 right-2 h-24 w-24 rounded-full bg-emerald-200/55 blur-2xl" />
              <div className="absolute -bottom-10 left-0 h-28 w-28 rounded-full bg-cyan-200/45 blur-2xl" />
            </div>
            <img
              className="relative mx-auto h-28 w-28 rounded-full border-4 border-white object-cover shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)]"
              src={avatarPreview || defaultAvatar}
              alt="Profile preview"
            />
            <div className="relative">
              <p className="text-sm font-semibold text-slate-900">Profile photo</p>
              <p className="mt-1 text-xs text-slate-600">JPG/PNG, 100KB to 2MB</p>
            </div>
            <label
              htmlFor="avatar"
              className="relative inline-flex cursor-pointer items-center justify-center rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-md"
            >
              Upload New Photo
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={avatarHandler}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="block h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone === "undefined" ? "" : phone || ""}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                className="block h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              />
            </div>

            <div>
              <label htmlFor="gender" className="mb-1 block text-sm font-medium text-slate-700">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={gender === "undefined" ? "" : gender || ""}
                onChange={(e) => setGender(e.target.value)}
                className="block h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="adminStatus"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Admin Access
              </label>
              <input
                type="text"
                name="adminStatus"
                id="adminStatus"
                value={user?.is_admin ? "Yes" : "No"}
                className="block h-11 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 text-sm text-slate-700 outline-none"
                readOnly
              />
            </div>

            <div>
              <label
                htmlFor="verifiedStatus"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Verified Account
              </label>
              <input
                type="text"
                name="verifiedStatus"
                id="verifiedStatus"
                value={user?.is_verified ? "Yes" : "No"}
                className="block h-11 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 text-sm text-slate-700 outline-none"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
          {loading ? (
            <LodingButton
              content={"Saving..."}
              btnClass={
                "inline-flex h-11 w-full items-center justify-center rounded-lg bg-slate-900 px-5 text-sm font-medium text-white shadow-sm sm:w-auto"
              }
            />
          ) : (
            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-slate-900 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 sm:w-auto"
            >
              Save Changes
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
