"use client";

import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ReviewsSection.css";


const reviews = [
  {
    id: "01",
    name: "James Mitchell",
    initial: "J",
    time: "2 weeks ago",
    text:
      "Exceptional service from start to finish. They found exactly what we were looking for in Dubai Marina and handled every detail with genuine care.",
  },
  {
    id: "02",
    name: "Fatima Al Rashid",
    initial: "F",
    time: "1 month ago",
    text:
      "Their market knowledge in Abu Dhabi is unmatched. They handled the sale of my villa with the utmost professionalism and complete transparency.",
  },
  {
    id: "03",
    name: "Rahul Sharma",
    initial: "R",
    time: "1 month ago",
    text:
      "Total peace of mind knowing my investments are in safe hands. The management team is responsive, honest, and genuinely puts clients first.",
  },
];


function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="review-google-icon"
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />

      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />

      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />

      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}


function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="review-star"
    >
      <path
        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}


export default function ReviewsSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const headerRef =
    useRef<HTMLDivElement | null>(null);

  const gridRef =
    useRef<HTMLDivElement | null>(null);


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

        gsap.from(
          headerRef.current,
          {
            opacity: 0,

            y: 30,

            duration: 0.85,

            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                headerRef.current,

              start:
                "top 85%",

              once: true,
            },
          }
        );


        if (gridRef.current) {
          gsap.from(
            gridRef.current.children,
            {
              opacity: 0,

              y: 28,

              duration: 0.75,

              stagger: 0.1,

              ease:
                "power3.out",

              scrollTrigger: {
                trigger:
                  gridRef.current,

                start:
                  "top 88%",

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
      className="reviews-section"
    >

      <div className="reviews-container">


        {/* ================================================
            HEADER
        ================================================= */}

        <div
          ref={headerRef}
          className="reviews-header"
        >

          <div className="reviews-heading">

            <div className="reviews-eyebrow">
              <span>
                09
              </span>

              <i />

              <small>
                CLIENT STORIES
              </small>
            </div>


            <h2>
              Trusted by people

              <span>
                making important
                moves.
              </span>
            </h2>

          </div>


          <div className="reviews-header-side">

            <p>
              Property decisions are
              personal. The experience
              should feel considered,
              clear and supported from
              beginning to end.
            </p>


            <div className="reviews-rating">

              <strong>
                4.9
              </strong>


              <div>

                <div className="reviews-stars">
                  {Array.from(
                    {
                      length: 5,
                    }
                  ).map(
                    (_, index) => (
                      <StarIcon
                        key={index}
                      />
                    )
                  )}
                </div>


                <small>
                  GOOGLE REVIEWS
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* ================================================
            GOOGLE REVIEW CARDS
        ================================================= */}

        <div
          ref={gridRef}
          className="reviews-grid"
        >

          {reviews.map(
            (review) => (

              <article
                key={review.id}
                className="review-card"
              >

                <div className="review-card-top">

                  <div className="review-person">

                    <div className="review-avatar">
                      {
                        review.initial
                      }
                    </div>


                    <div className="review-person-copy">

                      <strong>
                        {
                          review.name
                        }
                      </strong>

                      <span>
                        {
                          review.time
                        }
                      </span>

                    </div>

                  </div>


                  <GoogleIcon />

                </div>


                <div className="review-card-stars">

                  {Array.from(
                    {
                      length: 5,
                    }
                  ).map(
                    (_, index) => (
                      <StarIcon
                        key={index}
                      />
                    )
                  )}

                </div>


                <p className="review-card-text">
                  “{review.text}”
                </p>


                <div className="review-card-bottom">

                  <span>
                    VERIFIED GOOGLE REVIEW
                  </span>

                  <small>
                    {review.id} / 03
                  </small>

                </div>

              </article>

            )
          )}

        </div>

      </div>

    </section>
  );
}