"use client";

import {
    useEffect,
    useState,
} from "react";

import { useLanguage } from "../context/LanguageContext";

const englishLevels = [
    "GROUND · Lobby",
    "L12 · The Portfolio",
    "L24 · Rising",
    "L33 · Leasing",
    "L36 · The Numbers",
    "L48 · Prime Altitudes",
    "L54 · Concierge",
    "CLOUD · Trust",
    "FAQ · Answers",
    "PH · Valuation",
];

const arabicLevels = [
    "GROUND · الردهة",
    "L12 · المحفظة",
    "L24 · الصعود",
    "L33 · التأجير",
    "L36 · الأرقام",
    "L48 · المواقع المميزة",
    "L54 · خدمات مخصصة",
    "CLOUD · الثقة",
    "FAQ · الإجابات",
    "PH · التقييم",
];

export default function ScrollRail() {
    const { isArabic } =
        useLanguage();

    const [progress, setProgress] =
        useState(0);

    const [levelIndex, setLevelIndex] =
        useState(0);

    useEffect(() => {
        const updateRail = () => {
            const scrollTop =
                window.scrollY;

            const total =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;

            const current =
                total > 0
                    ? (scrollTop / total) *
                    100
                    : 0;

            const safe =
                Math.min(
                    Math.max(current, 0),
                    100
                );

            setProgress(safe);

            const index =
                Math.min(
                    9,
                    Math.floor(safe / 10)
                );

            setLevelIndex(index);
        };

        updateRail();

        window.addEventListener(
            "scroll",
            updateRail,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateRail
        );

        return () => {
            window.removeEventListener(
                "scroll",
                updateRail
            );

            window.removeEventListener(
                "resize",
                updateRail
            );
        };
    }, []);

    const levels =
        isArabic
            ? arabicLevels
            : englishLevels;

    return (
        <div className="fixed bottom-7 right-4 top-[145px] z-[60] hidden xl:flex">

            <div className="relative h-full w-[86px]">

                {/* LINE */}

                <div className="absolute bottom-0 right-[21px] top-0 w-px bg-white/25" />


                {/* TICKS */}

                <div className="absolute bottom-0 right-[17px] top-0 flex flex-col justify-between">

                    {Array.from({
                        length: 11,
                    }).map((_, index) => (
                        <div
                            key={index}
                            className="h-px w-[9px] bg-white/35"
                        />
                    ))}

                </div>


                {/* BALL */}

                <div
                    className="absolute right-[13px] z-20 h-[18px] w-[18px] -translate-y-1/2 rounded-full border border-[#f7d58b] bg-[#C9974C] shadow-[0_0_18px_rgba(201,151,76,0.8)] transition-[top] duration-150"
                    style={{
                        top: `${progress}%`,
                    }}
                />


                {/* LABEL */}

                <div className="absolute right-[48px] top-1/2 -translate-y-1/2 rotate-180 whitespace-nowrap [writing-mode:vertical-rl]">

                    <span className="text-xs font-bold tracking-wider text-[#C9974C]">
                        {
                            levels[
                            levelIndex
                            ]
                        }
                    </span>

                </div>


                {/* TOP BUTTON */}

                <button
                    type="button"
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        })
                    }
                    className="absolute bottom-0 right-[3px] flex h-10 w-10 translate-y-[52px] items-center justify-center rounded-full border border-white/30 bg-[#0A1628]/90 text-white hover:border-[#C9974C] hover:text-[#C9974C]"
                >
                    ↑
                </button>

            </div>
        </div>
    );
}