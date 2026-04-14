import { useEffect, useRef, useState } from "react";
import Layout from "./layout/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const VolunteerEmailTemplate = () => {
  const server = import.meta.env.VITE_SERVER;
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser?.data?.accessToken;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    linkLabel: "",
    linkUrl: "",
  });
  const editorRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loadTemplate = async () => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${server}/admin/volunteer-email-template`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.success) {
        setFormData({
          subject: response?.data?.data?.subject || "",
          message: response?.data?.data?.message || "",
          linkLabel: response?.data?.data?.linkLabel || "",
          linkUrl: response?.data?.data?.linkUrl || "",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load email template");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const plainTextMessage = formData.message.replace(/<[^>]*>/g, "").trim();
    if (!plainTextMessage) {
      toast.error("Message is required");
      return;
    }

    try {
      setSaving(true);
      const response = await axios.put(`${server}/admin/volunteer-email-template`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message || "Template saved");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save template");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadTemplate();
  }, [token]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== formData.message) {
      editorRef.current.innerHTML = formData.message || "";
    }
  }, [formData.message]);

  const handleEditorInput = () => {
    setFormData((prev) => ({
      ...prev,
      message: editorRef.current?.innerHTML || "",
    }));
  };

  const applyFormat = (command) => {
    if (!editorRef.current) {
      return;
    }

    editorRef.current.focus();
    document.execCommand(command, false);
    handleEditorInput();
  };

  return (
    <Layout>
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-900 to-sky-900 p-6 text-white shadow-lg sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-100">Admin Communication</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Volunteer Email Template</h1>
          <p className="mt-1 text-sm text-slate-200 sm:text-base">
            Update the message sent when a user registers as a volunteer.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-slate-700">
              Email Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-500"
              placeholder="Volunteer Registration - Namaskar Humanity Welfare Society"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Email Message</label>
            <div className="overflow-hidden rounded-xl border border-slate-300">
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 p-2">
                <button
                  type="button"
                  onClick={() => applyFormat("bold")}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Bold
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("italic")}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Italic
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("underline")}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Underline
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("insertUnorderedList")}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Bullet List
                </button>
              </div>
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorInput}
                className="min-h-[240px] w-full px-4 py-3 text-sm text-slate-800 outline-none"
                style={{ whiteSpace: "pre-wrap" }}
                role="textbox"
                aria-label="Email Message"
                suppressContentEditableWarning
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Rich text is supported. Format the message using toolbar buttons.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="linkLabel"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Link Text
              </label>
              <input
                id="linkLabel"
                name="linkLabel"
                type="text"
                value={formData.linkLabel}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-500"
                placeholder="Namaskar Humanity Welfare Society"
              />
            </div>

            <div>
              <label htmlFor="linkUrl" className="mb-2 block text-sm font-semibold text-slate-700">
                Link URL
              </label>
              <input
                id="linkUrl"
                name="linkUrl"
                type="url"
                value={formData.linkUrl}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-500"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving || loading}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Template"}
            </button>
            {loading ? <p className="text-sm text-slate-500">Loading template...</p> : null}
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default VolunteerEmailTemplate;
