"use client";

import Link from "next/link";

import "./Footer.css";


const WHATSAPP_URL =
  "https://wa.me/971506692770";

/*
  Client ke real Instagram aur Facebook URLs
  milne par sirf ye 2 values replace karna.
*/
const INSTAGRAM_URL = "#";
const FACEBOOK_URL = "#";


export default function Footer() {
  return (
    <footer className="luxury-footer">

      {/* =====================================================
          BACKGROUND DETAILS
      ===================================================== */}

      <div className="luxury-footer-grid" />

      <div className="luxury-footer-orbit luxury-footer-orbit-one" />

      <div className="luxury-footer-orbit luxury-footer-orbit-two" />


      <div className="luxury-footer-container">

        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <div className="luxury-footer-main">

          {/* ===================================================
              BRAND
          =================================================== */}

          <div className="luxury-footer-brand-column">

            <Link
              href="/"
              className="luxury-footer-brand"
              aria-label="YourKey Home"
            >

              <div className="luxury-footer-brand-mark">

                <span className="luxury-footer-brand-dot" />

                <span className="luxury-footer-brand-line luxury-footer-brand-line-one" />

                <span className="luxury-footer-brand-line luxury-footer-brand-line-two" />

              </div>


              <strong>
                YOURKEY
              </strong>

            </Link>


            <p className="luxury-footer-description">
              Your Key to UAE Real Estate. Abu Dhabi &amp;
              Dubai&apos;s trusted property experts for buying,
              selling, renting, and investing.
            </p>


            <div className="luxury-footer-location">

              <small>
                BASED IN
              </small>

              <strong>
                United Arab Emirates
              </strong>

            </div>


            {/* ===============================================
                SOCIAL ICONS
            =============================================== */}

            <div className="luxury-footer-social">

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="luxury-social-link"
              >
                <InstagramIcon />
              </a>


              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="luxury-social-link"
              >
                <WhatsAppIcon />
              </a>


              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="luxury-social-link"
              >
                <FacebookIcon />
              </a>

            </div>

          </div>


          {/* ===================================================
              QUICK LINKS
          =================================================== */}

          <div className="luxury-footer-column">

            <div className="luxury-footer-column-label">
              QUICK LINKS
            </div>


            <nav>

              <FooterLink
                href="/properties"
                label="Properties"
              />

              <FooterLink
                href="/off-plan"
                label="Off-Plan"
              />

              <FooterLink
                href="/communities"
                label="Communities"
              />

              <FooterLink
                href="/investment"
                label="Investment ROI"
              />

              <FooterLink
                href="/about"
                label="About Us"
              />

            </nav>

          </div>


          {/* ===================================================
              OUR SERVICES
          =================================================== */}

          <div className="luxury-footer-column">

            <div className="luxury-footer-column-label">
              OUR SERVICES
            </div>


            <nav>

              <FooterLink
                href="/properties?purpose=sale"
                label="Buy Property"
              />

              <FooterLink
                href="/contact"
                label="Sell Property"
              />

              <FooterLink
                href="/properties?purpose=rent"
                label="Rent & Lease"
              />

              <FooterLink
                href="/about"
                label="Property Management"
              />

              <FooterLink
                href="/investment"
                label="Investment Advisory"
              />

              <FooterLink
                href="/#valuation"
                label="Free Valuation"
              />

            </nav>

          </div>


          {/* ===================================================
              CONTACT INFO
          =================================================== */}

          <div className="luxury-footer-contact-column">

            <div className="luxury-footer-column-label">
              CONTACT INFO
            </div>


            {/* DUBAI OFFICE */}

            <div className="luxury-footer-contact-item">

              <small>
                DUBAI OFFICE
              </small>

              <p className="luxury-footer-office-address">
                Office 17, 35th Floor, Al Saqr Business Tower,
                DIFC, Dubai
              </p>

              <a
                href="tel:+971506692770"
                dir="ltr"
              >
                +971 50 669 2770
              </a>

            </div>


            {/* ABU DHABI OFFICE */}

            <div className="luxury-footer-contact-item">

              <small>
                ABU DHABI OFFICE
              </small>

              <p className="luxury-footer-office-address">
                Office M01, Al Mansouri Building, Al Gheel St.,
                Al Danah, Abu Dhabi
              </p>

              <a
                href="tel:+971544517999"
                dir="ltr"
              >
                +971 54 451 7999
              </a>

            </div>


            {/* EMAIL */}

            <div className="luxury-footer-contact-item">

              <small>
                EMAIL
              </small>

              <a href="mailto:main@yourkey.ae">
                main@yourkey.ae
              </a>

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div className="luxury-footer-bottom">

          <p>
            © {new Date().getFullYear()} YourKey.
            All rights reserved.
          </p>


          <div>

            <Link href="/privacy">
              Privacy
            </Link>

            <span>
              ·
            </span>

            <Link href="/terms">
              Terms
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}


/* ==========================================================
   FOOTER LINK
========================================================== */

function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="luxury-footer-link"
    >

      <span>
        {label}
      </span>

      <i>
        ↗
      </i>

    </Link>
  );
}


/* ==========================================================
   INSTAGRAM ICON
========================================================== */

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >

      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="17.4"
        cy="6.7"
        r="1.05"
        fill="currentColor"
      />

    </svg>
  );
}


/* ==========================================================
   WHATSAPP ICON
========================================================== */

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >

      <path
        d="M20.52 3.48A11.84 11.84 0 0 0 12.08 0C5.5 0 .14 5.35.14 11.94c0 2.1.55 4.16 1.59 5.97L.04 24l6.23-1.64a11.92 11.92 0 0 0 5.8 1.48h.01C18.66 23.84 24 18.49 24 11.91c0-3.18-1.24-6.17-3.48-8.43Z"
        fill="currentColor"
      />

      <path
        d="M18.15 15.46c-.33-.16-1.94-.96-2.24-1.07-.3-.11-.52-.16-.74.16-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.16-1.38-.51-2.63-1.62-.97-.87-1.63-1.94-1.82-2.26-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.12-1.14 2.73s1.17 3.16 1.34 3.38c.16.22 2.3 3.51 5.57 4.92.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.94-.79 2.21-1.56.27-.77.27-1.43.19-1.56-.08-.14-.3-.22-.63-.38Z"
        fill="#071019"
      />

    </svg>
  );
}


/* ==========================================================
   FACEBOOK ICON
========================================================== */

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >

      <path
        d="M13.6 22v-9h3.05l.46-3.52H13.6V7.23c0-1.02.28-1.71 1.76-1.71h1.88V2.37c-.33-.04-1.44-.14-2.74-.14-2.71 0-4.57 1.65-4.57 4.69v2.56H6.87V13h3.06v9h3.67Z"
      />

    </svg>
  );
}