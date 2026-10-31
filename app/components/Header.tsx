"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useLanguage } from "../context/LanguageContext";

import "./Header.css";
import "../SiteLayout.css";


/* ==========================================================
   TYPES
========================================================== */

type NavDropdown =
  | "properties"
  | "about"
  | null;

type UtilityDropdown =
  | "language"
  | "currency"
  | null;


/* ==========================================================
   PROPERTIES MENU
========================================================== */

const propertiesMenu = [
  {
    en: "All Properties",
    ar: "جميع العقارات",
    href: "/properties",
  },
  {
    en: "Off Plan",
    ar: "على المخطط",
    href: "/properties/off-plan",
  },
  {
    en: "Sales",
    ar: "للبيع",
    href: "/properties/sales",
  },
  {
    en: "Rent",
    ar: "للإيجار",
    href: "/properties/rent",
  },
];


/* ==========================================================
   ABOUT MENU
========================================================== */

const aboutMenu = [
  {
    en: "About YourKey",
    ar: "عن يوركي",
    href: "/about",
  },
  {
    en: "Meet The Team",
    ar: "تعرف على فريقنا",
    href: "/agents",
  },
];


/* ==========================================================
   CURRENCIES
========================================================== */

const currencies = [
  "AED",
  "USD",
  "GBP",
  "EUR",
  "INR",
  "PKR",
];


/* ==========================================================
   COMPONENT
========================================================== */

export default function Header() {
  const {
    language,
    isArabic,
    setLanguage,
  } = useLanguage();


  const [
    scrolled,
    setScrolled,
  ] = useState(false);


  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);


  const [
    activeDropdown,
    setActiveDropdown,
  ] =
    useState<NavDropdown>(
      null
    );


  const [
    utilityDropdown,
    setUtilityDropdown,
  ] =
    useState<UtilityDropdown>(
      null
    );


  const [
    currency,
    setCurrency,
  ] =
    useState("AED");


  /* ========================================================
     TEXT
  ======================================================== */

  const text = {
    properties:
      isArabic
        ? "العقارات"
        : "Properties",

    communities:
      isArabic
        ? "المناطق"
        : "Communities",

    investment:
      isArabic
        ? "الاستثمار"
        : "Investment",

    about:
      isArabic
        ? "من نحن"
        : "About",

    contact:
      isArabic
        ? "اتصل بنا"
        : "Contact",

    getInTouch:
      isArabic
        ? "تواصل معنا"
        : "GET IN TOUCH",

    discover:
      isArabic
        ? "اكتشف"
        : "DISCOVER",

    residences:
      isArabic
        ? "العقارات"
        : "Properties",

    explore:
      isArabic
        ? "استكشف"
        : "EXPLORE",

    uae:
      isArabic
        ? "الإمارات"
        : "The UAE",

    company:
      isArabic
        ? "الشركة"
        : "Company",

    yourKey:
      isArabic
        ? "يوركي"
        : "YOURKEY",

    navigation:
      isArabic
        ? "التنقل"
        : "NAVIGATION",

    language:
      isArabic
        ? "اللغة"
        : "LANGUAGE",

    currency:
      isArabic
        ? "العملة"
        : "CURRENCY",

    team:
      isArabic
        ? "فريقنا"
        : "Meet The Team",

    contactYourKey:
      isArabic
        ? "تواصل مع YOURKEY"
        : "CONTACT YOURKEY",
  };


  /* ========================================================
     HEADER SCROLL
  ======================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 20
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);


  /* ========================================================
     MOBILE BODY LOCK
  ======================================================== */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [mobileOpen]);


  /* ========================================================
     RESTORE SAVED CURRENCY
  ======================================================== */

  useEffect(() => {
    const savedCurrency =
      localStorage.getItem(
        "site-currency"
      );

    if (
      savedCurrency &&
      currencies.includes(
        savedCurrency
      )
    ) {
      setCurrency(
        savedCurrency
      );
    }
  }, []);


  /* ========================================================
     ESCAPE KEY
  ======================================================== */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape"
      ) {
        setActiveDropdown(
          null
        );

        setUtilityDropdown(
          null
        );

        setMobileOpen(
          false
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);


  /* ========================================================
     LANGUAGE
  ======================================================== */

  const chooseLanguage = (
    nextLanguage:
      "en" | "ar"
  ) => {
    setLanguage(
      nextLanguage
    );

    setUtilityDropdown(
      null
    );
  };


  /* ========================================================
     CURRENCY
  ======================================================== */

  const chooseCurrency = (
    nextCurrency: string
  ) => {
    if (
      !currencies.includes(
        nextCurrency
      )
    ) {
      return;
    }

    setCurrency(
      nextCurrency
    );

    localStorage.setItem(
      "site-currency",
      nextCurrency
    );

    window.dispatchEvent(
      new CustomEvent(
        "site-currency-change",
        {
          detail:
            nextCurrency,
        }
      )
    );

    setUtilityDropdown(
      null
    );
  };


  /* ========================================================
     MOBILE CLOSE
  ======================================================== */

  const closeMobile = () => {
    setMobileOpen(
      false
    );

    setActiveDropdown(
      null
    );

    setUtilityDropdown(
      null
    );
  };


  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <>

      <header
        className={`
          luxury-header
          ${
            scrolled
              ? "luxury-header-scrolled"
              : ""
          }
        `}
      >

        <div className="luxury-header-gold-line" />


        <div className="luxury-header-inner">


          {/* ==================================================
              LOGO
          ================================================== */}

          <Link
            href="/"
            className="luxury-logo"
            aria-label="YourKey Home"
          >

            <span className="luxury-logo-mark">
              <i />
              <i />
            </span>


            <span className="luxury-logo-word">
              YOUR
              <strong>
                KEY
              </strong>
            </span>


            <small>
              UAE
            </small>

          </Link>


          {/* ==================================================
              DESKTOP NAV
          ================================================== */}

          <nav className="luxury-nav">


            {/* ================================================
                PROPERTIES
            ================================================ */}

            <div
              className="
                luxury-nav-item
                luxury-nav-dropdown
              "
              onMouseEnter={() =>
                setActiveDropdown(
                  "properties"
                )
              }
              onMouseLeave={() =>
                setActiveDropdown(
                  null
                )
              }
            >

              <button
                type="button"
                className="luxury-nav-trigger"
              >

                <span>
                  {text.properties}
                </span>

                <i />

              </button>


              <div
                className={`
                  luxury-dropdown
                  ${
                    activeDropdown ===
                    "properties"
                      ? "luxury-dropdown-open"
                      : ""
                  }
                `}
              >

                <div className="luxury-dropdown-head">

                  <small>
                    {text.discover}
                  </small>

                  <span>
                    {text.residences}
                  </span>

                </div>


                <div className="luxury-dropdown-links">

                  {propertiesMenu.map(
                    (
                      item,
                      index
                    ) => (

                      <Link
                        href={
                          item.href
                        }
                        key={
                          item.en
                        }
                      >

                        <small>
                          0
                          {index + 1}
                        </small>


                        <span>
                          {
                            isArabic
                              ? item.ar
                              : item.en
                          }
                        </span>


                        <i>
                          ↗
                        </i>

                      </Link>

                    )
                  )}

                </div>

              </div>

            </div>


            {/* ================================================
                COMMUNITIES (DIRECT LINK, NO DROPDOWN)
            ================================================ */}

            <Link
              href="/communities"
              className="luxury-nav-link"
            >
              {text.communities}
            </Link>


            {/* ================================================
                INVESTMENT
            ================================================ */}

            <Link
              href="/investment"
              className="luxury-nav-link"
            >
              {text.investment}
            </Link>


            {/* ================================================
                ABOUT
            ================================================ */}

            <div
              className="
                luxury-nav-item
                luxury-nav-dropdown
              "
              onMouseEnter={() =>
                setActiveDropdown(
                  "about"
                )
              }
              onMouseLeave={() =>
                setActiveDropdown(
                  null
                )
              }
            >

              <button
                type="button"
                className="luxury-nav-trigger"
              >

                <span>
                  {text.about}
                </span>

                <i />

              </button>


              <div
                className={`
                  luxury-dropdown
                  luxury-dropdown-about
                  ${
                    activeDropdown ===
                    "about"
                      ? "luxury-dropdown-open"
                      : ""
                  }
                `}
              >

                <div className="luxury-dropdown-head">

                  <small>
                    {text.yourKey}
                  </small>

                  <span>
                    {text.company}
                  </span>

                </div>


                <div className="luxury-dropdown-links">

                  {aboutMenu.map(
                    (
                      item,
                      index
                    ) => (

                      <Link
                        href={
                          item.href
                        }
                        key={
                          item.en
                        }
                      >

                        <small>
                          0
                          {index + 1}
                        </small>


                        <span>
                          {
                            isArabic
                              ? item.ar
                              : item.en
                          }
                        </span>


                        <i>
                          ↗
                        </i>

                      </Link>

                    )
                  )}

                </div>

              </div>

            </div>


            {/* ================================================
                CONTACT
            ================================================ */}

            <Link
              href="/contact"
              className="luxury-nav-link"
            >
              {text.contact}
            </Link>

          </nav>


          {/* ==================================================
              HEADER ACTIONS
          ================================================== */}

          <div className="luxury-header-actions">


            {/* ================================================
                LANGUAGE
            ================================================ */}

            <div className="luxury-utility">

              <button
                type="button"
                className={`
                  luxury-header-mini
                  ${
                    utilityDropdown ===
                    "language"
                      ? "luxury-header-mini-active"
                      : ""
                  }
                `}
                aria-expanded={
                  utilityDropdown ===
                  "language"
                }
                onClick={() => {
                  if (
                    utilityDropdown ===
                    "language"
                  ) {
                    setUtilityDropdown(
                      null
                    );
                  } else {
                    setUtilityDropdown(
                      "language"
                    );
                  }
                }}
              >

                <span>
                  {
                    language ===
                    "ar"
                      ? "AR"
                      : "EN"
                  }
                </span>

                <i />

              </button>


              <div
                className={`
                  luxury-utility-dropdown
                  luxury-language-dropdown
                  ${
                    utilityDropdown ===
                    "language"
                      ? "luxury-utility-dropdown-open"
                      : ""
                  }
                `}
              >

                <button
                  type="button"
                  className={
                    language ===
                    "en"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    chooseLanguage(
                      "en"
                    )
                  }
                >

                  <span>
                    English
                  </span>

                  <small>
                    EN
                  </small>

                </button>


                <button
                  type="button"
                  className={
                    language ===
                    "ar"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    chooseLanguage(
                      "ar"
                    )
                  }
                >

                  <span
                    lang="ar"
                    dir="rtl"
                  >
                    العربية
                  </span>

                  <small>
                    AR
                  </small>

                </button>

              </div>

            </div>


            {/* ================================================
                CURRENCY
            ================================================ */}

            <div className="luxury-utility">

              <button
                type="button"
                className={`
                  luxury-header-mini
                  ${
                    utilityDropdown ===
                    "currency"
                      ? "luxury-header-mini-active"
                      : ""
                  }
                `}
                aria-expanded={
                  utilityDropdown ===
                  "currency"
                }
                onClick={() => {
                  if (
                    utilityDropdown ===
                    "currency"
                  ) {
                    setUtilityDropdown(
                      null
                    );
                  } else {
                    setUtilityDropdown(
                      "currency"
                    );
                  }
                }}
              >

                <span>
                  {currency}
                </span>

                <i />

              </button>


              <div
                className={`
                  luxury-utility-dropdown
                  luxury-currency-dropdown
                  ${
                    utilityDropdown ===
                    "currency"
                      ? "luxury-utility-dropdown-open"
                      : ""
                  }
                `}
              >

                {currencies.map(
                  item => (

                    <button
                      type="button"
                      key={item}
                      className={
                        currency ===
                        item
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        chooseCurrency(
                          item
                        )
                      }
                    >

                      <span>
                        {item}
                      </span>


                      {
                        currency ===
                          item && (
                          <small>
                            ✓
                          </small>
                        )
                      }

                    </button>

                  )
                )}

              </div>

            </div>


            <span className="luxury-header-divider" />


            {/* ================================================
                PHONE
            ================================================ */}

            <a
              href="tel:+971506692770"
              className="luxury-header-icon"
              aria-label="Call YourKey"
            >

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >

                <path
                  d="M6.6 10.8c1.5 3 3.8 5.3 6.8 6.8l2.3-2.3c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.1 21 3 12.9 3 3.4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

              </svg>

            </a>


            {/* ================================================
                CTA
            ================================================ */}

            <Link
              href="/contact"
              className="luxury-header-cta"
            >

              <span>
                {text.getInTouch}
              </span>

              <i>
                ↗
              </i>

            </Link>


            {/* ================================================
                MOBILE BUTTON
            ================================================ */}

            <button
              type="button"
              className={`
                luxury-menu-button
                ${
                  mobileOpen
                    ? "luxury-menu-button-active"
                    : ""
                }
              `}
              onClick={() =>
                setMobileOpen(
                  !mobileOpen
                )
              }
              aria-label={
                mobileOpen
                  ? "Close menu"
                  : "Open menu"
              }
            >

              <span />
              <span />

            </button>

          </div>

        </div>

      </header>


      {/* ====================================================
          MOBILE MENU
      ==================================================== */}

      <div
        className={`
          luxury-mobile-menu
          ${
            mobileOpen
              ? "luxury-mobile-menu-open"
              : ""
          }
        `}
      >

        <div className="luxury-mobile-bg-grid" />


        <div className="luxury-mobile-menu-inner">


          <div className="luxury-mobile-menu-top">

            <span>
              {text.navigation}
            </span>

            <small>
              YOURKEY · UAE
            </small>

          </div>


          <nav className="luxury-mobile-nav">


            <Link
              href="/properties"
              onClick={
                closeMobile
              }
            >

              <small>
                01
              </small>

              <span>
                {
                  isArabic
                    ? "جميع العقارات"
                    : "All Properties"
                }
              </span>

              <i>
                ↗
              </i>

            </Link>


            <Link
              href="/properties/off-plan"
              onClick={
                closeMobile
              }
            >

              <small>
                02
              </small>

              <span>
                {
                  isArabic
                    ? "على المخطط"
                    : "Off Plan"
                }
              </span>

              <i>
                ↗
              </i>

            </Link>


            <Link
              href="/properties/sales"
              onClick={
                closeMobile
              }
            >

              <small>
                03
              </small>

              <span>
                {
                  isArabic
                    ? "للبيع"
                    : "Sales"
                }
              </span>

              <i>
                ↗
              </i>

            </Link>


            <Link
              href="/properties/rent"
              onClick={
                closeMobile
              }
            >

              <small>
                04
              </small>

              <span>
                {
                  isArabic
                    ? "للإيجار"
                    : "Rent"
                }
              </span>

              <i>
                ↗
              </i>

            </Link>


            <Link
              href="/communities"
              onClick={
                closeMobile
              }
            >

              <small>
                05
              </small>

              <span>
                {text.communities}
              </span>

              <i>
                ↗
              </i>

            </Link>


            <Link
              href="/investment"
              onClick={
                closeMobile
              }
            >

              <small>
                06
              </small>

              <span>
                {text.investment}
              </span>

              <i>
                ↗
              </i>

            </Link>


            <Link
              href="/about"
              onClick={
                closeMobile
              }
            >

              <small>
                07
              </small>

              <span>
                {text.about}
              </span>

              <i>
                ↗
              </i>

            </Link>


            <Link
              href="/agents"
              onClick={
                closeMobile
              }
            >

              <small>
                08
              </small>

              <span>
                {text.team}
              </span>

              <i>
                ↗
              </i>

            </Link>


            <Link
              href="/contact"
              onClick={
                closeMobile
              }
            >

              <small>
                09
              </small>

              <span>
                {text.contact}
              </span>

              <i>
                ↗
              </i>

            </Link>

          </nav>


          {/* ==================================================
              MOBILE SETTINGS
          ================================================== */}

          <div className="luxury-mobile-footer">


            {/* LANGUAGE */}

            <div className="luxury-mobile-setting">

              <small>
                {text.language}
              </small>


              <div className="luxury-mobile-setting-buttons">

                <button
                  type="button"
                  className={
                    language ===
                    "en"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    chooseLanguage(
                      "en"
                    )
                  }
                >
                  EN
                </button>


                <button
                  type="button"
                  className={
                    language ===
                    "ar"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    chooseLanguage(
                      "ar"
                    )
                  }
                >
                  AR
                </button>

              </div>

            </div>


            {/* CURRENCY */}

            <div className="luxury-mobile-setting">

              <small>
                {text.currency}
              </small>


              <select
                value={
                  currency
                }
                onChange={
                  event =>
                    chooseCurrency(
                      event
                        .currentTarget
                        .value
                    )
                }
                aria-label="Currency"
              >

                {currencies.map(
                  item => (

                    <option
                      value={item}
                      key={item}
                    >
                      {item}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* CONTACT */}

            <Link
              href="/contact"
              onClick={
                closeMobile
              }
            >

              {text.contactYourKey}

              <i>
                ↗
              </i>

            </Link>

          </div>

        </div>

      </div>

    </>
  );
}