"use client";

import Link from "next/link";
import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./BespokeServices.css";


const services = [
  {
    id: "01",
    title: "Buy",
    subtitle: "Find the right residence",
    description:
      "A considered search across the UAE, shaped around your preferred location, lifestyle and long-term goals.",
  },

  {
    id: "02",
    title: "Sell",
    subtitle: "Position your property",
    description:
      "Strategic presentation, market positioning and tailored guidance designed to bring the right buyers to your property.",
  },

  {
    id: "03",
    title: "Invest",
    subtitle: "Build with perspective",
    description:
      "Explore residential opportunities with a clearer view of location, demand, potential and your investment horizon.",
  },

  {
    id: "04",
    title: "Advisory",
    subtitle: "Guidance beyond the transaction",
    description:
      "Personal support through acquisition, strategy, relocation and property decisions across the UAE market.",
  },
];


export default function BespokeServices() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null
    );

  const visualRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const headingRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const listRef =
    useRef<HTMLDivElement | null>(
      null
    );


  useLayoutEffect(() => {
    gsap.registerPlugin(
      ScrollTrigger
    );


    const section =
      sectionRef.current;


    if (!section) {
      return;
    }


    const ctx =
      gsap.context(() => {

        /* ================================================
           HEADING
        ================================================= */

        gsap.from(
          headingRef.current,
          {
            opacity: 0,

            y: 45,

            duration: 1,

            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                section,

              start:
                "top 80%",

              once: true,
            },
          }
        );


        /* ================================================
           IMAGE
        ================================================= */

        gsap.from(
          visualRef.current,
          {
            opacity: 0,

            x: -55,

            duration: 1.1,

            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                visualRef.current,

              start:
                "top 82%",

              once: true,
            },
          }
        );


        /* ================================================
           SERVICE ROWS
        ================================================= */

        const rows =
          listRef.current?.querySelectorAll(
            ".bespoke-service-row"
          );


        if (rows) {
          gsap.from(
            rows,
            {
              opacity: 0,

              x: 45,

              duration: 0.9,

              stagger: 0.1,

              ease:
                "power3.out",

              scrollTrigger: {
                trigger:
                  listRef.current,

                start:
                  "top 83%",

                once: true,
              },
            }
          );
        }

      }, section);


    return () => {
      ctx.revert();
    };

  }, []);


  return (
    <section
      ref={sectionRef}
      className="bespoke-section"
    >

      {/* ================================================
          BACKGROUND DETAILS
      ================================================= */}

      <div className="bespoke-grid-bg" />

      <div className="bespoke-circle bespoke-circle-one" />

      <div className="bespoke-circle bespoke-circle-two" />


      <div className="bespoke-container">

        {/* ================================================
            HEADER
        ================================================= */}

        <div
          ref={headingRef}
          className="bespoke-header"
        >

          <div className="bespoke-kicker">

            <span>
              08
            </span>

            <i />

            <small>
              BESPOKE SERVICES
            </small>

          </div>


          <div className="bespoke-header-grid">

            <h2>

              Property,
              considered

              <span>
                personally.
              </span>

            </h2>


            <div className="bespoke-header-copy">

              <p>
                From finding a home to
                building a long-term
                property strategy, our
                approach stays focused
                on what matters to you.
              </p>


              <Link
                href="/contact"
                className="bespoke-header-link"
              >

                <span>
                  SPEAK WITH OUR TEAM
                </span>

                <i>
                  ↗
                </i>

              </Link>

            </div>

          </div>

        </div>


        {/* ================================================
            CONTENT
        ================================================= */}

        <div className="bespoke-main">

          {/* ==============================================
              LEFT VISUAL
          ============================================== */}

          <div
            ref={visualRef}
            className="bespoke-visual"
          >

            <div
              className="bespoke-visual-image"
              style={{
                backgroundImage:
                  `
                    linear-gradient(
                      180deg,
                      rgba(3,6,8,0.05) 10%,
                      rgba(3,6,8,0.12) 46%,
                      rgba(3,6,8,0.86) 100%
                    ),
                    url("/images/glass-facade.png")
                  `,
              }}
            >

              <div className="bespoke-visual-top">

                <span>
                  YOURKEY
                </span>

                <small>
                  PRIVATE CLIENT SERVICES
                </small>

              </div>


              <div className="bespoke-visual-bottom">

                <p>
                  A more considered way
                  to move through the
                  property market.
                </p>


                <div>

                  <span>
                    UAE
                  </span>

                  <i />

                  <span>
                    RESIDENTIAL
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* ==============================================
              SERVICES
          ============================================== */}

          <div
            ref={listRef}
            className="bespoke-services-list"
          >

            {services.map(
              (
                service
              ) => (

                <article
                  key={
                    service.id
                  }
                  className="bespoke-service-row"
                >

                  <Link
                    href="/contact"
                    className="bespoke-service-link"
                    aria-label={
                      `${service.title} property service`
                    }
                  />


                  <div className="bespoke-service-number">

                    {
                      service.id
                    }

                  </div>


                  <div className="bespoke-service-content">

                    <small>
                      {
                        service.subtitle
                      }
                    </small>


                    <h3>
                      {
                        service.title
                      }
                    </h3>


                    <p>
                      {
                        service.description
                      }
                    </p>

                  </div>


                  <div className="bespoke-service-action">

                    <span>
                      EXPLORE
                    </span>

                    <i>
                      ↗
                    </i>

                  </div>

                </article>

              )
            )}

          </div>

        </div>


        {/* ================================================
            BOTTOM
        ================================================= */}

        <div className="bespoke-bottom">

          <span>
            YOURKEY · PRIVATE CLIENTS
          </span>


          <div>

            <i />

            <small>
              PERSONAL PROPERTY GUIDANCE
            </small>

          </div>

        </div>

      </div>

    </section>
  );
}