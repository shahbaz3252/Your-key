"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./FAQSection.css";


const faqs = [
  {
    id: "01",
    question:
      "Can non-residents buy property in the UAE?",
    answer:
      "Yes. International buyers can purchase property in designated freehold areas across Dubai and other parts of the UAE. The exact process depends on the location and property type.",
  },

  {
    id: "02",
    question:
      "What documents do I need to purchase a property?",
    answer:
      "Typical requirements include a valid passport, identification details and documents related to the transaction. Additional requirements may apply depending on financing, residency status and the property.",
  },

  {
    id: "03",
    question:
      "How does property financing work in the UAE?",
    answer:
      "Financing options vary between residents, non-residents and individual lenders. Deposit requirements, eligibility and available terms depend on the buyer profile and selected property.",
  },

  {
    id: "04",
    question:
      "What are the typical fees involved when buying?",
    answer:
      "Buyers should account for transaction, registration and professional fees in addition to the property price. The exact amount depends on the emirate, project and structure of the purchase.",
  },

  {
    id: "05",
    question:
      "Can YourKey help with property investment strategy?",
    answer:
      "Yes. We can help you explore opportunities around your preferred location, budget, expected holding period and investment goals before narrowing down suitable options.",
  },

  {
    id: "06",
    question:
      "Do you support clients after the purchase?",
    answer:
      "Yes. Our support can continue beyond the transaction, including guidance around handover, property services and future real-estate decisions.",
  },
];


export default function FAQSection() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null
    );

  const headerRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const listRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const [activeIndex, setActiveIndex] =
    useState<number | null>(0);


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


        const rows =
          listRef.current?.querySelectorAll(
            ".faq-row"
          );


        if (rows) {
          gsap.from(
            rows,
            {
              opacity: 0,

              y: 38,

              duration: 0.85,

              stagger: 0.08,

              ease:
                "power3.out",

              scrollTrigger: {
                trigger:
                  listRef.current,

                start:
                  "top 84%",

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


  const toggleFAQ =
    (
      index: number
    ) => {

      setActiveIndex(
        current =>
          current === index
            ? null
            : index
      );

    };


  return (
    <section
      ref={sectionRef}
      className="faq-section"
    >

      <div className="faq-grid-bg" />

      <div className="faq-orbit faq-orbit-one" />

      <div className="faq-orbit faq-orbit-two" />


      <div className="faq-container">

        {/* ================================================
            LEFT
        ================================================= */}

        <div
          ref={headerRef}
          className="faq-header"
        >

          <div className="faq-kicker">

            <span>
              10
            </span>

            <i />

            <small>
              FREQUENTLY ASKED
            </small>

          </div>


          <h2>

            Questions,
            answered

            <span>
              clearly.
            </span>

          </h2>


          <p>
            Straightforward guidance on
            buying, investing and navigating
            property decisions across the UAE.
          </p>


          <div className="faq-help">

            <small>
              STILL HAVE A QUESTION?
            </small>

            <a href="/contact">

              <span>
                SPEAK WITH OUR TEAM
              </span>

              <i>
                ↗
              </i>

            </a>

          </div>

        </div>


        {/* ================================================
            ACCORDION
        ================================================= */}

        <div
          ref={listRef}
          className="faq-list"
        >

          {faqs.map(
            (
              faq,
              index
            ) => {

              const isActive =
                activeIndex === index;


              return (

                <article
                  key={
                    faq.id
                  }
                  className={`
                    faq-row
                    ${
                      isActive
                        ? "faq-row-active"
                        : ""
                    }
                  `}
                >

                  <button
                    type="button"
                    className="faq-question"
                    onClick={
                      () =>
                        toggleFAQ(
                          index
                        )
                    }
                    aria-expanded={
                      isActive
                    }
                  >

                    <span className="faq-number">
                      {
                        faq.id
                      }
                    </span>


                    <span className="faq-question-text">
                      {
                        faq.question
                      }
                    </span>


                    <span className="faq-icon">

                      <i />

                      <i />

                    </span>

                  </button>


                  <div
                    className="faq-answer-wrap"
                    data-open={
                      isActive
                        ? "true"
                        : "false"
                    }
                  >

                    <div className="faq-answer">

                      <p>
                        {
                          faq.answer
                        }
                      </p>

                    </div>

                  </div>

                </article>

              );

            }
          )}

        </div>


        {/* ================================================
            BOTTOM
        ================================================= */}

        <div className="faq-bottom">

          <span>
            YOURKEY · GUIDANCE
          </span>


          <div>

            <i />

            <small>
              PROPERTY, MADE CLEARER
            </small>

          </div>

        </div>

      </div>

    </section>
  );
}