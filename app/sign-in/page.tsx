"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

type Tab =
    | "roi"
    | "mortgage"
    | "amortization"
    | "refinancing"
    | "rent-buy"
    | "affordability";

export default function InvestmentPage() {
    const { isArabic } = useLanguage();

    const [activeTab, setActiveTab] =
        useState<Tab>("roi");

    const [propertyPrice, setPropertyPrice] =
        useState(2500000);

    const [rentalYield, setRentalYield] =
        useState(6);

    const [appreciation, setAppreciation] =
        useState(5);

    const [serviceCosts, setServiceCosts] =
        useState(1.5);

    const [downPayment, setDownPayment] =
        useState(20);

    const [holdingPeriod, setHoldingPeriod] =
        useState(5);

    const text = isArabic
        ? {
            title: "أدوات الاستثمار",
            description:
                "رؤى قائمة على البيانات لتحليل عوائد الاستثمار ونمو رأس المال والعوائد الإيجارية والربحية الإجمالية.",
            roi: "محلل عائد الاستثمار",
            mortgage: "حاسبة الرهن العقاري",
            amortization: "جدول السداد",
            refinancing: "إعادة التمويل",
            rentBuy: "الإيجار مقابل الشراء",
            affordability:
                "القدرة على شراء العقار",
            roiTitle:
                "محلل عائد الاستثمار العقاري",
            roiDescription:
                "حلل العوائد المتوقعة لاستثمارك العقاري.",
            propertyPrice:
                "سعر العقار (درهم)",
            areaPreset: "المنطقة",
            dubai: "دبي",
            rentalYield:
                "العائد الإيجاري",
            appreciation:
                "ارتفاع قيمة رأس المال",
            serviceCosts:
                "رسوم الخدمة والتكاليف",
            downPayment:
                "الدفعة المقدمة",
            holdingPeriod:
                "مدة الاستثمار",
            years: "سنوات",
            totalROI: "إجمالي العائد",
            grossYield:
                "العائد الإجمالي",
            netYield: "صافي العائد",
            cashOnCash:
                "العائد النقدي",
            breakEven:
                "نقطة التعادل",
            exitValue:
                "القيمة المتوقعة عند البيع",
            totalProfit:
                "إجمالي صافي الربح",
            projected:
                "القيمة المتوقعة وحقوق الملكية",
            cumulative:
                "الإيجار التراكمي مقابل التكاليف",
            comingSoon:
                "هذه الأداة ستكون متاحة قريبًا.",
        }
        : {
            title: "Investment Tools",
            description:
                "Data-driven insights to model your returns from altitude. Visualize equity growth, rental yields, and overall profitability.",
            roi: "ROI Visualizer",
            mortgage:
                "Mortgage Calculator",
            amortization:
                "Amortization",
            refinancing:
                "Refinancing",
            rentBuy: "Rent vs Buy",
            affordability:
                "House Affordability",
            roiTitle:
                "Investment ROI Visualizer",
            roiDescription:
                "Model your expected property investment returns.",
            propertyPrice:
                "Property Price (AED)",
            areaPreset: "Area Preset",
            dubai: "Dubai",
            rentalYield:
                "Rental Yield",
            appreciation:
                "Capital Appreciation",
            serviceCosts:
                "Service Charge & Costs",
            downPayment:
                "Down Payment",
            holdingPeriod:
                "Holding Period",
            years: "Years",
            totalROI: "Total ROI",
            grossYield:
                "Gross Yield",
            netYield: "Net Yield",
            cashOnCash:
                "Cash on Cash",
            breakEven: "Break-Even",
            exitValue:
                "Projected Exit Value",
            totalProfit:
                "Total Net Profit",
            projected:
                "Projected Value & Equity",
            cumulative:
                "Cumulative Rent vs Costs",
            comingSoon:
                "This investment tool will be available shortly.",
        };

    const results = useMemo(() => {
        const years = holdingPeriod;

        const annualRent =
            propertyPrice *
            (rentalYield / 100);

        const annualCosts =
            propertyPrice *
            (serviceCosts / 100);

        const netAnnualRent =
            annualRent - annualCosts;

        const exitValue =
            propertyPrice *
            Math.pow(
                1 + appreciation / 100,
                years
            );

        const capitalGain =
            exitValue - propertyPrice;

        const totalNetRent =
            netAnnualRent * years;

        const totalProfit =
            capitalGain + totalNetRent;

        const investedCash =
            propertyPrice *
            (downPayment / 100);

        const totalROI =
            investedCash > 0
                ? (totalProfit /
                    investedCash) *
                100
                : 0;

        const netYield =
            propertyPrice > 0
                ? (netAnnualRent /
                    propertyPrice) *
                100
                : 0;

        const cashOnCash =
            investedCash > 0
                ? (netAnnualRent /
                    investedCash) *
                100
                : 0;

        const breakEven =
            netAnnualRent > 0
                ? investedCash /
                netAnnualRent
                : 0;

        return {
            annualRent,
            annualCosts,
            netAnnualRent,
            exitValue,
            totalProfit,
            totalROI,
            netYield,
            cashOnCash,
            breakEven,
        };
    }, [
        propertyPrice,
        rentalYield,
        appreciation,
        serviceCosts,
        downPayment,
        holdingPeriod,
    ]);

    const tabs: {
        key: Tab;
        label: string;
    }[] = [
            {
                key: "roi",
                label: text.roi,
            },
            {
                key: "mortgage",
                label: text.mortgage,
            },
            {
                key: "amortization",
                label: text.amortization,
            },
            {
                key: "refinancing",
                label: text.refinancing,
            },
            {
                key: "rent-buy",
                label: text.rentBuy,
            },
            {
                key: "affordability",
                label: text.affordability,
            },
        ];

    return (
        <main
            className="relative z-10 min-h-screen bg-[#1d2c41] pb-24 pt-32 text-white"
            dir={isArabic ? "rtl" : "ltr"}
        >
            <style jsx global>{`
        .investment-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 999px;
          outline: none;
        }

        .investment-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #0a1628;
          border: 2px solid #c9974c;
          cursor: pointer;
        }

        .investment-range::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #0a1628;
          border: 2px solid #c9974c;
          cursor: pointer;
        }
      `}</style>

            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">

                {/* HEADING */}

                <div className="mx-auto mb-12 max-w-3xl text-center">

                    <div className="mb-3 text-xs uppercase tracking-[0.28em] text-[#C9974C]">
                        {isArabic
                            ? "تحليل الاستثمار"
                            : "Investment Intelligence"}
                    </div>

                    <h1 className="mb-5 text-4xl font-bold md:text-5xl">
                        {text.title}
                    </h1>

                    <p className="text-base leading-7 text-white/65 md:text-lg">
                        {text.description}
                    </p>

                </div>


                {/* TABS */}

                <div className="mb-10 flex flex-wrap justify-center gap-2">

                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() =>
                                setActiveTab(tab.key)
                            }
                            className={`border px-4 py-3 text-xs font-bold transition ${activeTab === tab.key
                                    ? "border-[#C9974C] bg-[#C9974C] text-[#0A1628]"
                                    : "border-white/15 bg-white/[0.025] text-white/55 hover:border-[#C9974C]/60 hover:text-[#C9974C]"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}

                </div>


                {activeTab === "roi" ? (
                    <div>

                        {/* ROI HEADING */}

                        <div className="mb-8">

                            <h2 className="mb-2 text-3xl font-bold">
                                {text.roiTitle}
                            </h2>

                            <p className="text-white/55">
                                {text.roiDescription}
                            </p>

                        </div>


                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[390px_1fr]">

                            {/* CONTROLS */}

                            <div className="border border-white/15 bg-[#0A1628]/35 p-7">

                                <RangeControl
                                    label={
                                        text.propertyPrice
                                    }
                                    value={propertyPrice}
                                    min={500000}
                                    max={10000000}
                                    step={100000}
                                    display={`AED ${formatNumber(
                                        propertyPrice
                                    )}`}
                                    onChange={
                                        setPropertyPrice
                                    }
                                />

                                <div className="mb-7">
                                    <label className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-white/40">
                                        {text.areaPreset}
                                    </label>

                                    <select className="w-full border border-white/15 bg-[#0A1628] px-4 py-3 text-sm text-white outline-none">
                                        <option>
                                            {text.dubai}
                                        </option>
                                    </select>
                                </div>

                                <RangeControl
                                    label={text.rentalYield}
                                    value={rentalYield}
                                    min={2}
                                    max={12}
                                    step={0.1}
                                    display={`${rentalYield.toFixed(
                                        1
                                    )}%`}
                                    onChange={
                                        setRentalYield
                                    }
                                />

                                <RangeControl
                                    label={text.appreciation}
                                    value={appreciation}
                                    min={0}
                                    max={15}
                                    step={0.1}
                                    display={`${appreciation.toFixed(
                                        1
                                    )}%`}
                                    onChange={
                                        setAppreciation
                                    }
                                />

                                <RangeControl
                                    label={text.serviceCosts}
                                    value={serviceCosts}
                                    min={0}
                                    max={5}
                                    step={0.1}
                                    display={`${serviceCosts.toFixed(
                                        1
                                    )}%`}
                                    onChange={
                                        setServiceCosts
                                    }
                                />

                                <RangeControl
                                    label={text.downPayment}
                                    value={downPayment}
                                    min={10}
                                    max={100}
                                    step={5}
                                    display={`${downPayment}%`}
                                    onChange={
                                        setDownPayment
                                    }
                                />

                                <RangeControl
                                    label={text.holdingPeriod}
                                    value={holdingPeriod}
                                    min={1}
                                    max={20}
                                    step={1}
                                    display={`${holdingPeriod} ${text.years}`}
                                    onChange={
                                        setHoldingPeriod
                                    }
                                />

                            </div>


                            {/* RESULTS */}

                            <div>

                                <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-3">

                                    <ResultCard
                                        label={text.totalROI}
                                        value={`${results.totalROI.toFixed(
                                            1
                                        )}%`}
                                    />

                                    <ResultCard
                                        label={text.grossYield}
                                        value={`${rentalYield.toFixed(
                                            1
                                        )}%`}
                                    />

                                    <ResultCard
                                        label={text.netYield}
                                        value={`${results.netYield.toFixed(
                                            1
                                        )}%`}
                                    />

                                    <ResultCard
                                        label={text.cashOnCash}
                                        value={`${results.cashOnCash.toFixed(
                                            1
                                        )}%`}
                                    />

                                    <ResultCard
                                        label={text.breakEven}
                                        value={`${results.breakEven.toFixed(
                                            1
                                        )} ${text.years}`}
                                    />

                                    <ResultCard
                                        label={text.exitValue}
                                        value={`AED ${formatCompact(
                                            results.exitValue
                                        )}`}
                                    />

                                </div>


                                {/* PROFIT */}

                                <div className="mb-7 border border-[#C9974C]/35 bg-[#C9974C]/10 p-7">

                                    <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#C9974C]">
                                        {text.totalProfit}
                                    </div>

                                    <div
                                        className="text-3xl font-bold text-white"
                                        dir="ltr"
                                    >
                                        AED{" "}
                                        {formatNumber(
                                            Math.round(
                                                results.totalProfit
                                            )
                                        )}
                                    </div>

                                </div>


                                {/* CHART 1 */}

                                <div className="mb-7 border border-white/15 bg-[#0A1628]/30 p-7">

                                    <h3 className="mb-7 text-lg font-bold">
                                        {text.projected}
                                    </h3>

                                    <ProjectedChart
                                        propertyPrice={
                                            propertyPrice
                                        }
                                        appreciation={
                                            appreciation
                                        }
                                        years={
                                            holdingPeriod
                                        }
                                    />

                                </div>


                                {/* CHART 2 */}

                                <div className="border border-white/15 bg-[#0A1628]/30 p-7">

                                    <h3 className="mb-7 text-lg font-bold">
                                        {text.cumulative}
                                    </h3>

                                    <RentCostsChart
                                        annualRent={
                                            results.annualRent
                                        }
                                        annualCosts={
                                            results.annualCosts
                                        }
                                        years={
                                            holdingPeriod
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </div>
                ) : (
                    <div className="border border-white/15 bg-[#0A1628]/30 px-6 py-24 text-center">

                        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9974C]/40 text-[#C9974C]">
                            <ChartIcon />
                        </div>

                        <h2 className="mb-3 text-2xl font-bold">
                            {
                                tabs.find(
                                    (tab) =>
                                        tab.key === activeTab
                                )?.label
                            }
                        </h2>

                        <p className="text-white/50">
                            {text.comingSoon}
                        </p>

                    </div>
                )}

            </div>
        </main>
    );
}


function RangeControl({
    label,
    value,
    min,
    max,
    step,
    display,
    onChange,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    display: string;
    onChange: (value: number) => void;
}) {
    const percentage =
        ((value - min) / (max - min)) *
        100;

    return (
        <div className="mb-7">

            <div className="mb-3 flex items-center justify-between gap-4">

                <label className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                    {label}
                </label>

                <span
                    className="text-sm font-bold text-white"
                    dir="ltr"
                >
                    {display}
                </span>

            </div>

            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) =>
                    onChange(
                        Number(event.target.value)
                    )
                }
                className="investment-range"
                style={{
                    background: `linear-gradient(to right, #0A1628 0%, #0A1628 ${percentage}%, #E5E5E5 ${percentage}%, #E5E5E5 100%)`,
                }}
            />

        </div>
    );
}


function ResultCard({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-[14px] border border-white/15 bg-[#0A1628]/35 p-5">

            <div className="mb-2 text-[9px] uppercase tracking-[0.14em] text-white/40">
                {label}
            </div>

            <div
                className="text-xl font-bold text-white"
                dir="ltr"
            >
                {value}
            </div>

        </div>
    );
}


function ProjectedChart({
    propertyPrice,
    appreciation,
    years,
}: {
    propertyPrice: number;
    appreciation: number;
    years: number;
}) {
    const chartYears =
        Array.from(
            {
                length: Math.min(
                    years + 1,
                    8
                ),
            },
            (_, index) => index
        );

    const maxValue =
        propertyPrice *
        Math.pow(
            1 + appreciation / 100,
            years
        );

    return (
        <div className="flex h-[220px] items-end gap-3">

            {chartYears.map((year) => {
                const value =
                    propertyPrice *
                    Math.pow(
                        1 + appreciation / 100,
                        year
                    );

                const height =
                    Math.max(
                        (value / maxValue) * 100,
                        10
                    );

                return (
                    <div
                        key={year}
                        className="flex h-full flex-1 flex-col justify-end"
                    >

                        <div
                            className="w-full bg-[#C9974C]/70 transition-all"
                            style={{
                                height: `${height}%`,
                            }}
                        />

                        <div className="mt-2 text-center text-[9px] text-white/35">
                            Y{year}
                        </div>

                    </div>
                );
            })}

        </div>
    );
}


function RentCostsChart({
    annualRent,
    annualCosts,
    years,
}: {
    annualRent: number;
    annualCosts: number;
    years: number;
}) {
    const rent =
        annualRent * years;

    const costs =
        annualCosts * years;

    const maxValue =
        Math.max(rent, costs, 1);

    return (
        <div className="space-y-6">

            <Bar
                label="Rent"
                value={rent}
                max={maxValue}
            />

            <Bar
                label="Costs"
                value={costs}
                max={maxValue}
            />

        </div>
    );
}


function Bar({
    label,
    value,
    max,
}: {
    label: string;
    value: number;
    max: number;
}) {
    const width =
        (value / max) * 100;

    return (
        <div>

            <div className="mb-2 flex items-center justify-between text-xs">

                <span className="text-white/50">
                    {label}
                </span>

                <span
                    className="font-bold text-white"
                    dir="ltr"
                >
                    AED {formatCompact(value)}
                </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">

                <div
                    className="h-full rounded-full bg-[#C9974C]"
                    style={{
                        width: `${width}%`,
                    }}
                />

            </div>

        </div>
    );
}


function ChartIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
        >
            <path d="M4 19V9" />
            <path d="M10 19V5" />
            <path d="M16 19v-7" />
            <path d="M22 19H2" />
        </svg>
    );
}


function formatNumber(
    number: number
) {
    return new Intl.NumberFormat(
        "en-US"
    ).format(number);
}


function formatCompact(
    number: number
) {
    if (number >= 1000000) {
        return `${(
            number / 1000000
        ).toFixed(2)}M`;
    }

    if (number >= 1000) {
        return `${(
            number / 1000
        ).toFixed(0)}K`;
    }

    return number.toFixed(0);
}