import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassStart, changePassSuccess, changePassFailure } from "../redux/slices/userSlice";
import LodingButton from "../components/LoadingButton";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const server = import.meta.env.VITE_SERVER;
  const [formData, setFormData] = useState({});
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(changePassStart());
      const res = await axios.put(`${server}/user/change-password`, formData, {
        headers: {
          Authorization: `${currentUser.data.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(changePassSuccess(res.data));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(changePassFailure(error.response.data.message));
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white">
      <form onSubmit={handleSubmit}>
        <div className="border-b border-slate-200 px-5 py-6 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Security</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
            Change Password
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Use a strong password with letters, numbers, and symbols to keep your account secure.
          </p>
        </div>

        <div className="space-y-5 px-5 py-6 sm:px-8">
          <div className="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-3 text-xs text-cyan-900 sm:text-sm">
            Password tip: Choose at least 8 characters with a mix of uppercase, lowercase, numbers,
            and symbols.
          </div>

          <div>
            <label htmlFor="oldPassword" className="mb-1 block text-sm font-medium text-slate-700">
              Current Password
            </label>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              className="block h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="Enter current password"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="mb-1 block text-sm font-medium text-slate-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="block h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="Enter new password"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="block h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="Re-enter new password"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
          {loading ? (
            <LodingButton
              content={"Updating..."}
              btnClass={
                "inline-flex h-11 w-full items-center justify-center rounded-lg bg-slate-900 px-5 text-sm font-medium text-white shadow-sm sm:w-auto"
              }
            />
          ) : (
            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-slate-900 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 sm:w-auto"
            >
              Update Password
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
