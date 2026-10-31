"use client";

import Link from "next/link";

import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import {
  useLanguage,
} from "../context/LanguageContext";

import "./TowersUnderConstruction.css";


/* ==========================================================
   PROJECT BASE DATA
========================================================== */

const projectBaseData = [
  {
    id: "01",
    key: "privateVilla" as const,

    image:
      "/images/luxury-villa.png",

    completion:
      "Q4 2027",
  },

  {
    id: "02",
    key: "marina" as const,

    image:
      "/images/render-marina.png",

    completion:
      "Q2 2027",
  },

  {
    id: "03",
    key: "saadiyat" as const,

    image:
      "/images/render-saadiyat.png",

    completion:
      "Q1 2028",
  },
];


/* ==========================================================
   COMPONENT
========================================================== */

export default function TowersUnderConstruction() {

  const {
    isArabic,
    t,
  } =
    useLanguage();


  const sectionRef =
    useRef<HTMLElement | null>(
      null
    );


  const headerRef =
    useRef<HTMLDivElement | null>(
      null
    );


  const gridRef =
    useRef<HTMLDivElement | null>(
      null
    );


  /* ========================================================
     TRANSLATED PROJECTS
  ======================================================== */

  const projects =
    projectBaseData.map(
      project => {

        const translation =
          t.towers.projects[
            project.key
          ];


        return {
          ...project,

          title:
            translation.title,

          location:
            translation.location,

          type:
            translation.type,
        };
      }
    );


  /* ========================================================
     GSAP
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

        /* HEADER */

        gsap.from(
          headerRef.current,
          {
            opacity: 0,

            y: 30,

            duration:
              0.85,

            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                headerRef.current,

              start:
                "top 87%",

              once:
                true,
            },
          }
        );


        /* CARDS */

        if (
          gridRef.current
        ) {

          gsap.from(
            gridRef.current
              .children,
            {
              opacity: 0,

              y: 36,

              duration:
                0.8,

              stagger:
                0.12,

              ease:
                "power3.out",

              scrollTrigger: {
                trigger:
                  gridRef.current,

                start:
                  "top 87%",

                once:
                  true,
              },
            }
          );
        }

      }, section);


    return () => {

      ctx.revert();
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
        towers-section
        ${
          isArabic
            ? "towers-arabic"
            : "towers-english"
        }
      `}
      dir={
        isArabic
          ? "rtl"
          : "ltr"
      }
    >

      <div className="towers-container">


        {/* ================================================
            HEADER
        ================================================= */}

        <div
          ref={
            headerRef
          }
          className="towers-header"
        >

          <div className="towers-kicker">

            {
              t.towers.eyebrow
            }

          </div>


          <h2>

            {
              t.towers.title
            }

          </h2>


          <p>

            {
              t.towers.description
            }

          </p>


          <Link
            href="/properties?type=off-plan"
            className="towers-view-all"
          >

            {
              t.towers.viewAll
            }

          </Link>

        </div>


        {/* ================================================
            PROJECT GRID
        ================================================= */}

        <div
          ref={
            gridRef
          }
          className="towers-grid"
        >

          {
            projects.map(
              project => (

                <article
                  key={
                    project.id
                  }
                  className="tower-card"
                >

                  <Link
                    href="/properties"
                    className="tower-card-link"
                    aria-label={
                      project.title
                    }
                  />


                  {/* ======================================
                      IMAGE
                  ====================================== */}

                  <div className="tower-card-image-wrap">


                    <img
                      src={
                        project.image
                      }
                      alt={
                        project.title
                      }
                      className="tower-card-image"
                    />


                    <div className="tower-card-overlay" />


                    {/* TOP META */}

                    <div className="tower-card-top">

                      <span>
                        {
                          project.id
                        }
                      </span>


                      <small>
                        {
                          project.type
                        }
                      </small>

                    </div>


                    {/* BOTTOM CONTENT */}

                    <div className="tower-card-bottom">

                      <div>

                        <h3>

                          {
                            project.title
                          }

                        </h3>


                        <p>

                          {
                            project.location
                          }

                        </p>

                      </div>


                      <span className="tower-card-arrow">

                        ↗

                      </span>

                    </div>

                  </div>


                  {/* ======================================
                      META
                  ====================================== */}

                  <div className="tower-card-meta">


                    <div>

                      <small>

                        {
                          t.towers
                            .completion
                        }

                      </small>


                      <strong>

                        {
                          project.completion
                        }

                      </strong>

                    </div>


                    <div>

                      <small>

                        {
                          t.towers
                            .location
                        }

                      </small>


                      <strong>

                        {
                          project.location
                        }

                      </strong>

                    </div>


                  </div>

                </article>

              )
            )
          }

        </div>

      </div>

    </section>
  );
}