"use client";

import Link from "next/link";
import {
  MouseEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "../context/LanguageContext";

/* ======================================================
   ASSETS
   Agar image name different ho sirf yahan path change karo.
====================================================== */

const ASSETS = {
  hero: "/images/hero-bg.png",

  property1: "/images/penthouse.png",
  property2: "/images/modern-apartment.png",
  property3: "/images/luxury-villa.png",

  tower1: "/images/luxury-villa.png",
  tower2: "/images/penthouse.png",
  tower3: "/images/modern-apartment.png",

  location1: "/images/penthouse.png",
  location2: "/images/modern-apartment.png",
  location3: "/images/luxury-villa.png",
  location4: "/images/hero-bg.png",
};


/* ======================================================
   DATA
====================================================== */

const properties = [
  {
    number: "01",
    name: "One Palm Jumeirah",
    location: "Palm Jumeirah",
    price: "AED 8.9M",
    details: "3 Beds · 4 Baths · 2,830 SQ FT",
    image: ASSETS.property1,
  },
  {
    number: "02",
    name: "Marina Residence",
    location: "Dubai Marina",
    price: "AED 4.2M",
    details: "2 Beds · 3 Baths · 1,920 SQ FT",
    image: ASSETS.property2,
  },
  {
    number: "03",
    name: "Signature Villa",
    location: "Dubai Hills",
    price: "AED 12.5M",
    details: "5 Beds · 6 Baths · Private Pool",
    image: ASSETS.property3,
  },
];

const towers = [
  {
    number: "01",
    title: "Sobha One",
    location: "Dubai",
    price: "From AED 1.6M",
    completion: "2028",
    image: ASSETS.tower1,
  },
  {
    number: "02",
    title: "Bugatti Residences",
    location: "Business Bay",
    price: "From AED 19M",
    completion: "2027",
    image: ASSETS.tower2,
  },
  {
    number: "03",
    title: "The Future Skyline",
    location: "Downtown Dubai",
    price: "From AED 3.4M",
    completion: "2028",
    image: ASSETS.tower3,
  },
];

const locations = [
  {
    number: "01",
    name: "Palm Jumeirah",
    sub: "Iconic waterfront living",
    count: "38 residences",
    image: ASSETS.location1,
  },
  {
    number: "02",
    name: "Downtown Dubai",
    sub: "At the centre of everything",
    count: "64 residences",
    image: ASSETS.location2,
  },
  {
    number: "03",
    name: "Dubai Marina",
    sub: "Life on the waterfront",
    count: "52 residences",
    image: ASSETS.location3,
  },
  {
    number: "04",
    name: "Dubai Creek",
    sub: "A new perspective on Dubai",
    count: "29 residences",
    image: ASSETS.location4,
  },
];


/* ======================================================
   COMPONENT
====================================================== */

export default function LuxuryHomepage() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  /* HERO */

  const heroRef =
    useRef<HTMLElement | null>(null);

  const heroBgRef =
    useRef<HTMLDivElement | null>(null);

  const heroTitleRef =
    useRef<HTMLDivElement | null>(null);

  const heroIntroRef =
    useRef<HTMLDivElement | null>(null);

  const chapterOneRef =
    useRef<HTMLDivElement | null>(null);

  const chapterTwoRef =
    useRef<HTMLDivElement | null>(null);

  const chapterThreeRef =
    useRef<HTMLDivElement | null>(null);

  const searchRef =
    useRef<HTMLDivElement | null>(null);

  const progressRef =
    useRef<HTMLDivElement | null>(null);

  const searchTiltRef =
    useRef<HTMLDivElement | null>(null);


  /* TOWERS */

  const towersRef =
    useRef<HTMLElement | null>(null);

  const [activeTower, setActiveTower] =
    useState(0);


  /* LOCATIONS */

  const locationsRef =
    useRef<HTMLElement | null>(null);

  const [activeLocation, setActiveLocation] =
    useState(0);


  const { isArabic } = useLanguage();


  /* ====================================================
     GSAP MASTER SYSTEM
  ==================================================== */

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* --------------------------------
         GENERIC REVEALS
      -------------------------------- */

      gsap.utils
        .toArray<HTMLElement>(
          "[data-lux-reveal]"
        )
        .forEach((element) => {

          gsap.fromTo(
            element,
            {
              y: 70,
              opacity: 0,
              filter: "blur(7px)",
            },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",

              duration: 1.15,

              ease:
                "power4.out",

              scrollTrigger: {
                trigger: element,
                start:
                  "top 88%",
                toggleActions:
                  "play none none reverse",
              },
            }
          );

        });


      /* --------------------------------
         IMAGE PARALLAX
      -------------------------------- */

      gsap.utils
        .toArray<HTMLElement>(
          "[data-lux-parallax]"
        )
        .forEach((element) => {

          gsap.fromTo(
            element,
            {
              yPercent: -8,
              scale: 1.1,
            },
            {
              yPercent: 8,
              scale: 1.02,

              ease: "none",

              scrollTrigger: {
                trigger:
                  element.parentElement,

                start:
                  "top bottom",

                end:
                  "bottom top",

                scrub: 1,
              },
            }
          );

        });


      /* =================================================
         HERO CINEMATIC TIMELINE
      ================================================= */

      gsap.set(
        [
          chapterOneRef.current,
          chapterTwoRef.current,
          chapterThreeRef.current,
          searchRef.current,
        ],
        {
          autoAlpha: 0,
          y: 70,
        }
      );


      const heroTimeline =
        gsap.timeline({
          scrollTrigger: {
            trigger:
              heroRef.current,

            start:
              "top top",

            end:
              "bottom bottom",

            scrub:
              1.15,

            invalidateOnRefresh:
              true,
          },
        });


      heroTimeline

        .to(
          heroBgRef.current,
          {
            scale: 1.18,
            yPercent: 7,

            ease: "none",
            duration: 9,
          },
          0
        )

        .to(
          progressRef.current,
          {
            scaleX: 1,

            transformOrigin:
              "left center",

            ease: "none",
            duration: 10,
          },
          0
        )


        /* HERO TITLE LEAVES */

        .to(
          heroIntroRef.current,
          {
            opacity: 0,
            y: -45,

            duration: 0.7,
          },
          0.7
        )

        .to(
          heroTitleRef.current,
          {
            opacity: 0,

            y: -100,

            scale: 1.13,

            filter:
              "blur(10px)",

            duration: 1.3,
          },
          0.8
        )


        /* CHAPTER 1 */

        .to(
          chapterOneRef.current,
          {
            autoAlpha: 1,
            y: 0,

            duration: 1,
          },
          2
        )

        .to(
          chapterOneRef.current,
          {
            autoAlpha: 0,
            y: -70,

            filter:
              "blur(7px)",

            duration: 1,
          },
          3.5
        )


        /* CHAPTER 2 */

        .to(
          chapterTwoRef.current,
          {
            autoAlpha: 1,
            y: 0,

            duration: 1,
          },
          4
        )

        .to(
          chapterTwoRef.current,
          {
            autoAlpha: 0,
            y: -70,

            filter:
              "blur(7px)",

            duration: 1,
          },
          5.5
        )


        /* CHAPTER 3 */

        .to(
          chapterThreeRef.current,
          {
            autoAlpha: 1,
            y: 0,

            duration: 1,
          },
          6
        )

        .to(
          chapterThreeRef.current,
          {
            autoAlpha: 0,
            y: -55,

            filter:
              "blur(6px)",

            duration: 0.9,
          },
          7.4
        )


        /* INTELLIGENCE */

        .to(
          searchRef.current,
          {
            autoAlpha: 1,

            y: 0,

            scale: 1,

            duration: 1.3,

            ease:
              "power3.out",
          },
          7.8
        );


      /* =================================================
         TOWERS PINNED STORY
      ================================================= */

      ScrollTrigger.create({
        trigger:
          towersRef.current,

        start:
          "top top",

        end:
          "bottom bottom",

        onUpdate:
          (self) => {

            const progress =
              self.progress;

            if (
              progress <
              0.333
            ) {
              setActiveTower(0);
            } else if (
              progress <
              0.666
            ) {
              setActiveTower(1);
            } else {
              setActiveTower(2);
            }
          },
      });


      /* =================================================
         LOCATIONS IMMERSIVE STORY
      ================================================= */

      ScrollTrigger.create({
        trigger:
          locationsRef.current,

        start:
          "top top",

        end:
          "bottom bottom",

        onUpdate:
          (self) => {

            const value =
              Math.min(
                3,
                Math.floor(
                  self.progress *
                    4
                )
              );

            setActiveLocation(
              value
            );
          },
      });


      /* --------------------------------
         FLOATING DATA
      -------------------------------- */

      gsap.to(
        ".lux-float-a",
        {
          y: -20,
          x: 8,

          duration: 3,

          repeat: -1,
          yoyo: true,

          ease:
            "sine.inOut",
        }
      );


      gsap.to(
        ".lux-float-b",
        {
          y: 22,
          x: -10,

          duration: 4,

          repeat: -1,
          yoyo: true,

          ease:
            "sine.inOut",
        }
      );


    }, rootRef);


    return () => {
      ctx.revert();
    };

  }, []);


  /* ====================================================
     HERO 3D POINTER MOVEMENT
  ==================================================== */

  const handleHeroMove = (
    event: MouseEvent<HTMLElement>
  ) => {

    if (
      !searchTiltRef.current
    ) {
      return;
    }

    const rect =
      event.currentTarget
        .getBoundingClientRect();

    const x =
      (event.clientX -
        rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY -
        rect.top) /
        rect.height -
      0.5;


    gsap.to(
      searchTiltRef.current,
      {
        rotateY:
          x * 7,

        rotateX:
          y * -6,

        x:
          x * 10,

        y:
          y * 8,

        duration: 0.7,

        ease:
          "power3.out",
      }
    );


    gsap.to(
      ".lux-hero-glow",
      {
        x:
          x * 90,

        y:
          y * 60,

        duration:
          1.3,

        ease:
          "power3.out",
      }
    );

  };


  return (
    <div
      ref={rootRef}
      className="lux-home"
      dir={
        isArabic
          ? "rtl"
          : "ltr"
      }
    >

      {/* =================================================
          HERO
      ================================================= */}

      <section
        ref={heroRef}
        onMouseMove={
          handleHeroMove
        }
        className="lux-hero-scroll"
      >

        <div className="lux-hero-sticky">

          <div
            ref={heroBgRef}
            className="lux-hero-bg"
            style={{
              backgroundImage:
                `url(${ASSETS.hero})`,
            }}
          />

          <div className="lux-hero-dark" />
          <div className="lux-hero-vignette" />

          <div className="lux-hero-glow" />

          <div className="lux-noise" />


          {/* INITIAL HERO */}

          <div className="relative z-20 mx-auto flex h-full w-full max-w-[1500px] items-center px-6 md:px-10 lg:px-14">

            <div className="max-w-[1000px]">

              <div
                ref={heroIntroRef}
                className="mb-8 flex items-center gap-4"
              >

                <span className="h-px w-12 bg-[#c8a66b]" />

                <span className="text-[9px] font-medium uppercase tracking-[0.34em] text-white/45">
                  Dubai · Abu Dhabi · UAE
                </span>

              </div>


              <div
                ref={heroTitleRef}
              >

                <h1 className="lux-hero-title">

                  <span className="lux-hero-title-top">
                    Your Key to the
                  </span>

                  <span className="lux-hero-title-main">
                    UAE Skyline
                  </span>

                </h1>


                <p className="mt-8 max-w-xl text-[15px] leading-7 text-white/50 md:text-[17px] md:leading-8">
                  Exceptional property,
                  intelligent insight and
                  a clearer way to move
                  through the UAE market.
                </p>

              </div>

            </div>

          </div>


          {/* STORY CHAPTERS */}

          <HeroChapter
            refProp={
              chapterOneRef
            }
            number="01"
            label="DISCOVER"
            title="Exceptional"
            accent="addresses."
            text="Explore remarkable residences across the UAE's most desirable destinations."
            align="left"
          />


          <HeroChapter
            refProp={
              chapterTwoRef
            }
            number="02"
            label="UNDERSTAND"
            title="See the market"
            accent="more clearly."
            text="Property intelligence designed to give every move more context."
            align="right"
          />


          <HeroChapter
            refProp={
              chapterThreeRef
            }
            number="03"
            label="BELONG"
            title="Find somewhere"
            accent="worth staying."
            text="From iconic waterfront homes to the next generation of UAE communities."
            align="left"
          />


          {/* AI SEARCH */}

          <div
            ref={searchRef}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-5"
          >

            <div
              ref={
                searchTiltRef
              }
              className="lux-ai-panel pointer-events-auto"
            >

              <div className="mb-9 flex items-center justify-between">

                <div>

                  <div className="mb-2 flex items-center gap-2">

                    <span className="lux-ai-dot" />

                    <span className="text-[9px] uppercase tracking-[0.28em] text-[#d7b777]">
                      YourKey Intelligence
                    </span>

                  </div>

                  <p className="text-sm text-white/35">
                    Describe your ideal
                    property.
                  </p>

                </div>

                <span className="text-[9px] tracking-[0.2em] text-white/20">
                  04 / SEARCH
                </span>

              </div>


              <div className="border border-white/10 bg-white/[0.025] p-5 md:p-6">

                <p className="mb-2 text-[8px] uppercase tracking-[0.22em] text-white/25">
                  Ask YourKey
                </p>

                <div className="flex items-center justify-between gap-5">

                  <p className="text-sm leading-6 text-white/72 md:text-base">
                    Find a waterfront
                    2-bedroom residence in
                    Dubai Marina under AED
                    4M
                  </p>

                  <Link
                    href="/properties"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c8a66b] text-[#081017] transition hover:scale-110"
                  >
                    ↗
                  </Link>

                </div>

              </div>


              <div className="mt-5 flex flex-wrap gap-2">

                {[
                  "Palm Jumeirah",
                  "Dubai Marina",
                  "Off-Plan",
                  "AED 2M–5M",
                ].map(
                  (item) => (
                    <span
                      key={item}
                      className="border border-white/10 px-4 py-2 text-[8px] uppercase tracking-[0.16em] text-white/35"
                    >
                      {item}
                    </span>
                  )
                )}

              </div>

            </div>

          </div>


          {/* PROGRESS */}

          <div className="absolute bottom-0 left-0 right-0 z-40 h-px bg-white/[0.06]">

            <div
              ref={
                progressRef
              }
              className="h-full w-full scale-x-0 bg-gradient-to-r from-[#80623e] via-[#e3c58d] to-[#809eb1]"
            />

          </div>

        </div>

      </section>


      {/* =================================================
          SELECTED RESIDENCES
      ================================================= */}

      <section className="bg-[#ede8df] px-5 py-28 text-[#10161b] md:px-10 md:py-36 lg:px-14 lg:py-44">

        <div className="mx-auto max-w-[1500px]">

          <div
            data-lux-reveal
            className="mb-20 grid gap-10 lg:grid-cols-[1fr_.55fr] lg:items-end"
          >

            <div>

              <SectionLabel>
                01 / Selected Residences
              </SectionLabel>

              <h2 className="lux-light-title">
                Homes of
                <br />

                <span>
                  distinction.
                </span>
              </h2>

            </div>


            <div className="pb-2">

              <p className="max-w-md text-[15px] leading-7 text-black/50">
                A considered collection of
                remarkable properties across
                the UAE&apos;s most coveted
                addresses.
              </p>

              <Link
                href="/properties"
                className="mt-7 inline-flex items-center gap-4 text-[9px] font-semibold uppercase tracking-[0.2em]"
              >
                Explore all residences
                <span>↗</span>
              </Link>

            </div>

          </div>


          <div className="grid gap-5 lg:grid-cols-12">

            {properties.map(
              (
                property,
                index
              ) => (

                <Link
                  data-lux-reveal
                  href="/properties"
                  key={
                    property.name
                  }
                  className={`lux-property-card group ${
                    index === 0
                      ? "lg:col-span-7 lg:row-span-2 min-h-[670px]"
                      : "lg:col-span-5 min-h-[420px]"
                  }`}
                >

                  <img
                    data-lux-parallax
                    src={
                      property.image
                    }
                    alt={
                      property.name
                    }
                  />

                  <div className="lux-card-overlay" />


                  <div className="absolute left-6 top-6 z-10 flex items-center gap-3">

                    <span className="text-[9px] tracking-[0.2em] text-white/45">
                      {
                        property.number
                      }
                    </span>

                    <span className="h-px w-9 bg-white/25" />

                    <span className="text-[8px] uppercase tracking-[0.17em] text-white/35">
                      Residence
                    </span>

                  </div>


                  <div className="absolute bottom-0 left-0 right-0 z-10 p-7 md:p-9">

                    <p className="mb-3 text-[9px] uppercase tracking-[0.19em] text-[#d6b474]">
                      {
                        property.location
                      }
                    </p>

                    <div className="flex items-end justify-between gap-5">

                      <div>

                        <h3 className="text-2xl font-light tracking-[-0.035em] text-white md:text-3xl">
                          {
                            property.name
                          }
                        </h3>

                        <p className="mt-3 text-xs text-white/40">
                          {
                            property.details
                          }
                        </p>

                      </div>


                      <div className="text-right">

                        <p className="mb-4 text-lg font-light text-white">
                          {
                            property.price
                          }
                        </p>

                        <span className="lux-circle-arrow">
                          ↗
                        </span>

                      </div>

                    </div>

                  </div>

                </Link>

              )
            )}

          </div>

        </div>

      </section>


      {/* =================================================
          TOWERS — PINNED STORY
      ================================================= */}

      <section
        ref={towersRef}
        className="relative h-[330vh] bg-[#05080b]"
      >

        <div className="sticky top-0 h-screen overflow-hidden">

          {towers.map(
            (
              tower,
              index
            ) => (

              <div
                key={
                  tower.title
                }
                className={`absolute inset-0 transition-all duration-700 ${
                  activeTower ===
                  index
                    ? "opacity-100 scale-100"
                    : "pointer-events-none opacity-0 scale-[1.04]"
                }`}
              >

                <img
                  src={
                    tower.image
                  }
                  alt={
                    tower.title
                  }
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#05080b]/95 via-[#05080b]/65 to-[#05080b]/20" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#05080b] via-transparent to-black/20" />


                <div className="relative z-10 mx-auto flex h-full max-w-[1500px] items-center px-6 md:px-10 lg:px-14">

                  <div className="max-w-[720px]">

                    <SectionLabel dark>
                      {tower.number} /
                      Future Skyline
                    </SectionLabel>

                    <h2 className="lux-dark-title">
                      {
                        tower.title
                      }
                    </h2>

                    <p className="mt-6 text-sm uppercase tracking-[0.24em] text-[#d3b273]">
                      {
                        tower.location
                      }
                    </p>


                    <div className="mt-12 grid max-w-xl grid-cols-2 gap-8 border-t border-white/10 pt-7">

                      <div>

                        <span className="block text-[8px] uppercase tracking-[0.19em] text-white/30">
                          Starting
                        </span>

                        <span className="mt-2 block text-lg text-white">
                          {
                            tower.price
                          }
                        </span>

                      </div>

                      <div>

                        <span className="block text-[8px] uppercase tracking-[0.19em] text-white/30">
                          Completion
                        </span>

                        <span className="mt-2 block text-lg text-white">
                          {
                            tower.completion
                          }
                        </span>

                      </div>

                    </div>

                  </div>

                </div>


                <div className="absolute bottom-10 right-8 z-10 hidden text-right lg:block">

                  <p className="text-[7rem] font-light leading-none tracking-[-0.08em] text-white/[0.06]">
                    {
                      tower.number
                    }
                  </p>

                </div>

              </div>

            )
          )}


          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">

            {towers.map(
              (
                _,
                index
              ) => (

                <span
                  key={
                    index
                  }
                  className={`h-px transition-all duration-500 ${
                    activeTower ===
                    index
                      ? "w-16 bg-[#c8a66b]"
                      : "w-7 bg-white/20"
                  }`}
                />

              )
            )}

          </div>

        </div>

      </section>


      {/* =================================================
          RENT — LIGHT EDITORIAL PAUSE
      ================================================= */}

      <section className="bg-[#f2efe8] px-5 py-28 md:px-10 md:py-40 lg:px-14">

        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">

          <div data-lux-reveal>

            <SectionLabel>
              03 / Living
            </SectionLabel>

            <h2 className="lux-light-title">
              Places
              <br />

              <span>
                designed to live.
              </span>
            </h2>

            <p className="mt-8 max-w-sm text-[15px] leading-7 text-black/48">
              Long-term homes, waterfront
              apartments and contemporary
              residences across Dubai and
              Abu Dhabi.
            </p>

            <Link
              href="/properties?purpose=rent"
              className="mt-8 inline-flex items-center gap-4 text-[9px] font-semibold uppercase tracking-[0.2em]"
            >
              Explore rental homes
              <span>↗</span>
            </Link>

          </div>


          <div
            data-lux-reveal
            className="lux-perspective-card"
          >

            <img
              data-lux-parallax
              src={
                ASSETS.property2
              }
              alt="Luxury rental"
            />

            <div className="lux-card-overlay" />

            <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-10">

              <p className="text-[9px] uppercase tracking-[0.2em] text-[#e0c28c]">
                Dubai Marina
              </p>

              <h3 className="mt-3 text-3xl font-light text-white md:text-4xl">
                Waterfront living,
                reconsidered.
              </h3>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          BRAND STATEMENT
      ================================================= */}

      <section className="lux-statement">

        <div className="lux-statement-glow lux-float-a" />

        <div
          data-lux-reveal
          className="relative z-10 mx-auto max-w-[1300px] px-6 text-center"
        >

          <SectionLabel
            dark
            center
          >
            YourKey / UAE
          </SectionLabel>

          <h2 className="mt-8 text-[clamp(3rem,8vw,8rem)] font-light leading-[.91] tracking-[-0.065em] text-white">
            Real estate,
            <br />

            <span className="lux-serif-gold">
              with a clearer
            </span>

            <br />
            point of view.
          </h2>

        </div>

      </section>


      {/* =================================================
          MARKET INTELLIGENCE
      ================================================= */}

      <section className="relative overflow-hidden bg-[#07111a] px-5 py-32 text-white md:px-10 md:py-44 lg:px-14">

        <div className="lux-data-orb lux-float-a" />
        <div className="lux-data-orb-2 lux-float-b" />

        <div className="mx-auto grid max-w-[1500px] gap-20 lg:grid-cols-[.8fr_1.2fr] lg:items-center">

          <div data-lux-reveal>

            <SectionLabel dark>
              04 / Market Intelligence
            </SectionLabel>

            <h2 className="lux-dark-title">
              See the market
              <br />

              <span>
                before you move.
              </span>
            </h2>

            <p className="mt-8 max-w-md text-[15px] leading-7 text-white/45">
              Property data becomes more
              useful when it is easier to
              understand. Explore the signals
              shaping Dubai&apos;s most
              important communities.
            </p>


            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-9 border-t border-white/10 pt-8">

              <Metric
                value="2.8B+"
                label="AED Transaction Value"
              />

              <Metric
                value="4,500+"
                label="Properties"
              />

              <Metric
                value="12K+"
                label="Clients"
              />

              <Metric
                value="15+"
                label="Years in UAE"
              />

            </div>

          </div>


          <div
            data-lux-reveal
            className="lux-intelligence-map"
          >

            <div className="lux-map-grid" />

            <MarketNode
              className="left-[17%] top-[28%]"
              name="Palm"
              value="6.1%"
            />

            <MarketNode
              className="left-[52%] top-[22%]"
              name="Marina"
              value="6.8%"
            />

            <MarketNode
              className="left-[61%] top-[58%]"
              name="Downtown"
              value="7.2%"
            />

            <MarketNode
              className="left-[30%] top-[68%]"
              name="Business Bay"
              value="7.6%"
            />


            <div className="lux-map-ring lux-float-a" />
            <div className="lux-map-ring-small lux-float-b" />


            <div className="absolute bottom-7 left-7 border border-white/10 bg-[#09131d]/80 p-5 backdrop-blur-xl">

              <span className="text-[8px] uppercase tracking-[0.22em] text-white/30">
                Current signal
              </span>

              <p className="mt-3 text-lg">
                Waterfront demand
                <span className="ml-3 text-[#c9a96c]">
                  ↑
                </span>
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          LOCATIONS / SANCTUM STYLE
      ================================================= */}

      <section
        ref={
          locationsRef
        }
        className="relative h-[400vh] bg-black"
      >

        <div className="sticky top-0 h-screen overflow-hidden">

          {locations.map(
            (
              location,
              index
            ) => (

              <div
                key={
                  location.name
                }
                className={`absolute inset-0 transition-all duration-700 ${
                  activeLocation ===
                  index
                    ? "opacity-100 scale-100"
                    : "pointer-events-none opacity-0 scale-[1.04]"
                }`}
              >

                <img
                  src={
                    location.image
                  }
                  alt={
                    location.name
                  }
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/38" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/25" />

              </div>

            )
          )}


          <div className="relative z-10 mx-auto flex h-full max-w-[1500px] items-center px-6 md:px-10 lg:px-14">

            <div>

              <SectionLabel dark>
                05 / Destinations
              </SectionLabel>

              <span className="mt-8 block text-[10px] tracking-[0.25em] text-white/35">
                {
                  locations[
                    activeLocation
                  ].number
                }
              </span>

              <h2 className="mt-5 max-w-[900px] text-[clamp(3.8rem,9vw,9rem)] font-light leading-[.84] tracking-[-0.07em] text-white">

                {
                  locations[
                    activeLocation
                  ].name
                }

              </h2>

              <p className="mt-7 text-lg font-light text-white/58">
                {
                  locations[
                    activeLocation
                  ].sub
                }
              </p>

              <p className="mt-3 text-[9px] uppercase tracking-[0.22em] text-[#d7b576]">
                {
                  locations[
                    activeLocation
                  ].count
                }
              </p>

            </div>

          </div>


          <div className="absolute bottom-8 left-0 right-0 z-20">

            <div className="mx-auto flex max-w-[1500px] flex-wrap gap-5 px-6 md:px-10 lg:px-14">

              {locations.map(
                (
                  location,
                  index
                ) => (

                  <div
                    key={
                      location.name
                    }
                    className={`border-t pt-3 transition-all ${
                      activeLocation ===
                      index
                        ? "w-44 border-[#c8a66b] text-white"
                        : "w-28 border-white/15 text-white/35"
                    }`}
                  >

                    <span className="text-[8px] uppercase tracking-[0.16em]">
                      {
                        location.number
                      }{" "}
                      {
                        location.name
                      }
                    </span>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          SERVICES
      ================================================= */}

      <section className="bg-[#ede8df] px-5 py-28 text-[#111820] md:px-10 md:py-40 lg:px-14">

        <div className="mx-auto max-w-[1500px]">

          <div data-lux-reveal>

            <SectionLabel>
              06 / Bespoke Services
            </SectionLabel>

            <h2 className="lux-light-title max-w-[850px]">
              Every move,
              <br />

              <span>
                considered.
              </span>
            </h2>

          </div>


          <div className="mt-20">

            {[
              [
                "01",
                "Acquire",
                "Discover exceptional homes across the UAE.",
              ],
              [
                "02",
                "Sell",
                "Position your property for the right buyer.",
              ],
              [
                "03",
                "Lease",
                "Find a home that fits the way you live.",
              ],
              [
                "04",
                "Invest",
                "Move with greater market clarity.",
              ],
              [
                "05",
                "Manage",
                "Property care designed around ownership.",
              ],
            ].map(
              (
                service
              ) => (

                <Link
                  data-lux-reveal
                  href="/contact"
                  key={
                    service[1]
                  }
                  className="group grid gap-5 border-t border-black/12 py-8 transition hover:px-4 lg:grid-cols-[100px_.65fr_1fr_60px] lg:items-center"
                >

                  <span className="text-[9px] tracking-[0.18em] text-black/35">
                    {
                      service[0]
                    }
                  </span>

                  <span className="text-3xl font-light tracking-[-0.03em] md:text-4xl">
                    {
                      service[1]
                    }
                  </span>

                  <span className="max-w-md text-sm leading-6 text-black/45">
                    {
                      service[2]
                    }
                  </span>

                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">
                    ↗
                  </span>

                </Link>

              )
            )}

          </div>

        </div>

      </section>


      {/* =================================================
          TESTIMONIAL
      ================================================= */}

      <section className="relative overflow-hidden bg-[#05080b] px-6 py-36 text-white md:py-48">

        <div className="lux-review-glow lux-float-b" />

        <div
          data-lux-reveal
          className="relative z-10 mx-auto max-w-[1150px] text-center"
        >

          <SectionLabel
            dark
            center
          >
            07 / Client Perspective
          </SectionLabel>

          <span className="mt-10 block font-serif text-7xl leading-none text-[#c8a66b]/45">
            “
          </span>

          <blockquote className="mx-auto mt-1 max-w-[1000px] text-[clamp(2rem,4.7vw,4.8rem)] font-light leading-[1.08] tracking-[-0.045em] text-white/92">
            YourKey transformed what
            could have been a complicated
            property search into a clear,
            considered experience.
          </blockquote>

          <div className="mt-12">

            <p className="text-sm text-white">
              James Mitchell
            </p>

            <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-white/30">
              International Client · Dubai
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          FAQ
      ================================================= */}

      <FAQ />


      {/* =================================================
          VALUATION
      ================================================= */}

      <section className="lux-valuation">

        <img
          src={
            ASSETS.property3
          }
          alt="Property valuation"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#05080b]/68" />

        <div className="lux-valuation-glow" />


        <div
          data-lux-reveal
          className="relative z-10 mx-auto max-w-[1500px] px-6 py-36 md:px-10 md:py-48 lg:px-14"
        >

          <SectionLabel dark>
            09 / Valuation
          </SectionLabel>

          <h2 className="mt-7 max-w-[1000px] text-[clamp(3.3rem,8vw,8rem)] font-light leading-[.91] tracking-[-0.065em] text-white">
            Know what your
            <br />

            <span className="lux-serif-gold">
              property holds.
            </span>
          </h2>

          <div className="mt-10 flex flex-wrap items-center gap-6">

            <Link
              href="/contact"
              className="lux-gold-button"
            >
              Request valuation
              <span>↗</span>
            </Link>

            <span className="text-[9px] uppercase tracking-[0.18em] text-white/35">
              ✦ Data-informed market analysis
            </span>

          </div>

        </div>

      </section>


      {/* =================================================
          LUXURY FOOTER
      ================================================= */}

      <footer className="overflow-hidden bg-[#040609] px-6 pt-28 text-white md:px-10 md:pt-36 lg:px-14">

        <div className="mx-auto max-w-[1500px]">

          <div
            data-lux-reveal
            className="grid gap-16 border-b border-white/10 pb-20 lg:grid-cols-[1.1fr_.9fr]"
          >

            <div>

              <SectionLabel dark>
                Start a conversation
              </SectionLabel>

              <h2 className="mt-7 max-w-[780px] text-[clamp(3rem,6vw,6.4rem)] font-light leading-[.95] tracking-[-0.055em]">
                Ready for
                <br />

                <span className="lux-serif-gold">
                  what comes next?
                </span>
              </h2>

            </div>


            <div className="flex items-end lg:justify-end">

              <Link
                href="/contact"
                className="lux-big-circle"
              >
                <span>
                  Let&apos;s talk
                </span>

                <span>
                  ↗
                </span>
              </Link>

            </div>

          </div>


          <div className="grid gap-12 py-16 md:grid-cols-3">

            <div>

              <p className="text-sm leading-7 text-white/40">
                Property, intelligently
                matched to your ambitions
                across Dubai and Abu Dhabi.
              </p>

            </div>


            <div className="space-y-3 text-sm text-white/55">

              <Link
                className="block hover:text-[#c8a66b]"
                href="/properties"
              >
                Properties
              </Link>

              <Link
                className="block hover:text-[#c8a66b]"
                href="/communities"
              >
                Communities
              </Link>

              <Link
                className="block hover:text-[#c8a66b]"
                href="/investment"
              >
                Investment
              </Link>

              <Link
                className="block hover:text-[#c8a66b]"
                href="/about"
              >
                About
              </Link>

            </div>


            <div className="space-y-3 text-sm text-white/55 md:text-right">

              <p>
                Dubai · Abu Dhabi
              </p>

              <p>
                +971 50 669 2770
              </p>

              <p>
                main@yourkey.ae
              </p>

            </div>

          </div>


          <div className="select-none whitespace-nowrap text-center text-[clamp(5rem,15vw,15rem)] font-light leading-[.78] tracking-[-0.085em] text-white/[0.055]">
            YOURKEY
          </div>


          <div className="flex flex-col justify-between gap-4 border-t border-white/10 py-7 text-[8px] uppercase tracking-[0.17em] text-white/25 md:flex-row">

            <span>
              © 2026 YourKey
            </span>

            <span>
              Dubai · Abu Dhabi · UAE
            </span>

          </div>

        </div>

      </footer>

    </div>
  );
}


/* ======================================================
   HELPER COMPONENTS
====================================================== */

function HeroChapter({
  refProp,
  number,
  label,
  title,
  accent,
  text,
  align,
}: {
  refProp:
    React.RefObject<HTMLDivElement | null>;
  number: string;
  label: string;
  title: string;
  accent: string;
  text: string;
  align:
    | "left"
    | "right";
}) {

  return (
    <div
      ref={refProp}
      className={`pointer-events-none absolute top-1/2 z-20 w-[min(720px,82vw)] -translate-y-1/2 ${
        align === "right"
          ? "right-[7vw] text-right"
          : "left-[7vw]"
      }`}
    >

      <div
        className={`mb-6 flex items-center gap-4 ${
          align === "right"
            ? "justify-end"
            : ""
        }`}
      >

        <span className="text-[9px] tracking-[0.25em] text-[#d0ac68]">
          {number}
        </span>

        <span className="h-px w-12 bg-[#c8a66b]/55" />

        <span className="text-[8px] uppercase tracking-[0.25em] text-white/35">
          {label}
        </span>

      </div>


      <h2 className="text-[clamp(3rem,7vw,7rem)] font-light leading-[.88] tracking-[-0.06em] text-white">

        {title}

        <br />

        <span className="lux-serif-gold">
          {accent}
        </span>

      </h2>


      <p
        className={`mt-7 max-w-md text-[15px] leading-7 text-white/42 ${
          align === "right"
            ? "ml-auto"
            : ""
        }`}
      >
        {text}
      </p>

    </div>
  );
}


function SectionLabel({
  children,
  dark = false,
  center = false,
}: {
  children:
    React.ReactNode;
  dark?: boolean;
  center?: boolean;
}) {

  return (
    <div
      className={`flex items-center gap-4 ${
        center
          ? "justify-center"
          : ""
      }`}
    >

      <span
        className={`h-px w-10 ${
          dark
            ? "bg-[#c8a66b]"
            : "bg-[#96784a]"
        }`}
      />

      <span
        className={`text-[8px] font-semibold uppercase tracking-[0.25em] ${
          dark
            ? "text-white/40"
            : "text-black/42"
        }`}
      >
        {children}
      </span>

    </div>
  );
}


function Metric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {

  return (
    <div>

      <span className="block text-3xl font-light tracking-[-0.04em] text-white">
        {value}
      </span>

      <span className="mt-2 block text-[8px] uppercase tracking-[0.17em] text-white/28">
        {label}
      </span>

    </div>
  );
}


function MarketNode({
  className,
  name,
  value,
}: {
  className: string;
  name: string;
  value: string;
}) {

  return (
    <div
      className={`absolute ${className}`}
    >

      <div className="lux-node-pulse" />

      <div className="lux-node" />

      <div className="absolute left-5 top-[-8px] whitespace-nowrap border border-white/10 bg-[#09131d]/75 px-3 py-2 backdrop-blur-xl">

        <p className="text-[8px] uppercase tracking-[0.16em] text-white/38">
          {name}
        </p>

        <p className="mt-1 text-sm text-white">
          {value}
        </p>

      </div>

    </div>
  );
}


function FAQ() {
  const [
    open,
    setOpen,
  ] = useState(0);

  const questions = [
    [
      "Can foreigners buy property in Dubai?",
      "Yes. International buyers can purchase property in designated freehold areas across Dubai.",
    ],
    [
      "Can YourKey help with investment property?",
      "Yes. YourKey can help identify opportunities based on location, property type and investment objectives.",
    ],
    [
      "Do you work with off-plan developments?",
      "Yes. We work across ready and off-plan opportunities throughout Dubai and Abu Dhabi.",
    ],
    [
      "Can you assist with property valuation?",
      "Yes. Property valuation support can help owners better understand the current market position of their property.",
    ],
  ];

  return (
    <section className="bg-[#f2efe8] px-5 py-28 text-[#111820] md:px-10 md:py-40 lg:px-14">

      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[.7fr_1.3fr]">

        <div data-lux-reveal>

          <SectionLabel>
            08 / Questions
          </SectionLabel>

          <h2 className="lux-light-title">
            Questions,
            <br />

            <span>
              answered.
            </span>
          </h2>

        </div>


        <div>

          {questions.map(
            (
              item,
              index
            ) => (

              <div
                data-lux-reveal
                key={
                  item[0]
                }
                className="border-t border-black/12"
              >

                <button
                  onClick={() =>
                    setOpen(
                      open ===
                        index
                        ? -1
                        : index
                    )
                  }
                  className="flex w-full items-center justify-between gap-5 py-7 text-left"
                >

                  <div className="flex items-center gap-6">

                    <span className="text-[8px] tracking-[0.2em] text-black/30">
                      0
                      {index + 1}
                    </span>

                    <span className="text-lg font-light md:text-xl">
                      {
                        item[0]
                      }
                    </span>

                  </div>

                  <span className="text-xl font-light">
                    {
                      open ===
                      index
                        ? "−"
                        : "+"
                    }
                  </span>

                </button>


                <div
                  className={`grid transition-all duration-500 ${
                    open ===
                    index
                      ? "grid-rows-[1fr] pb-7"
                      : "grid-rows-[0fr]"
                  }`}
                >

                  <div className="overflow-hidden">

                    <p className="ml-12 max-w-xl text-sm leading-7 text-black/48">
                      {
                        item[1]
                      }
                    </p>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </section>
  );
}