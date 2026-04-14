import axios from "axios";
import { useState } from "react";
import {
  MdInsertPhoto,
  MdOutlineDriveFolderUpload,
  MdOutlineShortText,
  MdOutlineSubject,
} from "react-icons/md";
import { useSelector } from "react-redux";
import LodingButton from "../../components/LoadingButton";
import { toast } from "react-toastify";

const AddProgram = () => {
  const server = import.meta.env.VITE_SERVER;
  const [loading, setLoading] = useState(false);
  const [svg, setSvg] = useState(null);
  const [svgPreview, setSvgPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
      formData.append("coverImage", svg);
    }
    formData.append("title", title);
    formData.append("description", description);
    try {
      const res = await axios.post(`${server}/program/add`, formData, {
        headers: {
          Authorization: `${currentUser.data.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setTitle("");
        setDescription("");
        setSvg(null);
        setSvgPreview(null);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Failed to add program.");
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-sky-50/60 to-orange-50/60 shadow-lg">
        <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-orange-200/40 blur-3xl" />

        <form onSubmit={handleSubmit} className="relative">
          <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              Program Management
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Create Program</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Publish a new initiative with a clear title, meaningful description, and cover image.
            </p>
          </div>

          <div className="grid gap-8 px-6 py-6 sm:px-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-800">
                  Program Title
                </label>
                <div className="relative">
                  <MdOutlineShortText className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="off"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter program title"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Program Description
                </label>
                <div className="relative">
                  <MdOutlineSubject className="pointer-events-none absolute left-3 top-3 text-slate-400" />
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the goal, audience, and impact of this program"
                    className="w-full rounded-xl border border-slate-300 bg-white p-3 pl-10 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-800">Cover Image</p>
              <p className="mt-1 text-xs text-slate-500">PNG, JPG, JPEG or WEBP, 100KB to 2MB</p>

              <div className="mt-4 flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                {svgPreview ? (
                  <img
                    className="h-36 w-36 rounded-2xl border border-slate-200 object-cover shadow-sm"
                    src={svgPreview}
                    alt="Program cover preview"
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
                Upload Cover
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
                content={"Creating Program..."}
                btnClass={
                  "rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
                }
              />
            ) : (
              <button
                type="submit"
                className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
              >
                Create Program
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProgram;
