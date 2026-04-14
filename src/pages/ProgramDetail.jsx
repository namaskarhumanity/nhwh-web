import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { AcademicCapIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Layout from "../layout/Layout";
import LodingButton from "../components/LoadingButton";
import { useApiResource } from "../hooks/useApiResource";

const ProgramDetail = () => {
  const server = import.meta.env.VITE_SERVER;
  const { id } = useParams();

  const { data: programRes, loading } = useApiResource({
    url: id ? `${server}/program/get/${id}` : "",
    enabled: Boolean(id),
    initialData: null,
    errorMessage: "Failed to load program details",
  });

  const program = programRes?.data || null;

  return (
    <Layout
      title={program?.title ? `${program.title} - Program Details` : "Program Details - NHWS"}
      description={
        program?.description
          ? String(program.description)
              .replace(/<[^>]*>/g, " ")
              .trim()
          : "Explore complete details of our social program and participate in impact initiatives."
      }
      keywords={"program details, NHWS program, NGO programs, social impact"}
    >
      <section className="bg-gradient-to-b from-sky-50 via-white to-white py-14 sm:py-16">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              to="/program"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Programs
            </Link>
          </div>

          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <LodingButton />
            </div>
          ) : !program ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h1 className="text-2xl font-bold text-slate-900">Program not found</h1>
              <p className="mt-2 text-sm text-slate-600">
                The requested program is unavailable right now.
              </p>
            </div>
          ) : (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group overflow-hidden bg-white"
            >
              <div className="relative overflow-hidden">
                <img
                  src={program?.coverImage?.url}
                  alt={program?.title}
                  className="h-64 w-full object-cover sm:h-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/5 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-lg shadow-slate-900/10">
                  Program Details
                </div>
              </div>

              <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
                    <AcademicCapIcon className="h-4 w-4" />
                    Active Program
                  </div>
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    {program?.updatedAt
                      ? new Date(program.updatedAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "Recently added"}
                  </span>
                </div>

                <h1 className="mb-4 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
                  {program?.title}
                </h1>

                {/<[^>]+>/.test(program?.description || "") ? (
                  <div
                    className="mb-6 text-slate-700 leading-7 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(program?.description || ""),
                    }}
                  />
                ) : (
                  <p className="mb-6 whitespace-pre-line text-base leading-7 text-slate-700">
                    {program?.description}
                  </p>
                )}

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Open For
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      Volunteers & Support
                    </p>
                  </div>
                  <Link
                    to="/donate"
                    className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-100"
                  >
                    Donate
                  </Link>
                </div>
              </div>
            </motion.article>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProgramDetail;
