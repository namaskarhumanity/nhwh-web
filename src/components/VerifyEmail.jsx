import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import LodingButton from "./LoadingButton";
import Layout from "../layout/Layout";

const VerifyEmail = () => {
  const server = import.meta.env.VITE_SERVER;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { id } = useParams();

  const verifyEmail = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${server}/auth/verify/${id}`);
      if (res.data.success) {
        setMessage(res.data.message);
        setIsSuccess(true);
      }
      setLoading(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Email verification failed. Please try again.");
      setIsSuccess(false);
      setLoading(false);
    }
  }, [id, server]);

  useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);

  return (
    <Layout
      title="Verify Email - Namaskar Humanity Welfare Society"
      description="Verify your email address to activate your Namaskar Humanity account."
      keywords="verify email, account verification, NGO account"
    >
      <section className="min-h-[70vh] bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-6 py-24 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl backdrop-blur sm:p-12">
            {loading ? (
              <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 text-center">
                <LodingButton />
                <p className="text-base text-slate-600">Verifying your email address...</p>
              </div>
            ) : (
              <div className="text-center">
                <div
                  className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-3xl font-bold ${
                    isSuccess ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {isSuccess ? "✓" : "!"}
                </div>

                <h1
                  className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${
                    isSuccess ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {isSuccess ? "Email Verified" : "Verification Failed"}
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
                  {message || "We could not verify your email right now."}
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/"
                    className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                  >
                    Go To Home
                  </Link>
                  {!isSuccess && (
                    <button
                      onClick={verifyEmail}
                      className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Try Again
                    </button>
                  )}
                  <Link
                    to="/contact"
                    className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VerifyEmail;
