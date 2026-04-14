import { useCallback, useEffect, useState } from "react";
import Layout from "./layout/Layout";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSearch, BiEnvelopeOpen, BiPhoneCall, BiCalendar } from "react-icons/bi";
import axios from "axios";
import { useSelector } from "react-redux";
import LodingButton from "../../components/LoadingButton";
import { toast } from "react-toastify";

const Inbox = () => {
  const server = import.meta.env.VITE_SERVER;
  const { currentUser } = useSelector((state) => state.user);
  const [messageData, setMessageData] = useState({ messages: [], totalPages: 1, currentPage: 1 });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const token = currentUser?.data?.accessToken;

  const formatDate = (rawDate) => {
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

  const getAllMessage = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${server}/message/get`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page },
      });
      if (res.data?.success) {
        setMessageData(res.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  }, [server, search, page, token]);

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setMessageId(id);
    try {
      const res = await axios.delete(`${server}/message/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        getAllMessage();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    } finally {
      setDeleteLoading(false);
      setMessageId(null);
    }
  };

  useEffect(() => {
    getAllMessage();
  }, [getAllMessage]);

  const messages = messageData.messages || [];

  return (
    <Layout>
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-violet-900 to-fuchsia-900 p-6 text-white shadow-lg sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-100">Admin Inbox</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Messages</h1>
          <p className="mt-1 text-sm text-slate-200 sm:text-base">
            Review incoming inquiries, identify priorities, and keep your response flow organized.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Messages This Page
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{messages.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Active Page
            </p>
            <p className="mt-2 text-2xl font-bold text-violet-700">{page}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Total Pages
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{messageData.totalPages}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Message List</h2>
            <p className="mt-0.5 text-sm text-slate-600">
              Search by sender name, email, phone, or content.
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
              placeholder="Search messages"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
              />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">
            <p className="text-lg font-medium">No messages found</p>
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                className="mt-2 text-sm text-orange-500 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {messages.map((m) => (
              <li
                key={m?._id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-slate-900">
                        {m?.name || "Unknown"}
                      </h3>
                      <p className="mt-1 flex items-center gap-1 text-xs font-medium text-violet-700">
                        <BiCalendar className="h-4 w-4" />
                        {formatDate(m?.createdAt)}
                      </p>
                    </div>
                    <span className="inline-flex rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                      Inbox
                    </span>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="line-clamp-4 text-sm leading-relaxed text-slate-700">
                      {m?.message || "-"}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-slate-200 pt-3 text-xs text-slate-600">
                    <p className="flex items-center gap-2">
                      <BiEnvelopeOpen className="h-4 w-4 text-slate-400" />
                      <span className="truncate">{m?.email || "-"}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <BiPhoneCall className="h-4 w-4 text-slate-400" />
                      <span>{m?.phone || "-"}</span>
                    </p>
                  </div>

                  <div className="flex justify-end pt-2">
                    {deleteLoading && messageId === m?._id ? (
                      <LodingButton
                        content="Deleting..."
                        btnClass="inline-flex items-center rounded-lg bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleDelete(m?._id)}
                        className="inline-flex items-center gap-2 rounded-lg border border-rose-200 px-3 py-1.5 text-rose-600 transition hover:bg-rose-50"
                      >
                        <RiDeleteBin6Line className="h-4 w-4" />
                        <span className="text-xs font-medium">Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {messageData.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            {Array.from({ length: messageData.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`rounded-xl border px-3 py-1.5 text-sm font-medium transition-colors ${
                  p === page
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(messageData.totalPages, p + 1))}
              disabled={page === messageData.totalPages}
              className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Inbox;
