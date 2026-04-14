import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.data?.user;
  const avatarUrl =
    user?.avatar?.url ||
    "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg";

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white">
      <div className="border-b border-slate-200 px-5 py-6 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
          Account Center
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">Profile Overview</h2>
        <p className="mt-2 text-sm text-slate-600">
          Your account details are shown below. Use Update Profile to edit your personal
          information.
        </p>
      </div>

      <section className="p-5 sm:p-8">
        <div className="grid gap-6 md:grid-cols-[250px_1fr] md:items-start">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-white via-cyan-50 to-emerald-50 p-6 text-center shadow-[0_24px_60px_-32px_rgba(8,145,178,0.35)]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-10 right-0 h-24 w-24 rounded-full bg-cyan-200/50 blur-2xl" />
              <div className="absolute -bottom-12 left-0 h-28 w-28 rounded-full bg-emerald-200/50 blur-2xl" />
            </div>
            <img
              className="relative mx-auto h-28 w-28 rounded-full border-4 border-white object-cover shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)]"
              src={avatarUrl}
              alt="Profile avatar"
            />
            <p className="relative mt-5 text-lg font-semibold text-slate-900">
              {user?.name || "User"}
            </p>
            <p className="relative break-all text-sm text-slate-600">{user?.email || "-"}</p>
            <div className="relative mt-5 inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 shadow-sm ring-1 ring-cyan-100">
              Profile Photo
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Full Name
              </p>
              <p className="mt-1 break-words text-sm font-medium text-slate-900 sm:text-base">
                {user?.name || "-"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
              <p className="mt-1 break-words text-sm font-medium text-slate-900 sm:text-base">
                {user?.email || "-"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Phone Number
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900 sm:text-base">
                {user?.phone === "undefined" ? "-" : user?.phone || "-"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Gender</p>
              <p className="mt-1 text-sm font-medium text-slate-900 sm:text-base">
                {user?.gender === "undefined" ? "-" : user?.gender || "-"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Admin Access
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900 sm:text-base">
                {user?.is_admin ? "Yes" : "No"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Verified Account
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900 sm:text-base">
                {user?.is_verified ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
