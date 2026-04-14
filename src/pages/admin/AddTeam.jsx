import { useState } from "react";
import { MdInsertPhoto, MdOutlineBadge, MdOutlineDriveFolderUpload } from "react-icons/md";
import { useSelector } from "react-redux";
import LodingButton from "../../components/LoadingButton";
import axios from "axios";
import { toast } from "react-toastify";

const AddTeam = () => {
  const server = import.meta.env.VITE_SERVER;
  const [loading, setLoading] = useState(false);
  const [svg, setSvg] = useState(null);
  const [svgPreview, setSvgPreview] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  //Image size
  const maxSize = 2 * 1024 * 1024;
  const minSize = 100 * 1024;

  const handleSvg = (e) => {
    let file = e.target.files[0];
    if (!file) {
      return;
    }

    if (file.size > maxSize || file.size < minSize) {
      toast.error("File size should be 100KB to 2MB!");
      file = "";
    }
    if (file) {
      setSvg(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSvgPreview(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (svgPreview) {
      formData.append("avatar", svg);
    }
    formData.append("name", name);
    formData.append("role", role);
    try {
      const res = await axios.post(`${server}/team/add`, formData, {
        headers: {
          Authorization: `${currentUser.data.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setName("");
        setRole("");
        setSvg(null);
        setSvgPreview(null);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add team member.");
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-teal-50/50 to-amber-50/60 shadow-lg">
        <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl" />

        <form onSubmit={handleSubmit} className="relative">
          <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              Team Management
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Add Team Member</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Add leadership and staff details with a clear profile photo and role description.
            </p>
          </div>

          <div className="grid gap-8 px-6 py-6 sm:px-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-800">
                  Member Name
                </label>
                <div className="relative">
                  <MdOutlineBadge className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="mb-2 block text-sm font-semibold text-slate-800">
                  Role / Designation
                </label>
                <textarea
                  id="role"
                  name="role"
                  rows={4}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Example: Program Coordinator, Field Volunteer Lead, Communication Head"
                  className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                  required
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-800">Avatar Photo</p>
              <p className="mt-1 text-xs text-slate-500">PNG, JPG, JPEG or WEBP, 100KB to 2MB</p>

              <div className="mt-4 flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                {svgPreview ? (
                  <img
                    className="h-36 w-36 rounded-2xl border border-slate-200 object-cover shadow-sm"
                    src={svgPreview}
                    alt="Team member preview"
                  />
                ) : (
                  <div className="text-center">
                    <MdInsertPhoto className="mx-auto h-10 w-10 text-slate-400" />
                    <p className="mt-2 text-sm text-slate-500">No image selected</p>
                  </div>
                )}
              </div>

              <label
                htmlFor="file-upload"
                className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <MdOutlineDriveFolderUpload className="text-base" />
                Upload Photo
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleSvg}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end border-t border-slate-200 px-6 py-5 sm:px-8">
            {loading ? (
              <LodingButton
                content={"Adding Member..."}
                btnClass={
                  "rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
                }
              />
            ) : (
              <button
                type="submit"
                className="rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500"
              >
                Add Team Member
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTeam;
