"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useLanguage } from "../context/LanguageContext";

const team = [
    {
        name: "Sohail Ahmed",
        slug: "sohail-ahmed",
        roleEn: "Real estate broker",
        roleAr: "وسيط عقاري",
        image:
            "https://yourkey.ae/api/storage/objects/uploads/52181f10-3685-4d53-8a35-8a90fa112f36",
    },
    {
        name: "Sultan Umar",
        slug: "sultan-umar",
        roleEn: "Real Estate Agent",
        roleAr: "وكيل عقاري",
        image:
            "https://yourkey.ae/api/storage/objects/uploads/6c86ffba-664d-446f-98b8-ad61a4302e73",
    },
    {
        name: "Aanis Khalil",
        slug: "aanis-khalil",
        roleEn: "Property portfolio manager",
        roleAr: "مدير محفظة عقارية",
        image:
            "https://yourkey.ae/api/storage/objects/uploads/03116b5d-ae8d-4a28-9d24-bbb1c2bb1f7f",
    },
    {
        name: "Sameet Kumar",
        slug: "sameet-kumar",
        roleEn: "Real Estate Adviser",
        roleAr: "مستشار عقاري",
        image:
            "https://yourkey.ae/api/storage/objects/uploads/ded70176-72ce-42e5-94fd-e2da936918d3",
    },
];

export default function AboutPage() {
    const { isArabic } = useLanguage();

    const text = isArabic
        ? {
            heroLabel: "قصتنا",
            heroTitle: "نرتقي معًا",
            heroDescription:
                "يور كي لإدارة العقارات هي شريكك المتخصص في التنقل بثقة داخل سوق العقارات الديناميكي في دولة الإمارات.",

            foundationLabel: "الأساس",
            foundationTitle: "تأسست برؤية",

            foundationP1:
                "تأسست يور كي لإدارة العقارات منذ أكثر من 15 عامًا، ونمت من وكالة عقارية متخصصة إلى واحدة من شركات الوساطة العقارية الموثوقة في دولة الإمارات العربية المتحدة.",

            foundationP2:
                "نعمل في أبوظبي ودبي لربط العقارات المتميزة بالعملاء الباحثين عن أفضل الفرص. سواء كنت مشتريًا لأول مرة أو مستثمرًا خبيرًا أو تبحث عن إدارة متكاملة للعقار، نقدم خدمة شفافة واحترافية وشخصية.",

            mission: "مهمتنا",

            missionText:
                "تقديم خدمات عقارية استثنائية من خلال الشفافية والخبرة والفهم العميق لاحتياجات عملائنا.",

            vision: "رؤيتنا",

            visionText:
                "أن نكون الخيار الرائد في سوق العقارات الإماراتي، معروفين بالنزاهة والابتكار والنتائج الاستثنائية.",

            servicesLabel: "ما نقدمه",
            servicesTitle: "خدماتنا",

            buyTitle: "شراء عقار",
            buyText:
                "اعثر على منزل أحلامك أو استثمارك القادم من محفظتنا العقارية.",

            sellTitle: "بيع عقار",
            sellText:
                "احصل على أفضل قيمة سوقية لعقارك من خلال استراتيجيات خبرائنا.",

            rentTitle: "الإيجار والتأجير",
            rentText:
                "اكتشف عقارات إيجارية عالية الجودة أو اعثر على مستأجرين موثوقين.",

            managementTitle:
                "إدارة العقارات",
            managementText:
                "إدارة متكاملة واحترافية لأصولك العقارية دون عناء.",

            investmentTitle:
                "الاستشارات الاستثمارية",
            investmentText:
                "رؤى قائمة على البيانات لمساعدتك على بناء محفظة عقارية مربحة.",

            valuationTitle: "تقييم مجاني",
            valuationText:
                "تقييمات دقيقة للعقارات استنادًا إلى أحدث بيانات السوق.",

            teamLabel: "الخبراء",
            teamTitle: "تعرف على فريقنا",

            teamDescription:
                "فريق متخصص يقدم لك الخبرة والإرشاد في كل خطوة من رحلتك العقارية في دبي وأبوظبي.",

            viewProfile: "عرض الملف الشخصي",
        }
        : {
            heroLabel: "Our Story",
            heroTitle: "Ascending Together",

            heroDescription:
                "Your Key Property Management is your dedicated partner in navigating the dynamic UAE property market.",

            foundationLabel: "Foundation",
            foundationTitle:
                "Established with Vision",

            foundationP1:
                "Founded over 15 years ago, Your Key Property Management has grown from a boutique agency into one of the most respected and trusted real estate brokerages in the United Arab Emirates.",

            foundationP2:
                "Operating across Abu Dhabi and Dubai, we bridge the gap between premium properties and discerning clients. Whether you are a first-time buyer, a seasoned investor, or looking for comprehensive property management, we deliver transparent, professional, and personalized service.",

            mission: "Our Mission",

            missionText:
                "To provide unparalleled real estate services through transparency, expertise, and a deep understanding of our clients' needs.",

            vision: "Our Vision",

            visionText:
                "To be the undisputed leader in UAE real estate, recognized for our integrity, innovation, and exceptional results.",

            servicesLabel: "What We Offer",
            servicesTitle: "Our Services",

            buyTitle: "Buy Property",
            buyText:
                "Find your dream home or next investment from our portfolio.",

            sellTitle: "Sell Property",
            sellText:
                "Get the best market value with our expert strategies.",

            rentTitle: "Rent & Lease",
            rentText:
                "Discover high-quality rental properties or find reliable tenants.",

            managementTitle:
                "Property Management",
            managementText:
                "Hassle-free professional management of your assets.",

            investmentTitle:
                "Investment Advisory",
            investmentText:
                "Data-driven insights to help build a profitable property portfolio.",

            valuationTitle: "Free Valuation",
            valuationText:
                "Accurate property valuations based on current market data.",

            teamLabel: "The Experts",
            teamTitle: "Meet The Team",

            teamDescription:
                "A dedicated team providing expertise and guidance throughout every step of your property journey across Dubai and Abu Dhabi.",

            viewProfile: "View Profile",
        };

    const services = [
        {
            title: text.buyTitle,
            description: text.buyText,
            icon: <HomeIcon />,
        },
        {
            title: text.sellTitle,
            description: text.sellText,
            icon: <TagIcon />,
        },
        {
            title: text.rentTitle,
            description: text.rentText,
            icon: <KeyIcon />,
        },
        {
            title: text.managementTitle,
            description:
                text.managementText,
            icon: <BuildingIcon />,
        },
        {
            title: text.investmentTitle,
            description:
                text.investmentText,
            icon: <ChartIcon />,
        },
        {
            title: text.valuationTitle,
            description:
                text.valuationText,
            icon: <ValuationIcon />,
        },
    ];

    return (
        <main
            className="relative z-10 overflow-hidden bg-[#1d2c41] text-white"
            dir={isArabic ? "rtl" : "ltr"}
        >

            {/* ==================================
          HERO
      =================================== */}

            <section className="relative min-h-[620px] overflow-hidden pt-[72px]">

                <img
                    src="/images/dubai-skyline.png"
                    alt="Dubai Skyline"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-[#0A1628]/65" />

                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/55 to-transparent" />

                <div className="relative mx-auto flex min-h-[548px] w-full max-w-[1280px] items-center px-4 md:px-6">

                    <div className="max-w-3xl">

                        <div className="mb-4 text-xs uppercase tracking-[0.3em] text-[#C9974C]">
                            {text.heroLabel}
                        </div>

                        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
                            {text.heroTitle}
                        </h1>

                        <p className="max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
                            {text.heroDescription}
                        </p>

                    </div>

                </div>

            </section>


            {/* ==================================
          FOUNDATION
      =================================== */}

            <section className="bg-[#1d2c41] py-24">

                <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-14 px-4 md:px-6 lg:grid-cols-2">

                    {/* TEXT */}

                    <div>

                        <div className="mb-3 text-xs uppercase tracking-[0.28em] text-[#C9974C]">
                            {text.foundationLabel}
                        </div>

                        <h2 className="mb-7 text-4xl font-bold md:text-5xl">
                            {text.foundationTitle}
                        </h2>

                        <p className="mb-5 text-base leading-8 text-white/65">
                            {text.foundationP1}
                        </p>

                        <p className="mb-10 text-base leading-8 text-white/65">
                            {text.foundationP2}
                        </p>


                        {/* MISSION */}

                        <div className="mb-6 flex items-start gap-4 border-t border-white/10 pt-6">

                            <CheckIcon />

                            <div>
                                <h3 className="mb-2 text-xl font-bold">
                                    {text.mission}
                                </h3>

                                <p className="text-sm leading-7 text-white/60">
                                    {text.missionText}
                                </p>
                            </div>

                        </div>


                        {/* VISION */}

                        <div className="flex items-start gap-4 border-t border-white/10 pt-6">

                            <CheckIcon />

                            <div>
                                <h3 className="mb-2 text-xl font-bold">
                                    {text.vision}
                                </h3>

                                <p className="text-sm leading-7 text-white/60">
                                    {text.visionText}
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* IMAGES */}

                    <div className="relative min-h-[520px]">

                        <img
                            src="/images/dubai-skyline.png"
                            alt="Dubai"
                            className="absolute right-0 top-0 h-[390px] w-[80%] object-cover"
                        />

                        <img
                            src="/images/abudhabi-skyline.png"
                            alt="Abu Dhabi"
                            className="absolute bottom-0 left-0 h-[290px] w-[58%] border-[8px] border-[#1d2c41] object-cover"
                        />

                    </div>

                </div>

            </section>


            {/* ==================================
          SERVICES
      =================================== */}

            <section className="bg-[#0A1628] py-24">

                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">

                    <div className="mx-auto mb-14 max-w-3xl text-center">

                        <div className="mb-3 text-xs uppercase tracking-[0.28em] text-[#C9974C]">
                            {text.servicesLabel}
                        </div>

                        <h2 className="text-4xl font-bold md:text-5xl">
                            {text.servicesTitle}
                        </h2>

                    </div>


                    <div className="grid grid-cols-1 gap-px overflow-hidden bg-white/10 md:grid-cols-2 lg:grid-cols-3">

                        {services.map(
                            (service) => (
                                <div
                                    key={service.title}
                                    className="group bg-[#0A1628] p-8 transition hover:bg-white/[0.035] md:p-10"
                                >

                                    <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#C9974C]/40 text-[#C9974C] transition group-hover:bg-[#C9974C] group-hover:text-[#0A1628]">
                                        {service.icon}
                                    </div>

                                    <h3 className="mb-4 text-xl font-bold">
                                        {service.title}
                                    </h3>

                                    <p className="text-sm leading-7 text-white/55">
                                        {service.description}
                                    </p>

                                </div>
                            )
                        )}

                    </div>

                </div>

            </section>


            {/* ==================================
          TEAM
      =================================== */}

            <section className="bg-[#1d2c41] py-24">

                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">

                    <div className="mx-auto mb-14 max-w-3xl text-center">

                        <div className="mb-3 text-xs uppercase tracking-[0.28em] text-[#C9974C]">
                            {text.teamLabel}
                        </div>

                        <h2 className="mb-5 text-4xl font-bold md:text-5xl">
                            {text.teamTitle}
                        </h2>

                        <p className="text-base leading-7 text-white/60">
                            {text.teamDescription}
                        </p>

                    </div>


                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        {team.map((member) => (
                            <Link
                                key={member.slug}
                                href={`/agents/${member.slug}`}
                                className="group overflow-hidden border border-white/15 bg-[#0A1628]/40"
                            >

                                <div className="relative h-[340px] overflow-hidden">

                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.05]"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />

                                </div>


                                <div className="p-6">

                                    <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#C9974C]">
                                        {isArabic
                                            ? member.roleAr
                                            : member.roleEn}
                                    </div>

                                    <h3 className="mb-5 text-2xl font-bold text-white">
                                        {member.name}
                                    </h3>

                                    <div className="flex items-center justify-between border-t border-white/10 pt-5 text-xs font-bold uppercase tracking-[0.12em] text-[#C9974C]">

                                        <span>
                                            {text.viewProfile}
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

                                    </div>

                                </div>

                            </Link>
                        ))}

                    </div>

                </div>

            </section>

        </main>
    );
}


/* ==================================
   ICONS
=================================== */

function CheckIcon() {
    return (
        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C9974C]/50 text-[#C9974C]">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
            >
                <path d="m5 12 4 4L19 6" />
            </svg>
        </div>
    );
}

function IconWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
        >
            {children}
        </svg>
    );
}

function HomeIcon() {
    return (
        <IconWrapper>
            <path d="M3 11 12 4l9 7" />
            <path d="M5 10v10h14V10" />
            <path d="M9 20v-6h6v6" />
        </IconWrapper>
    );
}

function TagIcon() {
    return (
        <IconWrapper>
            <path d="M20 13 11 22l-9-9V4h9z" />
            <circle cx="7.5" cy="8.5" r="1.5" />
        </IconWrapper>
    );
}

function KeyIcon() {
    return (
        <IconWrapper>
            <circle cx="8" cy="15" r="4" />
            <path d="m11 12 9-9" />
            <path d="m15 7 2 2" />
            <path d="m17 5 2 2" />
        </IconWrapper>
    );
}

function BuildingIcon() {
    return (
        <IconWrapper>
            <path d="M4 21V5h10v16" />
            <path d="M14 9h6v12" />
            <path d="M8 9h2" />
            <path d="M8 13h2" />
            <path d="M8 17h2" />
            <path d="M17 13h1" />
            <path d="M17 17h1" />
        </IconWrapper>
    );
}

function ChartIcon() {
    return (
        <IconWrapper>
            <path d="M4 19V9" />
            <path d="M10 19V5" />
            <path d="M16 19v-7" />
            <path d="M22 19H2" />
        </IconWrapper>
    );
}

function ValuationIcon() {
    return (
        <IconWrapper>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 6v12" />
            <path d="M15 9.5c0-1.1-1.3-2-3-2s-3 .9-3 2 1.3 2 3 2 3 .9 3 2-1.3 2-3 2-3-.9-3-2" />
        </IconWrapper>
    );
}