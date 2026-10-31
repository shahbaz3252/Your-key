"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function OffPlanPage() {
    const { isArabic } = useLanguage();

    const text = isArabic
        ? {
            label: "آفاق المستقبل",
            title: "العقارات قيد الإنشاء",
            description:
                "مشاريع وأبراج قيد الإنشاء في دبي وأبوظبي",
            coming:
                "سيتم الإعلان عن مشاريع جديدة قيد الإنشاء قريبًا.",
            explore:
                "استكشف العقارات المتاحة",
        }
        : {
            label: "Future Altitudes",
            title: "Off-Plan Properties",
            description:
                "Towers under construction in Dubai & Abu Dhabi",
            coming:
                "New off-plan projects will be announced shortly.",
            explore:
                "Explore Available Properties",
        };

    return (
        <main
            className="relative z-10 min-h-screen bg-[#1d2c41] pb-24 pt-32 text-white"
            dir={isArabic ? "rtl" : "ltr"}
        >
            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">

                {/* ==============================
            TOP HEADING
        =============================== */}

                <div className="mb-14 max-w-3xl">

                    <div className="mb-3 text-xs uppercase tracking-[0.28em] text-[#C9974C]">
                        {text.label}
                    </div>

                    <h1 className="mb-5 text-4xl font-bold text-white md:text-5xl">
                        {text.title}
                    </h1>

                    <p className="text-lg leading-8 text-white/65">
                        {text.description}
                    </p>

                </div>


                {/* ==============================
            EMPTY / COMING SOON AREA
        =============================== */}

                <div className="border border-white/15 bg-[#0A1628]/35 px-6 py-16 text-center backdrop-blur-sm md:px-10 md:py-24">

                    {/* ICON */}

                    <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-[#C9974C]/40 bg-[#C9974C]/10 text-[#C9974C]">
                        <BuildingIcon />
                    </div>


                    {/* MESSAGE */}

                    <p className="mx-auto mb-8 max-w-xl text-base leading-7 text-white/60 md:text-lg">
                        {text.coming}
                    </p>


                    {/* BUTTON */}

                    <Link
                        href="/properties"
                        className="inline-flex items-center gap-3 rounded-lg bg-[#C9974C] px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#0A1628] transition hover:bg-[#b8863b]"
                    >
                        <span>
                            {text.explore}
                        </span>

                        <span
                            className={
                                isArabic
                                    ? "rotate-180"
                                    : ""
                            }
                        >
                            →
                        </span>
                    </Link>

                </div>

            </div>
        </main>
    );
}


/* ==============================
   BUILDING ICON
=============================== */

function BuildingIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
        >
            <path d="M3 21h18" />

            <path d="M6 21V4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v17" />

            <path d="M15 8h3a1 1 0 0 1 1 1v12" />

            <path d="M9 7h2" />
            <path d="M9 11h2" />
            <path d="M9 15h2" />

            <path d="M15 12h2" />
            <path d="M15 16h2" />
        </svg>
    );
}