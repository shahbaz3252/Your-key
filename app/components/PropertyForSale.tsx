"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./PropertyForSale.css";


const properties = [
  {
    id: 1,
    image: "/images/luxury-villa.png",
    type: "VILLA",
    price: "AED 18,500,000",
    beds: "5",
    baths: "6",
    area: "8200",
    title: "Ultra-Luxury Beachfront Villa",
    location: "PALM JUMEIRAH, PALM JUMEIRAH",
  },
  {
    id: 2,
    image: "/images/penthouse.png",
    type: "PENTHOUSE",
    price: "AED 25,000,000",
    beds: "4",
    baths: "5",
    area: "6800",
    title: "Penthouse Above the Clouds",
    location: "DOWNTOWN DUBAI, DOWNTOWN DUBAI",
  },
  {
    id: 3,
    image: "/images/modern-apartment.png",
    type: "APARTMENT",
    price: "AED 2,800,000",
    beds: "2",
    baths: "2",
    area: "1450",
    title: "Modern Apartment with Marina Views",
    location: "DUBAI MARINA, DUBAI MARINA",
  },
];


function BedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M3 18V9M21 18V13C21 11.9 20.1 11 19 11H9V16M3 16H21M6 11V8C6 6.9 6.9 6 8 6H11C12.1 6 13 6.9 13 8V11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function BathIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M4 12H20V14C20 17.3 17.3 20 14 20H10C6.7 20 4 17.3 4 14V12ZM7 12V7.5C7 5.6 8.6 4 10.5 4C12.1 4 13.5 5.1 13.9 6.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function AreaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}


function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M20.8 4.6C18.8 2.6 15.6 2.6 13.6 4.6L12 6.2L10.4 4.6C8.4 2.6 5.2 2.6 3.2 4.6C1.2 6.6 1.2 9.8 3.2 11.8L12 20.6L20.8 11.8C22.8 9.8 22.8 6.6 20.8 4.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M12 21C12 21 18 15.8 18 10C18 6.7 15.3 4 12 4C8.7 4 6 6.7 6 10C6 15.8 12 21 12 21Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="12"
        cy="10"
        r="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}


export default function PropertyForSale() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const headerRef =
    useRef<HTMLDivElement | null>(null);

  const gridRef =
    useRef<HTMLDivElement | null>(null);


  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section =
      sectionRef.current;

    if (!section) return;


    const ctx = gsap.context(() => {

      gsap.from(headerRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.75,
        ease: "power3.out",

        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 88%",
          once: true,
        },
      });


      if (gridRef.current) {
        gsap.from(
          gridRef.current.children,
          {
            opacity: 0,
            y: 28,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",

            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 90%",
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
      className="property-sale-section"
    >

      <div className="property-sale-container">


        {/* ============================================
            HEADER
        ============================================ */}

        <div
          ref={headerRef}
          className="property-sale-header"
        >

          <div className="property-sale-heading">

            <div className="property-sale-eyebrow">
              L12 · THE PORTFOLIO
            </div>


            <h2>
              Property for Sale
            </h2>

          </div>


          <Link
            href="/properties?type=buy"
            className="property-sale-view-all"
          >
            VIEW ALL PROPERTIES FOR SALE
          </Link>

        </div>


        {/* ============================================
            PROPERTY GRID
        ============================================ */}

        <div
          ref={gridRef}
          className="property-sale-grid"
        >

          {properties.map((property) => (

            <article
              key={property.id}
              className="property-sale-card"
            >

              <Link
                href="/properties"
                className="property-sale-card-link"
                aria-label={property.title}
              />


              {/* IMAGE */}

              <div className="property-sale-image-wrap">

                <img
                  src={property.image}
                  alt={property.title}
                  className="property-sale-image"
                />


                <div className="property-sale-image-overlay" />


                {/* TAGS */}

                <div className="property-sale-tags">

                  <span className="property-sale-buy">
                    BUY
                  </span>


                  <span className="property-sale-type">
                    {property.type}
                  </span>

                </div>


                {/* FAVOURITE */}

                <button
                  type="button"
                  className="property-sale-heart"
                  aria-label="Save property"
                >
                  <HeartIcon />
                </button>

              </div>


              {/* ========================================
                  CONTENT
              ======================================== */}

              <div className="property-sale-content">

                <div className="property-sale-price">
                  {property.price}
                </div>


                {/* STATS */}

                <div className="property-sale-stats">

                  <div className="property-sale-stat">

                    <div className="property-sale-stat-value">
                      <BedIcon />

                      <strong>
                        {property.beds}
                      </strong>
                    </div>

                    <span>
                      BEDS
                    </span>

                  </div>


                  <div className="property-sale-stat">

                    <div className="property-sale-stat-value">
                      <BathIcon />

                      <strong>
                        {property.baths}
                      </strong>
                    </div>

                    <span>
                      BATHS
                    </span>

                  </div>


                  <div className="property-sale-stat">

                    <div className="property-sale-stat-value">
                      <AreaIcon />

                      <strong>
                        {property.area}
                      </strong>
                    </div>

                    <span>
                      SQUARE (FT)
                    </span>

                  </div>

                </div>


                <div className="property-sale-divider" />


                {/* TITLE */}

                <h3>
                  {property.title}
                </h3>


                {/* LOCATION */}

                <div className="property-sale-location">

                  <PinIcon />

                  <span>
                    {property.location}
                  </span>

                </div>

              </div>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}