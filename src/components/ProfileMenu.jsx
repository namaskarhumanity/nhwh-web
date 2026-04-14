import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";
import { signoutSuccess } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const getDisplayName = (user) => {
  const fallbackEmail = typeof user?.email === "string" ? user.email.split("@")[0] : "";
  const candidates = [user?.name, user?.fullName, user?.username, fallbackEmail, "Member"];

  return candidates.find((value) => typeof value === "string" && value.trim())?.trim() || "Member";
};

const getInitials = (displayName) => {
  return displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const ProfileMenu = ({ user, accessToken, onNavigate, mobile = false }) => {
  const server = import.meta.env.VITE_SERVER;
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const displayName = getDisplayName(user);
  const email = user?.email || "Account member";
  const avatarUrl = user?.avatar?.url || user?.photoURL || user?.avatarUrl || "";
  const isAdmin = Boolean(user?.is_admin);
  const initials = getInitials(displayName);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  const handleSignout = async () => {
    try {
      if (!accessToken) {
        dispatch(signoutSuccess());
        closeMenu();
        return;
      }

      const res = await fetch(`${server}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `${accessToken}` },
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      dispatch(signoutSuccess());
      closeMenu();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const menuPanelClassName = mobile
    ? "mt-3 w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white/95 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.55)] backdrop-blur-xl"
    : "absolute right-0 top-full mt-3 w-[22rem] overflow-hidden rounded-[28px] border border-slate-200 bg-white/95 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.55)] backdrop-blur-xl";

  return (
    <div ref={menuRef} className={`relative ${mobile ? "w-full" : ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/85 px-3 py-3 text-left shadow-[0_14px_40px_-24px_rgba(15,23,42,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_20px_50px_-26px_rgba(14,116,144,0.45)] ${
          mobile ? "w-full" : "min-w-[18rem]"
        }`}
      >
        <div className="relative shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-12 w-12 rounded-2xl object-cover ring-2 ring-white shadow-md"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 via-cyan-500 to-emerald-500 text-sm font-bold text-white shadow-lg">
              {initials}
            </div>
          )}
          <span
            className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${
              isAdmin ? "bg-amber-400" : "bg-emerald-400"
            }`}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700/80">
            {isAdmin ? "Admin Access" : "Signed In"}
          </p>
          <p className="truncate text-sm font-semibold text-slate-900">{displayName}</p>
          <p className="truncate text-xs text-slate-500">{email}</p>
        </div>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className={menuPanelClassName}>
          <div className="bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),linear-gradient(135deg,_rgba(14,165,233,0.1),_rgba(99,102,241,0.04))] px-5 py-5">
            <div className="flex items-center gap-4">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="h-14 w-14 rounded-2xl object-cover ring-4 ring-white/80 shadow-md"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 via-cyan-500 to-emerald-500 text-base font-bold text-white shadow-lg">
                  {initials}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-semibold text-slate-950">{displayName}</p>
                <p className="truncate text-sm text-slate-600">{email}</p>
                <span className="mt-2 inline-flex rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700 shadow-sm">
                  {isAdmin ? "Administrator" : "Community Member"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 p-3">
            {isAdmin && (
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-sky-700"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            )}

            <Link
              to="/account"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-sky-700"
            >
              <User className="h-4 w-4" />
              My Account
            </Link>
          </div>

          <div className="border-t border-slate-200 p-3">
            <button
              type="button"
              onClick={handleSignout}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
