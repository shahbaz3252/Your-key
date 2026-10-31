"use client";

import { useLanguage } from "../context/LanguageContext";

export default function ContactPage() {
    const { isArabic } = useLanguage();

    const text = isArabic
        ? {
            label: "تواصل معنا",
            title: "اتصل بنا",
            enquiry: "أرسل استفسارًا",
            fullName: "الاسم الكامل",
            emailAddress: "البريد الإلكتروني",
            phoneNumber: "رقم الهاتف",
            message: "الرسالة",
            submit: "إرسال الاستفسار",
            offices: "مكاتبنا",
            dubaiOffice: "مكتب دبي",
            dubaiAddress:
                "مكتب 17، الطابق 35، برج الصقر للأعمال، مركز دبي المالي العالمي، دبي، الإمارات العربية المتحدة",
            abuDhabiOffice: "مكتب أبوظبي",
            abuDhabiAddress:
                "مكتب M01، مبنى المنصوري، شارع الغيل، الدانة، أبوظبي، الإمارات العربية المتحدة",
            email: "البريد الإلكتروني",
        }
        : {
            label: "Reach Out",
            title: "Contact Us",
            enquiry: "Send an Enquiry",
            fullName: "Full Name",
            emailAddress: "Email Address",
            phoneNumber: "Phone Number",
            message: "Message",
            submit: "Submit Enquiry",
            offices: "Our Offices",
            dubaiOffice: "Dubai Office",
            dubaiAddress:
                "Office 17, 35th Floor, Al Saqr Business Tower, DIFC, Dubai, United Arab Emirates",
            abuDhabiOffice: "Abu Dhabi Office",
            abuDhabiAddress:
                "Office M01, Al Mansouri Building, Al Gheel Street, Al Danah, Abu Dhabi, United Arab Emirates",
            email: "Email",
        };

    return (
        <main
            className="relative z-10 min-h-screen bg-[#1d2c41] pb-24 pt-32 text-white"
            dir={isArabic ? "rtl" : "ltr"}
        >
            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">

                {/* PAGE HEADING */}
                <div className="mb-16 text-center">
                    <div className="mb-3 text-xs uppercase tracking-widest text-[#C9974C]">
                        {text.label}
                    </div>

                    <h1 className="text-4xl font-bold text-white md:text-5xl">
                        {text.title}
                    </h1>
                </div>

                {/* CONTENT */}
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">

                    {/* LEFT FORM */}
                    <div className="border border-white/15 bg-white/[0.045] p-8 backdrop-blur-md md:p-10">
                        <h2 className="mb-8 text-2xl font-bold text-white">
                            {text.enquiry}
                        </h2>

                        <form className="space-y-6">

                            <div className="space-y-2">
                                <label
                                    htmlFor="fullName"
                                    className="block text-[10px] uppercase tracking-widest text-white/50"
                                >
                                    {text.fullName}
                                </label>

                                <input
                                    id="fullName"
                                    type="text"
                                    name="fullName"
                                    className="w-full border border-white/20 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#C9974C]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="block text-[10px] uppercase tracking-widest text-white/50"
                                >
                                    {text.emailAddress}
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="w-full border border-white/20 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#C9974C]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="phone"
                                    className="block text-[10px] uppercase tracking-widest text-white/50"
                                >
                                    {text.phoneNumber}
                                </label>

                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    className="w-full border border-white/20 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#C9974C]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="message"
                                    className="block text-[10px] uppercase tracking-widest text-white/50"
                                >
                                    {text.message}
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="w-full resize-none border border-white/20 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#C9974C]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-4 flex w-full items-center justify-center rounded-lg bg-[#C9974C] px-4 py-4 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-colors hover:bg-[#b8863b]"
                            >
                                {text.submit}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT OFFICES */}
                    <div>
                        <h2 className="mb-8 text-2xl font-bold text-white">
                            {text.offices}
                        </h2>

                        <div className="space-y-8">

                            {/* DUBAI */}
                            <div className="border border-white/15 bg-white/[0.045] p-8 backdrop-blur-md">
                                <h3 className="mb-4 font-bold uppercase tracking-widest text-[#C9974C]">
                                    {text.dubaiOffice}
                                </h3>

                                <p className="mb-4 text-sm leading-relaxed text-white/70">
                                    {text.dubaiAddress}
                                </p>

                                <a
                                    href="tel:+971506692770"
                                    className="text-lg text-white transition-colors hover:text-[#C9974C]"
                                    dir="ltr"
                                >
                                    +971 50 669 2770
                                </a>
                            </div>

                            {/* ABU DHABI */}
                            <div className="border border-white/15 bg-white/[0.045] p-8 backdrop-blur-md">
                                <h3 className="mb-4 font-bold uppercase tracking-widest text-[#C9974C]">
                                    {text.abuDhabiOffice}
                                </h3>

                                <p className="mb-4 text-sm leading-relaxed text-white/70">
                                    {text.abuDhabiAddress}
                                </p>

                                <a
                                    href="tel:+971544517999"
                                    className="text-lg text-white transition-colors hover:text-[#C9974C]"
                                    dir="ltr"
                                >
                                    +971 54 451 7999
                                </a>
                            </div>

                            {/* EMAIL */}
                            <div className="border border-white/15 bg-white/[0.045] p-8 backdrop-blur-md">
                                <h3 className="mb-4 font-bold uppercase tracking-widest text-[#C9974C]">
                                    {text.email}
                                </h3>

                                <a
                                    href="mailto:main@yourkey.ae"
                                    className="text-lg text-white transition-colors hover:text-[#C9974C]"
                                    dir="ltr"
                                >
                                    main@yourkey.ae
                                </a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}