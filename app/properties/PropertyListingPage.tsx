"use client";

import Link from "next/link";

import {
  useMemo,
  useState,
} from "react";

import {
  useLanguage,
} from "../context/LanguageContext";

import "./Properties.css";


/* ==========================================================
   TYPES
========================================================== */

type PropertyStatus =
  | "buy"
  | "rent"
  | "off-plan";

type InitialStatus =
  | PropertyStatus
  | "all";

type Property = {
  id: number;

  title: string;
  titleAr: string;

  slug: string;

  status: PropertyStatus;

  type: string;
  typeAr: string;

  location: string;
  locationAr: string;

  city: string;

  beds: number;
  baths: number;
  area: number;

  price: string;
  priceAr: string;

  image: string;

  agent: string;
  agentImage: string;
};

type PropertyListingPageProps = {
  initialStatus?: InitialStatus;
};


/* ==========================================================
   PROPERTY DATA
========================================================== */

const properties: Property[] = [
  {
    id: 1,

    title:
      "Ultra-Luxury Beachfront Villa",

    titleAr:
      "فيلا شاطئية فائقة الفخامة",

    slug:
      "ultra-luxury-beachfront-villa",

    status:
      "buy",

    type:
      "Villa",

    typeAr:
      "فيلا",

    location:
      "Palm Jumeirah, Dubai",

    locationAr:
      "نخلة جميرا، دبي",

    city:
      "Dubai",

    beds:
      5,

    baths:
      6,

    area:
      8200,

    price:
      "AED 18,500,000",

    priceAr:
      "18,500,000 درهم",

    image:
      "/images/luxury-villa.png",

    agent:
      "Sultan Umar",

    agentImage:
      "/images/agents/sultan-umar.png",
  },

  {
    id: 2,

    title:
      "Penthouse Above the Clouds",

    titleAr:
      "بنتهاوس فوق السحاب",

    slug:
      "penthouse-above-the-clouds",

    status:
      "buy",

    type:
      "Penthouse",

    typeAr:
      "بنتهاوس",

    location:
      "Downtown Dubai",

    locationAr:
      "وسط مدينة دبي",

    city:
      "Dubai",

    beds:
      4,

    baths:
      5,

    area:
      6800,

    price:
      "AED 25,000,000",

    priceAr:
      "25,000,000 درهم",

    image:
      "/images/glass-facade.png",

    agent:
      "Sameet Kumar",

    agentImage:
      "/images/agents/sameet-kumar.png",
  },

  {
    id: 3,

    title:
      "Family Townhouse in Saadiyat",

    titleAr:
      "تاون هاوس عائلي في السعديات",

    slug:
      "family-townhouse-saadiyat",

    status:
      "off-plan",

    type:
      "Townhouse",

    typeAr:
      "تاون هاوس",

    location:
      "Saadiyat Island, Abu Dhabi",

    locationAr:
      "جزيرة السعديات، أبوظبي",

    city:
      "Abu Dhabi",

    beds:
      4,

    baths:
      4,

    area:
      3200,

    price:
      "AED 5,400,000",

    priceAr:
      "5,400,000 درهم",

    image:
      "/images/render-saadiyat.png",

    agent:
      "Aanis Khalil",

    agentImage:
      "/images/agents/aanis-khalil.png",
  },

  {
    id: 4,

    title:
      "Waterfront Apartment for Rent",

    titleAr:
      "شقة للإيجار على الواجهة البحرية",

    slug:
      "waterfront-apartment-for-rent",

    status:
      "rent",

    type:
      "Apartment",

    typeAr:
      "شقة",

    location:
      "Dubai Marina, Dubai",

    locationAr:
      "دبي مارينا، دبي",

    city:
      "Dubai",

    beds:
      1,

    baths:
      1,

    area:
      820,

    price:
      "AED 145,000 / yr",

    priceAr:
      "145,000 درهم / سنوياً",

    image:
      "/images/render-marina.png",

    agent:
      "Sultan Umar",

    agentImage:
      "/images/agents/sultan-umar.png",
  },

  {
    id: 5,

    title:
      "Yas Island Residence",

    titleAr:
      "سكن فاخر في جزيرة ياس",

    slug:
      "yas-island-residence",

    status:
      "rent",

    type:
      "Apartment",

    typeAr:
      "شقة",

    location:
      "Yas Island, Abu Dhabi",

    locationAr:
      "جزيرة ياس، أبوظبي",

    city:
      "Abu Dhabi",

    beds:
      3,

    baths:
      3,

    area:
      1850,

    price:
      "AED 180,000 / yr",

    priceAr:
      "180,000 درهم / سنوياً",

    image:
      "/images/abudhabi-skyline.png",

    agent:
      "Aanis Khalil",

    agentImage:
      "/images/agents/aanis-khalil.png",
  },

  {
    id: 6,

    title:
      "Modern Apartment with Marina Views",

    titleAr:
      "شقة عصرية بإطلالات على المارينا",

    slug:
      "modern-apartment-marina-views",

    status:
      "buy",

    type:
      "Apartment",

    typeAr:
      "شقة",

    location:
      "Dubai Marina, Dubai",

    locationAr:
      "دبي مارينا، دبي",

    city:
      "Dubai",

    beds:
      2,

    baths:
      2,

    area:
      1450,

    price:
      "AED 2,800,000",

    priceAr:
      "2,800,000 درهم",

    image:
      "/images/dubai-skyline.png",

    agent:
      "Aanis Khalil",

    agentImage:
      "/images/agents/aanis-khalil.png",
  },
];


/* ==========================================================
   COMPONENT
========================================================== */

export default function PropertyListingPage({
  initialStatus = "all",
}: PropertyListingPageProps) {

  const {
    isArabic,
  } = useLanguage();


  const [
    propertyType,
    setPropertyType,
  ] = useState("all");


  const [
    location,
    setLocation,
  ] = useState("all");


  const [
    beds,
    setBeds,
  ] = useState("all");


  const [
    statuses,
    setStatuses,
  ] = useState<PropertyStatus[]>(
    initialStatus === "all"
      ? [
          "buy",
          "rent",
          "off-plan",
        ]
      : [
          initialStatus,
        ]
  );


  const [
    favourites,
    setFavourites,
  ] = useState<number[]>([]);


  /* ========================================================
     TEXT
  ======================================================== */

  const text =
    isArabic
      ? {
          portfolio:
            "المحفظة العقارية",

          allTitle1:
            "حياة",

          allTitle2:
            "استثنائية",

          allDescription:
            "اكتشف مجموعة مختارة من العقارات المميزة للبيع والإيجار والمشاريع على المخطط في دبي وأبوظبي.",

          salesTitle1:
            "عقارات",

          salesTitle2:
            "للبيع",

          salesDescription:
            "اكتشف مجموعة مختارة من العقارات السكنية والاستثمارية المعروضة للبيع في دبي وأبوظبي.",

          rentTitle1:
            "عقارات",

          rentTitle2:
            "للإيجار",

          rentDescription:
            "اكتشف مجموعة مختارة من المنازل والشقق والعقارات الفاخرة المتاحة للإيجار في الإمارات.",

          offPlanTitle1:
            "مشاريع",

          offPlanTitle2:
            "على المخطط",

          offPlanDescription:
            "استكشف أبرز المشاريع الجديدة والفرص العقارية على المخطط في دبي وأبوظبي.",

          propertyType:
            "نوع العقار",

          location:
            "الموقع",

          bedrooms:
            "غرف النوم",

          allTypes:
            "جميع الأنواع",

          villa:
            "فيلا",

          apartment:
            "شقة",

          penthouse:
            "بنتهاوس",

          townhouse:
            "تاون هاوس",

          allLocations:
            "جميع المواقع",

          dubai:
            "دبي",

          abuDhabi:
            "أبوظبي",

          anyBeds:
            "أي عدد من الغرف",

          oneBed:
            "غرفة نوم واحدة",

          twoBeds:
            "غرفتا نوم",

          threeBeds:
            "3 غرف نوم",

          fourBeds:
            "4+ غرف نوم",

          refineSearch:
            "تصفية البحث",

          status:
            "الحالة",

          buy:
            "للبيع",

          rent:
            "للإيجار",

          offPlan:
            "على المخطط",

          showing:
            "عرض",

          results:
            "عقارات",

          bedsLabel:
            "غرف",

          bathsLabel:
            "حمامات",

          sqft:
            "قدم مربع",

          listingBy:
            "المدرج بواسطة",

          noResults:
            "لا توجد عقارات تطابق الفلاتر المحددة.",

          clearFilters:
            "مسح الفلاتر",
        }
      : {
          portfolio:
            "PORTFOLIO",

          allTitle1:
            "Elevated",

          allTitle2:
            "Living",

          allDescription:
            "Explore a considered portfolio of properties for sale, rent and off-plan opportunities across Dubai and Abu Dhabi.",

          salesTitle1:
            "Properties",

          salesTitle2:
            "For Sale",

          salesDescription:
            "Discover a considered collection of residential and investment properties for sale across Dubai and Abu Dhabi.",

          rentTitle1:
            "Properties",

          rentTitle2:
            "For Rent",

          rentDescription:
            "Discover a curated selection of homes, apartments and premium residences available to rent across the UAE.",

          offPlanTitle1:
            "Off-Plan",

          offPlanTitle2:
            "Opportunities",

          offPlanDescription:
            "Explore carefully selected new developments and future property opportunities across Dubai and Abu Dhabi.",

          propertyType:
            "PROPERTY TYPE",

          location:
            "LOCATION",

          bedrooms:
            "BEDROOMS",

          allTypes:
            "All Types",

          villa:
            "Villa",

          apartment:
            "Apartment",

          penthouse:
            "Penthouse",

          townhouse:
            "Townhouse",

          allLocations:
            "Any Location",

          dubai:
            "Dubai",

          abuDhabi:
            "Abu Dhabi",

          anyBeds:
            "Beds (Any)",

          oneBed:
            "1 Bedroom",

          twoBeds:
            "2 Bedrooms",

          threeBeds:
            "3 Bedrooms",

          fourBeds:
            "4+ Bedrooms",

          refineSearch:
            "REFINE SEARCH",

          status:
            "STATUS",

          buy:
            "Buy",

          rent:
            "Rent",

          offPlan:
            "Off-Plan",

          showing:
            "SHOWING",

          results:
            "RESULTS",

          bedsLabel:
            "BEDS",

          bathsLabel:
            "BATHS",

          sqft:
            "SQUARE (FT)",

          listingBy:
            "LISTING BY",

          noResults:
            "No properties match the selected filters.",

          clearFilters:
            "CLEAR FILTERS",
        };


  /* ========================================================
     PAGE CONTENT
  ======================================================== */

  let titleOne =
    text.allTitle1;

  let titleTwo =
    text.allTitle2;

  let pageDescription =
    text.allDescription;


  if (
    initialStatus ===
    "buy"
  ) {
    titleOne =
      text.salesTitle1;

    titleTwo =
      text.salesTitle2;

    pageDescription =
      text.salesDescription;
  }


  if (
    initialStatus ===
    "rent"
  ) {
    titleOne =
      text.rentTitle1;

    titleTwo =
      text.rentTitle2;

    pageDescription =
      text.rentDescription;
  }


  if (
    initialStatus ===
    "off-plan"
  ) {
    titleOne =
      text.offPlanTitle1;

    titleTwo =
      text.offPlanTitle2;

    pageDescription =
      text.offPlanDescription;
  }


  /* ========================================================
     FILTERED PROPERTIES
  ======================================================== */

  const filteredProperties =
    useMemo(
      () => {

        return properties.filter(
          property => {

            const matchesStatus =
              statuses.includes(
                property.status
              );


            const matchesType =
              propertyType ===
                "all" ||
              property.type ===
                propertyType;


            const matchesLocation =
              location ===
                "all" ||
              property.city ===
                location;


            const matchesBeds =
              beds ===
                "all" ||
              (
                beds ===
                  "4+" &&
                property.beds >=
                  4
              ) ||
              property.beds ===
                Number(
                  beds
                );


            return (
              matchesStatus &&
              matchesType &&
              matchesLocation &&
              matchesBeds
            );
          }
        );

      },
      [
        statuses,
        propertyType,
        location,
        beds,
      ]
    );


  /* ========================================================
     STATUS FILTER
  ======================================================== */

  const toggleStatus = (
    status:
      PropertyStatus
  ) => {

    /*
      On dedicated pages:
      sales/rent/off-plan status remains fixed.
    */

    if (
      initialStatus !==
      "all"
    ) {
      return;
    }


    setStatuses(
      current => {

        if (
          current.includes(
            status
          )
        ) {

          return current.filter(
            item =>
              item !==
              status
          );
        }


        return [
          ...current,
          status,
        ];
      }
    );
  };


  /* ========================================================
     FAVOURITE
  ======================================================== */

  const toggleFavourite = (
    id: number
  ) => {

    setFavourites(
      current => {

        if (
          current.includes(
            id
          )
        ) {

          return current.filter(
            item =>
              item !==
              id
          );
        }


        return [
          ...current,
          id,
        ];
      }
    );
  };


  /* ========================================================
     CLEAR FILTERS
  ======================================================== */

  const clearFilters =
    () => {

      setPropertyType(
        "all"
      );

      setLocation(
        "all"
      );

      setBeds(
        "all"
      );


      if (
        initialStatus ===
        "all"
      ) {

        setStatuses([
          "buy",
          "rent",
          "off-plan",
        ]);

      } else {

        setStatuses([
          initialStatus,
        ]);
      }
    };


  /* ========================================================
     STATUS LABEL
  ======================================================== */

  const getStatusLabel = (
    status:
      PropertyStatus
  ) => {

    if (
      status ===
      "rent"
    ) {
      return text.rent;
    }


    if (
      status ===
      "off-plan"
    ) {
      return text.offPlan;
    }


    return text.buy;
  };


  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <main
      className="properties-page"
      dir={
        isArabic
          ? "rtl"
          : "ltr"
      }
    >

      {/* ====================================================
          HERO
      ==================================================== */}

      <section className="properties-intro">

        <div className="properties-intro-grid" />

        <div className="properties-intro-orbit properties-intro-orbit-one" />

        <div className="properties-intro-orbit properties-intro-orbit-two" />


        <div className="properties-container">

          <div className="properties-intro-content">

            <div className="properties-eyebrow">

              <span />

              {text.portfolio}

            </div>


            <h1>

              {titleOne}

              <span>
                {titleTwo}
              </span>

            </h1>


            <p>
              {pageDescription}
            </p>

          </div>

        </div>

      </section>


      {/* ====================================================
          TOP FILTER BAR
      ==================================================== */}

      <section className="properties-filter-section">

        <div className="properties-container">

          <div className="properties-filter-bar">


            {/* PROPERTY TYPE */}

            <div className="properties-filter-field">

              <small>
                {text.propertyType}
              </small>


              <select
                value={
                  propertyType
                }
                onChange={
                  event =>
                    setPropertyType(
                      event.currentTarget.value
                    )
                }
              >

                <option value="all">
                  {text.allTypes}
                </option>


                <option value="Villa">
                  {text.villa}
                </option>


                <option value="Apartment">
                  {text.apartment}
                </option>


                <option value="Penthouse">
                  {text.penthouse}
                </option>


                <option value="Townhouse">
                  {text.townhouse}
                </option>

              </select>

            </div>


            {/* LOCATION */}

            <div className="properties-filter-field">

              <small>
                {text.location}
              </small>


              <select
                value={
                  location
                }
                onChange={
                  event =>
                    setLocation(
                      event.currentTarget.value
                    )
                }
              >

                <option value="all">
                  {text.allLocations}
                </option>


                <option value="Dubai">
                  {text.dubai}
                </option>


                <option value="Abu Dhabi">
                  {text.abuDhabi}
                </option>

              </select>

            </div>


            {/* BEDROOMS */}

            <div className="properties-filter-field">

              <small>
                {text.bedrooms}
              </small>


              <select
                value={
                  beds
                }
                onChange={
                  event =>
                    setBeds(
                      event.currentTarget.value
                    )
                }
              >

                <option value="all">
                  {text.anyBeds}
                </option>


                <option value="1">
                  {text.oneBed}
                </option>


                <option value="2">
                  {text.twoBeds}
                </option>


                <option value="3">
                  {text.threeBeds}
                </option>


                <option value="4+">
                  {text.fourBeds}
                </option>

              </select>

            </div>

          </div>

        </div>

      </section>


      {/* ====================================================
          RESULTS
      ==================================================== */}

      <section className="properties-results-section">

        <div className="properties-container">

          <div className="properties-results-layout">


            {/* ==============================================
                LEFT FILTER
            =============================================== */}

            <aside className="properties-sidebar">

              <div className="properties-sidebar-label">
                {text.refineSearch}
              </div>


              <div className="properties-sidebar-rule" />


              <small className="properties-sidebar-heading">
                {text.status}
              </small>


              {/* BUY */}

              <label
                className={`
                  properties-check
                  ${
                    initialStatus !==
                    "all"
                      ? "properties-check-fixed"
                      : ""
                  }
                `}
              >

                <input
                  type="checkbox"
                  checked={
                    statuses.includes(
                      "buy"
                    )
                  }
                  disabled={
                    initialStatus !==
                    "all"
                  }
                  onChange={() =>
                    toggleStatus(
                      "buy"
                    )
                  }
                />


                <span className="properties-custom-check">
                  ✓
                </span>


                <span>
                  {text.buy}
                </span>

              </label>


              {/* RENT */}

              <label
                className={`
                  properties-check
                  ${
                    initialStatus !==
                    "all"
                      ? "properties-check-fixed"
                      : ""
                  }
                `}
              >

                <input
                  type="checkbox"
                  checked={
                    statuses.includes(
                      "rent"
                    )
                  }
                  disabled={
                    initialStatus !==
                    "all"
                  }
                  onChange={() =>
                    toggleStatus(
                      "rent"
                    )
                  }
                />


                <span className="properties-custom-check">
                  ✓
                </span>


                <span>
                  {text.rent}
                </span>

              </label>


              {/* OFF PLAN */}

              <label
                className={`
                  properties-check
                  ${
                    initialStatus !==
                    "all"
                      ? "properties-check-fixed"
                      : ""
                  }
                `}
              >

                <input
                  type="checkbox"
                  checked={
                    statuses.includes(
                      "off-plan"
                    )
                  }
                  disabled={
                    initialStatus !==
                    "all"
                  }
                  onChange={() =>
                    toggleStatus(
                      "off-plan"
                    )
                  }
                />


                <span className="properties-custom-check">
                  ✓
                </span>


                <span>
                  {text.offPlan}
                </span>

              </label>


              <button
                type="button"
                className="properties-clear-filter"
                onClick={
                  clearFilters
                }
              >
                {text.clearFilters}
              </button>

            </aside>


            {/* ==============================================
                MAIN GRID
            =============================================== */}

            <div className="properties-results-main">


              <div className="properties-results-top">

                <div className="properties-result-count">

                  <span>
                    {text.showing}
                  </span>


                  <strong>
                    {
                      filteredProperties.length
                    }
                  </strong>


                  <span>
                    {text.results}
                  </span>

                </div>

              </div>


              {
                filteredProperties.length >
                0 ? (

                  <div className="properties-grid">

                    {
                      filteredProperties.map(
                        property => {

                          const favourite =
                            favourites.includes(
                              property.id
                            );


                          return (

                            <article
                              key={
                                property.id
                              }
                              className="property-listing-card"
                            >


                              {/* ==================================
                                  IMAGE
                              ================================== */}

                              <div className="property-card-image-wrap">

                                <img
                                  src={
                                    property.image
                                  }
                                  alt={
                                    isArabic
                                      ? property.titleAr
                                      : property.title
                                  }
                                  className="property-card-image"
                                />


                                <div className="property-card-image-overlay" />


                                <span
                                  className={`
                                    property-card-status
                                    property-card-status-${property.status}
                                  `}
                                >

                                  {
                                    getStatusLabel(
                                      property.status
                                    )
                                  }

                                </span>


                                <button
                                  type="button"
                                  className={`
                                    property-card-favourite
                                    ${
                                      favourite
                                        ? "active"
                                        : ""
                                    }
                                  `}
                                  onClick={() =>
                                    toggleFavourite(
                                      property.id
                                    )
                                  }
                                  aria-label="Favourite property"
                                >

                                  <HeartIcon
                                    filled={
                                      favourite
                                    }
                                  />

                                </button>

                              </div>


                              {/* ==================================
                                  CONTENT
                              ================================== */}

                              <div className="property-card-body">


                                {/* PRICE */}

                                <div className="property-card-price">

                                  {
                                    isArabic
                                      ? property.priceAr
                                      : property.price
                                  }

                                </div>


                                {/* SPECS */}

                                <div className="property-card-specs">


                                  <div>

                                    <BedIcon />

                                    <strong>
                                      {
                                        property.beds
                                      }
                                    </strong>

                                    <small>
                                      {
                                        text.bedsLabel
                                      }
                                    </small>

                                  </div>


                                  <div>

                                    <BathIcon />

                                    <strong>
                                      {
                                        property.baths
                                      }
                                    </strong>

                                    <small>
                                      {
                                        text.bathsLabel
                                      }
                                    </small>

                                  </div>


                                  <div>

                                    <AreaIcon />

                                    <strong>
                                      {
                                        property.area
                                          .toLocaleString()
                                      }
                                    </strong>

                                    <small>
                                      {
                                        text.sqft
                                      }
                                    </small>

                                  </div>

                                </div>


                                {/* TITLE */}

                                <div className="property-card-main-content">

                                  <h2>

                                    {
                                      isArabic
                                        ? property.titleAr
                                        : property.title
                                    }

                                  </h2>


                                  <div className="property-card-location">

                                    <LocationIcon />

                                    <span>

                                      {
                                        isArabic
                                          ? property.locationAr
                                          : property.location
                                      }

                                    </span>

                                  </div>

                                </div>


                                {/* AGENT */}

                                <div className="property-card-agent">


                                  <div className="property-card-agent-image">

                                    <img
                                      src={
                                        property.agentImage
                                      }
                                      alt={
                                        property.agent
                                      }
                                    />

                                  </div>


                                  <div>

                                    <small>
                                      {
                                        text.listingBy
                                      }
                                    </small>

                                    <strong>
                                      {
                                        property.agent
                                      }
                                    </strong>

                                  </div>


                                  <Link
                                    href={
                                      `/properties/${property.slug}`
                                    }
                                    className="property-card-arrow"
                                    aria-label={
                                      property.title
                                    }
                                  >
                                    ↗
                                  </Link>

                                </div>

                              </div>

                            </article>

                          );
                        }
                      )
                    }

                  </div>

                ) : (

                  <div className="properties-empty">

                    <span>
                      00
                    </span>


                    <h2>
                      {text.noResults}
                    </h2>


                    <button
                      type="button"
                      onClick={
                        clearFilters
                      }
                    >
                      {text.clearFilters}
                    </button>

                  </div>

                )
              }

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


/* ==========================================================
   HEART ICON
========================================================== */

function HeartIcon({
  filled,
}: {
  filled: boolean;
}) {

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M12 20.2 4.7 13C1.8 10.1 3.8 5 7.9 5c1.7 0 3.2.8 4.1 2.1C12.9 5.8 14.4 5 16.1 5c4.1 0 6.1 5.1 3.2 8L12 20.2Z"
        fill={
          filled
            ? "currentColor"
            : "none"
        }
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}


/* ==========================================================
   BED ICON
========================================================== */

function BedIcon() {

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >

      <path
        d="M3 18V8"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M21 18v-6H3"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M7 12V9h4v3"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M3 16h18"
        stroke="currentColor"
        strokeWidth="1.5"
      />

    </svg>
  );
}


/* ==========================================================
   BATH ICON
========================================================== */

function BathIcon() {

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >

      <path
        d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M7 12V6a2 2 0 0 1 4 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

    </svg>
  );
}


/* ==========================================================
   AREA ICON
========================================================== */

function AreaIcon() {

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >

      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M8 4v4H4M16 20v-4h4"
        stroke="currentColor"
        strokeWidth="1.5"
      />

    </svg>
  );
}


/* ==========================================================
   LOCATION ICON
========================================================== */

function LocationIcon() {

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >

      <path
        d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx="12"
        cy="10"
        r="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />

    </svg>
  );
}