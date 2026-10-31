"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

type CityFilter = "all" | "dubai" | "abu-dhabi";

const communities = [
    {
        nameEn: "Dubai Marina",
        nameAr: "دبي مارينا",
        city: "dubai",
        cityEn: "Dubai",
        cityAr: "دبي",
        image: "/images/dubai-skyline.png",
        avgBuy: "AED 2.4M",
        avgRent: "AED 145K",
        typesEn: "Apartments, Penthouses",
        typesAr: "شقق، بنتهاوس",
        query: "Dubai Marina",
    },
    {
        nameEn: "Downtown Dubai",
        nameAr: "وسط مدينة دبي",
        city: "dubai",
        cityEn: "Dubai",
        cityAr: "دبي",
        image: "/images/penthouse.png",
        avgBuy: "AED 3.2M",
        avgRent: "AED 180K",
        typesEn: "Apartments, Penthouses",
        typesAr: "شقق، بنتهاوس",
        query: "Downtown Dubai",
    },
    {
        nameEn: "Palm Jumeirah",
        nameAr: "نخلة جميرا",
        city: "dubai",
        cityEn: "Dubai",
        cityAr: "دبي",
        image: "/images/luxury-villa.png",
        avgBuy: "AED 8.5M",
        avgRent: "AED 420K",
        typesEn: "Villas, Apartments",
        typesAr: "فلل، شقق",
        query: "Palm Jumeirah",
    },
    {
        nameEn: "Business Bay",
        nameAr: "الخليج التجاري",
        city: "dubai",
        cityEn: "Dubai",
        cityAr: "دبي",
        image: "/images/modern-apartment.png",
        avgBuy: "AED 1.8M",
        avgRent: "AED 110K",
        typesEn: "Apartments, Commercial",
        typesAr: "شقق، عقارات تجارية",
        query: "Business Bay",
    },
    {
        nameEn: "JBR",
        nameAr: "جميرا بيتش ريزيدنس",
        city: "dubai",
        cityEn: "Dubai",
        cityAr: "دبي",
        image: "/images/render-marina.png",
        avgBuy: "AED 2.7M",
        avgRent: "AED 160K",
        typesEn: "Apartments, Penthouses",
        typesAr: "شقق، بنتهاوس",
        query: "JBR",
    },
    {
        nameEn: "Saadiyat Island",
        nameAr: "جزيرة السعديات",
        city: "abu-dhabi",
        cityEn: "Abu Dhabi",
        cityAr: "أبوظبي",
        image: "/images/abudhabi-skyline.png",
        avgBuy: "AED 4.8M",
        avgRent: "AED 240K",
        typesEn: "Villas, Apartments",
        typesAr: "فلل، شقق",
        query: "Saadiyat Island",
    },
    {
        nameEn: "Yas Island",
        nameAr: "جزيرة ياس",
        city: "abu-dhabi",
        cityEn: "Abu Dhabi",
        cityAr: "أبوظبي",
        image: "/images/render-yas.png",
        avgBuy: "AED 2.5M",
        avgRent: "AED 180K",
        typesEn: "Apartments, Villas",
        typesAr: "شقق، فلل",
        query: "Yas Island",
    },
    {
        nameEn: "Al Reem Island",
        nameAr: "جزيرة الريم",
        city: "abu-dhabi",
        cityEn: "Abu Dhabi",
        cityAr: "أبوظبي",
        image: "/images/townhouse.png",
        avgBuy: "AED 1.7M",
        avgRent: "AED 105K",
        typesEn: "Apartments, Townhouses",
        typesAr: "شقق، تاون هاوس",
        query: "Al Reem Island",
    },
];

export default function CommunitiesPage() {
    const { isArabic } = useLanguage();

    const [activeCity, setActiveCity] =
        useState<CityFilter>("all");

    const text = isArabic
        ? {
            label: "المواقع المميزة",
            title: "استكشف مجتمعات الإمارات",
            description:
                "اكتشف الحي المثالي الذي يناسب أسلوب حياتك",
            all: "جميع المناطق",
            dubai: "دبي",
            abuDhabi: "أبوظبي",
            avgBuy: "متوسط الشراء",
            avgRent: "متوسط الإيجار",
            types: "الأنواع",
            explore: "استكشف العقارات",
        }
        : {
            label: "Prime Altitudes",
            title: "Explore UAE Communities",
            description:
                "Discover the perfect neighborhood for your lifestyle",
            all: "All Elevations",
            dubai: "Dubai",
            abuDhabi: "Abu Dhabi",
            avgBuy: "Avg Buy",
            avgRent: "Avg Rent",
            types: "Types",
            explore: "Explore Properties",
        };

    const filteredCommunities =
        activeCity === "all"
            ? communities
            : communities.filter(
                (community) =>
                    community.city === activeCity
            );

    return (
        <main
            className="relative z-10 min-h-screen bg-[#1d2c41] pb-24 pt-32 text-white"
            dir={isArabic ? "rtl" : "ltr"}
        >
            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">

                {/* PAGE HEADING */}

                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <div className="mb-3 text-xs uppercase tracking-[0.28em] text-[#C9974C]">
                        {text.label}
                    </div>

                    <h1 className="mb-5 text-4xl font-bold md:text-5xl">
                        {text.title}
                    </h1>

                    <p className="text-base leading-7 text-white/65 md:text-lg">
                        {text.description}
                    </p>
                </div>

                {/* FILTER TABS */}

                <div className="mb-12 flex flex-wrap justify-center gap-3">
                    <FilterButton
                        active={activeCity === "all"}
                        onClick={() =>
                            setActiveCity("all")
                        }
                    >
                        {text.all}
                    </FilterButton>

                    <FilterButton
                        active={activeCity === "dubai"}
                        onClick={() =>
                            setActiveCity("dubai")
                        }
                    >
                        {text.dubai}
                    </FilterButton>

                    <FilterButton
                        active={
                            activeCity === "abu-dhabi"
                        }
                        onClick={() =>
                            setActiveCity("abu-dhabi")
                        }
                    >
                        {text.abuDhabi}
                    </FilterButton>
                </div>

                {/* COMMUNITIES GRID */}

                <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {filteredCommunities.map(
                        (community) => (
                            <article
                                key={community.nameEn}
                                className="group overflow-hidden border border-white/15 bg-[#0A1628]/40 transition duration-300 hover:-translate-y-1 hover:border-[#C9974C]/60"
                            >

                                {/* IMAGE */}

                                <Link
                                    href={`/properties?community=${encodeURIComponent(
                                        community.query
                                    )}`}
                                    className="relative block h-[270px] overflow-hidden"
                                >
                                    <img
                                        src={community.image}
                                        alt={
                                            isArabic
                                                ? community.nameAr
                                                : community.nameEn
                                        }
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/10 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#C9974C]">
                                            {isArabic
                                                ? community.cityAr
                                                : community.cityEn}
                                        </div>

                                        <h2 className="text-2xl font-bold text-white">
                                            {isArabic
                                                ? community.nameAr
                                                : community.nameEn}
                                        </h2>
                                    </div>
                                </Link>

                                {/* DETAILS */}

                                <div className="p-6">

                                    <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-5">

                                        <div>
                                            <div className="mb-1 text-[9px] uppercase tracking-wider text-white/40">
                                                {text.avgBuy}
                                            </div>

                                            <div
                                                className="text-sm font-semibold text-white"
                                                dir="ltr"
                                            >
                                                {community.avgBuy}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-1 text-[9px] uppercase tracking-wider text-white/40">
                                                {text.avgRent}
                                            </div>

                                            <div
                                                className="text-sm font-semibold text-white"
                                                dir="ltr"
                                            >
                                                {community.avgRent}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="py-5">
                                        <div className="mb-2 text-[9px] uppercase tracking-wider text-white/40">
                                            {text.types}
                                        </div>

                                        <p className="text-sm text-white/65">
                                            {isArabic
                                                ? community.typesAr
                                                : community.typesEn}
                                        </p>
                                    </div>

                                    <Link
                                        href={`/properties?community=${encodeURIComponent(
                                            community.query
                                        )}`}
                                        className="flex items-center justify-between border-t border-white/10 pt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#C9974C] transition hover:text-white"
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

                            </article>
                        )
                    )}

                </div>

            </div>
        </main>
    );
}

function FilterButton({
    children,
    active,
    onClick,
}: {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`border px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] transition ${active
                    ? "border-[#C9974C] bg-[#C9974C] text-[#0A1628]"
                    : "border-white/15 bg-white/[0.03] text-white/60 hover:border-[#C9974C]/60 hover:text-[#C9974C]"
                }`}
        >
            {children}
        </button>
    );
}