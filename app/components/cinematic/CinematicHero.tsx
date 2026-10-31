"use client";

import Link from "next/link";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  useLanguage,
} from "../../context/LanguageContext";

import "./CinematicHero.css";


/* ==========================================================
   VIDEO CONFIG
========================================================== */

const SCENE_ONE_END = 0.5;

const SEEK_INTERVAL = 0;
const SEEK_THRESHOLD = 0.012;

const BLEND_START = 0.4985;
const BLEND_END = 0.5015;


/* ==========================================================
   TYPES
========================================================== */

type ScrubVideoState = {
  seeking: boolean;
  pendingTime: number | null;
  lastSeekAt: number;
  duration: number;
  ready: boolean;
};


/* ==========================================================
   COMPONENT
========================================================== */

export default function CinematicHero() {

  const {
    language,
    isArabic,
    t,
  } = useLanguage();


  const sectionRef =
    useRef<HTMLElement | null>(
      null
    );


  const sceneOneVideoRef =
    useRef<HTMLVideoElement | null>(
      null
    );


  const sceneTwoVideoRef =
    useRef<HTMLVideoElement | null>(
      null
    );


  const sceneOneRef =
    useRef<HTMLDivElement | null>(
      null
    );


  const sceneTwoRef =
    useRef<HTMLDivElement | null>(
      null
    );


  const finaleRef =
    useRef<HTMLDivElement | null>(
      null
    );


  const searchRef =
    useRef<HTMLDivElement | null>(
      null
    );


  const progressRef =
    useRef<HTMLDivElement | null>(
      null
    );


  const targetProgressRef =
    useRef(0);


  const smoothProgressRef =
    useRef(0);


  const rafRef =
    useRef<number | null>(
      null
    );


  const [
    propertyMode,
    setPropertyMode,
  ] =
    useState<
      "buy" |
      "rent" |
      "off-plan"
    >("buy");


  /* ========================================================
     VIDEO STATE
  ======================================================== */

  const sceneOneStateRef =
    useRef<ScrubVideoState>({
      seeking: false,
      pendingTime: null,
      lastSeekAt: 0,
      duration: 1,
      ready: false,
    });


  const sceneTwoStateRef =
    useRef<ScrubVideoState>({
      seeking: false,
      pendingTime: null,
      lastSeekAt: 0,
      duration: 1,
      ready: false,
    });


  /* ========================================================
     SAFE SEEK
  ======================================================== */

  const getSafeSeekTime = (
    video: HTMLVideoElement,
    requestedTime: number
  ) => {

    const duration =
      Number.isFinite(
        video.duration
      )
        ? video.duration
        : 0;


    if (
      duration <= 0
    ) {
      return null;
    }


    const clampedTime =
      Math.max(
        0,
        Math.min(
          requestedTime,
          Math.max(
            duration - 0.025,
            0
          )
        )
      );


    if (
      video.seekable.length >
      0
    ) {

      for (
        let i = 0;
        i <
        video.seekable.length;
        i++
      ) {

        const start =
          video.seekable.start(i);


        const end =
          video.seekable.end(i);


        if (
          clampedTime >=
            start &&
          clampedTime <=
            end
        ) {
          return clampedTime;
        }
      }


      let nearest =
        video.seekable.start(0);


      let nearestDistance =
        Math.abs(
          clampedTime -
            nearest
        );


      for (
        let i = 0;
        i <
        video.seekable.length;
        i++
      ) {

        const start =
          video.seekable.start(i);


        const end =
          video.seekable.end(i);


        const candidates = [
          start,
          Math.max(
            start,
            end - 0.025
          ),
        ];


        candidates.forEach(
          candidate => {

            const distance =
              Math.abs(
                clampedTime -
                  candidate
              );


            if (
              distance <
              nearestDistance
            ) {

              nearest =
                candidate;

              nearestDistance =
                distance;
            }
          }
        );
      }


      return nearest;
    }


    if (
      video.readyState >= 1
    ) {
      return clampedTime;
    }


    return null;
  };


  /* ========================================================
     CONTROLLED SEEK
  ======================================================== */

  const requestVideoSeek = (
    video: HTMLVideoElement,
    state: ScrubVideoState,
    requestedTime: number,
    force = false
  ) => {

    if (
      !state.ready ||
      video.readyState <
        1
    ) {

      state.pendingTime =
        requestedTime;

      return;
    }


    const safeTime =
      getSafeSeekTime(
        video,
        requestedTime
      );


    if (
      safeTime ===
      null
    ) {

      state.pendingTime =
        requestedTime;

      return;
    }


    const difference =
      Math.abs(
        video.currentTime -
          safeTime
      );


    if (
      !force &&
      difference <
        SEEK_THRESHOLD
    ) {
      return;
    }


    if (
      state.seeking
    ) {

      state.pendingTime =
        requestedTime;

      return;
    }


    const now =
      performance.now();


    if (
      !force &&
      now -
        state.lastSeekAt <
        SEEK_INTERVAL
    ) {

      state.pendingTime =
        requestedTime;

      return;
    }


    state.seeking =
      true;

    state.pendingTime =
      null;

    state.lastSeekAt =
      now;


    try {

const fv = video as HTMLVideoElement & {
  fastSeek?: (time: number) => void;
};

if (typeof fv.fastSeek === "function") {
  fv.fastSeek(safeTime);
} else {
  video.currentTime = safeTime;
}

    } catch {

      state.seeking =
        false;

      state.pendingTime =
        requestedTime;
    }
  };


  /* ========================================================
     VIDEO PREPARATION
  ======================================================== */

  useEffect(() => {

    const videoOne =
      sceneOneVideoRef.current;


    const videoTwo =
      sceneTwoVideoRef.current;


    if (
      !videoOne ||
      !videoTwo
    ) {
      return;
    }


    const oneState =
      sceneOneStateRef.current;


    const twoState =
      sceneTwoStateRef.current;


    const handleOneMetadata =
      () => {

        oneState.duration =
          Math.max(
            videoOne.duration,
            0.1
          );


        oneState.ready =
          true;


        requestVideoSeek(
          videoOne,
          oneState,
          0.01,
          true
        );
      };


    const handleTwoMetadata =
      () => {

        twoState.duration =
          Math.max(
            videoTwo.duration,
            0.1
          );


        twoState.ready =
          true;


        requestVideoSeek(
          videoTwo,
          twoState,
          0.01,
          true
        );
      };


    const handleOneSeeked =
      () => {

        oneState.seeking =
          false;


        const pending =
          oneState.pendingTime;


        if (
          pending !==
          null
        ) {

          oneState.pendingTime =
            null;


          requestVideoSeek(
            videoOne,
            oneState,
            pending,
            true
          );
        }
      };


    const handleTwoSeeked =
      () => {

        twoState.seeking =
          false;


        const pending =
          twoState.pendingTime;


        if (
          pending !==
          null
        ) {

          twoState.pendingTime =
            null;


          requestVideoSeek(
            videoTwo,
            twoState,
            pending,
            true
          );
        }
      };


    const flushOnePending =
      () => {

        const pending =
          oneState.pendingTime;


        if (
          pending !==
            null &&
          !oneState.seeking
        ) {

          requestVideoSeek(
            videoOne,
            oneState,
            pending,
            true
          );
        }
      };


    const flushTwoPending =
      () => {

        const pending =
          twoState.pendingTime;


        if (
          pending !==
            null &&
          !twoState.seeking
        ) {

          requestVideoSeek(
            videoTwo,
            twoState,
            pending,
            true
          );
        }
      };


    videoOne.addEventListener(
      "loadedmetadata",
      handleOneMetadata
    );


    videoTwo.addEventListener(
      "loadedmetadata",
      handleTwoMetadata
    );


    videoOne.addEventListener(
      "seeked",
      handleOneSeeked
    );


    videoTwo.addEventListener(
      "seeked",
      handleTwoSeeked
    );


    videoOne.addEventListener(
      "canplay",
      flushOnePending
    );


    videoTwo.addEventListener(
      "canplay",
      flushTwoPending
    );


    videoOne.addEventListener(
      "progress",
      flushOnePending
    );


    videoTwo.addEventListener(
      "progress",
      flushTwoPending
    );


    videoOne.muted =
      true;

    videoTwo.muted =
      true;


    videoOne.playsInline =
      true;

    videoTwo.playsInline =
      true;


    videoOne.preload =
      "auto";

    videoTwo.preload =
      "auto";


    videoOne.pause();

    videoTwo.pause();


    videoOne.load();

    videoTwo.load();


    if (
      videoOne.readyState >=
      1
    ) {
      handleOneMetadata();
    }


    if (
      videoTwo.readyState >=
      1
    ) {
      handleTwoMetadata();
    }


    return () => {

      videoOne.removeEventListener(
        "loadedmetadata",
        handleOneMetadata
      );


      videoTwo.removeEventListener(
        "loadedmetadata",
        handleTwoMetadata
      );


      videoOne.removeEventListener(
        "seeked",
        handleOneSeeked
      );


      videoTwo.removeEventListener(
        "seeked",
        handleTwoSeeked
      );


      videoOne.removeEventListener(
        "canplay",
        flushOnePending
      );


      videoTwo.removeEventListener(
        "canplay",
        flushTwoPending
      );


      videoOne.removeEventListener(
        "progress",
        flushOnePending
      );


      videoTwo.removeEventListener(
        "progress",
        flushTwoPending
      );
    };

  }, []);


  /* ========================================================
     SMOOTH SCRUB ENGINE
  ======================================================== */

  useEffect(() => {

    const videoOne =
      sceneOneVideoRef.current;


    const videoTwo =
      sceneTwoVideoRef.current;


    if (
      !videoOne ||
      !videoTwo
    ) {
      return;
    }


    const render =
      () => {

        const target =
          targetProgressRef.current;


        const current =
          smoothProgressRef.current;


        const difference =
          target -
          current;


        const distance =
          Math.abs(
            difference
          );


        let smoothing =
          0.22;


        if (
          distance >
          0.3
        ) {

          smoothing =
            0.46;

        } else if (
          distance >
          0.15
        ) {

          smoothing =
            0.34;

        } else if (
          distance >
          0.06
        ) {

          smoothing =
            0.24;
        }


        let next =
          current +
          difference *
            smoothing;


        if (
          distance <
          0.0007
        ) {

          next =
            target;
        }


        smoothProgressRef.current =
          next;


        const sceneOneProgress =
          Math.max(
            0,
            Math.min(
              1,
              next /
                SCENE_ONE_END
            )
          );


        const sceneTwoProgress =
          Math.max(
            0,
            Math.min(
              1,
              (
                next -
                SCENE_ONE_END
              ) /
                (
                  1 -
                  SCENE_ONE_END
                )
            )
          );


        const oneDuration =
          sceneOneStateRef
            .current
            .duration;


        const twoDuration =
          sceneTwoStateRef
            .current
            .duration;


        const oneDesiredTime =
          sceneOneProgress *
          Math.max(
            oneDuration -
              0.025,
            0
          );


        const twoDesiredTime =
          sceneTwoProgress *
          Math.max(
            twoDuration -
              0.025,
            0
          );


        if (
          next <=
          0.515
        ) {

          requestVideoSeek(
            videoOne,
            sceneOneStateRef.current,
            oneDesiredTime
          );
        }


        if (
          next >=
          0.34
        ) {

          requestVideoSeek(
            videoTwo,
            sceneTwoStateRef.current,
            twoDesiredTime
          );
        }


        if (
          next <=
          BLEND_START
        ) {

          videoOne.style.opacity =
            "1";

          videoTwo.style.opacity =
            "0";

        } else if (
          next >=
          BLEND_END
        ) {

          videoOne.style.opacity =
            "0";

          videoTwo.style.opacity =
            "1";

        } else {

          const blend =
            (
              next -
              BLEND_START
            ) /
            (
              BLEND_END -
              BLEND_START
            );


          videoOne.style.opacity =
            String(
              1 -
              blend
            );


          videoTwo.style.opacity =
            String(
              blend
            );
        }


        rafRef.current =
          requestAnimationFrame(
            render
          );
      };


    rafRef.current =
      requestAnimationFrame(
        render
      );


    return () => {

      if (
        rafRef.current !==
        null
      ) {

        cancelAnimationFrame(
          rafRef.current
        );
      }
    };

  }, []);


  /* ========================================================
     GSAP SCROLL STORY
  ======================================================== */

  useLayoutEffect(() => {

    gsap.registerPlugin(
      ScrollTrigger
    );


    const section =
      sectionRef.current;


    if (
      !section
    ) {
      return;
    }


    const ctx =
      gsap.context(() => {

        gsap.set(
          sceneOneRef.current,
          {
            autoAlpha: 1,
            y: 0,
          }
        );


        gsap.set(
          searchRef.current,
          {
            autoAlpha: 1,
            y: 0,
          }
        );


        gsap.set(
          sceneTwoRef.current,
          {
            autoAlpha: 0,
            y: 18,
          }
        );


        gsap.set(
          finaleRef.current,
          {
            autoAlpha: 0,
            y: 18,
          }
        );


        gsap.set(
          progressRef.current,
          {
            scaleX: 0,
            transformOrigin:
              "left center",
          }
        );


        ScrollTrigger.create({
          trigger:
            section,

          start:
            "top top",

          end:
            "bottom bottom",

          invalidateOnRefresh:
            true,


          onUpdate(self) {

            targetProgressRef.current =
              self.progress;
          },
        });


        const story =
          gsap.timeline({
            scrollTrigger: {
              trigger:
                section,

              start:
                "top top",

              end:
                "bottom bottom",

              scrub:
                0.45,

              invalidateOnRefresh:
                true,
            },
          });


        story

          .to(
            searchRef.current,
            {
              autoAlpha: 0,
              y: 12,
              duration: 0.42,
              ease: "none",
            },
            1.05
          )

          .to(
            sceneOneRef.current,
            {
              autoAlpha: 0,
              y: -14,
              duration: 0.5,
              ease: "none",
            },
            1.38
          )

          .to(
            sceneTwoRef.current,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "none",
            },
            2.72
          )

          .to(
            sceneTwoRef.current,
            {
              autoAlpha: 0,
              y: -14,
              duration: 0.42,
              ease: "none",
            },
            3.82
          )

          .to(
            finaleRef.current,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.58,
              ease: "none",
            },
            4.12
          )

          .to(
            progressRef.current,
            {
              scaleX: 1,
              duration: 5,
              ease: "none",
            },
            0
          );

      }, section);


    const timer =
      window.setTimeout(
        () => {

          ScrollTrigger.refresh();
        },
        250
      );


    return () => {

      window.clearTimeout(
        timer
      );


      ctx.revert();
    };

  }, []);


  /* ========================================================
     REFRESH GSAP WHEN LANGUAGE CHANGES
  ======================================================== */

  useEffect(() => {

    const timer =
      window.setTimeout(
        () => {

          ScrollTrigger.refresh();
        },
        100
      );


    return () => {

      window.clearTimeout(
        timer
      );
    };

  }, [language]);


  /* ========================================================
     TAB VISIBILITY
  ======================================================== */

  useEffect(() => {

    const handleVisibility =
      () => {

        if (
          document.visibilityState ===
          "visible"
        ) {

          const videoOne =
            sceneOneVideoRef.current;


          const videoTwo =
            sceneTwoVideoRef.current;


          videoOne?.pause();

          videoTwo?.pause();


          sceneOneStateRef.current
            .lastSeekAt =
              0;


          sceneTwoStateRef.current
            .lastSeekAt =
              0;


          ScrollTrigger.refresh();
        }
      };


    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );


    return () => {

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };

  }, []);


  /* ========================================================
     RENDER
  ======================================================== */

  return (

    <section
      ref={
        sectionRef
      }
      className={`
        cinematic-villa-journey
        ${
          isArabic
            ? "cinematic-arabic"
            : "cinematic-english"
        }
      `}
      dir={
        isArabic
          ? "rtl"
          : "ltr"
      }
    >

      <div className="cinematic-sticky">


        {/* ================================================
            VIDEO 01
        ================================================= */}

        <video
          ref={
            sceneOneVideoRef
          }
          className="
            cinematic-video
            cinematic-video-one
          "
          muted
          playsInline
          preload="auto"
          poster="/frames/cinematic-01/frame_0001.webp"
          disablePictureInPicture
        >

          <source
            src="/videos/cinematic-scene-01.mp4"
            type="video/mp4"
          />

        </video>


        {/* ================================================
            VIDEO 02
        ================================================= */}

        <video
          ref={
            sceneTwoVideoRef
          }
          className="
            cinematic-video
            cinematic-video-two
          "
          muted
          playsInline
          preload="auto"
          poster="/frames/cinematic-02/frame_0001.webp"
          disablePictureInPicture
        >

          <source
            src="/videos/cinematic-scene-02.mp4"
            type="video/mp4"
          />

        </video>


        {/* ================================================
            GRADING
        ================================================= */}

        <div className="cinematic-color-grade" />

        <div className="cinematic-left-shade" />

        <div className="cinematic-bottom-shade" />

        <div className="cinematic-vignette" />


        {/* ================================================
            SCENE 01
        ================================================= */}

        <div
          ref={
            sceneOneRef
          }
          className="
            cinematic-editorial
            cinematic-editorial-one
          "
        >

          <div className="cinematic-label">

            <i />

            <small>
              {
                t.hero.label
              }
            </small>

          </div>


          <h1>

            {
              t.hero.titleLine1
            }

            <span>
              {
                t.hero.titleLine2
              }
            </span>

          </h1>


          <p className="cinematic-intro-copy">

            {
              t.hero.description
            }

          </p>

        </div>


        {/* ================================================
            PROPERTY SEARCH
        ================================================= */}

        <div
          ref={
            searchRef
          }
          className="cinematic-property-search"
        >

          <div className="cinematic-search-modes">


            <button
              type="button"
              className={
                propertyMode ===
                "buy"
                  ? "active"
                  : ""
              }
              onClick={
                () =>
                  setPropertyMode(
                    "buy"
                  )
              }
            >
              {
                t.hero.buy
              }
            </button>


            <button
              type="button"
              className={
                propertyMode ===
                "rent"
                  ? "active"
                  : ""
              }
              onClick={
                () =>
                  setPropertyMode(
                    "rent"
                  )
              }
            >
              {
                t.hero.rent
              }
            </button>


            <button
              type="button"
              className={
                propertyMode ===
                "off-plan"
                  ? "active"
                  : ""
              }
              onClick={
                () =>
                  setPropertyMode(
                    "off-plan"
                  )
              }
            >
              {
                t.hero.offPlan
              }
            </button>

          </div>


          <div className="cinematic-search-fields">


            <label>

              <span>
                {
                  t.hero.propertyType
                }
              </span>


              <select
                defaultValue=""
                aria-label={
                  t.hero.propertyType
                }
              >

                <option value="">
                  {
                    t.hero.allTypes
                  }
                </option>

                <option value="villa">
                  {
                    t.hero.villa
                  }
                </option>

                <option value="apartment">
                  {
                    t.hero.apartment
                  }
                </option>

                <option value="penthouse">
                  {
                    t.hero.penthouse
                  }
                </option>

                <option value="townhouse">
                  {
                    t.hero.townhouse
                  }
                </option>

              </select>

            </label>


            <label>

              <span>
                {
                  t.hero.bedrooms
                }
              </span>


              <select
                defaultValue=""
                aria-label={
                  t.hero.bedrooms
                }
              >

                <option value="">
                  {
                    t.hero.anyBedrooms
                  }
                </option>

                <option value="1">
                  {
                    t.hero.bedroom1
                  }
                </option>

                <option value="2">
                  {
                    t.hero.bedroom2
                  }
                </option>

                <option value="3">
                  {
                    t.hero.bedroom3
                  }
                </option>

                <option value="4">
                  {
                    t.hero.bedroom4
                  }
                </option>

              </select>

            </label>


            <label>

              <span>
                {
                  t.hero.priceRange
                }
              </span>


              <select
                defaultValue=""
                aria-label={
                  t.hero.priceRange
                }
              >

                <option value="">
                  {
                    t.hero.anyPrice
                  }
                </option>

                <option value="1m">
                  {
                    t.hero.upTo1M
                  }
                </option>

                <option value="3m">
                  {
                    t.hero.from1To3M
                  }
                </option>

                <option value="5m">
                  {
                    t.hero.from3To5M
                  }
                </option>

                <option value="5m-plus">
                  {
                    t.hero.above5M
                  }
                </option>

              </select>

            </label>


            <label>

              <span>
                {
                  t.hero.community
                }
              </span>


              <select
                defaultValue=""
                aria-label={
                  t.hero.community
                }
              >

                <option value="">
                  {
                    t.hero.anyCommunity
                  }
                </option>

                <option value="dubai-marina">
                  {
                    t.hero.dubaiMarina
                  }
                </option>

                <option value="downtown">
                  {
                    t.hero.downtownDubai
                  }
                </option>

                <option value="palm">
                  {
                    t.hero.palmJumeirah
                  }
                </option>

                <option value="abu-dhabi">
                  {
                    t.hero.abuDhabi
                  }
                </option>

              </select>

            </label>


            <Link
              href={
                `/properties?type=${propertyMode}`
              }
              className="cinematic-search-button"
            >

              <span>
                {
                  t.hero.search
                }
              </span>

              <i>
                ↗
              </i>

            </Link>

          </div>

        </div>


        {/* ================================================
            SCENE 02
        ================================================= */}

        <div
          ref={
            sceneTwoRef
          }
          className="
            cinematic-editorial
            cinematic-editorial-two
          "
        >

          <div className="cinematic-label">

            <i />

            <small>
              {
                t.hero.sceneTwoLabel
              }
            </small>

          </div>


          <h2>

            {
              t.hero.sceneTwoTitle1
            }

            <span>
              {
                t.hero.sceneTwoTitle2
              }
            </span>

          </h2>


          <p className="cinematic-intro-copy">

            {
              t.hero.sceneTwoDescription
            }

          </p>

        </div>


        {/* ================================================
            FINALE
        ================================================= */}

        <div
          ref={
            finaleRef
          }
          className="cinematic-finale"
        >

          <div className="cinematic-finale-label">

            <i />

            <span>
              {
                t.hero.finaleLabel
              }
            </span>

          </div>


          <h2>

            {
              t.hero.finaleTitle1
            }

            <span>
              {
                t.hero.finaleTitle2
              }
            </span>

          </h2>


          <p>
            {
              t.hero.finaleDescription
            }
          </p>


          <Link
            href="/properties"
            className="cinematic-finale-button"
          >

            <span>
              {
                t.hero.exploreResidences
              }
            </span>

            <i>
              ↗
            </i>

          </Link>

        </div>


        {/* ================================================
            BOTTOM PROGRESS
        ================================================= */}

        <div className="cinematic-bottom-ui">

          <span className="cinematic-scroll-text">
            {
              t.hero.scrollToExplore
            }
          </span>


          <div className="cinematic-progress">

            <div
              ref={
                progressRef
              }
            />

          </div>


          <span className="cinematic-end-label">
            {
              t.hero.finaleLabel
            }
          </span>

        </div>


      </div>

    </section>
  );
}