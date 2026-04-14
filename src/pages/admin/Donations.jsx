import Layout from "./layout/Layout";
import { BiSearch } from "react-icons/bi";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Donations = () => {
  const server = import.meta.env.VITE_SERVER;
  const { currentUser } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [paymentsData, setPaymentsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDonationDate = (rawDate) => {
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

  const formatAmount = (amount) => {
    const value = Number(String(amount || "0").replace(/,/g, ""));
    if (Number.isNaN(value)) {
      return "-";
    }

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const pageTotal = paymentsData.reduce((acc, item) => {
    const value = Number(String(item?.amount || "0").replace(/,/g, ""));
    return acc + (Number.isNaN(value) ? 0 : value);
  }, 0);

  const getPayments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${server}/admin/get-payments`, {
        params: { search: search || undefined, page: currentPage },
        headers: {
          Authorization: `Bearer ${currentUser?.data?.accessToken}`,
        },
      });

      if (res.data.success) {
        setPaymentsData(res.data.data.payments || []);
        setTotalPages(res.data.data.totalPages || 1);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to load donations");
      setLoading(false);
    }
  }, [currentPage, currentUser?.data?.accessToken, search, server]);

  useEffect(() => {
    if (currentUser?.data?.accessToken) {
      getPayments();
    }
  }, [currentUser?.data?.accessToken, getPayments]);

  return (
    <Layout>
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-sky-900 to-teal-900 p-6 text-white shadow-lg sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Admin Finance</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Donations</h1>
          <p className="mt-1 text-sm text-slate-200 sm:text-base">
            Track donor records, search quickly, and monitor contribution flow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Donations This Page
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{paymentsData.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Current Page Total
            </p>
            <p className="mt-2 text-2xl font-bold text-emerald-700">{formatAmount(pageTotal)}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Pagination
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {currentPage} / {totalPages}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Donation Records</h2>
            <p className="mt-0.5 text-sm text-slate-600">
              Search by donor name, email, phone, or payment ID.
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
              placeholder="Search donor or payment ID"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5">
                    Sr.
                  </th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5">
                    Name
                  </th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5">
                    Email
                  </th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5">
                    Phone
                  </th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5">
                    Pancard
                  </th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5">
                    Address
                  </th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5">
                    Amount
                  </th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5">
                    Transaction ID
                  </th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5">
                    Donation Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="p-10 text-center text-slate-500">
                      Loading donations...
                    </td>
                  </tr>
                ) : paymentsData?.length ? (
                  paymentsData.map((item, idx) => (
                    <tr key={item._id} className="transition hover:bg-slate-50/80">
                      <td className="p-4 text-sm font-medium text-slate-700 sm:p-5">
                        {(currentPage - 1) * 10 + idx + 1}
                      </td>
                      <td className="p-4 text-sm font-semibold text-slate-900 sm:p-5">
                        {item.name || "-"}
                      </td>
                      <td className="p-4 text-sm text-slate-700 sm:p-5">{item.email || "-"}</td>
                      <td className="p-4 text-sm text-slate-700 sm:p-5">{item.phone || "-"}</td>
                      <td className="p-4 text-sm text-slate-700 sm:p-5">{item.pancard || "-"}</td>
                      <td className="max-w-[220px] truncate p-4 text-sm text-slate-700 sm:p-5">
                        {item.address || "-"}
                      </td>
                      <td className="p-4 text-sm font-semibold text-emerald-700 sm:p-5">
                        {formatAmount(item.amount)}
                      </td>
                      <td className="max-w-[220px] truncate p-4 text-sm font-mono text-slate-700 sm:p-5">
                        {item.razorpay_payment_id ||
                          item.transactionId ||
                          item.tranjectionId ||
                          item.payment_id ||
                          "-"}
                      </td>
                      <td className="p-4 sm:p-5">
                        <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                          {formatDonationDate(item.date || item.createdAt)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="p-10 text-center text-slate-500">
                      No donations found.
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
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm font-medium text-slate-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Donations;
