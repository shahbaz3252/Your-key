"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

const articles = [
    {
        slug: "dubai-real-estate-market-outlook-2026",

        categoryEn: "Market Insights",
        categoryAr: "رؤى السوق",

        titleEn:
            "Dubai Real Estate Market Outlook 2026",
        titleAr:
            "توقعات سوق العقارات في دبي لعام 2026",

        descriptionEn:
            "A look at the trends shaping Dubai's property market, including demand, pricing, investment activity, and the opportunities investors should be watching.",

        descriptionAr:
            "نظرة على الاتجاهات التي تشكل سوق العقارات في دبي، بما في ذلك الطلب والأسعار والنشاط الاستثماري والفرص التي ينبغي للمستثمرين متابعتها.",

        image: "/images/dubai-skyline.png",
    },

    {
        slug: "buyers-guide-off-plan-property-uae",

        categoryEn: "Buyer Guides",
        categoryAr: "أدلة المشترين",

        titleEn:
            "A Buyer's Guide to Off-Plan Property in the UAE",
        titleAr:
            "دليل المشتري للعقارات قيد الإنشاء في الإمارات",

        descriptionEn:
            "Understand the key considerations when buying off-plan property in the UAE, from developer selection and payment plans to potential returns.",

        descriptionAr:
            "تعرف على أهم العوامل التي يجب مراعاتها عند شراء عقار قيد الإنشاء في الإمارات، بدءًا من اختيار المطور وخطط الدفع وصولًا إلى العوائد المحتملة.",

        image: "/images/glass-facade.png",
    },

    {
        slug: "abu-dhabi-emerging-investment-hotspots",

        categoryEn: "Investment",
        categoryAr: "الاستثمار",

        titleEn:
            "Abu Dhabi's Emerging Investment Hotspots",
        titleAr:
            "أبرز مناطق الاستثمار الناشئة في أبوظبي",

        descriptionEn:
            "Explore some of Abu Dhabi's most promising areas for property investment and the factors driving long-term growth across the capital.",

        descriptionAr:
            "استكشف بعض أكثر مناطق أبوظبي الواعدة للاستثمار العقاري والعوامل التي تدعم النمو طويل الأجل في العاصمة.",

        image: "/images/render-saadiyat.png",
    },
];

export default function BlogPage() {
    const { isArabic } = useLanguage();

    const text = isArabic
        ? {
            label: "الرؤى",
            title: "رؤى السوق",
            description:
                "رؤى حول أسواق العقارات في دبي وأبوظبي، تشمل الاتجاهات وأدلة المناطق واستراتيجيات الاستثمار من مستشارينا.",
            readArticle: "اقرأ المقال",
        }
        : {
            label: "Insights",
            title: "Market Intelligence",
            description:
                "Perspectives on the Dubai and Abu Dhabi property markets — trends, neighbourhood guides, and investment strategy from our advisors.",
            readArticle: "Read article",
        };

    return (
        <main
            className="relative z-10 min-h-screen bg-[#1d2c41] pb-24 pt-32 text-white"
            dir={isArabic ? "rtl" : "ltr"}
        >
            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">

                {/* ==============================
            PAGE HEADING
        =============================== */}

                <div className="mx-auto mb-16 max-w-3xl text-center">

                    <div className="mb-3 text-xs uppercase tracking-[0.28em] text-[#C9974C]">
                        {text.label}
                    </div>

                    <h1 className="mb-5 text-4xl font-bold text-white md:text-5xl">
                        {text.title}
                    </h1>

                    <p className="text-base leading-7 text-white/65 md:text-lg">
                        {text.description}
                    </p>

                </div>


                {/* ==============================
            BLOG CARDS
        =============================== */}

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {articles.map((article) => (
                        <article
                            key={article.slug}
                            className="group overflow-hidden border border-white/15 bg-[#0A1628]/45 transition duration-300 hover:-translate-y-1 hover:border-[#C9974C]/60"
                        >

                            {/* IMAGE */}

                            <Link
                                href={`/blog/${article.slug}`}
                                className="relative block h-[260px] overflow-hidden bg-[#0A1628]"
                            >
                                <img
                                    src={article.image}
                                    alt={
                                        isArabic
                                            ? article.titleAr
                                            : article.titleEn
                                    }
                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-transparent to-transparent" />
                            </Link>


                            {/* CONTENT */}

                            <div className="p-7">

                                <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#C9974C]">
                                    {isArabic
                                        ? article.categoryAr
                                        : article.categoryEn}
                                </div>

                                <Link
                                    href={`/blog/${article.slug}`}
                                >
                                    <h2 className="mb-4 text-2xl font-bold leading-snug text-white transition group-hover:text-[#C9974C]">
                                        {isArabic
                                            ? article.titleAr
                                            : article.titleEn}
                                    </h2>
                                </Link>

                                <p className="mb-7 text-sm leading-6 text-white/60">
                                    {isArabic
                                        ? article.descriptionAr
                                        : article.descriptionEn}
                                </p>


                                {/* READ ARTICLE */}

                                <Link
                                    href={`/blog/${article.slug}`}
                                    className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-[#C9974C] transition hover:text-white"
                                >
                                    <span>
                                        {text.readArticle}
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
                    ))}

                </div>

            </div>
        </main>
    );
}