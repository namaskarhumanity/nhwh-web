import Layout from "./layout/Layout";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { Avatar, Dropdown } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import LodingButton from "../../components/LoadingButton";
import { toast } from "react-toastify";

const AllUser = () => {
  const server = import.meta.env.VITE_SERVER;
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [usersData, setUsersData] = useState();
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(1);

  const onPageChange = (nextPage) => {
    setPage(nextPage);
  };

  const getAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${server}/admin/get-users`, {
        params: { search: search || undefined, page: page > 1 ? page : undefined },
        headers: {
          Authorization: `Bearer ${currentUser?.data?.accessToken}`,
        },
      });

      setUsersData(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [server, search, page, currentUser?.data?.accessToken]);

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setUserId(id);
    try {
      const res = await axios.delete(`${server}/admin/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.data?.accessToken}`,
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  const updatePrivilege = async (id, value) => {
    try {
      const res = await axios.put(
        `${server}/admin/change-privilege/${id}`,
        { value },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data?.accessToken}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers, deleteLoading]);

  const users = usersData?.data?.users || [];
  const totalPages = usersData?.data?.totalPages || 1;
  const adminCount = users.filter((u) => u?.is_admin).length;
  const verifiedCount = users.filter((u) => u?.is_verified).length;

  return (
    <Layout>
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-6 text-white shadow-lg sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-100">Admin Members</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Users</h1>
          <p className="mt-1 text-sm text-slate-200 sm:text-base">
            Manage registered users, privileges, and verification status.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Users This Page
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{users.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Admins This Page
            </p>
            <p className="mt-2 text-2xl font-bold text-indigo-700">{adminCount}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Verified This Page
            </p>
            <p className="mt-2 text-2xl font-bold text-emerald-700">{verifiedCount}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">User Records</h2>
            <p className="mt-0.5 text-sm text-slate-600">Search by name, email, or phone.</p>
          </div>
          <div className="relative text-gray-500 focus-within:text-gray-900">
            <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
              <BiSearch />
            </div>
            <input
              type="text"
              id="default-search"
              className="block h-11 w-full rounded-xl border border-slate-300 py-2.5 pl-12 pr-5 text-base placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-72"
              placeholder="Search user"
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5">
                    Sr.
                  </th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5">
                    Avatar
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
                    Admin
                  </th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5">
                    Verified
                  </th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 sm:p-5">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-slate-500">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length ? (
                  users.map((u, idx) => (
                    <tr key={u._id} className="transition hover:bg-slate-50/80">
                      <td className="p-4 text-sm font-medium text-slate-700 sm:p-5">
                        {(page - 1) * 6 + idx + 1}
                      </td>
                      <td className="p-4 text-sm sm:p-5">
                        <Avatar img={u?.avatar?.url} alt="avatar" rounded />
                      </td>
                      <td className="p-4 text-sm font-semibold text-slate-900 sm:p-5">{u?.name}</td>
                      <td className="p-4 text-sm text-slate-700 sm:p-5">{u?.email || "-"}</td>
                      <td className="p-4 text-sm text-slate-700 sm:p-5">{u?.phone || "-"}</td>
                      <td className="p-4 sm:p-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            u?.is_admin
                              ? "bg-indigo-50 text-indigo-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {u?.is_admin ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            u?.is_verified
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {u?.is_verified ? "Verified" : "Pending"}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="rounded-full border border-rose-200 p-2 transition hover:bg-rose-50"
                            onClick={() => handleDelete(u?._id)}
                          >
                            {deleteLoading && userId === u?._id ? (
                              <LodingButton content={""} btnClass={""} />
                            ) : (
                              <RiDeleteBin6Line color="red" />
                            )}
                          </button>
                          <div className="rounded-full border border-sky-200 p-1 transition hover:bg-sky-50">
                            <Dropdown
                              label={<BiDotsVerticalRounded color="blue" />}
                              arrowIcon={false}
                              color={""}
                            >
                              <Dropdown.Item onClick={() => updatePrivilege(u?._id, 1)}>
                                Make Admin
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => updatePrivilege(u?._id, 0)}>
                                Make User
                              </Dropdown.Item>
                            </Dropdown>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-slate-500">
                      No users found.
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
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
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
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default AllUser;
