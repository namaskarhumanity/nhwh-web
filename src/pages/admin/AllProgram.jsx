import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import LodingButton from "../../components/LoadingButton";
import { toast } from "react-toastify";

const AllProgram = () => {
  const server = import.meta.env.VITE_SERVER;
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [programData, setProgramData] = useState();
  const [programId, setProgramId] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");

  const getAllProgram = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${server}/program/get`);
      setProgramData(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load programs");
    } finally {
      setLoading(false);
    }
  }, [server]);

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setProgramId(id);
    try {
      const res = await axios.delete(`${server}/program/delete/${id}`, {
        headers: {
          Authorization: `${currentUser.data.accessToken}`,
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        await getAllProgram();
      }
      setDeleteLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete program");
      setDeleteLoading(false);
    }
  };

  const handleSelectForUpdate = (program) => {
    setUpdateId(program?._id || null);
    setTitle(program?.title || "");
    setDescription(program?.description || "");
    setCoverImage(null);
    setCoverImagePreview(program?.coverImage?.url || "");
  };

  const handleCoverImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setCoverImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setCoverImagePreview(String(reader.result || ""));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProgram = async (event) => {
    event.preventDefault();
    if (!updateId) {
      return;
    }

    try {
      setUpdateLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const res = await axios.put(`${server}/program/update/${updateId}`, formData, {
        headers: {
          Authorization: `${currentUser.data.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message || "Program updated");
        await getAllProgram();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update program");
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    getAllProgram();
  }, [getAllProgram]);

  const programs = programData?.data || [];
  const totalPrograms = programs.length;

  return (
    <section className="space-y-6">
      {/* Gradient Header */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-sky-900 via-cyan-900 to-teal-900 p-6 text-white shadow-lg sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-sky-100">Program Management</p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">All Programs</h1>
        <p className="mt-2 max-w-2xl text-sm text-sky-50">
          Manage and monitor all active initiatives and programs.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-sky-600">
            Total Programs
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{totalPrograms}</p>
          <p className="mt-1 text-xs text-slate-500">Active initiatives</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-cyan-600">Status</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {totalPrograms > 0 ? "Active" : "Idle"}
          </p>
          <p className="mt-1 text-xs text-slate-500">Dashboard status</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-teal-600">
            Last Updated
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">Just now</p>
          <p className="mt-1 text-xs text-slate-500">Real-time data</p>
        </div>
      </div>

      {updateId ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Update Program</h2>
          <p className="mt-1 text-sm text-slate-600">Edit the selected program details.</p>

          <form onSubmit={handleUpdateProgram} className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImage}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="flex items-end">
              {coverImagePreview ? (
                <img
                  src={coverImagePreview}
                  alt="Program preview"
                  className="h-20 w-28 rounded-lg border border-slate-200 object-cover"
                />
              ) : (
                <div className="text-xs text-slate-500">No image selected</div>
              )}
            </div>

            <div className="md:col-span-2 flex gap-3">
              {updateLoading ? (
                <LodingButton
                  content="Updating..."
                  btnClass="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white"
                />
              ) : (
                <button
                  type="submit"
                  className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-500"
                >
                  Update Program
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setUpdateId(null);
                  setTitle("");
                  setDescription("");
                  setCoverImage(null);
                  setCoverImagePreview("");
                }}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {/* Programs Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50"
            />
          ))}
        </div>
      ) : programs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <div
              key={p?._id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="space-y-4">
                <div>
                  <div className="inline-block rounded-lg bg-sky-100 px-3 py-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-sky-700">
                      Program
                    </p>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900 line-clamp-2">
                    {p?.title || "Untitled"}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    {p?.description || "No description provided"}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-xs text-slate-500 font-medium">
                    {p?.createdAt
                      ? new Date(p.createdAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "2-digit",
                        })
                      : "Date N/A"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSelectForUpdate(p)}
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-1.5 text-sky-700 transition-all duration-300 hover:bg-sky-100"
                    >
                      <FiEdit className="h-4 w-4" />
                      <span className="text-xs font-medium">Update</span>
                    </button>

                    {deleteLoading && programId === p?._id ? (
                      <LodingButton content="Deleting..." btnClass="text-rose-600 text-xs" />
                    ) : (
                      <button
                        onClick={() => handleDelete(p?._id)}
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-rose-700 transition-all duration-300 hover:bg-rose-100"
                      >
                        <RiDeleteBin6Line className="h-4 w-4" />
                        <span className="text-xs font-medium">Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
          <p className="text-sm font-medium text-slate-600">No programs found</p>
          <p className="mt-1 text-xs text-slate-500">Create your first program to get started</p>
        </div>
      )}
    </section>
  );
};

export default AllProgram;
