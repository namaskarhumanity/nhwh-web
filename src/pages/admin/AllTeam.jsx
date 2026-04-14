import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import LodingButton from "../../components/LoadingButton";
import { toast } from "react-toastify";

const AllTeam = () => {
  const server = import.meta.env.VITE_SERVER;
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [teamData, setTeamData] = useState();
  const [teamId, setTeamId] = useState(null);

  const getAllTeam = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${server}/team/get`);
      setTeamData(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load teams");
    } finally {
      setLoading(false);
    }
  }, [server]);

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setTeamId(id);
    try {
      const res = await axios.delete(`${server}/team/delete/${id}`, {
        headers: {
          Authorization: `${currentUser.data.accessToken}`,
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        await getAllTeam();
      }
      setDeleteLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete team member");
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    getAllTeam();
  }, [getAllTeam]);

  const teams = teamData?.data || [];
  const totalTeams = teams.length;

  return (
    <section className="space-y-6">
      {/* Gradient Header */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-teal-900 via-amber-900 to-orange-900 p-6 text-white shadow-lg sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-teal-100">Team Management</p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Our Team</h1>
        <p className="mt-2 max-w-2xl text-sm text-teal-50">
          Manage leadership, staff, and volunteer team members with their profiles.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-teal-600">
            Total Members
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{totalTeams}</p>
          <p className="mt-1 text-xs text-slate-500">Team members</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-amber-600">Status</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {totalTeams > 0 ? "Active" : "Idle"}
          </p>
          <p className="mt-1 text-xs text-slate-500">Team status</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-600">
            Last Updated
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">Just now</p>
          <p className="mt-1 text-xs text-slate-500">Real-time data</p>
        </div>
      </div>

      {/* Team Members Grid */}
      {loading ? (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <li
              key={i}
              className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50"
            />
          ))}
        </ul>
      ) : teams.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((t) => (
            <li
              key={t?._id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="space-y-4">
                {/* Avatar Section */}
                <div className="flex justify-center">
                  {t?.avatar?.url ? (
                    <img
                      src={t.avatar.url}
                      alt={t?.name}
                      className="h-24 w-24 rounded-full border-4 border-teal-100 object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-teal-100 bg-gradient-to-br from-teal-100 to-amber-100">
                      <span className="text-2xl font-bold text-teal-700">
                        {t?.name?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="text-center">
                  <div className="inline-block rounded-lg bg-teal-100 px-3 py-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-teal-700">
                      Member
                    </p>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900 line-clamp-2">
                    {t?.name || "Unknown"}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {t?.role || "No role specified"}
                  </p>
                </div>

                {/* Action Section */}
                <div className="border-t border-slate-200 pt-4">
                  {deleteLoading && teamId === t?._id ? (
                    <div className="flex justify-center">
                      <LodingButton content="Deleting..." btnClass="text-rose-600 text-xs" />
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDelete(t?._id)}
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700 transition-all duration-300 hover:bg-rose-100"
                    >
                      <RiDeleteBin6Line className="h-4 w-4" />
                      <span className="text-xs font-medium">Delete Member</span>
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
          <p className="text-sm font-medium text-slate-600">No team members found</p>
          <p className="mt-1 text-xs text-slate-500">Add your first team member to get started</p>
        </div>
      )}
    </section>
  );
};

export default AllTeam;
