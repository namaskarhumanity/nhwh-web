import {
  Calendar,
  IndianRupee,
  UserRoundCheck,
  Users,
  Headset,
  Mail,
  House,
  Link2,
} from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Home", icon: MdDashboard },
  { to: "/donations", label: "Donations", icon: IndianRupee },
  { to: "/users", label: "Users", icon: Users },
  { to: "/volunteers", label: "Volunteers", icon: UserRoundCheck },
  { to: "/messages", label: "Inbox", icon: Mail },
  { to: "/volunteer-email-template", label: "Email Template", icon: Link2 },
  { to: "/manage-program", label: "Program", icon: Calendar },
  { to: "/manage-team", label: "Team", icon: Headset },
];

const SideBar = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white shadow-lg transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-200 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">NHWS</p>
          <h2 className="mt-1 text-lg font-bold text-slate-800">Admin Dashboard</h2>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-2 font-medium">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    <Icon className="h-4 w-4" />
                    <span className="ml-3">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 border-t border-slate-200 pt-4">
            <NavLink
              to="/"
              onClick={onClose}
              className="group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              <House className="h-4 w-4" />
              <span className="ml-3">Go to Home</span>
            </NavLink>
          </div>
        </nav>

        <div className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500">
          Manage users, donations and content.
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
