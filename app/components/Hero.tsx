"use client";

import { FormEvent, MouseEvent, forwardRef, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";

type Purpose = "sale" | "rent" | "off-plan";

export default function Hero() {
  const router = useRouter();
  const { isArabic } = useLanguage();

  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const chapter1Ref = useRef<HTMLDivElement | null>(null);
  const chapter2Ref = useRef<HTMLDivElement | null>(null);
  const chapter3Ref = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [purpose, setPurpose] = useState<Purpose>("sale");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [community, setCommunity] = useState("");
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const text = isArabic
    ? {
        eyebrow: "عقارات دبي وأبوظبي",
        titleTop: "مفتاحك إلى",
        titleBottom: "أفق الإمارات",
        description: "اكتشف منازل استثنائية وفرصًا استثمارية في أكثر المواقع تميزًا في الإمارات.",
        intelligence: "YOURKEY INTELLIGENCE",
        prompt: "أين تريد أن تبدأ رحلتك العقارية؟",
        buy: "شراء",
        rent: "إيجار",
        offPlan: "قيد الإنشاء",
        propertyType: "نوع العقار",
        bedrooms: "غرف النوم",
        community: "المنطقة",
        explore: "استكشف العقارات",
        allTypes: "جميع الأنواع",
        apartment: "شقة",
        villa: "فيلا",
        townhouse: "تاون هاوس",
        penthouse: "بنتهاوس",
        anyBedrooms: "أي عدد",
        oneBed: "غرفة واحدة",
        twoBeds: "غرفتان",
        threeBeds: "3 غرف",
        fourBeds: "4+ غرف",
        anyCommunity: "أي منطقة",
      }
    : {
        eyebrow: "DUBAI · ABU DHABI · UAE",
        titleTop: "Your Key to the",
        titleBottom: "UAE Skyline",
        description: "Discover exceptional homes, emerging addresses and intelligent property opportunities across the UAE.",
        intelligence: "YOURKEY INTELLIGENCE",
        prompt: "Where should your property journey begin?",
        buy: "Buy",
        rent: "Rent",
        offPlan: "Off-Plan",
        propertyType: "Property Type",
        bedrooms: "Bedrooms",
        community: "Community",
        explore: "Explore Properties",
        allTypes: "All Types",
        apartment: "Apartment",
        villa: "Villa",
        townhouse: "Townhouse",
        penthouse: "Penthouse",
        anyBedrooms: "Any Bedrooms",
        oneBed: "1 Bedroom",
        twoBeds: "2 Bedrooms",
        threeBeds: "3 Bedrooms",
        fourBeds: "4+ Bedrooms",
        anyCommunity: "Any Community",
      };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set([chapter1Ref.current, chapter2Ref.current, chapter3Ref.current], {
        autoAlpha: 0,
        y: 70,
        filter: "blur(8px)",
      });
      gsap.set(searchRef.current, { autoAlpha: 0, y: 70, scale: 0.94 });
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(bgRef.current, { scale: 1.18, yPercent: 6, ease: "none", duration: 9 }, 0)
        .to(progressRef.current, { scaleX: 1, ease: "none", duration: 9 }, 0)
        .to(introRef.current, { autoAlpha: 0, y: -90, scale: 1.06, filter: "blur(8px)", duration: 1.2 }, 0.8)
        .to(chapter1Ref.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1 }, 1.9)
        .to(chapter1Ref.current, { autoAlpha: 0, y: -65, filter: "blur(7px)", duration: 1 }, 3.1)
        .to(chapter2Ref.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1 }, 3.7)
        .to(chapter2Ref.current, { autoAlpha: 0, y: -65, filter: "blur(7px)", duration: 1 }, 5)
        .to(chapter3Ref.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1 }, 5.6)
        .to(chapter3Ref.current, { autoAlpha: 0, y: -55, filter: "blur(6px)", duration: 0.9 }, 6.9)
        .to(searchRef.current, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2 }, 7.25);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    if (purpose === "off-plan") {
      router.push("/off-plan");
      return;
    }
    const params = new URLSearchParams();
    params.set("purpose", purpose);
    if (propertyType) params.set("propertyType", propertyType);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (community) params.set("community", community);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section ref={heroRef} className="yk-hero-scroll" dir={isArabic ? "rtl" : "ltr"} onMouseMove={handleMouseMove}>
      <div className="yk-hero-sticky">
        <div
          ref={bgRef}
          className="yk-hero-bg"
          style={{ transform: `scale(1.07) translate3d(${pointer.x * -10}px, ${pointer.y * -7}px, 0)` }}
        />
        <div className="yk-hero-overlay" />
        <div className="yk-hero-vignette" />
        <div className="yk-noise" />
        <div className="yk-hero-orb yk-hero-orb-one" />
        <div className="yk-hero-orb yk-hero-orb-two" />

        <div ref={introRef} className="absolute inset-0 z-20 mx-auto flex w-full max-w-[1440px] items-end px-5 pb-14 pt-32 md:px-8 md:pb-20 lg:px-12">
          <div className="max-w-[920px]">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-10 bg-[#c8a66b]" />
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/55 md:text-[11px]">{text.eyebrow}</p>
            </div>
            <h1 className="yk-hero-title">
              <span className="yk-hero-title-small">{text.titleTop}</span>
              <span className="yk-hero-title-large">{text.titleBottom}</span>
            </h1>
            <p className="mt-7 max-w-xl text-[15px] leading-7 text-white/60 md:text-[17px] md:leading-8">{text.description}</p>
            <div className="mt-10 flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] text-white/35">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20"><span className="h-1.5 w-1.5 rounded-full bg-[#c8a66b]" /></span>
              Scroll to discover
            </div>
          </div>
        </div>

        <Chapter ref={chapter1Ref} number="01" label="Discover" title={<>Exceptional<br/><em>addresses.</em></>} body="Explore remarkable homes across Dubai and Abu Dhabi's most coveted destinations." align="left" />
        <Chapter ref={chapter2Ref} number="02" label="Invest" title={<>See opportunity<br/><em>before others.</em></>} body="Property intelligence for clearer investment decisions across the UAE." align="right" />
        <Chapter ref={chapter3Ref} number="03" label="Belong" title={<>Find somewhere<br/><em>worth staying.</em></>} body="From waterfront residences to landmark communities." align="left" />

        <div ref={searchRef} className="absolute inset-0 z-30 flex items-center justify-center px-5 pt-20 md:px-8">
          <div className="yk-intelligence-panel w-full max-w-[760px]">
            <div className="mb-7 flex items-start justify-between gap-6">
              <div>
                <div className="mb-2 flex items-center gap-2"><span className="yk-ai-dot"/><span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#d8b87c]">{text.intelligence}</span></div>
                <h2 className="max-w-xl text-2xl font-light tracking-[-0.03em] text-white md:text-4xl">{text.prompt}</h2>
              </div>
              <span className="hidden text-[10px] text-white/25 sm:block">04 / SEARCH</span>
            </div>

            <div className="mb-6 flex gap-1 border-b border-white/10">
              <PurposeButton active={purpose === "sale"} onClick={() => setPurpose("sale")}>{text.buy}</PurposeButton>
              <PurposeButton active={purpose === "rent"} onClick={() => setPurpose("rent")}>{text.rent}</PurposeButton>
              <PurposeButton active={purpose === "off-plan"} onClick={() => setPurpose("off-plan")}>{text.offPlan}</PurposeButton>
            </div>

            <form onSubmit={handleSearch} className="space-y-3">
              <IntelligenceSelect label={text.propertyType} value={propertyType} onChange={setPropertyType}>
                <option value="">{text.allTypes}</option><option value="Apartments">{text.apartment}</option><option value="Villas">{text.villa}</option><option value="Townhouses">{text.townhouse}</option><option value="Penthouse">{text.penthouse}</option>
              </IntelligenceSelect>
              <div className="grid gap-3 sm:grid-cols-2">
                <IntelligenceSelect label={text.bedrooms} value={bedrooms} onChange={setBedrooms}>
                  <option value="">{text.anyBedrooms}</option><option value="1">{text.oneBed}</option><option value="2">{text.twoBeds}</option><option value="3">{text.threeBeds}</option><option value="4">{text.fourBeds}</option>
                </IntelligenceSelect>
                <IntelligenceSelect label={text.community} value={community} onChange={setCommunity}>
                  <option value="">{text.anyCommunity}</option><option value="Dubai Marina">Dubai Marina</option><option value="Downtown Dubai">Downtown Dubai</option><option value="Palm Jumeirah">Palm Jumeirah</option><option value="Saadiyat Island">Saadiyat Island</option><option value="Yas Island">Yas Island</option>
                </IntelligenceSelect>
              </div>
              <button type="submit" className="yk-primary-button group mt-3"><span>{text.explore}</span><span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></button>
            </form>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-40 h-[2px] bg-white/[0.05]"><div ref={progressRef} className="h-full w-full bg-gradient-to-r from-[#8c7047] via-[#e0bd7e] to-[#8ca7b8]" /></div>
      </div>
    </section>
  );
}

const Chapter = forwardRef<HTMLDivElement, {number:string; label:string; title:React.ReactNode; body:string; align:"left"|"right"}>(function Chapter({number,label,title,body,align}, ref) {
  return (
    <div ref={ref} className={`yk-scroll-chapter ${align === "right" ? "yk-scroll-chapter-right" : "yk-scroll-chapter-left"}`}>
      <div className={`mb-5 flex items-center gap-4 ${align === "right" ? "justify-end" : ""}`}><span className="text-[10px] tracking-[0.25em] text-[#c8a66b]">{number}</span><span className="h-px w-12 bg-[#c8a66b]/60"/><span className="text-[9px] uppercase tracking-[0.25em] text-white/40">{label}</span></div>
      <h2>{title}</h2><p>{body}</p>
    </div>
  );
});

function PurposeButton({children,active,onClick}:{children:React.ReactNode;active:boolean;onClick:()=>void}) {
  return <button type="button" onClick={onClick} className={`relative px-4 pb-4 pt-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors ${active ? "text-white" : "text-white/35 hover:text-white/70"}`}>{children}<span className={`absolute bottom-0 left-0 h-px bg-[#c8a66b] transition-all duration-500 ${active ? "w-full" : "w-0"}`}/></button>;
}

function IntelligenceSelect({label,value,onChange,children}:{label:string;value:string;onChange:(value:string)=>void;children:React.ReactNode}) {
  return <label className="group block border border-white/[0.08] bg-white/[0.025] px-4 py-3.5 transition hover:border-white/15 hover:bg-white/[0.04]"><span className="mb-1.5 block text-[8px] uppercase tracking-[0.2em] text-white/30">{label}</span><select value={value} onChange={(event)=>onChange(event.target.value)} className="w-full appearance-none bg-transparent text-sm text-white outline-none">{children}</select></label>;
}
