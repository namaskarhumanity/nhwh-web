import { useState } from "react";
import Layout from "../layout/Layout";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");

  const tabs = [
    { label: "Profile", description: "View your account details", icon: "01" },
    { label: "Update Profile", description: "Edit personal information", icon: "02" },
    { label: "Change Password", description: "Keep your account secure", icon: "03" },
  ];

  return (
    <Layout
      title={"Namaskar Humanity Welfare Society - Account"}
      description={"Namaskar Humanity Welfare Society"}
      keywords={"help, educate, donate, welfare society"}
    >
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50 py-10 sm:py-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 left-0 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
          <div className="absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
              Account Settings
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Manage Your Profile
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              Keep your information updated and protect your account from one place.
            </p>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[300px_1fr]">
            <nav className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg sm:p-5">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const isActive = selectedComponent === tab.label;

                  return (
                    <button
                      type="button"
                      key={tab.label}
                      onClick={() => setSelectedComponent(tab.label)}
                      className={`w-full rounded-2xl px-4 py-3 text-left transition ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-lg"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                            isActive ? "bg-white/25 text-white" : "bg-white text-cyan-700"
                          }`}
                        >
                          {tab.icon}
                        </span>
                        <div>
                          <p className="text-sm font-semibold sm:text-base">{tab.label}</p>
                          <p className={`text-xs ${isActive ? "text-cyan-100" : "text-slate-500"}`}>
                            {tab.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg sm:p-6">
              {(() => {
                switch (selectedComponent) {
                  case "Profile":
                    return <Profile />;
                  case "Update Profile":
                    return <UpdateProfile />;
                  case "Change Password":
                    return <ChangePassword />;
                  default:
                    return <Profile />;
                }
              })()}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Account;
