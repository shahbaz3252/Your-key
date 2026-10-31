"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./RentProperties.css";


const rentalProperties = [
  {
    id: "01",
    image: "/images/render-marina.png",
    type: "APARTMENT",
    price: "AED 145,000 /yr",
    beds: "1",
    baths: "1",
    area: "820",
    title: "Waterfront Apartment for Rent",
    location: "DUBAI MARINA, DUBAI MARINA",
    agent: "Sultan Umar",
  },
  {
    id: "02",
    image: "/images/render-yas.png",
    type: "APARTMENT",
    price: "AED 180,000 /yr",
    beds: "3",
    baths: "3",
    area: "1850",
    title: "Yas Island Residence",
    location: "YAS ISLAND, YAS ISLAND",
    agent: "Aanis Khalil",
  },
];


function BedIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
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
    <svg viewBox="0 0 24 24" aria-hidden="true">
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
    <svg viewBox="0 0 24 24" aria-hidden="true">
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
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.8 4.6C18.8 2.6 15.6 2.6 13.6 4.6L12 6.2L10.4 4.6C8.4 2.6 5.2 2.6 3.2 4.6C1.2 6.6 1.2 9.8 3.2 11.8L12 20.6L20.8 11.8C22.8 9.8 22.8 6.6 20.8 4.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}


function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21C12 21 18 15.8 18 10C18 6.7 15.3 4 12 4C8.7 4 6 6.7 6 10C6 15.8 12 21 12 21Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
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


export default function RentProperties() {
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

    if (!section) {
      return;
    }


    const ctx = gsap.context(() => {

      gsap.from(headerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.85,
        ease: "power3.out",

        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 87%",
          once: true,
        },
      });


      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          opacity: 0,
          y: 40,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",

          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 87%",
            once: true,
          },
        });
      }

    }, section);


    return () => {
      ctx.revert();
    };

  }, []);


  return (
    <section
      ref={sectionRef}
      className="rent-section"
    >

      <div className="rent-container">


        {/* ================================================
            HEADER
        ================================================= */}

        <div
          ref={headerRef}
          className="rent-header"
        >

          <div className="rent-heading">

            <div className="rent-kicker">
              L33 · LEASING
            </div>


            <h2>
              Rent a Property
            </h2>

          </div>


          <Link
            href="/properties?type=rent"
            className="rent-view-all"
          >
            VIEW APARTMENTS FOR RENT
          </Link>

        </div>


        {/* ================================================
            RENT CARDS
        ================================================= */}

        <div
          ref={gridRef}
          className="rent-grid"
        >

          {rentalProperties.map((property) => (

            <article
              key={property.id}
              className="rent-card"
            >

              <Link
                href="/properties"
                className="rent-card-link"
                aria-label={property.title}
              />


              {/* IMAGE */}

              <div className="rent-image-wrap">

                <img
                  src={property.image}
                  alt={property.title}
                  className="rent-image"
                />


                <div className="rent-image-shade" />


                <div className="rent-tags">

                  <span className="rent-tag-primary">
                    RENT
                  </span>


                  <span className="rent-tag-secondary">
                    {property.type}
                  </span>

                </div>


                <button
                  type="button"
                  className="rent-heart"
                  aria-label="Save property"
                >
                  <HeartIcon />
                </button>


                <span className="rent-card-number">
                  {property.id}
                </span>

              </div>


              {/* CONTENT */}

              <div className="rent-card-content">

                <div className="rent-price">
                  {property.price}
                </div>


                {/* STATS */}

                <div className="rent-stats">

                  <div className="rent-stat">

                    <div className="rent-stat-value">
                      <BedIcon />

                      <strong>
                        {property.beds}
                      </strong>
                    </div>

                    <small>
                      BEDS
                    </small>

                  </div>


                  <div className="rent-stat">

                    <div className="rent-stat-value">
                      <BathIcon />

                      <strong>
                        {property.baths}
                      </strong>
                    </div>

                    <small>
                      BATHS
                    </small>

                  </div>


                  <div className="rent-stat">

                    <div className="rent-stat-value">
                      <AreaIcon />

                      <strong>
                        {property.area}
                      </strong>
                    </div>

                    <small>
                      SQUARE (FT)
                    </small>

                  </div>

                </div>


                <div className="rent-divider" />


                {/* TITLE */}

                <h3>
                  {property.title}
                </h3>


                {/* LOCATION */}

                <div className="rent-location">

                  <PinIcon />

                  <span>
                    {property.location}
                  </span>

                </div>


                <div className="rent-agent-divider" />


                {/* AGENT */}

                <div className="rent-agent">

                  <div className="rent-agent-avatar">
                    {property.agent.charAt(0)}
                  </div>


                  <div className="rent-agent-info">

                    <small>
                      LISTING BY
                    </small>

                    <strong>
                      {property.agent}
                    </strong>

                  </div>


                  <span className="rent-agent-arrow">
                    ↗
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