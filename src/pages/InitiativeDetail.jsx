import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import {
  AcademicCapIcon,
  HeartIcon,
  SpeakerWaveIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Layout from "../layout/Layout";
import { DEFAULT_INITIATIVES } from "./initiativesData";

const ICON_MAP = {
  AcademicCapIcon,
  SpeakerWaveIcon,
  HeartIcon,
  UserGroupIcon,
};

const InitiativeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const server = import.meta.env.VITE_SERVER;
  const [initiative, setInitiative] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fallbackInitiative = useMemo(
    () => DEFAULT_INITIATIVES.find((item) => item._id === id),
    [id]
  );

  useEffect(() => {
    const getInitiative = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${server}/initiative/get`);
        const list = Array.isArray(res.data?.data) ? res.data.data : [];

        const selected = list.find((item) => item?._id === id);

        if (selected) {
          setInitiative({
            _id: selected._id,
            icon: selected.icon || "AcademicCapIcon",
            title: selected.title,
            description: selected.description,
            image: selected.coverImage?.url,
            iconImage: selected.iconImage?.url || "",
            stats: selected.stats || "",
            color: selected.color || "#2563eb",
          });
          return;
        }

        setInitiative(fallbackInitiative || null);
      } catch (error) {
        setInitiative(fallbackInitiative || null);
      } finally {
        setIsLoading(false);
      }
    };

    getInitiative();
  }, [server, id, fallbackInitiative]);

  const IconComponent = ICON_MAP[initiative?.icon] || AcademicCapIcon;

  return (
    <Layout
      title={initiative ? `${initiative.title} Initiative - NHWS` : "Initiative Details - NHWS"}
      description={
        initiative?.description
          ? String(initiative.description)
              .replace(/<[^>]*>/g, " ")
              .trim()
          : "Explore details of our social initiatives and how they create impact."
      }
      keywords={"initiative details, NHWS initiatives, social impact, NGO programs"}
    >
      <section className="py-16 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {isLoading ? (
            <div className="bg-white/80 p-8 sm:p-10">
              <div className="flex flex-col items-center justify-center text-center mb-8">
                <div className="h-12 w-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  Loading initiative details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Please wait while we fetch the full content.
                </p>
              </div>

              <div className="animate-pulse space-y-4">
                <div className="h-52 sm:h-64 w-full rounded-2xl bg-gray-200" />
                <div className="h-6 w-1/2 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-11/12 rounded bg-gray-100" />
                <div className="h-4 w-10/12 rounded bg-gray-100" />
              </div>
            </div>
          ) : !initiative ? (
            <div className="p-10 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Initiative Not Found</h1>
              <p className="text-gray-600">
                This initiative is unavailable right now. Please return to the home page and try
                another one.
              </p>
            </div>
          ) : (
            <div>
              <div className="relative h-64 sm:h-80 md:h-[28rem] overflow-hidden">
                <img
                  src={initiative.image}
                  alt={initiative.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/35" />
              </div>

              <div className="pt-8 sm:pt-10">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
                      {initiative.iconImage ? (
                        <img
                          src={initiative.iconImage}
                          alt={initiative.title}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                      {initiative.title}
                    </h1>
                  </div>
                  {initiative.stats ? (
                    <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                      {initiative.stats}
                    </span>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  aria-label="Back"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Overview</h2>
                {/<[^>]+>/.test(initiative.description || "") ? (
                  <div
                    className="text-gray-700 leading-relaxed text-base sm:text-lg break-words whitespace-pre-line [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_p]:break-words [&_li]:break-words"
                    style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(initiative.description || ""),
                    }}
                  />
                ) : (
                  <p
                    className="text-gray-700 leading-relaxed whitespace-pre-line text-base sm:text-lg break-words"
                    style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                  >
                    {initiative.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default InitiativeDetail;
